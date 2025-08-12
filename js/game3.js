document.addEventListener('DOMContentLoaded', function() {
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
    

    const roundInfo = document.getElementById('roundInfo');
    const memoryGrid = document.getElementById('memoryGrid');
    const resultMessage = document.getElementById('resultMessage');
    const movesCounter = document.getElementById('movesCounter'); // Счётчик

    let currentRound = 1;
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let totalPairs = 0;
    let moves = 0; // Счётчик ходов

    startRound();

    function startRound() {
        memoryGrid.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        moves = 0; // Сброс ходов
        movesCounter.textContent = `Ходы: ${moves}`;
        resultMessage.textContent = '';

        // Количество пар для раунда
        if (currentRound === 1) totalPairs = 7;
        else if (currentRound === 2) totalPairs = 9;
        else totalPairs = 10;

        roundInfo.textContent = `Раунд ${currentRound} из 3`;

        // Подготовка карточек
        const roundWords = [...allWords]
            .sort(() => Math.random() - 0.5)
            .slice(0, totalPairs);

        cards = [];
        roundWords.forEach(word => {
            cards.push({ type: 'word', content: word.word, pairId: word.word });
            cards.push({ type: 'image', content: word.image, pairId: word.word });
        });

        cards = cards.sort(() => Math.random() - 0.5);

        // Рендер карточек
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.dataset.index = index;

            cardElement.innerHTML = `
                <div class="memory-card-inner">
                    <div class="memory-card-front">?</div>
                    <div class="memory-card-back">
                        ${card.type === 'word' 
                            ? card.content 
                            : `<img src="images/${card.content}" alt="${card.pairId}">`}
                    </div>
                </div>
            `;

            cardElement.addEventListener('click', () => flipCard(cardElement, index));
            memoryGrid.appendChild(cardElement);
        });
    }

    function flipCard(cardElement, index) {
        if (flippedCards.length >= 2 || cardElement.classList.contains('flipped')) return;

        cardElement.classList.add('flipped');
        flippedCards.push({ element: cardElement, index });

        // Увеличиваем счётчик ТОЛЬКО при открытии второй карточки
        if (flippedCards.length === 2) {
            moves++; // +1 ход
            movesCounter.textContent = `Ходы: ${moves}`;

            const card1 = cards[flippedCards[0].index];
            const card2 = cards[flippedCards[1].index];

            if (card1.pairId === card2.pairId) {
                matchedPairs++;
                flippedCards = [];

                if (matchedPairs === totalPairs) {
                    setTimeout(() => {
                        if (currentRound < 3) {
                            currentRound++;
                            startRound();
                        } else {
                            resultMessage.textContent = '🎉 Игра завершена!';
                            updateProgress();
                        }
                    }, 1000);
                }
            } else {
                setTimeout(() => {
                    flippedCards.forEach(card => card.element.classList.remove('flipped'));
                    flippedCards = [];
                }, 1000);
            }
        }
    }

    function updateProgress() {
        let progress = parseInt(localStorage.getItem('gamesProgress')) || 0;
        progress = Math.min(progress + 25, 100);
        localStorage.setItem('gamesProgress', progress);
    }
});