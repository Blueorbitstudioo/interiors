// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function toggleMenu() {
    navLinks.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    
    if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', toggleMenu);
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Sticky Header with shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Portfolio Filtering & See All Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
const seeAllBtn = document.getElementById('seeAllBtn');
let isExpanded = false;
const INITIAL_COUNT = 6;

function updatePortfolioDisplay(filterValue) {
    let visibleCount = 0;
    
    portfolioItems.forEach((item) => {
        const matchesFilter = filterValue === 'all' || item.classList.contains(filterValue);
        
        let shouldShow = matchesFilter;
        if (filterValue === 'all' && !isExpanded) {
            shouldShow = matchesFilter && visibleCount < INITIAL_COUNT;
        }
        
        if (shouldShow) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
            if (matchesFilter) {
                visibleCount++;
            }
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
    
    if (seeAllBtn) {
        if (filterValue === 'all' && !isExpanded && portfolioItems.length > INITIAL_COUNT) {
            seeAllBtn.style.display = 'inline-block';
        } else {
            seeAllBtn.style.display = 'none';
        }
    }
}

// Initial setup
updatePortfolioDisplay('all');

// Navigation handled by anchor tag now
if (seeAllBtn) {
    // Left intentionally blank as seeAllBtn is an anchor tag
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        if (filterValue !== 'all') {
            isExpanded = true; 
        } else {
            isExpanded = false;
        }
        
        updatePortfolioDisplay(filterValue);
    });
});

// Reveal Animations on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply styles for animation to sections
document.querySelectorAll('section:not(#home)').forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.8s ease-out";
    observer.observe(section);
});

// Scroll to Top Button Logic
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
