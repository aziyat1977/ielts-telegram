# IELTS Academy - Files Overview

## 📁 Project Structure

```
ielts-telegram/
├── index.html              # Main WebApp interface
├── app.js                  # Application logic
├── data.js                 # Questions database
├── telegram-auth.js        # Telegram WebApp authentication
├── worker.js               # Cloudflare Worker backend
├── wrangler.toml           # Cloudflare deployment config
├── bot.js                  # Telegram bot code
├── package.json            # Bot dependencies
├── .github/
│   └── workflows/
│       └── deploy.yml      # Auto-deployment workflow
└── README.md               # This file
```

## 🚀 Quick Start

See `DEPLOYMENT_GUIDE.md` for detailed setup instructions.

### 1. Register CLICK Merchant
- Visit https://business.click.uz
- Submit required documents
- Get Service ID and Secret Key

### 2. Deploy to GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

Enable Pages in Settings → Enable from `main` branch

### 3. Deploy Cloudflare Worker
```bash
npm install -g wrangler
wrangler login
wrangler kv:namespace create "IELTS_KV"
# Update wrangler.toml with namespace ID
wrangler secret put BOT_TOKEN
wrangler secret put CLICK_SERVICE_ID
wrangler secret put CLICK_SECRET_KEY
wrangler deploy
```

### 4. Run Telegram Bot
```bash
npm install
npm start
```

## 💰 Monetization

- **Free Tier**: 5 questions/day
- **Premium Monthly**: 50,000 UZS/month
- **Premium Lifetime**: 300,000 UZS one-time

## 🔧 Configuration

Update these files with your credentials:

1. `telegram-auth.js` - Line 6: Cloudflare Worker URL
2. `bot.js` - Lines 4-6: Bot token, GitHub Pages URL, Worker URL
3. `wrangler.toml` - KV namespace ID

## 📱 Features

✅ 135 IELTS Speaking questions
✅ 27 topic categories  
✅ Russian & Uzbek translations
✅ Voice recording
✅ Progress tracking & gamification
✅ Freemium monetization
✅ CLICK payment integration
✅ Automatic deployment
✅ Zero maintenance

## 🆘 Support

For issues or questions, see `DEPLOYMENT_GUIDE.md` troubleshooting section.

## 📄 License

Private project - All rights reserved.
