document.addEventListener('DOMContentLoaded', function() {
    // Полный список слов (26 штук)
    const allWords = [
        { word: "ant", image: "ant.png", audio: "ant.mp3" },
        { word: "bed", image: "bed.png", audio: "bed.mp3" },
        { word: "cat", image: "cat.png", audio: "cat.mp3" },
        { word: "dog", image: "dog.png", audio: "dog.mp3" },
        { word: "egg", image: "egg.png", audio: "egg.mp3" },
        { word: "flag", image: "flag.png", audio: "flag.mp3" },
        { word: "glass", image: "glass.png", audio: "glass.mp3" },
        { word: "horse", image: "horse.png", audio: "horse.mp3" },
        { word: "ink", image: "ink.png", audio: "ink.mp3" },
        { word: "jug", image: "jug.png", audio: "jug.mp3" },
        { word: "kangaroo", image: "kangaroo.png", audio: "kangaroo.mp3" },
        { word: "lamp", image: "lamp.png", audio: "lamp.mp3" },
        { word: "mouse", image: "mouse.png", audio: "mouse.mp3" },
        { word: "nest", image: "nest.png", audio: "nest.mp3" },
        { word: "orange", image: "orange.png", audio: "orange.mp3" },
        { word: "pin", image: "pin.png", audio: "pin.mp3" },
        { word: "queen", image: "queen.png", audio: "queen.mp3" },
        { word: "rabbit", image: "rabbit.png", audio: "rabbit.mp3" },
        { word: "snake", image: "snake.png", audio: "snake.mp3" },
        { word: "tree", image: "tree.png", audio: "tree.mp3" },
        { word: "umbrella", image: "umbrella.png", audio: "umbrella.mp3" },
        { word: "vest", image: "vest.png", audio: "vest.mp3" },
        { word: "window", image: "window.png", audio: "window.mp3" },
        { word: "box", image: "box.png", audio: "box.mp3" },
        { word: "yacht", image: "yacht.png", audio: "yacht.mp3" },
        { word: "zip", image: "zip.png", audio: "zip.mp3" }
    ];

    // Данные раундов
    const rounds = [
        {
            audio: "audio/song1.mp3",
            correctWords: ["horse", "lamp", "queen", "window"]
        },
        {
            audio: "audio/song2.mp3",
            correctWords: ["cat", "dog", "tree", "box"]
        },
        {
            audio: "audio/song3.mp3",
            correctWords: ["umbrella", "flag", "glass", "egg"]
        }
    ];

    // Элементы интерфейса
    const roundInfo = document.getElementById('roundInfo');
    const audioPlayer = document.getElementById('audioPlayer');
    const imagesGrid = document.getElementById('imagesGrid');
    const checkButton = document.getElementById('checkButton');
    const resultMessage = document.getElementById('resultMessage');

    let currentRound = 0;
    let selectedWords = [];

    // Запуск раунда
    function startRound() {
        const round = rounds[currentRound];
        selectedWords = [];
        resultMessage.textContent = '';
        imagesGrid.innerHTML = '';

        // Установка аудио
        audioPlayer.src = round.audio;

        // Получаем 4 случайных НЕправильных слова
        const wrongWords = allWords
            .filter(word => !round.correctWords.includes(word.word))
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map(word => word.word);

        // Все варианты (4 верных + 4 неверных)
        const allOptions = [...round.correctWords, ...wrongWords]
            .sort(() => Math.random() - 0.5);

        // Создаем карточки
        allOptions.forEach(word => {
            const wordData = allWords.find(w => w.word === word);
            if (!wordData) {
                console.error("Не найдено изображение для слова:", word);
                return;
            }

            const option = document.createElement('div');
            option.className = 'image-option';
            option.dataset.word = word;
            option.innerHTML = `<img src="images/${wordData.image}" alt="${word}">`;
            
            option.addEventListener('click', function() {
                this.classList.toggle('selected');
                if (this.classList.contains('selected')) {
                    selectedWords.push(word);
                } else {
                    selectedWords = selectedWords.filter(w => w !== word);
                }
            });
            
            imagesGrid.appendChild(option);
        });
    }

    // Проверка ответов
    checkButton.addEventListener('click', function() {
        const round = rounds[currentRound];
        const correctSelected = selectedWords.filter(word => 
            round.correctWords.includes(word)
        ).length;

        if (selectedWords.length !== 4) {
            resultMessage.textContent = 'Пожалуйста, выберите 4 слова!';
            resultMessage.style.color = '#FF5722';
            return;
        }

        if (correctSelected === 4) {
            resultMessage.textContent = '✅ Отлично! Все верно!';
            resultMessage.style.color = '#4CAF50';

            setTimeout(() => {
                if (currentRound < 2) {
                    currentRound++;
                    roundInfo.textContent = `Раунд ${currentRound + 1} из 3`;
                    startRound();
                } else {
                    resultMessage.textContent = '🎉 Игра завершена!';
                    updateProgress();
                }
            }, 1500);
        } else {
            resultMessage.textContent = `❌ Правильно: ${correctSelected}/4. Попробуйте еще!`;
            resultMessage.style.color = '#FF5722';
        }
    });

    // Обновление прогресса
    function updateProgress() {
        let progress = parseInt(localStorage.getItem('gamesProgress')) || 0;
        progress = Math.min(progress + 25, 100);
        localStorage.setItem('gamesProgress', progress);
    }

    // Начало игры
    startRound();
});