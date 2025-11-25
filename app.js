// IELTS Academy - Gamified Learning App
// Level System Configuration
const LEVEL_CONFIG = {
    1: 0, 2: 100, 3: 250, 4: 450, 5: 700, 6: 1000, 7: 1400, 8: 1900, 9: 2500, 10: 3200
};
const XP_REWARDS = {
    answer: 15, complete_category: 75, daily_bonus: 30, no_hint: 5, checkpoint: 50
};

// App State Management
class IELTSApp {
    constructor() {
        this.state = {
            view: 'dashboard', currentCategory: 'all', questionList: [], questionIndex: 0,
            recording: false, mediaRecorder: null, audioChunks: [], currentRecording: null,
            showTranslation: { ru: false, uz: false }
        };
        this.userData = this.loadUserData();
        this.init();
    }

    init() {
        console.log('[IELTS App] Starting initialization...');
        try {
            this.renderCategories();
            console.log('[IELTS App] Categories rendered');
            this.renderCampaigns();
            console.log('[IELTS App] Campaigns rendered');
            this.updateDashboard();
            console.log('[IELTS App] Dashboard updated');
            this.updateHeader();
            console.log('[IELTS App] Header updated');
            this.checkDailyVisit();
            console.log('[IELTS App] Daily visit checked');
            this.initTheme();
            console.log('[IELTS App] Theme initialized');
            this.init3DScene();
            console.log('[IELTS App] 3D scene initialized');
            this.revealUI();
            console.log('[IELTS App] UI revealed');
        } catch (error) {
            console.error('[IELTS App] Initialization error:', error);
            // Ensure UI is shown even if there's an error
            this.revealUI();
        }
    }

    loadUserData() {
        const defaultData = {
            level: 1, xp: 0, answeredQuestions: [], categoryProgress: {}, visitHistory: [],
            currentStreak: 0, bestStreak: 0, lastVisit: null, recordings: [], theme: 'dark', checkpoints: []
        };
        const saved = localStorage.getItem('ielts_user_data');
        return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    }

    saveUserData() {
        localStorage.setItem('ielts_user_data', JSON.stringify(this.userData));
    }

    addXP(amount, reason = '') {
        this.userData.xp += amount;
        const oldLevel = this.userData.level;
        for (let level = 10; level >= 1; level--) {
            if (this.userData.xp >= LEVEL_CONFIG[level]) {
                this.userData.level = level;
                break;
            }
        }
        if (this.userData.level > oldLevel) this.showLevelUpAnimation(this.userData.level);
        this.saveUserData();
        this.updateHeader();
        this.updateDashboard();
    }

    getCurrentLevelProgress() {
        const current = this.userData.level;
        const next = current < 10 ? current + 1 : 10;
        const currentXP = LEVEL_CONFIG[current];
        const nextXP = LEVEL_CONFIG[next];
        const progress = ((this.userData.xp - currentXP) / (nextXP - currentXP)) * 100;
        return Math.min(100, Math.max(0, progress));
    }

    showLevelUpAnimation(level) {
        if (window.gsap) {
            const badge = document.createElement('div');
            badge.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff;padding:3rem;border-radius:24px;font-size:3rem;font-weight:900;z-index:9999;text-align:center;';
            badge.innerHTML = `🎉<br>LEVEL ${level}!`;
            document.body.appendChild(badge);
            gsap.from(badge, { scale: 0, duration: 0.5, ease: 'back.out(2)' });
            gsap.to(badge, { opacity: 0, scale: 1.5, duration: 0.5, delay: 2, onComplete: () => badge.remove() });
        }
    }

    renderCategories() {
        console.log('[IELTS App] renderCategories called');
        console.log('[IELTS App] typeof topicMeta:', typeof topicMeta);
        console.log('[IELTS App] topicMeta:', topicMeta);

        const list = document.getElementById('category-list');
        console.log('[IELTS App] category-list element:', list);

        if (!list) {
            console.error('[IELTS App] ERROR: category-list element not found!');
            return;
        }

        if (typeof topicMeta === 'undefined') {
            console.error('[IELTS App] ERROR: topicMeta is undefined!');
            return;
        }

        list.innerHTML = '';
        const keys = Object.keys(topicMeta);
        console.log('[IELTS App] topicMeta keys:', keys);
        console.log('[IELTS App] Number of categories:', keys.length);

        keys.forEach((key, index) => {
            const meta = topicMeta[key];
            const count = questions[key].length;
            const progress = this.getCategoryProgress(key);
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.innerHTML = `<span>${meta.icon}</span> ${meta.name}<span class="category-count">${progress}/${count}</span>`;
            btn.onclick = (e) => this.selectCategory(key, e.target);
            list.appendChild(btn);
            console.log(`[IELTS App] Added button ${index + 1}/${keys.length}: ${meta.name}`);
        });

        console.log('[IELTS App] renderCategories complete. Added', keys.length, 'categories');
    }

    selectCategory(category, targetElement = null) {
        this.state.currentCategory = category;
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        if (targetElement) {
            targetElement.closest('.category-btn').classList.add('active');
        } else if (window.event) {
            window.event.target.closest('.category-btn').classList.add('active');
        }
        this.startPractice(category);
    }

    getCategoryProgress(category) {
        return this.userData.categoryProgress[category]?.answered || 0;
    }

    renderCampaigns() {
        const grid = document.getElementById('campaign-grid');
        const campaigns = {
            beginner: { name: 'Beginner', desc: 'Master the basics', icon: '🌱', topics: [] },
            intermediate: { name: 'Intermediate', desc: 'Build confidence', icon: '🚀', topics: [] },
            advanced: { name: 'Advanced', desc: 'Expert level', icon: '👑', topics: [] }
        };
        Object.keys(topicMeta).forEach(key => {
            campaigns[topicMeta[key].campaign].topics.push(key);
        });
        grid.innerHTML = Object.keys(campaigns).map(key => {
            const c = campaigns[key];
            const answered = c.topics.reduce((sum, t) => sum + this.getCategoryProgress(t), 0);
            const total = c.topics.reduce((sum, t) => sum + questions[t].length, 0);
            return `<div class="glass-panel interactive" onclick="app.selectCampaign('${key}')" style="padding:1.5rem;cursor:pointer;transition:transform 0.2s;">
                <h4>${c.icon} ${c.name}</h4>
                <p style="font-size:0.9rem;color:var(--text-dim);margin:0.5rem 0;">${c.desc}</p>
                <div style="font-size:0.8rem;margin-top:0.5rem;">${answered}/${total} questions</div>
                <div class="progress-bar"><div class="progress-fill" style="width:${(answered / total * 100)}%"></div></div>
            </div>`;
        }).join('');
    }

    selectCampaign(campaign) {
        const topics = Object.keys(topicMeta).filter(k => topicMeta[k].campaign === campaign);
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        this.selectCategory(randomTopic);
    }

    startPractice(category) {
        this.state.questionList = [...questions[category]].sort(() => Math.random() - 0.5);
        this.state.questionIndex = 0;
        this.showView('practice');
        this.renderQuestion();
    }

    renderQuestion() {
        const item = this.state.questionList[this.state.questionIndex];
        const topic = item.topic || this.state.currentCategory;
        const meta = topicMeta[topic] || { name: 'Mixed', campaign: 'beginner' };
        document.getElementById('p-topic').textContent = meta.name;
        document.getElementById('p-campaign').textContent = meta.campaign.toUpperCase();
        document.getElementById('p-campaign').className = `campaign-badge campaign-${meta.campaign}`;
        document.getElementById('p-question').textContent = item.q;
        document.getElementById('p-translation-ru').textContent = item.ru;
        document.getElementById('p-translation-uz').textContent = item.uz;
        document.getElementById('p-hint').textContent = '';
        document.getElementById('p-hint').dataset.hint = item.hint;
        document.getElementById('p-current').textContent = this.state.questionIndex + 1;
        document.getElementById('p-total').textContent = this.state.questionList.length;
        const progress = ((this.state.questionIndex + 1) / this.state.questionList.length) * 100;
        document.getElementById('p-progress').style.width = progress + '%';
        this.renderCheckpoints();
        this.state.showTranslation = { ru: false, uz: false };
        document.getElementById('p-translation-ru').classList.remove('show');
        document.getElementById('p-translation-uz').classList.remove('show');
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('audio-player').classList.remove('show');
    }

    renderCheckpoints() {
        const container = document.getElementById('checkpoint-markers');
        container.innerHTML = '';
        const total = this.state.questionList.length;
        for (let i = 25; i < total; i += 25) {
            const marker = document.createElement('div');
            marker.className = 'checkpoint-marker';
            marker.style.left = `${(i / total) * 100}%`;
            container.appendChild(marker);
        }
    }

    nextQuestion() {
        // Check if user can practice (premium or within free limit)
        if (window.telegramAuth && !window.telegramAuth.canPractice()) {
            window.telegramAuth.showPremiumOffer()
            return
        }

        const currentQ = this.state.questionList[this.state.questionIndex];
        const qId = currentQ.id || `${this.state.currentCategory}_${this.state.questionIndex}`;
        if (!this.userData.answeredQuestions.includes(qId)) {
            this.userData.answeredQuestions.push(qId);
            this.addXP(XP_REWARDS.answer, 'Question answered');
            const cat = currentQ.topic || this.state.currentCategory;
            if (!this.userData.categoryProgress[cat]) {
                this.userData.categoryProgress[cat] = { answered: 0, total: questions[cat].length };
            }
            this.userData.categoryProgress[cat].answered++;
            if ((this.state.questionIndex + 1) % 25 === 0) {
                this.addXP(XP_REWARDS.checkpoint, 'Checkpoint!');
                this.userData.checkpoints.push(Date.now());
            }
            if (this.userData.categoryProgress[cat].answered === questions[cat].length) {
                this.addXP(XP_REWARDS.complete_category, `Mastered ${topicMeta[cat].name}!`);
            }

            // Track usage for free users
            if (window.telegramAuth && !window.telegramAuth.premium?.active) {
                window.telegramAuth.trackUsage()
            }
        }
        this.state.questionIndex++;
        if (this.state.questionIndex >= this.state.questionList.length) this.state.questionIndex = 0;
        this.renderQuestion();
        if (window.shapes) {
            shapes.forEach(s => {
                if (window.gsap) gsap.to(s.mesh.rotation, { x: '+=1', y: '+=1', duration: 1, ease: 'power2.out' });
            });
        }
    }

    toggleHint() {
        const el = document.getElementById('p-hint');
        el.textContent = el.textContent ? '' : el.dataset.hint;
    }

    toggleTranslation(lang, targetElement = null) {
        this.state.showTranslation[lang] = !this.state.showTranslation[lang];
        const el = document.getElementById(`p-translation-${lang}`);
        const btn = targetElement || (window.event ? window.event.target : null);
        if (this.state.showTranslation[lang]) {
            el.classList.add('show');
            if (btn) btn.classList.add('active');
        } else {
            el.classList.remove('show');
            if (btn) btn.classList.remove('active');
        }
    }

    async toggleRecord() {
        if (!this.state.recording) {
            await this.startRecording();
        } else {
            this.stopRecording();
        }
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.state.mediaRecorder = new MediaRecorder(stream);
            this.state.audioChunks = [];
            this.state.mediaRecorder.ondataavailable = e => {
                if (e.data.size > 0) this.state.audioChunks.push(e.data);
            };
            this.state.mediaRecorder.onstop = () => {
                const blob = new Blob(this.state.audioChunks, { type: 'audio/webm' });
                this.state.currentRecording = {
                    blob, url: URL.createObjectURL(blob), timestamp: Date.now(),
                    questionId: this.state.questionList[this.state.questionIndex].id
                };
                this.saveRecording();
                this.showAudioPlayer();
                stream.getTracks().forEach(track => track.stop());
            };
            this.state.mediaRecorder.start();
            this.state.recording = true;
            document.getElementById('btn-record').textContent = '⏹ Stop';
            document.getElementById('btn-record').style.background = '#ff0000';
            if (window.visualizer) visualizer.start();
        } catch (err) {
            alert('Please allow microphone access to record your answer.');
            console.error(err);
        }
    }

    stopRecording() {
        if (this.state.mediaRecorder && this.state.mediaRecorder.state !== 'inactive') {
            this.state.mediaRecorder.stop();
        }
        this.state.recording = false;
        document.getElementById('btn-record').textContent = '🎙️ Record';
        document.getElementById('btn-record').style.background = 'var(--accent)';
        if (window.visualizer) visualizer.stop();
    }

    saveRecording() {
        const rec = this.state.currentRecording;
        this.userData.recordings.push({ timestamp: rec.timestamp, questionId: rec.questionId, duration: 0 });
        if (this.userData.recordings.length > 10) this.userData.recordings.shift();
        this.saveUserData();
    }

    showAudioPlayer() {
        document.getElementById('audio-player').classList.add('show');
    }

    playRecording() {
        if (this.state.currentRecording) {
            const audio = new Audio(this.state.currentRecording.url);
            audio.play();
        }
    }

    downloadRecording() {
        if (this.state.currentRecording) {
            const a = document.createElement('a');
            a.href = this.state.currentRecording.url;
            a.download = `ielts-recording-${Date.now()}.webm`;
            a.click();
        }
    }

    deleteRecording() {
        this.state.currentRecording = null;
        document.getElementById('audio-player').classList.remove('show');
    }

    checkDailyVisit() {
        const today = new Date().toDateString();
        const lastVisit = this.userData.lastVisit;
        if (lastVisit !== today) {
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            if (lastVisit === yesterday) {
                this.userData.currentStreak++;
            } else if (lastVisit && lastVisit !== today) {
                this.userData.currentStreak = 1;
            } else {
                this.userData.currentStreak = 1;
            }
            if (this.userData.currentStreak > this.userData.bestStreak) {
                this.userData.bestStreak = this.userData.currentStreak;
            }
            if (lastVisit && lastVisit === yesterday) {
                this.addXP(XP_REWARDS.daily_bonus, 'Daily bonus!');
            }
            this.userData.lastVisit = today;
            this.userData.visitHistory.push({ date: today, questionsAnswered: 0, xpGained: 0, timestamp: Date.now() });
            this.saveUserData();
        }
    }

    updateDashboard() {
        document.getElementById('dash-level').textContent = this.userData.level;
        document.getElementById('dash-level-progress').style.width = this.getCurrentLevelProgress() + '%';
        document.getElementById('dash-answered').textContent = this.userData.answeredQuestions.length;
        const mastered = Object.keys(this.userData.categoryProgress).filter(k =>
            this.userData.categoryProgress[k].answered === questions[k]?.length
        ).length;
        document.getElementById('dash-categories').textContent = `${mastered}/27`;
        document.getElementById('stats-total').textContent = this.userData.answeredQuestions.length;
        document.getElementById('stats-streak').textContent = this.userData.bestStreak;
        this.renderHistory();
        this.renderCategoryProgress();
    }

    updateHeader() {
        document.getElementById('current-level').textContent = this.userData.level;
        document.getElementById('current-xp').textContent = this.userData.xp;
        document.getElementById('streak-count').textContent = this.userData.currentStreak;
    }

    renderHistory() {
        const list = document.getElementById('history-list');
        const history = [...this.userData.visitHistory].reverse().slice(0, 10);
        list.innerHTML = history.length ? history.map(v => `
            <div class="glass-panel" style="padding:1rem;margin-bottom:0.5rem;">
                <div style="font-weight:bold;">${v.date}</div>
                <div style="font-size:0.8rem;color:var(--text-dim);margin-top:0.3rem;">
                    ${v.questionsAnswered || 0} questions • ${v.xpGained || 0} XP
                </div>
            </div>
        `).join('') : '<p style="color:var(--text-dim);">No history yet. Start practicing!</p>';
    }

    renderCategoryProgress() {
        const container = document.getElementById('category-progress');
        container.innerHTML = Object.keys(topicMeta).map(key => {
            const meta = topicMeta[key];
            const answered = this.getCategoryProgress(key);
            const total = questions[key].length;
            const percent = (answered / total * 100).toFixed(0);
            return `<div class="glass-panel" style="padding:1rem;margin-bottom:0.5rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <span>${meta.icon} ${meta.name}</span>
                    <span style="font-size:0.8rem;">${answered}/${total}</span>
                </div>
                <div class="progress-bar" style="margin-top:0.5rem;">
                    <div class="progress-fill" style="width:${percent}%"></div>
                </div>
            </div>`;
        }).join('');
    }

    showView(view) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${view}`).classList.add('active');
        this.state.view = view;
        const titles = { dashboard: 'Dashboard', practice: 'Practice', stats: 'Statistics' };
        document.getElementById('header-title').textContent = titles[view] || 'IELTS Academy';
        if (window.gsap && view !== 'practice') {
            gsap.from(`#view-${view} > *`, { y: 20, opacity: 0, duration: 0.4, stagger: 0.1 });
        }
    }

    initTheme() {
        const theme = this.userData.theme || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        document.getElementById('theme-btn').textContent = theme === 'dark' ? '🌙' : '☀️';
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        document.getElementById('theme-btn').textContent = newTheme === 'dark' ? '🌙' : '☀️';
        this.userData.theme = newTheme;
        this.saveUserData();
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset ALL progress? This cannot be undone!')) {
            localStorage.removeItem('ielts_user_data');
            location.reload();
        }
    }

    init3DScene() {
        console.log('[IELTS App] Initializing 3D scene...');
        try {
            if (typeof THREE === 'undefined') {
                console.warn('[IELTS App] Three.js not loaded, skipping 3D scene');
                return;
            }

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('canvas-container').appendChild(renderer.domElement);

            const geometry = new THREE.IcosahedronGeometry(1, 0);
            const material = new THREE.MeshStandardMaterial({ wireframe: true, color: 0xffffff, emissive: 0x00f3ff, emissiveIntensity: 0.2 });
            window.shapes = [];

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            const pointLight = new THREE.PointLight(0x00f3ff, 1, 100);
            pointLight.position.set(0, 0, 10);
            scene.add(pointLight);

            for (let i = 0; i < 20; i++) {
                const mesh = new THREE.Mesh(geometry, material.clone());
                mesh.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10 - 5);
                mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
                scene.add(mesh);
                window.shapes.push({ mesh, rotSpeed: { x: Math.random() * 0.02, y: Math.random() * 0.02 } });
            }

            camera.position.z = 5;

            window.visualizer = {
                active: false,
                start() { this.active = true; },
                stop() { this.active = false; if (window.shapes) window.shapes.forEach(s => s.mesh.scale.set(1, 1, 1)); }
            };

            const animate = () => {
                requestAnimationFrame(animate);
                const time = Date.now() * 0.0005;
                if (window.shapes) {
                    window.shapes.forEach((item, i) => {
                        item.mesh.rotation.x += item.rotSpeed.x;
                        item.mesh.rotation.y += item.rotSpeed.y;
                        if (window.visualizer && visualizer.active) {
                            const freq = Math.sin(time * 10 + i) * 0.5 + 0.5;
                            const scale = 1 + freq * 0.5;
                            item.mesh.scale.set(scale, scale, scale);
                            item.mesh.material.wireframe = false;
                            item.mesh.material.emissive.setHSL(time * 0.1 + i * 0.05, 1, 0.5);
                            item.mesh.material.emissiveIntensity = 1;
                        } else {
                            item.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
                            item.mesh.material.wireframe = true;
                            item.mesh.material.emissive.setRGB(0, 0.95, 1);
                            item.mesh.material.emissiveIntensity = 0.2;
                        }
                    });
                }
                camera.position.x = Math.sin(time) * 0.5;
                camera.position.y = Math.cos(time) * 0.5;
                camera.lookAt(0, 0, 0);
                renderer.render(scene, camera);
            };
            animate();

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });

            console.log('[IELTS App] 3D scene created successfully');
        } catch (error) {
            console.error('[IELTS App] Error initializing 3D scene:', error);
            console.log('[IELTS App] Continuing without 3D background');
        }
    }

    revealUI() {
        console.log('[IELTS App] Revealing UI...');
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader && loader.isConnected) {
                if (window.gsap) {
                    gsap.to(loader, {
                        opacity: 0, duration: 0.5, onComplete: () => {
                            loader.remove();
                            console.log('[IELTS App] Loader removed with GSAP');
                        }
                    });
                    gsap.to('.main-container', { opacity: 1, duration: 1 });
                    gsap.from('.glass-panel', { y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)' });
                } else {
                    console.log('[IELTS App] GSAP not available, using CSS transitions');
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.remove();
                        console.log('[IELTS App] Loader removed');
                    }, 500);
                    document.querySelector('.main-container').style.opacity = 1;
                }
            } else {
                console.warn('[IELTS App] Loader element not found');
                const container = document.querySelector('.main-container');
                if (container) container.style.opacity = 1;
            }
        }, 500);
    }
}

// Initialize app - wait for DOM and all scripts to be ready
console.log('[IELTS App] Script loaded, document state:', document.readyState);

function initializeApp() {
    console.log('[IELTS App] Initializing app...');
    try {
        window.app = new IELTSApp();
        console.log('[IELTS App] App initialized successfully');
    } catch (error) {
        console.error('[IELTS App] Fatal error during initialization:', error);
        // Still try to hide loader
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
        const container = document.querySelector('.main-container');
        if (container) container.style.opacity = 1;
        alert('An error occurred during app initialization. Please refresh the page.');
    }
}

// App will initialize via DOMContentLoaded or via inline script in index.html
// This avoids race condition with data.js loading
