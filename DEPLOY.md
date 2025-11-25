# IELTS Academy - Quick Deployment Guide

## ✅ Everything is Pre-Configured!

Your credentials are already set up in all files. Just run the scripts!

---

## 🚀 3-Step Deployment (15 minutes total)

### Step 1: Deploy to GitHub (5 minutes)

```bash
# Just double-click this file:
deploy-github.bat
```

Then:
1. Open https://github.com/aziyat1977/ielts-telegram/settings/pages
2. Under "Source", select: **Deploy from a branch**
3. Branch: **main**
4. Folder: **/ (root)**
5. Click **Save**
6. Wait 2-3 minutes

Your site: **https://aziyat1977.github.io/ielts-telegram/**

---

### Step 2: Deploy Cloudflare Worker (5 minutes)

```bash
# Just double-click this file:
deploy-cloudflare.bat
```

It will:
- ✅ Install Wrangler
- ✅ Login to Cloudflare
- ✅ Create KV namespace
- ✅ Set all secrets (bot token, CLICK credentials)
- ✅ Deploy worker

**Important**: After deployment, copy the KV namespace ID and update `wrangler.toml` line 8.

Then set CLICK webhook:
1. Login to https://business.click.uz
2. Go to Settings → Webhook URL
3. Enter: `https://ielts-academy-backend.rahruz1977.workers.dev/webhook/click`
4. Save

---

### Step 3: Start Telegram Bot (5 minutes)

```bash
# Just double-click this file:
setup-bot.bat
```

It will:
- ✅ Install dependencies
- ✅ Start your bot

**Test it:**
1. Open Telegram
2. Search: **@ielts_rater_bot**
3. Send **/start**
4. Click **"🚀 Open IELTS Academy"**

---

## 🎊 That's It!

Your IELTS Academy is now LIVE and making money!

**Your Bot**: https://t.me/ielts_rater_bot
**Your Website**: https://aziyat1977.github.io/ielts-telegram/
**Your API**: https://ielts-academy-backend.rahruz1977.workers.dev

---

## 💰 Pricing Configured

- **Free**: 5 questions/day
- **Monthly Premium**: 50,000 UZS/month
- **Lifetime Premium**: 300,000 UZS one-time

---

## 🔧 Your CLICK Configuration

- **Service ID**: 81769
- **Merchant ID**: 45478
- **Webhook**: https://ielts-academy-backend.rahruz1977.workers.dev/webhook/click

Make sure webhook is set in CLICK Business dashboard!

---

## 📊 Monitor Your Revenue

1. **CLICK Dashboard**: https://business.click.uz
   - View all payments
   - Download reports
   - Manage refunds

2. **Cloudflare Dashboard**: https://dash.cloudflare.com
   - View API usage
   - Check worker logs
   - Monitor performance

3. **Bot Analytics**:
   - Send `/stats` to your bot
   - Check user growth
   - Track conversions

---

## 🆘 Need Help?

Everything is pre-configured. If you have issues:

1. **Bot not working**: Check `setup-bot.bat` ran successfully
2. **Payments failing**: Verify CLICK webhook is set
3. **WebApp not loading**: Wait 3-5 minutes after GitHub deployment

For detailed troubleshooting, see `DEPLOYMENT_GUIDE.md`

---

## 🎯 Next Steps After Deployment

1. ✅ Test payment flow (use CLICK test cards first)
2. ✅ Invite friends to try your bot
3. ✅ Share on social media
4. ✅ Start marketing in Uzbekistan IELTS groups
5. ✅ Watch the money roll in! 💰

---

**Congratulations! You're ready to make money with IELTS Academy! 🎓💰**
