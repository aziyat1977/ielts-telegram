// Telegram Bot Code for IELTS Academy
// This bot handles payments and launches the WebApp

const TelegramBot = require('node-telegram-bot-api');

// Bot Configuration - CONFIGURED  
const BOT_TOKEN = '7871977412:AAGWGoENUckFYCLdCL0CsYE9z2bG7Jnc4HI';
const WEBAPP_URL = 'https://aziyat1977.github.io/ielts-telegram/';
const WORKER_URL = 'https://ielts-academy-backend.rahruz1977.workers.dev';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

//===== BOT COMMANDS =====//

// Start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;

    const welcomeMessage = `
🎓 *Welcome to IELTS Academy, ${firstName}!*

Master IELTS Speaking with:
✨ 135 carefully curated questions
🌍 Translations in Russian & Uzbek
🎯 27 topic categories
📊 Progress tracking & gamification
🎙️ Voice recording practice

*Free Plan:* 5 questions per day
*Premium:* Unlimited practice

Tap below to start practicing! 👇
`;

    bot.sendMessage(chatId, welcomeMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: '🚀 Open IELTS Academy', web_app: { url: WEBAPP_URL } }],
                [{ text: '⭐ Go Premium', callback_data: 'show_premium' }],
                [{ text: '📊 My Statistics', callback_data: 'my_stats' }],
                [{ text: 'ℹ️ Help', callback_data: 'help' }]
            ]
        }
    });
});

// Premium command
bot.onText(/\/premium/, (msg) => {
    showPremiumOptions(msg.chat.id);
});

// Stats command
bot.onText(/\/stats/, async (msg) => {
    const userId = msg.from.id;
    const stats = await getUserStats(userId);

    const statsMessage = `
📊 *Your IELTS Academy Statistics*

${stats.premium.active ? '⭐ Premium Member' : '🆓 Free Member'}
${stats.premium.active && stats.premium.type === 'lifetime' ? '🎉 Lifetime Access!' : ''}

📚 Questions answered: ${stats.totalAnswered || 0}
${!stats.premium.active ? `📝 Today: ${stats.usage.today}/${stats.usage.limit} (${stats.usage.remaining} remaining)` : ''}
${stats.premium.active && stats.premium.expiresAt ? `⏰ Subscription expires: ${new Date(stats.premium.expiresAt).toLocaleDateString()}` : ''}

Keep up the great work! 🚀
`;

    bot.sendMessage(msg.chat.id, statsMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [[
                { text: '🚀 Continue Practicing', web_app: { url: WEBAPP_URL } }
            ]]
        }
    });
});

// Help command
bot.onText(/\/help/, (msg) => {
    const helpMessage = `
ℹ️ *IELTS Academy Help*

*Commands:*
/start - Start the bot
/premium - View premium options
/stats - View your statistics
/help - Show this help message

*How to use:*
1. Click "Open IELTS Academy" to start practicing
2. Answer questions by recording your voice
3. Track your progress with XP and levels
4. Upgrade to Premium for unlimited practice

*Free vs Premium:*
🆓 Free: 5 questions per day
⭐ Premium: Unlimited questions, no restrictions

Need support? Contact @aziyat1977
`;

    bot.sendMessage(msg.chat.id, helpMessage, { parse_mode: 'Markdown' });
});

//===== CALLBACK HANDLERS =====//

bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    const userId = query.from.id;

    // Acknowledge callback
    bot.answerCallbackQuery(query.id);

    switch (data) {
        case 'show_premium':
            showPremiumOptions(chatId);
            break;

        case 'premium_monthly':
            sendMonthlyInvoice(chatId, userId);
            break;

        case 'premium_lifetime':
            sendLifetimeInvoice(chatId, userId);
            break;

        case 'my_stats':
            bot.sendMessage(chatId, 'Use /stats command to view your statistics.');
            break;

        case 'help':
            bot.sendMessage(chatId, 'Use /help command for assistance.');
            break;
    }
});

//===== PREMIUM FUNCTIONS =====//

function showPremiumOptions(chatId) {
    const premiumMessage = `
⭐ *Upgrade to Premium*

Unlock unlimited IELTS practice and supercharge your speaking skills!

*Premium Benefits:*
✅ Unlimited practice questions
✅ Full access to all 27 categories
✅ Advanced progress tracking
✅ Voice recording storage
✅ Priority support

Choose your plan:
`;

    bot.sendMessage(chatId, premiumMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{
                    text: '📅 Monthly - 50,000 UZS',
                    callback_data: 'premium_monthly'
                }],
                [{
                    text: '🎉 Lifetime - 300,000 UZS',
                    callback_data: 'premium_lifetime'
                }],
                [{
                    text: '← Back',
                    callback_data: 'back_to_start'
                }]
            ]
        }
    });
}

function sendMonthlyInvoice(chatId, userId) {
    const invoice = {
        chat_id: chatId,
        title: 'IELTS Academy Premium (Monthly)',
        description: 'Get unlimited access to all IELTS practice questions for 30 days',
        payload: `premium_monthly_${userId}_${Date.now()}`,
        provider_token: '', // Will be configured in BotFather
        currency: 'UZS',
        prices: [{
            label: 'Monthly Subscription',
            amount: 5000000 // 50,000 UZS (in smallest units)
        }],
        need_name: false,
        need_phone_number: false,
        need_email: false,
        need_shipping_address: false,
        is_flexible: false
    };

    bot.sendInvoice(chatId, invoice.title, invoice.description, invoice.payload,
        invoice.provider_token, invoice.currency, invoice.prices, {
        need_name: invoice.need_name,
        need_phone_number: invoice.need_phone_number,
        need_email: invoice.need_email,
        need_shipping_address: invoice.need_shipping_address,
        is_flexible: invoice.is_flexible
    });
}

function sendLifetimeInvoice(chatId, userId) {
    const invoice = {
        chat_id: chatId,
        title: 'IELTS Academy Premium (Lifetime)',
        description: 'Get unlimited access to all IELTS practice questions FOREVER! 🎉',
        payload: `premium_lifetime_${userId}_${Date.now()}`,
        provider_token: '', // Will be configured in BotFather
        currency: 'UZS',
        prices: [{
            label: 'Lifetime Access',
            amount: 30000000 // 300,000 UZS
        }],
        need_name: false,
        need_phone_number: false,
        need_email: false,
        need_shipping_address: false,
        is_flexible: false
    };

    bot.sendInvoice(chatId, invoice.title, invoice.description, invoice.payload,
        invoice.provider_token, invoice.currency, invoice.prices, {
        need_name: invoice.need_name,
        need_phone_number: invoice.need_phone_number,
        need_email: invoice.need_email,
        need_shipping_address: invoice.need_shipping_address,
        is_flexible: invoice.is_flexible
    });
}

//===== PAYMENT HANDLERS =====//

// Pre-checkout query (validate before payment)
bot.on('pre_checkout_query', (query) => {
    // Always approve pre-checkout query
    bot.answerPreCheckoutQuery(query.id, true);
});

// Successful payment
bot.on('successful_payment', async (msg) => {
    const chatId = msg.chat.id;
    const payment = msg.successful_payment;
    const userId = msg.from.id;

    console.log('Payment received:', payment);

    // Determine subscription type from payload
    const isLifetime = payment.invoice_payload.includes('lifetime');

    // Send confirmation message
    const confirmMessage = `
🎉 *Payment Successful!*

Thank you for subscribing to IELTS Academy Premium!

${isLifetime ?
            '🏆 You now have *LIFETIME* access!' :
            '📅 Your *monthly* subscription is now active for 30 days!'
        }

✨ *What you get:*
✅ Unlimited practice questions
✅ All 27 categories unlocked
✅ Advanced progress tracking
✅ Voice recording storage

Start practicing now! 👇
`;

    bot.sendMessage(chatId, confirmMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [[
                { text: '🚀 Start Practicing', web_app: { url: WEBAPP_URL } }
            ]]
        }
    });

    // Note: The Cloudflare Worker will handle granting access via webhook
    // This is just a confirmation message
});

//===== UTILITY FUNCTIONS =====//

async function getUserStats(userId) {
    try {
        const response = await fetch(`${WORKER_URL}/api/stats`, {
            headers: {
                'X-User-Id': userId.toString()
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching stats:', error);
        return {
            premium: { active: false },
            usage: { today: 0, limit: 5, remaining: 5 },
            totalAnswered: 0
        };
    }
}

//===== ERROR HANDLING =====//

bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

console.log('🤖 IELTS Academy Bot is running...');
console.log('Bot: @ielts_rater_bot');
console.log('WebApp: ' + WEBAPP_URL);
