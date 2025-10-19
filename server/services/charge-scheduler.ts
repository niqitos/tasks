import fetch from 'node-fetch'
import { addMonths } from 'date-fns' // or implement manually
// import prisma client

const chargeSubscription = async (subscription: any) => {
  const config = useRuntimeConfig()

  const storedCard = await prisma.storedCard.findUnique({ where: { id: subscription.storedCardId }})

  if (!storedCard) throw new Error('No card')

  // Build payload for charging via token — exact endpoint & fields depend on monobank docs
  const chargePayload = {
    amount: subscription.amount,
    currency: subscription.currency || 'UAH',
    // Most providers require the card token or payment method ID
    cardToken: storedCard.providerCardId,
    description: `Subscription charge ${subscription.id}`,
    metadata: { subscriptionId: subscription.id, userId: subscription.userId },
    webhookUrl: `${config.public.appUrl}/api/monobank/webhook`
  }

  const res = await fetch(`${config.monobankApiBase}/merchant/charge-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.monobankSecret}`,
      'X-Merchant-Id': config.monobankMerchantId
    },
    body: JSON.stringify(chargePayload)
  })

  const data = await res.json()

  if (!res.ok) {
    // handle immediate error (e.g. invalid token)
    throw new Error(data?.message || 'Charge failed')
  }

  // monobank might reply with synchronous success OR return via webhook.
  // If synchronous success:
  if (data.status === 'success') {
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { nextChargeAt: addMonths(subscription.nextChargeAt, 1) }
    })
  }

  return data
}

export async function runDueSubscriptions() {
  const now = new Date()

  const due = await prisma.subscription.findMany({
    where: {
      active: true,
      nextChargeAt: { lte: now }
    }
  })

  for (const s of due) {
    try {
      await chargeSubscription(s)
    } catch (err) {
      console.error('Charge error', s.id, err)
      // Implement retry/backoff logic and update subscription status if needed
    }
  }
}
