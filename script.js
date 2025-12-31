gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
const rippleContainer = document.getElementById('ripple-container');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1
    });
    gsap.to(cursorFollower, {
        x: e.clientX - 25,
        y: e.clientY - 25,
        duration: 0.4
    });
});

document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    rippleContainer.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});


class TextScramble {
    constructor(element) {
        this.element = element;
        this.chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.element.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0; i < this.queue.length; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.element.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}


window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const mainContent = document.querySelector('.hero-section');
    const scrambleElement = document.getElementById('scrambleText');

    // Hide main content initially
    gsap.set(mainContent, { scale: 0.5, opacity: 0 });

    setTimeout(() => {
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => {
                loadingScreen.style.display = "none";

                // Zoom reveal
                gsap.to(mainContent, {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out"
                });

                // Scramble hero title
                const fx = new TextScramble(scrambleElement);
                const originalText = scrambleElement.innerText;
                scrambleElement.innerText = '';
                setTimeout(() => {
                    fx.setText(originalText);
                }, 100);

                initPageAnimations();
            }
        });
    }, 2000);
});

/* ============================================================
   PAGE ANIMATIONS - APPLE STYLE
============================================================ */
function initPageAnimations() {
    // Hero animations
    gsap.from('.hero-label', { opacity: 0, y: 30, duration: 0.8, delay: 0.2 });
    gsap.from('.hero-subtitle', { opacity: 0, y: 30, delay: 0.5, duration: 0.8 });
    gsap.from('.hero-cta', { opacity: 0, y: 30, delay: 0.8, duration: 0.8 });
    gsap.from('.hero-image-container', {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 0.3,
        ease: "back.out"
    });

    // About Section - Apple Style
    gsap.to('.about-hero-text', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-hero-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    gsap.utils.toArray('.about-feature-row').forEach((row, index) => {
        gsap.to(row, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: row,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    });

    gsap.utils.toArray('.stat-column').forEach((stat, index) => {
        gsap.to(stat, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.stats-flow-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Skills Section - Apple Style
    gsap.to('.skills-hero-text', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.skills-hero-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    gsap.utils.toArray('.skills-feature-block').forEach((block, index) => {
        gsap.to(block, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: block,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Projects Section - Apple Style
    gsap.to('.projects-hero-text', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.projects-hero-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    gsap.utils.toArray('.project-showcase').forEach((project, index) => {
        gsap.to(project, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: project,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    });
    // Animate More Projects Section
gsap.from(".more-projects-text", {
    scrollTrigger: {
        trigger: ".more-projects-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power2.out"
});

gsap.from(".bouncing-dots .dot", {
    scrollTrigger: {
        trigger: ".more-projects-section",
        start: "top 80%",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    scale: 0,
    duration: 0.5,
    stagger: 0.15,
    ease: "back.out(1.7)"
});


    // Contact Section
    gsap.from('.contact-wrapper', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });
}

/* ============================================================
   SMOOTH SCROLL
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            gsap.to(window, {
                scrollTo: target.offsetTop - (navHeight + 20),
                duration: 1.2,
                ease: "power3.inOut"
            });
        }
    });
});

/* ============================================================
   EMAILJS - CONTACT FORM
============================================================ */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const formStatus = document.getElementById("formStatus");
        formStatus.style.display = "block";
        formStatus.textContent = "Sending...";
        formStatus.className = "form-status";

        const params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value,
        };

        emailjs
            .send("my_portfolio", "template_ygjols8", params)
            .then(() => {
                formStatus.className = "form-status success";
                formStatus.textContent = "✓ Message Sent Successfully!";
                contactForm.reset();
            })
            .catch(() => {
                formStatus.className = "form-status error";
                formStatus.textContent = "❌ Failed to send message. Please try again.";
            });
    });
}
