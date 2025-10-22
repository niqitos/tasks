import { readBody } from 'h3'
import crypto from 'crypto'
import { prisma } from '@@/server/utils/prisma'

const config = useRuntimeConfig()

const verifyWebhook = (reqBodyString: any, signatureHeader: any) => {
  // If monobank provides HMAC signature, verify here.
  // Placeholder: using a simple secret compare — adapt to monobank spec.
  const expected = config.monobankWebhookSecret
  // If monobank uses HMAC with secret: compute and compare.
  return true // update with real verification
}

export default defineEventHandler(async (event) : Promise<any> => {
  const body = await readBody(event)

  const bodyString = JSON.stringify(body)

  // verify signature if available — implementation depends on monobank
  // const sig = getHeader(event, 'x-monobank-signature') or similar
  // if (!verifyWebhook(bodyString, sig)) throw createError({statusCode:401})

  // Example incoming structure (placeholder) — confirm with docs:
  // {
  //   type: 'invoice.paid',
  //   invoiceId: '...',
  //   metadata: { userId, purpose },
  //   payment: {
  //     status: 'success',
  //     cardToken: 'tok_abc123',  // <-- this is crucial to store
  //     last4: '4242',
  //     brand: 'Visa',
  //     expMonth: 12,
  //     expYear: 2028
  //   }
  // }

  if (body.type === 'invoice.paid' && body.payment && body.payment.cardToken) {
    const userId = body.metadata?.userId
    const cardToken = body.payment.cardToken

    // store the card token
    await prisma.storedCard.create({
      data: {
        userId,
        provider: 'monobank',
        providerCardId: cardToken,
        last4: body.payment.last4,
        brand: body.payment.brand,
        expMonth: body.payment.expMonth,
        expYear: body.payment.expYear
      }
    })

    // optionally: create a subscription record for that user
    // subscription creation might be initiated by your front-end instead,
    // but we show example creation here if the initial flow implies subscription activation
    // const nextCharge = addMonths(new Date(), 1)
    // await prisma.subscription.create({...})
  }

  // handle other webhook events (charge success/fail) below
  if (body.type === 'charge.succeeded') {
    // mark subscription charged, update nextChargeAt
  }

  if (body.type === 'charge.failed') {
    // retry logic, notify user, maybe cancel subscription after N tries
  }

  return { ok: true }
})
