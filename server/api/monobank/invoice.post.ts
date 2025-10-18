import fetch from 'node-fetch'
import { readBody } from 'h3'

const config = useRuntimeConfig()

// helper to sign or add merchant headers — depends on monobank
function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-Merchant-Id': config.monobankMerchantId,
    'Authorization': `Bearer ${config.monobankSecret}`
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { userId, amount, description, returnUrl } = body

  if (!userId || !amount) {
    throw createError({ statusCode: 400, statusMessage: 'Missing params' })
  }

  // Build invoice payload — the exact fields depend on monobank API.
  // Key idea: request card tokenization/saveCard flag.
  const invoicePayload = {
    amount: amount,
    currency: 'UAH',
    description: description || 'Subscription initial payment',
    // IMPORTANT: placeholder flag — confirm exact name with monobank
    saveCardData: true,
    // callback/webhook and redirect URLs
    returnUrl,
    webhookUrl: `${config.public.appUrl}/api/monobank/webhook`,
    metadata: {
      userId,
      purpose: 'subscription-init'
    }
  }

  const res = await fetch(`${config.monobankApiBase}/merchant/invoice/create`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(invoicePayload)
  })

  if (!res.ok) {
    const text = await res.text()
    throw createError({ statusCode: res.status, statusMessage: text })
  }

  const data = await res.json()

  // data likely contains a redirect URL where to send the user to pay
  return data
})
