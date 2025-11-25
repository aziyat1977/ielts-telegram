// Cloudflare Worker - IELTS Academy Backend
// Handles authentication, payments, and access control

// Environment variables (set in Cloudflare dashboard):
// BOT_TOKEN - Your Telegram bot token
// CLICK_SERVICE_ID - Your CLICK merchant service ID
// CLICK_SECRET_KEY - Your CLICK merchant secret key

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    const path = url.pathname

    // CORS headers for WebApp
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Telegram-Init-Data',
    }

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders })
    }

    try {
        // CLICK Payment Webhook
        if (path === '/webhook/click' && request.method === 'POST') {
            const payment = await request.json()
            const result = await processClickPayment(payment)
            return new Response(JSON.stringify(result), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            })
        }

        // Check user premium status
        if (path === '/api/check-premium') {
            const initData = request.headers.get('X-Telegram-Init-Data')
            const user = await validateTelegramAuth(initData)

            if (!user) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                })
            }

            const premium = await checkPremiumStatus(user.id)
            return new Response(JSON.stringify({ premium, user }), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            })
        }

        // Track question usage for free users
        if (path === '/api/track-usage' && request.method === 'POST') {
            const initData = request.headers.get('X-Telegram-Init-Data')
            const user = await validateTelegramAuth(initData)

            if (!user) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                })
            }

            const usage = await trackUsage(user.id)
            return new Response(JSON.stringify(usage), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            })
        }

        // Get user statistics
        if (path === '/api/stats') {
            const initData = request.headers.get('X-Telegram-Init-Data')
            const user = await validateTelegramAuth(initData)

            if (!user) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                })
            }

            const stats = await getUserStats(user.id)
            return new Response(JSON.stringify(stats), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            })
        }

        return new Response('IELTS Academy API - OK', {
            headers: corsHeaders
        })

    } catch (error) {
        return new Response(JSON.stringify({
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
    }
}

// Validate Telegram WebApp authentication
async function validateTelegramAuth(initData) {
    if (!initData) return null

    try {
        const params = new URLSearchParams(initData)
        const hash = params.get('hash')
        params.delete('hash')

        // Create data-check-string
        const dataCheckArr = []
        for (const [key, value] of params.entries()) {
            dataCheckArr.push(`${key}=${value}`)
        }
        dataCheckArr.sort()
        const dataCheckString = dataCheckArr.join('\n')

        // Calculate HMAC
        const secretKey = await crypto.subtle.importKey(
            'raw',
            new TextEncoder().encode('WebAppData'),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        )

        const hmacKey = await crypto.subtle.sign(
            'HMAC',
            secretKey,
            new TextEncoder().encode(BOT_TOKEN)
        )

        const key = await crypto.subtle.importKey(
            'raw',
            hmacKey,
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        )

        const signature = await crypto.subtle.sign(
            'HMAC',
            key,
            new TextEncoder().encode(dataCheckString)
        )

        const hashHex = Array.from(new Uint8Array(signature))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')

        // Verify hash
        if (hashHex !== hash) return null

        // Check timestamp (valid for 24 hours)
        const authDate = parseInt(params.get('auth_date'))
        if (Date.now() / 1000 - authDate > 86400) return null

        // Parse user data
        const userData = JSON.parse(params.get('user'))
        return userData

    } catch (error) {
        console.error('Auth validation error:', error)
        return null
    }
}

// Process CLICK payment webhook
async function processClickPayment(payment) {
    // Verify CLICK signature
    const signature = payment.sign
    const signString = `${payment.click_trans_id}${CLICK_SERVICE_ID}${CLICK_SECRET_KEY}${payment.merchant_trans_id}${payment.amount}${payment.action}${payment.sign_time}`

    const expectedSignature = await hashMD5(signString)

    if (signature !== expectedSignature) {
        return { error: -1, error_note: 'Invalid signature' }
    }

    // Handle payment actions
    if (payment.action === 0) {
        // Prepare payment
        return await preparePayment(payment)
    } else if (payment.action === 1) {
        // Complete payment
        return await completePayment(payment)
    }

    return { error: -3, error_note: 'Invalid action' }
}

async function preparePayment(payment) {
    const userId = payment.merchant_trans_id.split('_')[1]
    const amount = parseFloat(payment.amount)

    // Check if payment already exists
    const existingPayment = await IELTS_KV.get(`payment:${payment.click_trans_id}`)
    if (existingPayment) {
        return {
            click_trans_id: payment.click_trans_id,
            merchant_trans_id: payment.merchant_trans_id,
            merchant_prepare_id: payment.click_trans_id,
            error: 0,
            error_note: 'Success'
        }
    }

    // Validate amount
    if (amount !== 50000 && amount !== 300000) {
        return {
            click_trans_id: payment.click_trans_id,
            merchant_trans_id: payment.merchant_trans_id,
            error: -2,
            error_note: 'Invalid amount'
        }
    }

    // Store payment info
    await IELTS_KV.put(`payment:${payment.click_trans_id}`, JSON.stringify({
        userId,
        amount,
        status: 'prepared',
        timestamp: Date.now()
    }))

    return {
        click_trans_id: payment.click_trans_id,
        merchant_trans_id: payment.merchant_trans_id,
        merchant_prepare_id: payment.click_trans_id,
        error: 0,
        error_note: 'Success'
    }
}

async function completePayment(payment) {
    const paymentData = await IELTS_KV.get(`payment:${payment.click_trans_id}`, 'json')

    if (!paymentData) {
        return {
            click_trans_id: payment.click_trans_id,
            merchant_trans_id: payment.merchant_trans_id,
            error: -6,
            error_note: 'Payment not found'
        }
    }

    // Grant premium access
    const userId = paymentData.userId
    const isLifetime = paymentData.amount === 300000

    const premiumData = {
        active: true,
        type: isLifetime ? 'lifetime' : 'monthly',
        activatedAt: Date.now(),
        expiresAt: isLifetime ? null : Date.now() + 30 * 24 * 60 * 60 * 1000,
        paymentId: payment.click_trans_id,
        amount: paymentData.amount
    }

    await IELTS_KV.put(`user:${userId}:premium`, JSON.stringify(premiumData))

    // Update payment status
    paymentData.status = 'completed'
    await IELTS_KV.put(`payment:${payment.click_trans_id}`, JSON.stringify(paymentData))

    // Send notification to user via Telegram bot
    await notifyUser(userId, isLifetime ? 'lifetime' : 'monthly')

    return {
        click_trans_id: payment.click_trans_id,
        merchant_trans_id: payment.merchant_trans_id,
        merchant_confirm_id: payment.click_trans_id,
        error: 0,
        error_note: 'Success'
    }
}

// Check premium status
async function checkPremiumStatus(userId) {
    const premiumData = await IELTS_KV.get(`user:${userId}:premium`, 'json')

    if (!premiumData || !premiumData.active) {
        return {
            active: false,
            type: 'free',
            dailyQuestions: await getDailyUsage(userId)
        }
    }

    // Check if subscription expired
    if (premiumData.type === 'monthly' && premiumData.expiresAt < Date.now()) {
        premiumData.active = false
        await IELTS_KV.put(`user:${userId}:premium`, JSON.stringify(premiumData))
        return {
            active: false,
            type: 'free',
            expired: true,
            dailyQuestions: await getDailyUsage(userId)
        }
    }

    return {
        active: true,
        type: premiumData.type,
        expiresAt: premiumData.expiresAt,
        activatedAt: premiumData.activatedAt
    }
}

// Track daily usage for free users
async function trackUsage(userId) {
    const today = new Date().toISOString().split('T')[0]
    const key = `usage:${userId}:${today}`

    const count = await IELTS_KV.get(key)
    const newCount = (parseInt(count) || 0) + 1

    await IELTS_KV.put(key, newCount.toString(), {
        expirationTtl: 86400 // 24 hours
    })

    return {
        today: newCount,
        limit: 5,
        remaining: Math.max(0, 5 - newCount),
        canPractice: newCount <= 5
    }
}

async function getDailyUsage(userId) {
    const today = new Date().toISOString().split('T')[0]
    const count = await IELTS_KV.get(`usage:${userId}:${today}`)
    return {
        today: parseInt(count) || 0,
        limit: 5,
        remaining: Math.max(0, 5 - (parseInt(count) || 0))
    }
}

// Get user statistics
async function getUserStats(userId) {
    // Get all user data
    const premium = await checkPremiumStatus(userId)
    const usage = await getDailyUsage(userId)

    return {
        premium,
        usage,
        totalAnswered: 0, // Will be tracked when we add question tracking
        lastActive: Date.now()
    }
}

// Send notification to user via Telegram
async function notifyUser(userId, subscriptionType) {
    const message = subscriptionType === 'lifetime'
        ? '🎉 Congratulations! You now have LIFETIME premium access to IELTS Academy!\n\nEnjoy unlimited practice forever! 🚀'
        : '🎉 Thank you for subscribing to IELTS Academy Premium!\n\nYou now have unlimited access for 30 days! 📚'

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: userId,
            text: message,
            parse_mode: 'HTML'
        })
    })

    return response.json()
}

// MD5 hash for CLICK signature
async function hashMD5(str) {
    const msgBuffer = new TextEncoder().encode(str)
    const hashBuffer = await crypto.subtle.digest('MD5', msgBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
