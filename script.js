document.addEventListener('DOMContentLoaded', function() {
    const clickButton = document.getElementById('clickButton');
    const clickCount = document.getElementById('clickCount');
    const mainContent = document.getElementById('mainContent');
    const celebration = document.getElementById('celebration');
    const heart = document.getElementById('heart');
    
    let count = 0;
    const targetCount = 46;
    
    // Функция для анимации сердечка
    function animateHeart(element) {
        // Останавливаем текущую анимацию
        element.style.animation = 'none';
        element.offsetHeight; // Триггер reflow
        
        // Применяем новую анимацию
        element.style.animation = 'heartBeat 0.5s ease';
        
        // Возвращаем обычную анимацию после завершения
        setTimeout(() => {
            element.style.animation = 'pulse 1.5s infinite';
        }, 500);
    }
    
    // Обработчик клика по кнопке
    clickButton.addEventListener('click', function(e) {
        e.preventDefault();
        handleClick(this);
    });
    
    // Обработчик touch для кнопки (мобильные устройства)
    clickButton.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(0.95)';
    });
    
    clickButton.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(1)';
        handleClick(this);
    });
    
    // Обработчик клика по сердечку
    heart.addEventListener('click', function(e) {
        e.preventDefault();
        handleHeartClick(this);
    });
    
    // Обработчик touch для сердечка (мобильные устройства)
    heart.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(0.6)';
        this.style.animation = 'heartBeat 0.5s ease';
    });
    
    heart.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(1)';
        handleHeartClick(this);
    });
    
    // Функция обработки клика по кнопке
    function handleClick(element) {
        count++;
        clickCount.textContent = count;
        
        // Создаем эффект частиц при клике
        createParticles(element);
        
        // Проверяем, достигли ли мы цели
        if (count >= targetCount) {
            setTimeout(() => {
                showCelebration();
            }, 500);
        }
    }
    
    // Функция обработки клика по сердечку
    function handleHeartClick(element) {
        count++;
        clickCount.textContent = count;
        
        // Анимация сердечка
        animateHeart(element);
        
        // Создаем эффект частиц
        createParticles(element);
        
        // Проверяем, достигли ли мы цели
        if (count >= targetCount) {
            setTimeout(() => {
                showCelebration();
            }, 500);
        }
    }
    
    // Функция создания частиц
    function createParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.innerHTML = '✨';
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.fontSize = '1.5rem';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            particle.style.transition = 'all 0.8s ease-out';
            
            document.body.appendChild(particle);
            
            // Анимация частицы
            setTimeout(() => {
                const angle = (Math.PI * 2 * i) / 5;
                const distance = 100 + Math.random() * 50;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.opacity = '0';
                particle.style.transform = 'scale(0.5)';
            }, 10);
            
            // Удаляем частицу
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 800);
        }
    }
    
    // Функция показа праздничной анимации
    function showCelebration() {
        mainContent.style.display = 'none';
        celebration.style.display = 'flex';
        
        // Добавляем звуковой эффект (если браузер поддерживает)
        playCelebrationSound();
        
        // Создаем дополнительные эффекты
        createConfetti();
    }
    
    // Функция создания конфетти
    function createConfetti() {
        const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#e91e63'];
        const symbols = ['🎉', '🎊', '💖', '💕', '🌸', '🌺', '✨'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-50px';
                confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '999';
                confetti.style.transition = 'all 3s ease-out';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.style.top = window.innerHeight + 'px';
                    confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
                    confetti.style.opacity = '0';
                }, 100);
                
                setTimeout(() => {
                    if (document.body.contains(confetti)) {
                        document.body.removeChild(confetti);
                    }
                }, 3100);
            }, i * 100);
        }
    }
    
    // Функция воспроизведения звука (опционально)
    function playCelebrationSound() {
        // Создаем простой звуковой эффект с помощью Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            // Если звук не поддерживается, просто игнорируем
            console.log('Звук не поддерживается в этом браузере');
        }
    }
    
    // Добавляем интерактивность для всей страницы
    document.addEventListener('click', function(e) {
        // Если клик не по кнопке или сердечку, тоже считаем
        if (!clickButton.contains(e.target) && !heart.contains(e.target)) {
            handlePageClick(e);
        }
    });
    
    // Добавляем поддержку touch для всей страницы
    document.addEventListener('touchend', function(e) {
        // Если touch не по кнопке или сердечку, тоже считаем
        if (!clickButton.contains(e.target) && !heart.contains(e.target)) {
            handlePageClick(e);
        }
    });
    
    // Функция обработки клика по странице
    function handlePageClick(e) {
        count++;
        clickCount.textContent = count;
        
        // Создаем эффект частиц в месте клика
        const particle = document.createElement('div');
        particle.innerHTML = '💖';
        particle.style.position = 'fixed';
        particle.style.left = (e.clientX || e.changedTouches[0].clientX) - 10 + 'px';
        particle.style.top = (e.clientY || e.changedTouches[0].clientY) - 10 + 'px';
        particle.style.fontSize = '1.5rem';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.transition = 'all 0.6s ease-out';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.style.transform = 'scale(2) translateY(-50px)';
            particle.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        }, 600);
        
        // Проверяем, достигли ли мы цели
        if (count >= targetCount) {
            setTimeout(() => {
                showCelebration();
            }, 500);
        }
    }
    
    // Добавляем эффект при наведении на кнопку (только для десктопа)
    if (!('ontouchstart' in window)) {
        clickButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        clickButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Предотвращаем зум при двойном тапе на мобильных
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Отключаем контекстное меню на мобильных
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
}); 