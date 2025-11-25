// Telegram WebApp Integration for IELTS Academy
// This file handles authentication and premium access checks

const API_URL = 'https://ielts-academy-backend.rahruz1977.workers.dev'

class TelegramAuth {
    constructor() {
        this.user = null
        this.premium = null
        this.init()
    }

    init() {
        // Initialize Telegram WebApp
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.ready()
            window.Telegram.WebApp.expand()

            // Set theme
            const theme = window.Telegram.WebApp.colorScheme || 'dark'
            document.documentElement.setAttribute('data-theme', theme)

            // Get init data for authentication
            this.initData = window.Telegram.WebApp.initData

            console.log('[Telegram] WebApp initialized')
        } else {
            console.warn('[Telegram] Not running in Telegram WebApp environment')
            // For testing outside Telegram
            this.initData = null
        }
    }

    async checkAuth() {
        if (!this.initData) {
            // Mock user for testing outside Telegram
            this.user = { id: 'test_user', first_name: 'Test' }
            this.premium = { active: false, type: 'free', dailyQuestions: { today: 0, limit: 5, remaining: 5 } }
            return this.user
        }

        try {
            const response = await fetch(`${API_URL}/api/check-premium`, {
                headers: {
                    'X-Telegram-Init-Data': this.initData
                }
            })

            if (!response.ok) {
                throw new Error('Authentication failed')
            }

            const data = await response.json()
            this.user = data.user
            this.premium = data.premium

            console.log('[Auth] User authenticated:', this.user)
            console.log('[Auth] Premium status:', this.premium)

            return this.user

        } catch (error) {
            console.error('[Auth] Error:', error)
            return null
        }
    }

    async trackUsage() {
        if (!this.initData || this.premium?.active) {
            return { canPractice: true }
        }

        try {
            const response = await fetch(`${API_URL}/api/track-usage`, {
                method: 'POST',
                headers: {
                    'X-Telegram-Init-Data': this.initData
                }
            })

            const usage = await response.json()
            this.premium.dailyQuestions = usage

            console.log('[Usage] Tracked:', usage)

            if (!usage.canPractice) {
                this.showPremiumOffer()
            }

            return usage

        } catch (error) {
            console.error('[Usage] Error:', error)
            return { canPractice: true } // Fail open
        }
    }

    canPractice() {
        if (this.premium?.active) {
            return true
        }

        const usage = this.premium?.dailyQuestions
        if (!usage) return true

        return usage.today < usage.limit
    }

    showPremiumOffer() {
        // Show premium subscription offer
        const overlay = document.createElement('div')
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            backdrop-filter: blur(10px);
        `

        overlay.innerHTML = `
            <div style="background: var(--glass); border: 2px solid var(--primary); border-radius: 24px; padding: 3rem; max-width: 500px; text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">⭐</div>
                <h2 style="font-size: 2rem; margin-bottom: 1rem; background: linear-gradient(135deg, var(--primary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    Upgrade to Premium
                </h2>
                <p style="color: var(--text-dim); margin-bottom: 2rem;">
                    You've reached your daily limit of 5 questions.<br>
                    Upgrade to Premium for unlimited practice!
                </p>
                <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
                    <div style="font-size: 3rem; font-weight: 900; color: var(--primary);">Unlimited</div>
                    <div style="color: var(--text-dim); margin-top: 0.5rem;">Practice Questions</div>
                </div>
                <div style="display: flex; gap: 1rem; flex-direction: column;">
                    <button onclick="telegramAuth.requestPremium('monthly')" style="background: var(--primary); color: #000; border: none; padding: 1rem 2rem; border-radius: 99px; font-weight: 700; cursor: pointer; font-size: 1.1rem;">
                        50,000 UZS / Month
                    </button>
                    <button onclick="telegramAuth.requestPremium('lifetime')" style="background: linear-gradient(135deg, var(--primary), var(--accent)); color: #fff; border: none; padding: 1rem 2rem; border-radius: 99px; font-weight: 700; cursor: pointer; font-size: 1.1rem;">
                        300,000 UZS / Lifetime 🎉
                    </button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: var(--glass); color: var(--text); border: 1px solid var(--glass-border); padding: 0.75rem 1.5rem; border-radius: 99px; cursor: pointer;">
                        Close
                    </button>
                </div>
            </div>
        `

        document.body.appendChild(overlay)
    }

    requestPremium(type) {
        // Send message to bot to initiate payment
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.close()

            // Open bot chat with command
            const botUsername = window.Telegram.WebApp.initDataUnsafe.start_param || 'your_bot_username'
            const command = type === 'lifetime' ? '/premium_lifetime' : '/premium_monthly'

            window.Telegram.WebApp.openTelegramLink(`https://t.me/${botUsername}?start=premium_${type}`)
        } else {
            alert('Please open this from Telegram to subscribe')
        }
    }

    updateUI() {
        // Update UI based on premium status
        const header = document.getElementById('header-subtitle')
        if (!header) return

        if (this.premium?.active) {
            const badge = document.createElement('span')
            badge.style.cssText = 'background: linear-gradient(135deg, var(--primary), var(--accent)); padding: 0.25rem 0.75rem; border-radius: 99px; font-size: 0.7rem; margin-left: 0.5rem; color: #fff; font-weight: 700;'
            badge.textContent = this.premium.type === 'lifetime' ? '⭐ LIFETIME' : '⭐ PREMIUM'
            header.appendChild(badge)
        } else {
            const usage = this.premium?.dailyQuestions
            if (usage) {
                const usageInfo = document.createElement('div')
                usageInfo.style.cssText = 'font-size: 0.75rem; color: var(--text-dim); margin-top: 0.25rem;'
                usageInfo.textContent = `Free: ${usage.remaining}/${usage.limit} questions today`
                header.appendChild(usageInfo)
            }
        }
    }
}

// Initialize global auth instance
window.telegramAuth = new TelegramAuth()

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('[App] Checking authentication...')
    const user = await window.telegramAuth.checkAuth()

    if (user) {
        console.log('[App] User authenticated:', user)
        window.telegramAuth.updateUI()
    } else {
        console.warn('[App] Authentication failed')
    }
})
