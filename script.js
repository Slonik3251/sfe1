// Основные функции для навигации и общих элементов
document.addEventListener('DOMContentLoaded', () => {
    // Активация текущей страницы в навигации
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Создаем кнопку меню для мобильных устройств
    const menuToggle = document.createElement('button');
    menuToggle.innerHTML = '☰';
    menuToggle.className = 'menu-toggle';
    document.querySelector('.main-nav').prepend(menuToggle);
    
    // Создаем переключатель темы
    const themeSwitcher = document.createElement('button');
    themeSwitcher.className = 'theme-switcher';
    themeSwitcher.textContent = 'Тёмная тема';
    document.querySelector('.main-nav').appendChild(themeSwitcher);

    // Обработчик открытия/закрытия меню
    menuToggle.addEventListener('click', () => {
        const nav = document.querySelector('.main-nav');
        nav.classList.toggle('open');
        
        // Закрываем меню при клике вне его области
        if (nav.classList.contains('open')) {
            document.addEventListener('click', closeMenuOnClickOutside);
        } else {
            document.removeEventListener('click', closeMenuOnClickOutside);
        }
    });

    // Обработчик переключения темы
    themeSwitcher.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDarkTheme = document.body.classList.contains('dark-theme');
        themeSwitcher.textContent = isDarkTheme ? 'Светлая тема' : 'Тёмная тема';
        
        // Сохраняем тему в localStorage
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    });

    // Проверяем сохраненную тему при загрузке
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeSwitcher.textContent = 'Светлая тема';
    }

    // Функция закрытия меню при клике вне его области
    function closeMenuOnClickOutside(e) {
        const nav = document.querySelector('.main-nav');
        if (!nav.contains(e.target) && !e.target.classList.contains('menu-toggle')) {
            nav.classList.remove('open');
            document.removeEventListener('click', closeMenuOnClickOutside);
        }
    }
});

// Общие функции валидации
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/;
    return re.test(phone);
}