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

    // Элементы интерфейса
    const questionInfo = document.getElementById('questionInfo');
    const questionText = document.getElementById('questionText');
    const audioPlayer = document.getElementById('audioPlayer');
    const optionsGrid = document.getElementById('optionsGrid');
    const trueFalseButtons = document.getElementById('trueFalseButtons');
    const nextButton = document.getElementById('nextButton');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const resultMessage = document.getElementById('resultMessage');

    let currentQuestion = 0;
    let firstTryCorrect = 0;
    const questions = generateQuestions();
    const questionAnswered = Array(20).fill(false); // Отслеживаем, отвечен ли вопрос

    // Генерация 20 вопросов (5 каждого типа)
    function generateQuestions() {
        const qs = [];
        const usedWords = new Set();
        
        // Функция для получения уникального слова
        function getUniqueWord() {
            let wordObj;
            do {
                wordObj = allWords[Math.floor(Math.random() * allWords.length)];
            } while (usedWords.has(wordObj.word));
            usedWords.add(wordObj.word);
            return wordObj;
        }
        
        // Тип 1: Подобрать слово к картинке
        for (let i = 0; i < 5; i++) {
            const correct = getUniqueWord();
            const options = [correct.word];
            while (options.length < 4) {
                const randomWord = allWords[Math.floor(Math.random() * allWords.length)].word;
                if (!options.includes(randomWord)) options.push(randomWord);
            }
            qs.push({
                type: 1,
                image: correct.image,
                correctAnswer: correct.word,
                options: options.sort(() => Math.random() - 0.5)
            });
        }
        
        // Очищаем использованные слова для следующего типа вопросов
        usedWords.clear();
        
        // Тип 2: Подобрать картинку к слову
        for (let i = 0; i < 5; i++) {
            const correct = getUniqueWord();
            const options = [correct];
            while (options.length < 4) {
                const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
                if (!options.some(opt => opt.word === randomWord.word)) options.push(randomWord);
            }
            qs.push({
                type: 2,
                word: correct.word,
                correctAnswer: correct.image,
                options: options.sort(() => Math.random() - 0.5)
            });
        }
        
        // Очищаем использованные слова для следующего типа вопросов
        usedWords.clear();
        
        // Тип 3: Послушать и выбрать картинку
        for (let i = 0; i < 5; i++) {
            const correct = getUniqueWord();
            const options = [correct];
            while (options.length < 4) {
                const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
                if (!options.some(opt => opt.word === randomWord.word)) options.push(randomWord);
            }
            qs.push({
                type: 3,
                audio: correct.audio,
                correctAnswer: correct.image,
                options: options.sort(() => Math.random() - 0.5)
            });
        }
        
        // Очищаем использованные слова для следующего типа вопросов
        usedWords.clear();
        
        // Тип 4: Проверить соответствие слова и картинки
        for (let i = 0; i < 5; i++) {
            const correct = getUniqueWord();
            const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
            const isCorrect = Math.random() > 0.5;
            qs.push({
                type: 4,
                image: correct.image,
                word: isCorrect ? correct.word : randomWord.word,
                correctAnswer: isCorrect ? "true" : "false"
            });
        }
        
        return qs.sort(() => Math.random() - 0.5);
    }

    // Показ текущего вопроса
    function showQuestion() {
        const q = questions[currentQuestion];
        questionInfo.textContent = `Вопрос ${currentQuestion + 1} из 20`;
        optionsGrid.innerHTML = '';
        trueFalseButtons.style.display = 'none';
        audioPlayer.style.display = 'none';
        nextButton.style.display = 'none';
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback-message';

        switch (q.type) {
            case 1: // Слово к картинке
                questionText.textContent = "Выбери слово для картинки:";
                optionsGrid.innerHTML = `
                    <div class="option-card">
                        <img src="images/${q.image}" alt="Картинка">
                    </div>
                    ${q.options.map(word => `
                        <div class="option-card text-option" data-answer="${word}">
                            <div class="text-option">${word}</div>
                        </div>
                    `).join('')}
                `;
                break;
                
            case 2: // Картинка к слову
                questionText.textContent = `Выбери картинку для слова: "${q.word}"`;
                q.options.forEach(opt => {
                    const card = document.createElement('div');
                    card.className = 'option-card';
                    card.dataset.answer = opt.image;
                    card.innerHTML = `<img src="images/${opt.image}" alt="${opt.word}">`;
                    optionsGrid.appendChild(card);
                });
                break;
                
            case 3: // Аудио + картинка
                questionText.textContent = "Послушай и выбери верную картинку:";
                audioPlayer.src = `audio/${q.audio}`;
                audioPlayer.style.display = 'block';
                q.options.forEach(opt => {
                    const card = document.createElement('div');
                    card.className = 'option-card';
                    card.dataset.answer = opt.image;
                    card.innerHTML = `<img src="images/${opt.image}" alt="${opt.word}">`;
                    optionsGrid.appendChild(card);
                });
                break;
                
            case 4: // Проверка соответствия
                questionText.textContent = "Соответствует ли слово картинке?";
                optionsGrid.innerHTML = `
                    <div class="option-card">
                        <img src="images/${q.image}" alt="Картинка">
                        <div class="text-option">${q.word}</div>
                    </div>
                `;
                trueFalseButtons.style.display = 'flex';
                break;
        }
        
        // Обработчики выбора
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', function() {
                if (q.type !== 4 && !questionAnswered[currentQuestion]) {
                    document.querySelectorAll('.option-card').forEach(c => 
                        c.classList.remove('selected'));
                    this.classList.add('selected');
                    checkAnswer();
                }
            });
        });
    }

    // Проверка ответа
    function checkAnswer() {
        const q = questions[currentQuestion];
        const selected = document.querySelector('.option-card.selected');
        
        if (!selected || questionAnswered[currentQuestion]) return;
        
        const isCorrect = selected.dataset.answer === q.correctAnswer;
        questionAnswered[currentQuestion] = true; // Помечаем вопрос как отвеченный
        
        if (isCorrect) {
            feedbackMessage.textContent = '✅ Верно!';
            feedbackMessage.className = 'feedback-message correct-feedback';
            firstTryCorrect++;
        } else {
            feedbackMessage.textContent = '❌ Неверно.';
            feedbackMessage.className = 'feedback-message incorrect-feedback';
        }
        nextButton.style.display = 'block';
    }

    // Обработка кнопок Верно/Неверно
    document.querySelector('.true-button').addEventListener('click', () => {
        const q = questions[currentQuestion];
        if (questionAnswered[currentQuestion]) return;
        
        questionAnswered[currentQuestion] = true;
        
        if (q.correctAnswer === "true") {
            feedbackMessage.textContent = '✅ Верно!';
            feedbackMessage.className = 'feedback-message correct-feedback';
            firstTryCorrect++;
        } else {
            feedbackMessage.textContent = '❌ Неверно.';
            feedbackMessage.className = 'feedback-message incorrect-feedback';
        }
        nextButton.style.display = 'block';
    });
    
    document.querySelector('.false-button').addEventListener('click', () => {
        const q = questions[currentQuestion];
        if (questionAnswered[currentQuestion]) return;
        
        questionAnswered[currentQuestion] = true;
        
        if (q.correctAnswer === "false") {
            feedbackMessage.textContent = '✅ Верно!';
            feedbackMessage.className = 'feedback-message correct-feedback';
            firstTryCorrect++;
        } else {
            feedbackMessage.textContent = '❌ Неверно.';
            feedbackMessage.className = 'feedback-message incorrect-feedback';
        }
        nextButton.style.display = 'block';
    });

    // Переход к следующему вопросу
    function goToNextQuestion() {
        if (currentQuestion < 19) {
            currentQuestion++;
            showQuestion();
        } else {
            // Тест завершен
            questionText.style.display = 'none';
            optionsGrid.style.display = 'none';
            trueFalseButtons.style.display = 'none';
            nextButton.style.display = 'none';
            feedbackMessage.style.display = 'none';
            
            resultMessage.innerHTML = `
                Тест завершён!<br>
                Правильных ответов: ${firstTryCorrect}/20
                <div style="font-size: 1.5rem; margin-top: 20px;">${getResultText(firstTryCorrect)}</div>
            `;
            resultMessage.style.display = 'block';
        }
    }

    function getResultText(score) {
        if (score >= 18) return "Отличный результат! 🌟";
        if (score >= 14) return "Хорошо! 👍";
        if (score >= 10) return "Неплохо! 😊";
        return "Попробуйте ещё раз! 💪";
    }

    // Обработка кнопки "Далее"
    nextButton.addEventListener('click', goToNextQuestion);

    // Старт теста
    showQuestion();
});