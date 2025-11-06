document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('#navbar a');
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = themeBtn.querySelector('i');
    const backToTopBtn = document.getElementById('back-to-top');
    const agendarForm = document.getElementById('agendar-form');
    const telefoneInput = document.getElementById('telefone');
    const header = document.getElementById('header');

    let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    menuToggle.addEventListener('click', function () {
        navbar.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    navLinks.forEach(function(link) {
        link.addEventListener('click', function () {
            navbar.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    themeBtn.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        isDarkMode = !isDarkMode;

        if (isDarkMode) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }

        updateHeaderBackground();
    });

    function updateHeaderBackground() {
        if (window.pageYOffset > 100) {
            if (isDarkMode) {
                header.style.backgroundColor = 'rgba(30, 30, 30, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }
        } else {
            header.style.backgroundColor = '';
            header.style.backdropFilter = '';
        }
    }

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }

        updateHeaderBackground();
    });

    agendarForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const nivelSelect = document.getElementById('nivel').value;
        const horarioSelect = document.getElementById('horario').value;

        const nivelMap = {
            'iniciante': 'Iniciante',
            'intermediario': 'Intermediário',
            'avancado': 'Avançado',
            'profissional': 'Profissional'
        };

        const horarioMap = {
            'manha': 'Manhã (6h-12h)',
            'tarde': 'Tarde (12h-18h)',
            'noite': 'Noite (18h-22h)'
        };

        const nivelTexto = nivelMap[nivelSelect] || nivelSelect;
        const horarioTexto = horarioMap[horarioSelect] || horarioSelect;

        const mensagem = 'Olá! Gostaria de agendar uma aula experimental no CT Ibura.\n\n' +
                        'Nome: ' + nome + '\n' +
                        'Telefone: ' + telefone + '\n' +
                        'Nível: ' + nivelTexto + '\n' +
                        'Melhor horário: ' + horarioTexto;

        const mensagemCodificada = encodeURIComponent(mensagem);
        const urlWhatsapp = 'https://wa.me/5581999543750?text=' + mensagemCodificada;

        window.open(urlWhatsapp, '_blank');

        agendarForm.reset();
    });

    telefoneInput.addEventListener('input', function (e) {
        let valor = e.target.value.replace(/\D/g, '');

        if (valor.length > 11) {
            valor = valor.substring(0, 11);
        }

        if (valor.length >= 11) {
            valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (valor.length >= 7) {
            valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (valor.length >= 3) {
            valor = valor.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        } else if (valor.length >= 1) {
            valor = valor.replace(/(\d{0,2})/, '($1');
        }

        e.target.value = valor;
    });

    const fadeElements = document.querySelectorAll('.destaque-item, .plano-tabela, .contato-item, .dia');

    fadeElements.forEach(function(element) {
        element.classList.add('fade-in');
    });

    function revealOnScroll() {
        fadeElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);

    const tableRows = document.querySelectorAll('tbody tr');

    tableRows.forEach(function(row) {
        row.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.02)';
        });

        row.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '#inicio') {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});