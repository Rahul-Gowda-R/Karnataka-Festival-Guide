document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for the 'Start Exploring' button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = ctaButton.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Chatbot widget interactivity
    const chatbotButton = document.getElementById('chatbot-button');
    const chatWindow = document.getElementById('chat-window');
    const closeChatbotButton = document.getElementById('close-chatbot');

    if (chatbotButton && chatWindow && closeChatbotButton) {
        chatbotButton.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });

        closeChatbotButton.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        // Optional: Close chat window if user clicks outside of it
        document.addEventListener('click', (event) => {
            if (!chatWindow.contains(event.target) && !chatbotButton.contains(event.target)) {
                 chatWindow.classList.remove('active');
            }
        });
    }

    // Add scroll animations to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    galleryItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });

});
