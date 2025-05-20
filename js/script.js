const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const heroSection = document.querySelector('.hero');
const domainCards = document.querySelectorAll('.domain-card');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

let isMouseActive = false;

const showCursor = () => {
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '0.3';
    isMouseActive = true;
};

const hideCursor = () => {
    cursorDot.style.opacity = '0';
    cursorOutline.style.opacity = '0';
    isMouseActive = false;
};

window.addEventListener('mousemove', (e) => {
    if (!isMouseActive) showCursor();
    
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: 'forwards' });
});

document.addEventListener('mouseleave', hideCursor);

document.addEventListener('mouseenter', showCursor);

if ('ontouchstart' in window) {
    hideCursor();
}

const interactiveElements = ['a', 'button', '.btn', '.domain-card', '.hamburger'];
interactiveElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (!isMouseActive) return;
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.5)';
            cursorOutline.style.opacity = '0.5';
        });
        
        element.addEventListener('mouseleave', () => {
            if (!isMouseActive) return;
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.opacity = '0.3';
        });
    });
});

const words = ['System Administrator', 'Polyglot Developer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
}

if (document.querySelector('.typing-text')) {
    setTimeout(type, 1000);
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
    
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const sectionId = section.getAttribute('id');
            document.querySelector(`.nav-links a[href*=${sectionId}]`).classList.add('active');
        } else {
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
            if (navLink) navLink.classList.remove('active');
        }
    });
});

const animateOnScroll = () => {
    domainCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            card.classList.add('fadeInUp');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    domainCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
    });
    
    animateOnScroll();
});

function initWorkPage() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (!tabButtons.length) return; // Exit if not on work page
    
    const subcategoryButtons = document.querySelectorAll('.subcat-btn');
    const minecraftSubcategories = document.getElementById('minecraft-subcategories');
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');

    function filterProjects() {
        const activeTab = document.querySelector('.tab-btn.active');
        if (!activeTab) return;

        const activeTabValue = activeTab.getAttribute('data-tab');
        let activeSubcategory = '';

        if (activeTabValue === 'minecraft') {
            const activeSubBtn = document.querySelector('.subcat-btn.active');
            if (activeSubBtn) {
                activeSubcategory = activeSubBtn.getAttribute('data-category');
            }
        }

        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardSubcategory = card.getAttribute('data-subcategory') || '';
            
            const showCard = (cardCategory === activeTabValue) && 
                          (activeTabValue !== 'minecraft' || cardSubcategory === activeSubcategory || !activeSubcategory);
            
            if (showCard) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (button.getAttribute('data-tab') === 'minecraft') {
                minecraftSubcategories.classList.add('active');
            } else {
                minecraftSubcategories.classList.remove('active');
            }

            filterProjects();
        });
    });

    subcategoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            subcategoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects();
        });
    });

    document.querySelectorAll('.learn-more').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = button.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            const projectDescription = projectCard.querySelector('p').textContent;
            const projectTechs = Array.from(projectCard.querySelectorAll('.tech')).map(el => el.textContent).join(', ');
            
            document.querySelector('.modal-body').innerHTML = modalContent;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
}

if (document.querySelector('.work-tabs')) {
    initWorkPage();
}

document.querySelectorAll('[data-navigate]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('data-navigate');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // If we're already on the target page, just close the mobile menu if open
        if ((target === 'home' && currentPage === 'index.html') || 
            (target === 'work' && currentPage === 'work.html') ||
            (target === 'about' && currentPage === 'about.html')) {
            
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            return;
        }
        
        // Otherwise, navigate to the page
        if (target === 'home') {
            window.location.href = 'index.html';
        } else if (target === 'work') {
            window.location.href = 'work.html';
        } else if (target === 'about') {
            window.location.href = 'about.html';
        } else if (target === 'contact') {
            window.location.href = 'index.html#contact';
        }
    });
});

document.querySelectorAll('[data-scroll]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-scroll');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Scroll on this page
            if (targetId === 'contact') {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            } else {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        } else {
            // Navigate to index and scroll there
            window.location.href = `index.html#${targetId}`;
        }
    });
});

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
                        const activeLink = document.querySelector(`.nav-links a[data-scroll="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
    
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        const contactLink = document.querySelector('.nav-links a[data-scroll="contact"]');
        if (contactLink) {
            contactLink.classList.add('active');
        }
    }
});
function handleHashNavigation() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;
    
    const targetElement = document.getElementById(hash);
    if (targetElement) {
        setTimeout(() => {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }, 100);
    }
}

// Handle hash navigation on page load
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        
        setTimeout(() => {
            hero.style.transition = 'opacity 1s ease';
            hero.style.opacity = '1';
        }, 500);
    }
    
    // Handle hash navigation after page loads
    handleHashNavigation();
});

// Also handle hash changes
window.addEventListener('hashchange', handleHashNavigation);
