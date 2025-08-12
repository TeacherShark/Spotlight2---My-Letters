document.addEventListener('DOMContentLoaded', function() {
    // Все 26 слов и картинок
    const allWords = [
        { word: "ant", image: "ant.png" },
        { word: "bed", image: "bed.png" },
        { word: "cat", image: "cat.png" },
        { word: "dog", image: "dog.png" },
        { word: "egg", image: "egg.png" },
        { word: "flag", image: "flag.png" },
        { word: "glass", image: "glass.png" },
        { word: "horse", image: "horse.png" },
        { word: "ink", image: "ink.png" },
        { word: "jug", image: "jug.png" },
        { word: "kangaroo", image: "kangaroo.png" },
        { word: "lamp", image: "lamp.png" },
        { word: "mouse", image: "mouse.png" },
        { word: "nest", image: "nest.png" },
        { word: "orange", image: "orange.png" },
        { word: "pin", image: "pin.png" },
        { word: "queen", image: "queen.png" },
        { word: "rabbit", image: "rabbit.png" },
        { word: "snake", image: "snake.png" },
        { word: "tree", image: "tree.png" },
        { word: "umbrella", image: "umbrella.png" },
        { word: "vest", image: "vest.png" },
        { word: "window", image: "window.png" },
        { word: "box", image: "box.png" },
        { word: "yacht", image: "yacht.png" },
        { word: "zip", image: "zip.png" }
    ];

    const dragArea = document.getElementById('dragArea');
    const roundInfo = document.getElementById('roundInfo');
    const resultMessage = document.getElementById('resultMessage');
    const checkButton = document.getElementById('checkButton');

    let currentRound = 1;
    let currentGamePairs = []; // Все пары для текущей игры (18 из 26)
    let currentRoundPairs = []; // Пары для текущего раунда (6 из 18)
    let draggedItem = null;

    // Начало новой игры
    startNewGame();

    function startNewGame() {
        // Выбираем 18 случайных уникальных пар из 26
        currentGamePairs = [...allWords]
            .sort(() => Math.random() - 0.5)
            .slice(0, 18);
        
        startRound();
    }

    function startRound() {
        roundInfo.textContent = `Раунд ${currentRound} из 3`;
        resultMessage.textContent = '';
        dragArea.innerHTML = '';

        // Берем 6 пар для текущего раунда
        currentRoundPairs = currentGamePairs.slice((currentRound - 1) * 6, currentRound * 6);

        // Карточки с картинками
        currentRoundPairs.forEach((pair, index) => {
            const imageCard = document.createElement('div');
            imageCard.className = 'image-card';
            imageCard.dataset.index = index;
            imageCard.dataset.correctWord = pair.word;
            imageCard.innerHTML = `<img src="images/${pair.image}" alt="${pair.word}">`;
            
            imageCard.addEventListener('dragover', (e) => e.preventDefault());
            imageCard.addEventListener('drop', (e) => {
                e.preventDefault();
                if (draggedItem) {
                    imageCard.appendChild(draggedItem);
                }
            });
            
            dragArea.appendChild(imageCard);
        });

        // Карточки со словами (перемешанные)
        const shuffledWords = [...currentRoundPairs]
            .sort(() => Math.random() - 0.5)
            .map(pair => pair.word);

        shuffledWords.forEach(word => {
            const wordCard = document.createElement('div');
            wordCard.className = 'word-card';
            wordCard.textContent = word;
            wordCard.draggable = true;
            wordCard.dataset.word = word;
            
            wordCard.addEventListener('dragstart', () => {
                draggedItem = wordCard;
                wordCard.classList.add('dragging');
            });
            
            wordCard.addEventListener('dragend', () => {
                wordCard.classList.remove('dragging');
            });
            
            dragArea.appendChild(wordCard);
        });
    }

    // Проверка результатов
    checkButton.addEventListener('click', () => {
        const imageCards = document.querySelectorAll('.image-card');
        let correctMatches = 0;

        imageCards.forEach(card => {
            const wordCard = card.querySelector('.word-card');
            if (wordCard && wordCard.dataset.word === card.dataset.correctWord) {
                correctMatches++;
            }
        });

        if (correctMatches === 6) {
    resultMessage.textContent = '✅ Все верно!';
    resultMessage.style.color = '#4CAF50';

    setTimeout(() => {
        if (currentRound < 3) {
            currentRound++;
            startRound();
        } else {
            resultMessage.textContent = '🎉 Игра завершена!';
            resultMessage.style.color = '#6A4C93';
            updateProgress();
            // Убираем автоматический переход
        }
    }, 1000);

        } else {
            resultMessage.textContent = '❌ Попробуй еще раз!';
            resultMessage.style.color = '#FF5722';
        }
    });

  
    // Обновление прогресса (теперь +25% за всю игру)
function updateProgress() {
    let progress = parseInt(localStorage.getItem('gamesProgress')) || 0;
    progress = Math.min(progress + 25, 100); // +25% за все 3 раунда
    localStorage.setItem('gamesProgress', progress);
}
});