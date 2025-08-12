document.addEventListener('DOMContentLoaded', function() {
    // Все 26 слов и картинок
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

    const roundInfo = document.getElementById('roundInfo');
    const listenButton = document.getElementById('listenButton');
    const imagesGrid = document.getElementById('imagesGrid');
    const resultMessage = document.getElementById('resultMessage');

    let currentRound = 1;
    let usedWords = [];
    let currentCorrectWord = null;
    let audioPlayer = new Audio();

    // Начало игры
    startRound();

    function startRound() {
        roundInfo.textContent = `Раунд ${currentRound} из 10`;
        resultMessage.textContent = '';
        imagesGrid.innerHTML = '';

        // Выбираем случайное слово (которое еще не использовалось)
        const availableWords = allWords.filter(word => !usedWords.includes(word.word));
        currentCorrectWord = availableWords[Math.floor(Math.random() * availableWords.length)];
        usedWords.push(currentCorrectWord.word);

        // Создаем массив из 6 слов (1 верное + 5 случайных)
        const options = [currentCorrectWord];
        while (options.length < 6) {
            const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
            if (!options.some(opt => opt.word === randomWord.word)) {
                options.push(randomWord);
            }
        }

        // Перемешиваем и выводим картинки
        options.sort(() => Math.random() - 0.5).forEach(word => {
            const option = document.createElement('div');
            option.className = 'image-option';
            option.dataset.word = word.word;
            option.innerHTML = `<img src="images/${word.image}" alt="${word.word}">`;
            
            option.addEventListener('click', () => checkAnswer(word.word));
            imagesGrid.appendChild(option);
        });

        // Настройка кнопки прослушивания
        listenButton.onclick = () => {
            audioPlayer.src = `audio/${currentCorrectWord.audio}`;
            audioPlayer.play();
        };
    }

    function checkAnswer(selectedWord) {
        if (selectedWord === currentCorrectWord.word) {
            resultMessage.textContent = '✅ Верно!';
            resultMessage.style.color = '#4CAF50';
            
            setTimeout(() => {
                if (currentRound < 10) {
                    currentRound++;
                    startRound();
                } else {
                    resultMessage.textContent = '🎉 Игра завершена!';
                    updateProgress();
                }
            }, 1000);
        } else {
            resultMessage.textContent = '❌ Попробуй еще раз!';
            resultMessage.style.color = '#FF5722';
        }
    }

    function updateProgress() {
    let progress = parseInt(localStorage.getItem('gamesProgress')) || 0;
    progress = Math.min(progress + 25, 100); // +25% за всю игру (10 раундов)
    localStorage.setItem('gamesProgress', progress);
}
});