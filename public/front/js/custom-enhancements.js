/* ===========================================
   Blog UI Enhancements - JavaScript
   =========================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Reading Progress Bar ---
    const progressContainer = document.getElementById('reading-progress-container');
    const progressBar = document.getElementById('reading-progress-bar');
    
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            
            progressBar.style.width = Math.min(progress, 100) + '%';
        });
    }
    
    // --- Calculate Reading Time ---
    function calculateReadingTime(text) {
        const wordsPerMinute = 200; // Average reading speed
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return minutes;
    }
    
    // Add reading time to article cards
    document.querySelectorAll('.post-preview').forEach(function(card) {
        const subtitle = card.querySelector('.post-subtitle');
        const postMeta = card.querySelector('.post-meta');
        
        if (subtitle && postMeta) {
            // Get full content from the card (approximation based on visible text)
            const content = card.textContent || '';
            const minutes = calculateReadingTime(content);
            
            // Create reading time element
            const readingTime = document.createElement('span');
            readingTime.className = 'reading-time';
            readingTime.innerHTML = '<i class="far fa-clock"></i> ' + minutes + ' dk okuma';
            
            // Insert after category
            const categoryLink = postMeta.querySelector('a');
            if (categoryLink) {
                categoryLink.insertAdjacentElement('afterend', readingTime);
            }
        }
    });
    
    // Reading time for single article page
    const articleContent = document.querySelector('.col-md-9.mx-auto');
    const siteHeading = document.querySelector('.site-heading h2');
    
    if (articleContent && siteHeading && !document.querySelector('.post-preview')) {
        const content = articleContent.textContent || '';
        const minutes = calculateReadingTime(content);
        
        // Create meta container
        const metaDiv = document.createElement('div');
        metaDiv.className = 'article-meta';
        metaDiv.innerHTML = '<span><i class="far fa-clock"></i> ' + minutes + ' dakika okuma</span>';
        
        // Insert after heading
        const headingContainer = siteHeading.parentElement;
        if (headingContainer) {
            headingContainer.appendChild(metaDiv);
        }
    }
});
