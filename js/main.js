// ========================================
// מ.ד שירותי חשמל - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Close on link click
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');

            // Close all others
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .testimonial-card, .area-card, .blog-card, .faq-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Blog preview - load latest posts
    loadBlogPreview();
});

// Load blog preview cards
async function loadBlogPreview() {
    const grid = document.getElementById('blog-preview-grid');
    if (!grid) return;

    try {
        const response = await fetch('blog/posts/index.json');
        if (!response.ok) {
            showDefaultBlogCards(grid);
            return;
        }
        const posts = await response.json();
        const latest = posts.slice(0, 3);

        grid.innerHTML = latest.map(post => `
            <a href="blog/posts/${post.slug}.html" class="blog-card">
                <div class="blog-card-image">
                    <div class="placeholder-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>
                    </div>
                </div>
                <div class="blog-card-body">
                    <div class="blog-card-date">${post.date}</div>
                    <h3 class="blog-card-title">${post.title}</h3>
                    <p class="blog-card-excerpt">${post.excerpt}</p>
                    <span class="blog-card-link">קראו עוד &larr;</span>
                </div>
            </a>
        `).join('');
    } catch {
        showDefaultBlogCards(grid);
    }
}

function showDefaultBlogCards(grid) {
    const defaults = [
        {
            title: 'איך לבחור חשמלאי מוסמך בקרית גת?',
            excerpt: 'טיפים חשובים לבחירת חשמלאי אמין ומקצועי באזור קרית גת והסביבה...',
            date: '2025'
        },
        {
            title: '5 סימנים שלוח החשמל שלכם צריך החלפה',
            excerpt: 'לוח חשמל ישן עלול להוות סכנה. למדו לזהות את הסימנים המחייבים החלפה...',
            date: '2025'
        },
        {
            title: 'בית חכם - המדריך המלא למתחילים',
            excerpt: 'כל מה שצריך לדעת על הפיכת הבית שלכם לבית חכם - מערכות, עלויות ויתרונות...',
            date: '2025'
        }
    ];

    grid.innerHTML = defaults.map(post => `
        <div class="blog-card">
            <div class="blog-card-image">
                <div class="placeholder-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>
                </div>
            </div>
            <div class="blog-card-body">
                <div class="blog-card-date">${post.date}</div>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <span class="blog-card-link">בקרוב...</span>
            </div>
        </div>
    `).join('');
}
