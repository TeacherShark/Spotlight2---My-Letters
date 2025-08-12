document.addEventListener('DOMContentLoaded', function() {
    // Получаем прогресс из localStorage (или 0, если его нет)
    let progress = localStorage.getItem('gamesProgress') || 0;
    updateProgress(progress);

    // Обновляем шкалу прогресса
    function updateProgress(value) {
        const progressFill = document.getElementById('progress-fill');
        const progressValue = document.getElementById('progress-value');
        
        progressFill.style.width = `${value}%`;
        progressValue.textContent = `${value}%`;
        localStorage.setItem('gamesProgress', value);
    }

    // Для теста: раскомментируйте, чтобы сбросить прогресс
    // localStorage.setItem('gamesProgress', 0);
});