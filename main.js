(() => {
    // создаем массив с парными числами
    let arrNumber = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

    // достаем контейнер из HTML по ID
    const container = document.getElementById('container');

    // создаем функцию начала игры
    function startGame() {
        //создаем переменные первой и втрой карточки
        let firstCard = null;
        let secondCard = null;

        // перемешиваем массив с помощью алгоритма Фишера-Йетса (Fisher-Yates)
        arrNumber.sort(() => Math.random() - 0.5); 

        // создаем карточки с помощью цикла, числа берем из массива. Также сщздаем в этом цикле событие Клик
        for (let i = 0; i < arrNumber.length; i++) {
            const card = document.createElement('div');        
            card.classList.add('card');
            card.textContent = arrNumber[i];

            // создаем событие Клик по арточке            
            card.addEventListener('click', () => { 
                if (card.classList.contains('open') || card.classList.contains("success")) {
                    return
                };
                
                if (firstCard !== null && secondCard !== null) {
                    firstCard.classList.remove('open')
                    secondCard.classList.remove('open')
                    firstCard = null
                    secondCard = null
                };

                card.classList.add('open'); 
                
                if (firstCard === null) {
                    firstCard = card
                } else {
                    secondCard = card
                  };
            
                if (firstCard !== null && secondCard !== null) {
                    let firstCardNumber = firstCard.textContent
                    let secondCardNumber = secondCard.textContent
            
                    if (firstCardNumber === secondCardNumber) {
                      firstCard.classList.add("success")
                      secondCard.classList.add("success")
                    };
                };

                // Проверяем конец игры
                if (arrNumber.length === document.querySelectorAll('.success').length) {
                    setTimeout(() => {
                        container.innerHTML = '';
                        alert('Поздравляю! Вы победили!');
                        const btn = document.createElement('button');
                        btn.classList.add('btn');
                        btn.textContent = 'Сыграть ещё раз';

                        // добавляем кнопку в контейнер    
                        document.body.append(btn);                

                        // добавляем обработчик событий на кнопку
                        btn.addEventListener('click', function () {
                            startGame();
                            btn.classList.add('btn_none');  
                        });                       
                    }, 300);
                };
            });

            // добавляем карточки в контейнер    
            container.append(card);
        };
    }

    startGame();      
})();