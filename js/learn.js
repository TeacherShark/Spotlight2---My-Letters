document.addEventListener('DOMContentLoaded', function() {
    const words = {
        'A': 'ant', 'B': 'bed', 'C': 'cat', 'D': 'dog', 'E': 'egg',
        'F': 'flag', 'G': 'glass', 'H': 'horse', 'I': 'ink', 'J': 'jug',
        'K': 'kangaroo', 'L': 'lamp', 'M': 'mouse', 'N': 'nest', 'O': 'orange',
        'P': 'pin', 'Q': 'queen', 'R': 'rabbit', 'S': 'snake', 'T': 'tree',
        'U': 'umbrella', 'V': 'vest', 'W': 'window', 'X': 'box', 'Y': 'yacht',
        'Z': 'zip'
    };

    const alphabetGrid = document.getElementById('alphabetGrid');
    const cardOverlay = document.getElementById('cardOverlay');
    const currentLetterElement = document.getElementById('currentLetter');
    const letterImage = document.getElementById('letterImage');

    // Создаем буквы
    Object.keys(words).forEach(letter => {
        const letterDiv = document.createElement('div');
        letterDiv.className = 'letter';
        letterDiv.textContent = letter;
        letterDiv.onclick = () => openCard(letter);
        alphabetGrid.appendChild(letterDiv);
    });

    function openCard(letter) {
        currentLetterElement.textContent = letter;
        currentLetterElement.setAttribute('data-lowercase', letter.toLowerCase());
        letterImage.src = `images/${words[letter]}.png`;
        letterImage.alt = words[letter];
        cardOverlay.style.display = 'flex';
        
        // Помечаем букву как изученную
        document.querySelectorAll('.letter').forEach(el => {
            if (el.textContent === letter) el.classList.add('learned');
        });
    }

    window.closeCard = function() {
        cardOverlay.style.display = 'none';
    };

    window.playAudio = function() {
        const letter = currentLetterElement.textContent;
        const audio = new Audio(`audio/${words[letter]}.mp3`);
        audio.play().catch(e => console.log("Ошибка воспроизведения:", e));
    };
});