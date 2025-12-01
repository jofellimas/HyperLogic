document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENU MOBILE ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        const icon = hamburger.querySelector('i');
        if(navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    // --- 2. SCROLL REVEAL ANIMATION ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach((el) => revealOnScroll.observe(el));


    // --- 3. CONTADORES INTELIGENTES ---
    const statsSection = document.querySelector('.stats-grid');
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const startCounters = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !hasCounted) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 20);
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if(current < target) {
                        counter.innerText = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.innerText = "+" + target;
                    }
                };
                updateCounter();
            });
            hasCounted = true;
        }
    }, { threshold: 0.5 });

    if(statsSection) {
        startCounters.observe(statsSection);
    }
});