document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Мобильное меню Бургер
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            // Блокируем скролл основного контента при открытом меню
            document.body.style.overflowY = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Закрытие меню при клике на любой пункт
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflowY = 'auto';
            });
        });
    }

    // 2. Плавная премиальная анимация появления блоков при скролле (Intersection Observer)
    const animItems = document.querySelectorAll('.data-anim');

    if ('IntersectionObserver' in window) {
        const animObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Перестаем отслеживать элемент после того, как он появился
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15, // Блок начинает появляться, когда видно 15% его высоты
            rootMargin: '0px 0px -50px 0px'
        });

        animItems.forEach(item => animObserver.observe(item));
    } else {
        // Фоллбэк для старых браузеров, не поддерживающих Observer
        animItems.forEach(item => item.classList.add('active'));
    }

    // 3. Динамическая подкраска хедера при скролле
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(15, 16, 18, 0.98)';
            header.style.padding = '5px 0';
        } else {
            header.style.backgroundColor = 'rgba(15, 16, 18, 0.85)';
            header.style.padding = '0';
        }
    });
});