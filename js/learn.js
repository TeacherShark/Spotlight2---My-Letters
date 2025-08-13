document.addEventListener('DOMContentLoaded', function() {
    const words = [
        { letter: "A", word: "ant", image: "ant.png", audio: "ant.mp3" },
        { letter: "B", word: "bed", image: "bed.png", audio: "bed.mp3" },
        { letter: "C", word: "cat", image: "cat.png", audio: "cat.mp3" },
        { letter: "D", word: "dog", image: "dog.png", audio: "dog.mp3" },
        { letter: "E", word: "egg", image: "egg.png", audio: "egg.mp3" },
        { letter: "F", word: "flag", image: "flag.png", audio: "flag.mp3" },
        { letter: "G", word: "glass", image: "glass.png", audio: "glass.mp3" },
        { letter: "H", word: "horse", image: "horse.png", audio: "horse.mp3" },
        { letter: "I", word: "ink", image: "ink.png", audio: "ink.mp3" },
        { letter: "J", word: "jug", image: "jug.png", audio: "jug.mp3" },
        { letter: "K", word: "kangaroo", image: "kangaroo.png", audio: "kangaroo.mp3" },
        { letter: "L", word: "lamp", image: "lamp.png", audio: "lamp.mp3" },
        { letter: "M", word: "mouse", image: "mouse.png", audio: "mouse.mp3" },
        { letter: "N", word: "nest", image: "nest.png", audio: "nest.mp3" },
        { letter: "O", word: "orange", image: "orange.png", audio: "orange.mp3" },
        { letter: "P", word: "pin", image: "pin.png", audio: "pin.mp3" },
        { letter: "Q", word: "queen", image: "queen.png", audio: "queen.mp3" },
        { letter: "R", word: "rabbit", image: "rabbit.png", audio: "rabbit.mp3" },
        { letter: "S", word: "snake", image: "snake.png", audio: "snake.mp3" },
        { letter: "T", word: "tree", image: "tree.png", audio: "tree.mp3" },
        { letter: "U", word: "umbrella", image: "umbrella.png", audio: "umbrella.mp3" },
        { letter: "V", word: "vest", image: "vest.png", audio: "vest.mp3" },
        { letter: "W", word: "window", image: "window.png", audio: "window.mp3" },
        { letter: "X", word: "box", image: "box.png", audio: "box.mp3" },
        { letter: "Y", word: "yacht", image: "yacht.png", audio: "yacht.mp3" },
        { letter: "Z", word: "zip", image: "zip.png", audio: "zip.mp3" }
    ];

    const alphabetGrid = document.getElementById('alphabetGrid');
    const cardOverlay = document.getElementById('cardOverlay');
    const currentLetterElement = document.getElementById('currentLetter');
    const letterImage = document.getElementById('letterImage');
    const wordText = document.getElementById('wordText');

    // Создаем буквы
    words.forEach(item => {
        const letterDiv = document.createElement('div');
        letterDiv.className = 'letter';
        letterDiv.textContent = item.letter;
        letterDiv.onclick = () => openCard(item);
        alphabetGrid.appendChild(letterDiv);
    });

    function openCard(item) {
        currentLetterElement.textContent = item.letter;
        currentLetterElement.setAttribute('data-lowercase', item.letter.toLowerCase());
        letterImage.src = `images/${item.image}`;
        letterImage.alt = item.word;
        wordText.textContent = item.word;
        cardOverlay.style.display = 'flex';

        // Помечаем букву как изученную
        document.querySelectorAll('.letter').forEach(el => {
            if (el.textContent === item.letter) el.classList.add('learned');
        });
    }

    window.closeCard = function() {
        cardOverlay.style.display = 'none';
    };

    window.playAudio = function() {
        const currentLetter = currentLetterElement.textContent;
        const currentWord = words.find(item => item.letter === currentLetter);
        if (currentWord) {
            const audio = new Audio(`audio/${currentWord.audio}`);
            audio.play().catch(e => console.log("Ошибка воспроизведения:", e));
        }
    };
});
