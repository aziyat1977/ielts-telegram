// Cloudflare Worker -IELTS Academy Backend (FIXED v2.0)
// Handles Telegram bot, authentication, payments, and access control

// Environment variables (set via wrangler secret):
// BOT_TOKEN - Your Telegram bot token
// CLICK_SERVICE_ID - Your CLICK merchant service ID
// CLICK_SECRET_KEY - Your CLICK merchant secret key

// Price Configuration
const PRICES = {
    monthly: 50000,    // 500 UZS
    lifetime: 300000   // 3000 UZS
};

// Allowed Origins for CORS (FIXED: Issue #12)
const ALLOWED_ORIGINS = [
    'https://aziyat1977.github.io',
    'https://web.telegram.org',
    'http://localhost:8080' // For development
];

export default {
    async fetch(request, env, ctx) {
        return handleRequest(request, env);
    }
};

async function handleRequest(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const origin = request.headers.get('Origin');

    // CORS headers (FIXED: Issue #12 - Restrict to known origins)
    const corsHeaders = {
        'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Telegram-Init-Data',
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        // TELEGRAM BOT WEBHOOK (FIXED: Issue #7, #8 - Added handler)
        if (path === '/webhook/telegram' && request.method === 'POST') {
            const result = await handleTelegramWebhook(request, env);
            return new Response(JSON.stringify(result), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
        }

        // CLICK Payment Webhook
        if (path === '/webhook/click' && request.method === 'POST') {
            const payment = await request.json();
            const result = await processClickPayment(payment, env);
            return new Response(JSON.stringify(result), {
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Get user ID for rate limiting
        const initData = request.headers.get('X-Telegram-Init-Data');
        const user = initData ? await validateTelegramAuth(initData, env) : null;

        // Rate limiting (FIXED: Issue #13)
        if (user) {
            try {
                await checkRateLimit(user.id, env);
            } catch (error) {
                return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
                    status: 429,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }
        }

        // PAYMENT INITIATION (FIXED: Issue #16 - Added endpoint)
        if (path === '/api/payment/init' && request.method === 'POST') {
            if (!user) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }

            const { plan } = await request.json();
            const amount = PRICES[plan] || PRICES.monthly;
            const merchantTransId = `ielts_${user.id}_${Date.now()}`;

            const clickUrl = `https://my.click.uz/services/pay?service_id=${env.CLICK_SERVICE_ID}&merchant_id=${merchantTransId}&amount=${amount}&return_url=https://aziyat1977.github.io/ielts-telegram/`;

            return new Response(JSON.stringify({ url: clickUrl, merchantTransId }), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
        }

        // Check user premium status
        if (path === '/api/check-premium') {
            if (!user) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }

            const premium = await checkPremiumStatus(user.id, env);
            return new Response(JSON.stringify({ premium, user }), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
        }

        // USER PROGRESS TRACKING (FIXED: Issue #10 - Added endpoint)
        if (path === '/api/progress' && request.method === 'POST') {
            if (!user) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }

            const progressData = await request.json();
            const updated = await updateUserProgress(user.id, progressData, env);

            return new Response(JSON.stringify(updated), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
        }

        // Track question usage for free users
        if (path === '/api/track-usage' && request.method === 'POST') {
            if (!user) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }

            const usage = await trackUsage(user.id, env);
            return new Response(JSON.stringify(usage), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
        }

        // Get user statistics
        if (path === '/api/stats') {
            if (!user) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }

            const stats = await getUserStats(user.id, env);
            return new Response(JSON.stringify(stats), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
        }

        return new Response('IELTS Academy API v2.0 - OK', {
            headers: corsHeaders
        });

    } catch (error) {
        console.error('[Worker] Error:', error);
        return new Response(JSON.stringify({
            error: error.message || 'Internal server error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
    }
}

// TELEGRAM BOT WEBHOOK HANDLER (FIXED: Issue #8 - Complete implementation)
async function handleTelegramWebhook(request, env) {
    try {
        const update = await request.json();

        if (update.message) {
            const chatId = update.message.chat.id;
            const text = update.message.text;
            const username = update.message.from.username || update.message.from.first_name;

            console.log(`[Telegram] Message from ${username}: ${text}`);

            if (text === '/start') {
                await sendTelegramMessage(chatId, `Welcome to IELTS Speaking Academy! 🎓\n\nStart practicing now:`, {
                    reply_markup: {
                        inline_keyboard: [[
                            { text: '🚀 Open App', web_app: { url: 'https://aziyat1977.github.io/ielts-telegram/' } }
                        ]]
                    }
                }, env);
            } else if (text === '/stats') {
                const stats = await getUserStats(chatId, env);
                const message = `📊 Your Stats:\n\nLevel: ${stats.level || 1}\nXP: ${stats.xp || 0}\nQuestions Answered: ${stats.totalAnswered || 0}`;
                await sendTelegramMessage(chatId, message, {}, env);
            } else if (text === '/upgrade') {
                await sendTelegramMessage(chatId, `💎 Upgrade to Premium!\n\nMonthly: 50,000 UZS\nLifetime: 300,000 UZS\n\nOpen the app to purchase:`, {
                    reply_markup: {
                        inline_keyboard: [[
                            { text: '💳 Upgrade Now', web_app: { url: 'https://aziyat1977.github.io/ielts-telegram/?upgrade=true' } }
                        ]]
                    }
                }, env);
            } else if (text === '/help') {
                const helpText = `🆘 Available Commands:\n\n/start - Launch the app\n/stats - View your progress\n/upgrade - Get premium access\n/help - Show this message`;
                await sendTelegramMessage(chatId, helpText, {}, env);
            }
        }

        return { ok: true };

    } catch (error) {
        console.error('[Telegram] Webhook error:', error);
        return { ok: false, error: error.message };
    }
}

// Send message via Telegram Bot API
async function sendTelegramMessage(chatId, text, options, env) {
    try {
        const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text,
                parse_mode: 'HTML',
                ...options
            })
        });

        return await response.json();
    } catch (error) {
        console.error('[Telegram] Send message error:', error);
        throw error;
    }
}

// Rate Limiting (FIXED: Issue #13 - Implementation added)
async function checkRateLimit(userId, env) {
    const key = `ratelimit:${userId}:${Math.floor(Date.now() / 60000)}`;
    const count = await env.IELTS_KV.get(key);

    if (count && parseInt(count) > 100) {
        throw new Error('Rate limit exceeded');
    }

    await env.IELTS_KV.put(key, (parseInt(count) || 0) + 1, {
        expirationTtl: 60 // 1 minute
    });
}

// Validate Telegram WebApp authentication (FIXED: Issue #14 - Escape sequence)
async function validateTelegramAuth(initData, env) {
    if (!initData) return null;

    try {
        const params = new URLSearchParams(initData);
        const hash = params.get('hash');
        params.delete('hash');

        // Create data-check-string
        const dataCheckArr = [];
        for (const [key, value] of params.entries()) {
            dataCheckArr.push(`${key}=${value}`);
        }
        dataCheckArr.sort();
        const dataCheckString = dataCheckArr.join('\n'); // FIXED: Was '\\n' (double-escaped)

        // Calculate HMAC
        const secretKey = await crypto.subtle.importKey(
            'raw',
            new TextEncoder().encode('WebAppData'),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );

        const hmacKey = await crypto.subtle.sign(
            'HMAC',
            secretKey,
            new TextEncoder().encode(env.BOT_TOKEN)
        );

        const key = await crypto.subtle.importKey(
            'raw',
            hmacKey,
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );

        const signature = await crypto.subtle.sign(
            'HMAC',
            key,
            new TextEncoder().encode(dataCheckString)
        );

        const hashHex = Array.from(new Uint8Array(signature))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        // Verify hash
        if (hashHex !== hash) return null;

        // Check timestamp (valid for 24 hours)
        const authDate = parseInt(params.get('auth_date'));
        if (Date.now() / 1000 - authDate > 86400) return null;

        // Parse user data
        const userData = JSON.parse(params.get('user'));
        return userData;

    } catch (error) {
        console.error('[Auth] Validation error:', error);
        return null;
    }
}

// USER PROGRESS TRACKING (FIXED: Issue #10 - Full implementation)
async function updateUserProgress(userId, progressData, env) {
    const existing = await env.IELTS_KV.get(`user:${userId}:progress`, 'json') || {
        part1: { answered: 0, questions: {} },
        part2: { completed: 0, topics: {} },
        part3: { discussed: 0, topics: {} },
        xp: 0,
        level: 1,
        lastUpdated: Date.now()
    };

    const updated = {
        ...existing,
        ...progressData,
        lastUpdated: Date.now()
    };

    await env.IELTS_KV.put(`user:${userId}:progress`, JSON.stringify(updated));

    return updated;
}

// Process CLICK payment webhook
async function processClickPayment(payment, env) {
    // Verify CLICK signature
    const signature = payment.sign;
    const signString = `${payment.click_trans_id}${env.CLICK_SERVICE_ID}${env.CLICK_SECRET_KEY}${payment.merchant_trans_id}${payment.amount}${payment.action}${payment.sign_time}`;

    const expectedSignature = await hashMD5(signString);

    if (signature !== expectedSignature) {
        return { error: -1, error_note: 'Invalid signature' };
    }

    // Handle payment actions
    if (payment.action === 0) {
        // Prepare payment
        return await preparePayment(payment, env);
    } else if (payment.action === 1) {
        // Complete payment
        return await completePayment(payment, env);
    }

    return { error: -3, error_note: 'Invalid action' };
}

async function preparePayment(payment, env) {
    const userId = payment.merchant_trans_id.split('_')[1];
    const amount = parseFloat(payment.amount);

    // Check if payment already exists
    const existingPayment = await env.IELTS_KV.get(`payment:${payment.click_trans_id}`);
    if (existingPayment) {
        return {
            click_trans_id: payment.click_trans_id,
            merchant_trans_id: payment.merchant_trans_id,
            merchant_prepare_id: payment.click_trans_id,
            error: 0,
            error_note: 'Success'
        };
    }

    // Validate amount (FIXED: Issue #15 - Use PRICES config)
    if (!Object.values(PRICES).includes(amount)) {
        return {
            click_trans_id: payment.click_trans_id,
            merchant_trans_id: payment.merchant_trans_id,
            error: -2,
            error_note: 'Invalid amount'
        };
    }

    // Store payment info
    await env.IELTS_KV.put(`payment:${payment.click_trans_id}`, JSON.stringify({
        userId,
        amount,
        status: 'prepared',
        timestamp: Date.now()
    }));

    return {
        click_trans_id: payment.click_trans_id,
        merchant_trans_id: payment.merchant_trans_id,
        merchant_prepare_id: payment.click_trans_id,
        error: 0,
        error_note: 'Success'
    };
}

async function completePayment(payment, env) {
    const paymentData = await env.IELTS_KV.get(`payment:${payment.click_trans_id}`, 'json');

    if (!paymentData) {
        return {
            click_trans_id: payment.click_trans_id,
            merchant_trans_id: payment.merchant_trans_id,
            error: -6,
            error_note: 'Payment not found'
        };
    }

    // Grant premium access
    const userId = paymentData.userId;
    const isLifetime = paymentData.amount === PRICES.lifetime;

    const premiumData = {
        active: true,
        type: isLifetime ? 'lifetime' : 'monthly',
        activatedAt: Date.now(),
        expiresAt: isLifetime ? null : Date.now() + 30 * 24 * 60 * 60 * 1000,
        paymentId: payment.click_trans_id,
        amount: paymentData.amount
    };

    await env.IELTS_KV.put(`user:${userId}:premium`, JSON.stringify(premiumData));

    // Update payment status
    paymentData.status = 'completed';
    await env.IELTS_KV.put(`payment:${payment.click_trans_id}`, JSON.stringify(paymentData));

    // Send notification to user via Telegram bot
    await notifyUser(userId, isLifetime ? 'lifetime' : 'monthly', env);

    return {
        click_trans_id: payment.click_trans_id,
        merchant_trans_id: payment.merchant_trans_id,
        merchant_confirm_id: payment.click_trans_id,
        error: 0,
        error_note: 'Success'
    };
}

// Check premium status
async function checkPremiumStatus(userId, env) {
    const premiumData = await env.IELTS_KV.get(`user:${userId}:premium`, 'json');

    if (!premiumData || !premiumData.active) {
        return {
            active: false,
            type: 'free',
            dailyQuestions: await getDailyUsage(userId, env)
        };
    }

    // Check if subscription expired
    if (premiumData.type === 'monthly' && premiumData.expiresAt < Date.now()) {
        premiumData.active = false;
        await env.IELTS_KV.put(`user:${userId}:premium`, JSON.stringify(premiumData));
        return {
            active: false,
            type: 'free',
            expired: true,
            dailyQuestions: await getDailyUsage(userId, env)
        };
    }

    return {
        active: true,
        type: premiumData.type,
        expiresAt: premiumData.expiresAt,
        activatedAt: premiumData.activatedAt
    };
}

// Track daily usage for free users
async function trackUsage(userId, env) {
    const today = new Date().toISOString().split('T')[0];
    const key = `usage:${userId}:${today}`;

    const count = await env.IELTS_KV.get(key);
    const newCount = (parseInt(count) || 0) + 1;

    await env.IELTS_KV.put(key, newCount.toString(), {
        expirationTtl: 86400 // 24 hours
    });

    return {
        today: newCount,
        limit: 5,
        remaining: Math.max(0, 5 - newCount),
        canPractice: newCount <= 5
    };
}

async function getDailyUsage(userId, env) {
    const today = new Date().toISOString().split('T')[0];
    const count = await env.IELTS_KV.get(`usage:${userId}:${today}`);
    return {
        today: parseInt(count) || 0,
        limit: 5,
        remaining: Math.max(0, 5 - (parseInt(count) || 0))
    };
}

// Get user statistics
async function getUserStats(userId, env) {
    const premium = await checkPremiumStatus(userId, env);
    const usage = await getDailyUsage(userId, env);
    const progress = await env.IELTS_KV.get(`user:${userId}:progress`, 'json') || {
        xp: 0,
        level: 1,
        part1: { answered: 0 },
        part2: { completed: 0 },
        part3: { discussed: 0 }
    };

    return {
        premium,
        usage,
        xp: progress.xp || 0,
        level: progress.level || 1,
        totalAnswered: (progress.part1?.answered || 0) + (progress.part2?.completed || 0) + (progress.part3?.discussed || 0),
        lastActive: Date.now()
    };
}

// Send notification to user via Telegram
async function notifyUser(userId, subscriptionType, env) {
    const message = subscriptionType === 'lifetime'
        ? '🎉 Congratulations! You now have LIFETIME premium access to IELTS Academy!\n\nEnjoy unlimited practice forever! 🚀'
        : '🎉 Thank you for subscribing to IELTS Academy Premium!\n\nYou now have unlimited access for 30 days! 📚';

    try {
        await sendTelegramMessage(userId, message, {}, env);
    } catch (error) {
        console.error('[Notify] Failed to send notification:', error);
    }
}

// MD5 hash implementation for CLICK signature
async function hashMD5(str) {
    function md5cycle(x, k) {
        let a = x[0], b = x[1], c = x[2], d = x[3];
        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897);
        d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341);
        b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416);
        d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063);
        b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682);
        d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290);
        b = ff(b, c, d, a, k[15], 22, 1236535329);
        a = gg(a, b, c, d, k[1], 5, -165796510);
        d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713);
        b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691);
        d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335);
        b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438);
        d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961);
        b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467);
        d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473);
        b = gg(b, c, d, a, k[12], 20, -1926607734);
        a = hh(a, b, c, d, k[5], 4, -378558);
        d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562);
        b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060);
        d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632);
        b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174);
        d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979);
        b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487);
        d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520);
        b = hh(b, c, d, a, k[2], 23, -995338651);
        a = ii(a, b, c, d, k[0], 6, -198630844);
        d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905);
        b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571);
        d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523);
        b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359);
        d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380);
        b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070);
        d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259);
        b = ii(b, c, d, a, k[9], 21, -343485551);
        x[0] = add32(a, x[0]);
        x[1] = add32(b, x[1]);
        x[2] = add32(c, x[2]);
        x[3] = add32(d, x[3]);
    }

    function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    }

    function ff(a, b, c, d, x, s, t) {
        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    function gg(a, b, c, d, x, s, t) {
        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    function hh(a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function ii(a, b, c, d, x, s, t) {
        return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    function md51(s) {
        const n = s.length;
        const state = [1732584193, -271733879, -1732584194, 271733878];
        let i;
        for (i = 64; i <= s.length; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        const tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < s.length; i++)
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i++) tail[i] = 0;
        }
        tail[14] = n * 8;
        md5cycle(state, tail);
        return state;
    }

    function md5blk(s) {
        const md5blks = [];
        for (let i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    }

    function add32(a, b) {
        return (a + b) & 0xFFFFFFFF;
    }

    function rhex(n) {
        let s = '', j = 0;
        for (; j < 4; j++)
            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
        return s;
    }

    const hex_chr = '0123456789abcdef'.split('');

    function hex(x) {
        for (let i = 0; i < x.length; i++)
            x[i] = rhex(x[i]);
        return x.join('');
    }

    return hex(md51(str));
}
