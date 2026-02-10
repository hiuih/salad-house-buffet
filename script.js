// ===================================
// SALAD HOUSE BUFFET - Scripts
// ===================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Intersection Observer for section animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll(
        '.feature-card, .menu-card, .review-card, .contact-card, .about-content, .about-images, .stat'
    );

    animateElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.6s ease ${i % 4 * 0.1}s, transform 0.6s ease ${i % 4 * 0.1}s`;
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);

    // --- Active nav link highlighting ---
    const sections = document.querySelectorAll('section[id]');

    const highlightNav = () => {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
                    link.classList.remove('active');
                });
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // --- Menu tab switching ---
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuTabContents = document.querySelectorAll('.menu-tab-content');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            menuTabs.forEach(t => t.classList.remove('active'));
            menuTabContents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById('tab-' + target).classList.add('active');
        });
    });

    // --- Dynamic Reviews ---
    // Add new 5-star reviews to this array and they'll automatically
    // appear on the site. Each visit shows 3 random reviews.
    const allReviews = [
        {
            text: "Easily the most friendly service you will receive in a quick food option. Super fresh ingredients and the service will keep you coming back!",
            name: "Yelp Reviewer",
            platform: "yelp"
        },
        {
            text: "Clean salad bar, incredible selection of food, and great variety of vegetables and fruits. Highly recommend!",
            name: "Google Reviewer",
            platform: "google"
        },
        {
            text: "The freshest and healthiest option in City Square. I come here almost every day for lunch. The poke bowls are my favourite!",
            name: "Google Reviewer",
            platform: "google"
        },
        {
            text: "Best salad bar in Vancouver hands down. The variety is unmatched and everything tastes so fresh. Love the smoothies too!",
            name: "Google Reviewer",
            platform: "google"
        },
        {
            text: "Amazing healthy food with so many options. The staff is always friendly and helpful. My go-to lunch spot at City Square.",
            name: "Google Reviewer",
            platform: "google"
        },
        {
            text: "Great value for the quality you get. Fresh fruits, huge salad selection, and the sandwiches are delicious. Definitely coming back!",
            name: "Google Reviewer",
            platform: "google"
        },
        {
            text: "Love this place! The buffet has everything from salads to noodles. Healthy, fresh, and affordable. What more could you ask for?",
            name: "Google Reviewer",
            platform: "google"
        },
        {
            text: "Discovered this gem at City Square and now I'm hooked. The fresh juices are incredible and the salad bar is always stocked.",
            name: "Google Reviewer",
            platform: "google"
        },
        {
            text: "Perfect spot for a quick healthy meal. The poke bowls are loaded with fresh ingredients and the portions are generous!",
            name: "Google Reviewer",
            platform: "google"
        },
        {
            text: "Such a wonderful place for healthy eating. The scrambled eggs breakfast is a hidden gem. Fresh juices are the best in the area!",
            name: "Google Reviewer",
            platform: "google"
        },
        {
            text: "I bring my whole family here every weekend. Kids love the fruit selection and I love that everything is fresh and nutritious.",
            name: "Google Reviewer",
            platform: "google"
        },
        {
            text: "The smoothies here are next level. Build A Blend is my favourite — you can customize everything. Super fresh and tasty!",
            name: "Google Reviewer",
            platform: "google"
        }
    ];

    // Shuffle and pick 3 random reviews
    const shuffled = allReviews.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);

    const reviewsGrid = document.getElementById('reviewsGrid');
    const stars = '<i class="fas fa-star"></i>'.repeat(5);
    const platformIcons = { google: 'fab fa-google', yelp: 'fab fa-yelp' };
    const platformNames = { google: 'Google Review', yelp: 'Yelp Review' };

    selected.forEach(review => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-stars">${stars}</div>
            <p class="review-text">"${review.text}"</p>
            <div class="review-source">
                <span class="review-platform"><i class="${platformIcons[review.platform]}"></i> ${platformNames[review.platform]}</span>
            </div>
        `;
        reviewsGrid.appendChild(card);
    });

    // Re-observe review cards for scroll animation
    document.querySelectorAll('.review-card').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
        observer.observe(el);
    });
});
