
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');

    icon.classList.toggle('fa-sun');

    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});


document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');

        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
});


const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    mobileMenu.querySelector('i').classList.toggle('fa-bars');
    mobileMenu.querySelector('i').classList.toggle('fa-times');
});


const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


document.querySelectorAll('.slide-in, .slide-in-left, .slide-in-right, .slide-in-delayed')
    .forEach(element => observer.observe(element));


const filterButtons = document.querySelectorAll('.filter-btn');
const petCards = document.querySelectorAll('.pet-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        filterButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        
        petCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 0);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});


function calculateCost() {
    const petType = document.getElementById('pet-type').value;
    const foodCost = parseFloat(document.getElementById('food-cost').value) || 0;

    const medicalCost = parseFloat(document.getElementById('medical-cost').value) || 0;
    const suppliesCost = parseFloat(document.getElementById('supplies-cost').value) || 0;

    
    const baseCosts = {
        dog: 50,
        cat: 30,
        bird: 20
    };

    const baseCost = baseCosts[petType];
    const totalCost = baseCost + foodCost + medicalCost + suppliesCost;

    
    document.getElementById('base-cost').textContent = `$${baseCost.toFixed(2)}`;
    document.getElementById('food-cost-result').textContent = `$${foodCost.toFixed(2)}`;
    document.getElementById('medical-cost-result').textContent = `$${medicalCost.toFixed(2)}`;
    document.getElementById('supplies-cost-result').textContent = `$${suppliesCost.toFixed(2)}`;

    
    const costAmount = document.querySelector('.cost-amount');
    costAmount.style.animation = 'none';
    costAmount.offsetHeight; 
    costAmount.style.animation = 'fadeIn 0.5s ease-in-out';
    costAmount.textContent = `$${totalCost.toFixed(2)}`;
}


const inquiryForm = document.getElementById('inquiry-form');
const loadingOverlay = document.getElementById('loading-overlay');
const successModal = document.getElementById('success-modal');

inquiryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    
    loadingOverlay.style.display = 'flex';

    
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        
        
        loadingOverlay.style.display = 'none';
        successModal.style.display = 'block';
        inquiryForm.reset();

    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your inquiry. Please try again.');
        loadingOverlay.style.display = 'none';
    }
});


const closeModal = document.querySelector('.close-modal');
closeModal.addEventListener('click', () => {
    successModal.style.display = 'none';
});


window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                mobileMenu.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        }
    });
});


document.querySelectorAll('.adopt-button').forEach(button => {
    button.addEventListener('click', function() {
        const petName = this.closest('.pet-card').querySelector('h3').textContent;
        document.getElementById('pet-interest').value = petName;
        document.getElementById('inquiry').scrollIntoView({ behavior: 'smooth' });
    });
});


window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
        mobileMenu.querySelector('i').classList.replace('fa-times', 'fa-bars');
    }
});


function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; 
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            current = target;
        }
        element.textContent = Math.round(current);
    }, 20);
}


const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('h3').forEach(counter => {
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-container');
if (statsSection) {
    statsObserver.observe(statsSection);
}


document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.classList.add('valid');
        } else {
            this.classList.remove('valid');
        }
    });
});


inquiryForm.addEventListener('submit', (e) => {
    let hasErrors = false;
    inquiryForm.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
            hasErrors = true;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    if (hasErrors) {
        e.preventDefault();
        alert('Please fill in all required fields.');
    }
});