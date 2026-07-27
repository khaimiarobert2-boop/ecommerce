// CampusSwap - JavaScript Functionality

// ==================== Form Handling ====================

// Post Item Form Submission
const postForm = document.getElementById('postForm');
if (postForm) {
    postForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const itemName = document.getElementById('itemName').value;
        const itemCategory = document.getElementById('itemCategory').value;
        const itemPrice = document.getElementById('itemPrice').value;
        const itemDescription = document.getElementById('itemDescription').value;

        // Validate form
        if (!itemName || !itemCategory || !itemPrice || !itemDescription) {
            showAlert('Please fill in all fields', 'error');
            return;
        }

        // Create item object
        const item = {
            id: generateId(),
            name: itemName,
            category: itemCategory,
            price: itemPrice,
            description: itemDescription,
            postedDate: new Date().toLocaleDateString(),
            status: 'active'
        };

        // Save to localStorage
        saveItemToStorage(item);

        // Show success message
        showAlert('Item posted successfully! 🎉', 'success');

        // Reset form
        postForm.reset();

        // Optional: Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = '#browse';
        }, 2000);
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const contactName = document.getElementById('contactName').value;
        const contactEmail = document.getElementById('contactEmail').value;
        const contactMessage = document.getElementById('contactMessage').value;

        // Validate form
        if (!contactName || !contactEmail || !contactMessage) {
            showAlert('Please fill in all fields', 'error');
            return;
        }

        // Validate email
        if (!isValidEmail(contactEmail)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }

        // Create message object
        const message = {
            id: generateId(),
            name: contactName,
            email: contactEmail,
            message: contactMessage,
            sentDate: new Date().toLocaleString()
        };

        // Save to localStorage
        saveMessageToStorage(message);

        // Show success message
        showAlert('Message sent successfully! We\'ll get back to you soon. 📧', 'success');

        // Reset form
        contactForm.reset();
    });
}

// ==================== Storage Functions ====================

// Save item to localStorage
function saveItemToStorage(item) {
    let items = JSON.parse(localStorage.getItem('campusswap_items')) || [];
    items.push(item);
    localStorage.setItem('campusswap_items', JSON.stringify(items));
}

// Get all items from localStorage
function getItemsFromStorage() {
    return JSON.parse(localStorage.getItem('campusswap_items')) || [];
}

// Save message to localStorage
function saveMessageToStorage(message) {
    let messages = JSON.parse(localStorage.getItem('campusswap_messages')) || [];
    messages.push(message);
    localStorage.setItem('campusswap_messages', JSON.stringify(messages));
}

// ==================== Utility Functions ====================

// Generate unique ID
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show alert message
function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    // Add styles
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-in-out;
        max-width: 400px;
    `;

    // Set color based on type
    if (type === 'success') {
        alertDiv.style.backgroundColor = '#4CAF50';
        alertDiv.style.color = 'white';
    } else if (type === 'error') {
        alertDiv.style.backgroundColor = '#f44336';
        alertDiv.style.color = 'white';
    } else {
        alertDiv.style.backgroundColor = '#2196F3';
        alertDiv.style.color = 'white';
    }

    document.body.appendChild(alertDiv);

    // Remove after 3 seconds
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 3000);
}

// ==================== Navigation & Scrolling ====================

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Get Started Button ====================

// Add click handler to "Get Started" button
const getStartedBtn = document.querySelector('.hero .btn');
if (getStartedBtn) {
    getStartedBtn.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('#post').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// ==================== Card Interactions ====================

// Add hover effects to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// ==================== Animations ====================

// Add animation keyframes to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .card {
        transition: all 0.3s ease;
    }

    .btn {
        transition: all 0.3s ease;
    }

    .btn:hover {
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

// ==================== Page Load Functions ====================

// Initialize page on load
document.addEventListener('DOMContentLoaded', function () {
    console.log('CampusSwap initialized successfully!');

    // Display stored items count
    const items = getItemsFromStorage();
    console.log(`Total items posted: ${items.length}`);

    // Optional: Display items on page (if you want to show them)
    displayPostedItems();
});

// Display posted items on browse section
function displayPostedItems() {
    const items = getItemsFromStorage();
    const browseSection = document.querySelector('.browse');

    if (items.length > 0) {
        console.log('Recent items:');
        items.forEach(item => {
            console.log(`- ${item.name} (${item.category}) - $${item.price}`);
        });
    }
}

// ==================== Input Validation ====================

// Real-time validation for price input
const priceInput = document.getElementById('itemPrice');
if (priceInput) {
    priceInput.addEventListener('change', function () {
        if (this.value < 0) {
            this.value = 0;
            showAlert('Price cannot be negative', 'error');
        }
    });
}

// ==================== Mobile Menu (if needed) ====================

// Toggle mobile navigation
const nav = document.querySelector('nav');
const header = document.querySelector('header');

window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// ==================== Form Input Trimming ====================

// Trim whitespace from all form inputs
document.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(input => {
    input.addEventListener('blur', function () {
        this.value = this.value.trim();
    });
});
