// =============================================
// Part 1: JavaScript Event Handling Basics
// =============================================

// Wait for DOM to fully load before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded. Initializing application...');
    
    // Initialize all interactive components
    initThemeToggle();
    initCounterGame();
    initFAQSection();
    initFormValidation();
});

// =============================================
// Part 2: Building Interactive Elements
// =============================================

// -------------------------
// 1. Light/Dark Mode Toggle
// -------------------------
function initThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-theme');
        toggleButton.textContent = '☀️ Light Mode';
    }
    
    // Toggle theme on button click
    toggleButton.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            toggleButton.textContent = '☀️ Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            toggleButton.textContent = '🌙 Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });
}

// -------------------------
// 2. Counter Game
// -------------------------
function initCounterGame() {
    const counterValue = document.getElementById('counter-value');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');
    const messageElement = document.getElementById('counter-message');
    
    let count = 0;
    
    // Update counter display and message
    function updateCounter() {
        counterValue.textContent = count;
        
        // Different messages based on count
        if (count === 0) {
            messageElement.textContent = "Spread the word about this great opportunity!";
        } else if (count < 5) {
            messageElement.textContent = "Keep sharing with your community!";
        } else if (count < 10) {
            messageElement.textContent = "You're making a difference!";
        } else {
            messageElement.textContent = "Wow! You're a programme ambassador!";
        }
    }
    
    // Increment button event
    incrementBtn.addEventListener('click', function() {
        count++;
        updateCounter();
        
        // Add visual feedback
        incrementBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            incrementBtn.style.transform = 'scale(1)';
        }, 100);
    });
    
    // Decrement button event (with minimum limit)
    decrementBtn.addEventListener('click', function() {
        if (count > 0) {
            count--;
            updateCounter();
            
            // Add visual feedback
            decrementBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                decrementBtn.style.transform = 'scale(1)';
            }, 100);
        }
    });
    
    // Initialize counter display
    updateCounter();
}

// -------------------------
// 3. Collapsible FAQ Section
// -------------------------
function initFAQSection() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.toggle-icon');
            
            // Toggle active class on answer
            answer.classList.toggle('active');
            
            // Change icon based on state
            if (answer.classList.contains('active')) {
                icon.textContent = '−'; // Minus symbol
            } else {
                icon.textContent = '+'; // Plus symbol
            }
        });
    });
}

// =============================================
// Part 3: Form Validation with JavaScript
// =============================================
function initFormValidation() {
    const form = document.getElementById('enrollment-form');
    const successMessage = document.getElementById('success-message');
    
    // Reset form and success message on page load
    form.reset();
    successMessage.style.display = 'none';
    
    // Validate form on submit
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Reset previous error states
        clearErrors();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isCountyValid = validateCounty();
        const isPasswordValid = validatePassword();
        const isTermsValid = validateTerms();
        
        // If all valid, show success message
        if (isNameValid && isEmailValid && isPhoneValid && 
            isCountyValid && isPasswordValid && isTermsValid) {
            successMessage.style.display = 'block';
            form.reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Real-time validation for some fields
    document.getElementById('name').addEventListener('blur', validateName);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('phone').addEventListener('blur', validatePhone);
    document.getElementById('county').addEventListener('change', validateCounty);
    document.getElementById('password').addEventListener('blur', validatePassword);
    document.getElementById('confirm-password').addEventListener('blur', validatePassword);
    document.getElementById('terms').addEventListener('change', validateTerms);
    
    // Validation functions
    function validateName() {
        const nameInput = document.getElementById('name');
        const errorElement = document.getElementById('name-error');
        const nameValue = nameInput.value.trim();
        
        if (nameValue === '') {
            showError(nameInput, errorElement, 'Name is required');
            return false;
        }
        
        if (nameValue.length < 2) {
            showError(nameInput, errorElement, 'Name must be at least 2 characters');
            return false;
        }
        
        if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
            showError(nameInput, errorElement, 'Name can only contain letters and spaces');
            return false;
        }
        
        clearError(nameInput, errorElement);
        return true;
    }
    
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const errorElement = document.getElementById('email-error');
        const emailValue = emailInput.value.trim();
        
        if (emailValue === '') {
            showError(emailInput, errorElement, 'Email is required');
            return false;
        }
        
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            showError(emailInput, errorElement, 'Please enter a valid email address');
            return false;
        }
        
        // Check for Kenyan domains (optional enhancement)
        if (!emailValue.toLowerCase().endsWith('.ke') && 
            !emailValue.toLowerCase().includes('.co.ke') &&
            !emailValue.toLowerCase().includes('.ac.ke') &&
            !emailValue.toLowerCase().includes('.or.ke')) {
            // Just a warning, not an error
            errorElement.textContent = 'Note: Kenyan email domains (.ke) are preferred';
            errorElement.style.color = 'orange';
            emailInput.classList.remove('error');
        } else {
            clearError(emailInput, errorElement);
        }
        
        return true;
    }
    
    function validatePhone() {
        const phoneInput = document.getElementById('phone');
        const errorElement = document.getElementById('phone-error');
        const phoneValue = phoneInput.value.trim().replace(/\s/g, ''); // Remove spaces
        
        if (phoneValue === '') {
            showError(phoneInput, errorElement, 'Phone number is required');
            return false;
        }
        
        // Validate Kenyan phone numbers (format: 07XXXXXXXX or +2547XXXXXXXX)
        const phoneRegex = /^(\+?254|0)?[7][0-9]{8}$/;
        if (!phoneRegex.test(phoneValue)) {
            showError(phoneInput, errorElement, 'Please enter a valid Kenyan phone number');
            return false;
        }
        
        clearError(phoneInput, errorElement);
        return true;
    }
    
    function validateCounty() {
        const countySelect = document.getElementById('county');
        const errorElement = document.getElementById('county-error');
        const countyValue = countySelect.value;
        
        if (countyValue === '') {
            showError(countySelect, errorElement, 'Please select your county');
            return false;
        }
        
        clearError(countySelect, errorElement);
        return true;
    }
    
    function validatePassword() {
        const passwordInput = document.getElementById('password');
        const confirmInput = document.getElementById('confirm-password');
        const errorElement = document.getElementById('password-error');
        const confirmErrorElement = document.getElementById('confirm-password-error');
        const passwordValue = passwordInput.value;
        const confirmValue = confirmInput.value;
        
        let isValid = true;
        
        // Validate password
        if (passwordValue === '') {
            showError(passwordInput, errorElement, 'Password is required');
            isValid = false;
        } else if (passwordValue.length < 8) {
            showError(passwordInput, errorElement, 'Password must be at least 8 characters');
            isValid = false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordValue)) {
            showError(passwordInput, errorElement, 'Password must contain uppercase, lowercase, and numbers');
            isValid = false;
        } else {
            clearError(passwordInput, errorElement);
        }
        
        // Validate password confirmation
        if (confirmValue === '') {
            showError(confirmInput, confirmErrorElement, 'Please confirm your password');
            isValid = false;
        } else if (confirmValue !== passwordValue) {
            showError(confirmInput, confirmErrorElement, 'Passwords do not match');
            isValid = false;
        } else {
            clearError(confirmInput, confirmErrorElement);
        }
        
        return isValid;
    }
    
    function validateTerms() {
        const termsCheckbox = document.getElementById('terms');
        const errorElement = document.getElementById('terms-error');
        
        if (!termsCheckbox.checked) {
            showError(termsCheckbox, errorElement, 'You must agree to the terms and conditions');
            return false;
        }
        
        clearError(termsCheckbox, errorElement);
        return true;
    }
    
    // Helper functions for error handling
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error-color)';
    }
    
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        const errorInputs = document.querySelectorAll('.error');
        errorInputs.forEach(input => {
            input.classList.remove('error');
        });
        
        successMessage.style.display = 'none';
    }
}