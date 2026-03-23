// Initialize Icons
        lucide.createIcons();

        // --- Three.js 3D Background Setup ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('canvas-container').appendChild(renderer.domElement);

        // Create Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i=0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const material = new THREE.PointsMaterial({
            size: 0.005,
            color: '#22c55e',
            transparent: true,
            opacity: 0.8
        });

        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);
        camera.position.z = 3;

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;
            renderer.render(scene, camera);
        }
        animate();

        // Responsive 3D
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // --- GSAP Extraordinary Animations ---
        gsap.registerPlugin(ScrollTrigger);

        // Hero Parallax & Zoom
        gsap.to(".hero-content", {
            scrollTrigger: {
                trigger: ".hero-content",
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            scale: 0.8,
            opacity: 0,
            y: 100
        });

        // Reveal animations for sections
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach((el) => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power4.out"
            });
        });

        // Project Zoom on Scroll
        gsap.utils.toArray('.project-card img').forEach(img => {
            gsap.fromTo(img, 
                { scale: 1.3 }, 
                {
                    scale: 1,
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        });

        // Smooth Scroll (simple implementation)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Mouse Move Interaction for 3D
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            gsap.to(particlesMesh.rotation, {
                x: mouseY * 0.5,
                y: mouseX * 0.5,
                duration: 2
            });
        });
        // 1. Mobile Menu Logic
const menuBtn = document.getElementById('mobile-menu-btn');
const closeBtn = document.getElementById('close-menu');
const overlay = document.getElementById('mobile-overlay');
const navItems = document.querySelectorAll('.mobile-nav-item');

menuBtn.addEventListener('click', () => {
    overlay.classList.remove('translate-x-full');
    overlay.classList.add('active');
    // Staggered animation for links
    navItems.forEach((item, index) => {
        item.style.transitionDelay = `${0.1 * index}s`;
    });
});

const closeMenu = () => {
    overlay.classList.add('translate-x-full');
    overlay.classList.remove('active');
};

closeBtn.addEventListener('click', closeMenu);
navItems.forEach(item => item.addEventListener('click', closeMenu));

// 2. Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
const card = document.getElementById('hero-card');
const container = document.querySelector('section');

container.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 1024) return; // Only on desktop
    
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Reset on mouse leave
container.addEventListener('mouseleave', () => {
    card.style.transition = 'all 0.5s ease';
    card.style.transform = `rotateY(-10deg) rotateX(5deg)`;
});

container.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
});
gsap.registerPlugin(ScrollTrigger);

// --- 1. PRELOADER & ON-LOAD ANIMATIONS ---
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    // Animate Header (Drop down from top)
    tl.from("#main-header nav", {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
    });

    // Animate Hero Text (Staggered reveal)
    tl.from(".hero-text-area > *", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out"
    }, "-=0.8");

    // Animate 3D Hero Card (Zoom in + Rotate)
    tl.from("#hero-card", {
        scale: 0.8,
        opacity: 0,
        rotationY: 45,
        duration: 1.5,
        ease: "elastic.out(1, 0.7)"
    }, "-=1");
});

// --- 2. SCROLL REVEAL ANIMATIONS (Every Section) ---

// Title Reveal (Zoom out and Fade in)
const sectionHeads = document.querySelectorAll('h2');
sectionHeads.forEach(head => {
    gsap.from(head, {
        scrollTrigger: {
            trigger: head,
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Services Cards (Staggered Slide from Bottom)
gsap.from(".card-gradient", {
    scrollTrigger: {
        trigger: "#services",
        start: "top 70%",
    },
    y: 100,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: "back.out(1.7)"
});

// Project Image Zoom Effect on Scroll
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    const img = card.querySelector('img');
    const content = card.querySelector('div:not(.group)');

    // Image slides in from left or right based on index
    gsap.from(img, {
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            scrub: 1
        },
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
        scale: 1.2
    });

    // Content fades in
    gsap.from(content, {
        scrollTrigger: {
            trigger: card,
            start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
});

// --- 3. MAGNETIC BUTTON EFFECT ---
const buttons = document.querySelectorAll('.group.relative'); // Your CTA buttons
buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

// --- 4. SMOOTH PARALLAX ON BACKGROUND PARTICLES ---
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    // This moves the 3D particles slightly slower than the scroll
    if(typeof particlesMesh !== 'undefined') {
        particlesMesh.position.y = scrolled * 0.0005;
    }
});
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    // Reset all hero text to Opacity 0 just before starting to avoid "flashing"
    gsap.set(".hero-text-area > *", { opacity: 0, y: 50 });

    // 1. Reveal Header
    tl.to("#main-header nav", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.out"
    });

    // 2. Reveal Hero Text (This is the fix!)
    tl.to(".hero-text-area > *", {
        opacity: 1,      // Forces full visibility
        y: 0,            // Moves it to its correct position
        stagger: 0.15,   // One by one
        duration: 1.2,
        ease: "power4.out"
    }, "-=0.5");

    // 3. Reveal 3D Card
    tl.fromTo("#hero-card", 
        { scale: 0.5, opacity: 0, rotationY: -30 },
        { scale: 1, opacity: 1, rotationY: -10, duration: 1.5, ease: "elastic.out(1, 0.75)" },
        "-=1"
    );
});
gsap.registerPlugin(ScrollTrigger);

// 1. Watermark Parallax Effect
gsap.to("#about-watermark", {
    scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: 2
    },
    x: -500
});

// 2. Image Zoom on Scroll
gsap.to("#about-portrait", {
    scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    scale: 1, // Zooms out as you scroll down
    ease: "none"
});

// 3. Reveal Floating Cards (Zoom In)
gsap.to(".reveal-zoom", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 60%",
    },
    scale: 1,
    opacity: 1,
    duration: 1.2,
    stagger: 0.3,
    ease: "elastic.out(1, 0.5)"
});

// 4. Experience Number Counter
gsap.from("#exp-count", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 60%",
    },
    innerHTML: 0,
    duration: 2,
    snap: { innerHTML: 1 },
    ease: "power3.out"
});

// 5. Reveal text lines (Slide up)
const aboutTexts = document.querySelectorAll('#about .reveal');
aboutTexts.forEach((text) => {
    gsap.to(text, {
        scrollTrigger: {
            trigger: text,
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out"
    });
});
// 1. Mouse Spotlight Effect
const cards = document.querySelectorAll('.service-card');
cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// 2. GSAP Scroll Animation
gsap.to(".reveal-zoom", {
    scrollTrigger: {
        trigger: "#services-grid",
        start: "top 80%", // Starts when grid is 80% visible
    },
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.2, // Cards pop one by one
    ease: "expo.out"
});

// 3. Header Reveal
const serviceReveals = document.querySelectorAll('#services .reveal');
serviceReveals.forEach((el, i) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        delay: i * 0.1,
        ease: "power3.out"
    });
});
gsap.registerPlugin(ScrollTrigger);

// Target your existing cards
const serviceCards = document.querySelectorAll('#services .card-gradient');

serviceCards.forEach((card, index) => {
    // We use fromTo to control the "Zoom" precisely
    gsap.fromTo(card, 
        { 
            scale: 0.3,          // Start very small (Zoomed out)
            opacity: 0,          // Invisible
            rotationX: -45,      // Tilted away like a floor
            z: -1000,            // Pushed far back into the screen
            y: 100               // Slightly lower
        }, 
        {
            scrollTrigger: {
                trigger: card,
                start: "top bottom",    // Animation starts when card hits bottom of screen
                end: "center center",   // Animation finishes when card reaches the middle
                scrub: 1.5,             // THE MAGIC: Tie the zoom to the scroll speed
                toggleActions: "play none none reverse"
            },
            scale: 1,            // Zoom in to full size
            opacity: 1,          // Fade in to full visibility
            rotationX: 0,        // Straighten up
            z: 0,                // Pull forward to the front
            y: 0,                // Move to original position
            duration: 1.5,
            ease: "power2.out"
        }
    );
});

// EXTRA: Make the text inside zoom separately for "Extraordinary" depth
serviceCards.forEach(card => {
    const title = card.querySelector('h3');
    gsap.from(title, {
        scrollTrigger: {
            trigger: card,
            start: "top bottom",
            scrub: 2
        },
        z: 50, // Title pops out 50px towards the user
        opacity: 0,
        ease: "none"
    });
});
gsap.registerPlugin(ScrollTrigger);

// 1. Extraordinary Image Zoom-Out Parallax
const projectImages = document.querySelectorAll('.project-visual');
projectImages.forEach(img => {
    gsap.to(img, {
        scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        scale: 1, // Zooms out from 1.5 to 1.0 as you scroll
        ease: "none"
    });
});

// 2. Text Content "Slide-Up" Parallax
const projectRows = document.querySelectorAll('.project-row');
projectRows.forEach(row => {
    const text = row.querySelector('.lg:col-span-5');
    gsap.from(text, {
        scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
        },
        y: 100, // Text moves slower than the image for a 3D feel
        opacity: 0.5
    });
});

// 3. Reveal Header
const projectHeadings = document.querySelectorAll('#projects .reveal');
projectHeadings.forEach((el, i) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: i * 0.1,
        ease: "power4.out"
    });
});
// 1. Initialize Swiper.js
const swiper = new Swiper('.testimonialSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 800,
    effect: 'creative',
    creativeEffect: {
        prev: {
            shadow: true,
            translate: ['-20%', 0, -1],
        },
        next: {
            translate: ['100%', 0, 0],
        },
    },
    navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
    },
});

// 2. GSAP Extraordinary Reveals
gsap.registerPlugin(ScrollTrigger);

// Slide in the Slider from Left
gsap.to(".reveal-slide-right", {
    scrollTrigger: {
        trigger: "#testimonial",
        start: "top 70%",
    },
    opacity: 1,
    x: 0,
    duration: 1.5,
    ease: "expo.out"
});

// Slide in the Metrics from Right
gsap.to(".reveal-slide-left", {
    scrollTrigger: {
        trigger: "#testimonial",
        start: "top 70%",
    },
    opacity: 1,
    x: 0,
    duration: 1.5,
    delay: 0.2,
    ease: "expo.out"
});

// Text reveals (Reuse your existing reveal logic)
const testimonialReveals = document.querySelectorAll('#testimonial .reveal');
testimonialReveals.forEach((el, i) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        delay: i * 0.1,
        ease: "power3.out"
    });
});