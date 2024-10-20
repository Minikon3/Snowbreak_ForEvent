document.addEventListener('DOMContentLoaded', () => {
    const requiredCounterData = [
        { id: 1, name: 'Требуется Glory', img: 'images/ZH.jpg', count: 0 },
        { id: 2, name: 'Требуется Humility', img: 'images/SAL.jpg', count: 0 },
        { id: 3, name: 'Требуется Justice', img: 'images/ZEL.jpg', count: 0 },
        { id: 4, name: 'Требуется Purity', img: 'images/SIN.jpg', count: 0 },
        { id: 5, name: 'Требуется Boldness', img: 'images/KR.jpg', count: 0 },
        { id: 6, name: 'Требуется Intellect', img: 'images/BEL.jpg', count: 0 },
        { id: 7, name: 'Требуется Courage', img: 'images/FIOL.jpg', count: 0 }
    ];

    const availableCounterData = [
        { id: 1, name: 'Имеется Glory', img: 'images/ZH.jpg', count: 0 },
        { id: 2, name: 'Имеется Humility', img: 'images/SAL.jpg', count: 0 },
        { id: 3, name: 'Имеется Justice', img: 'images/ZEL.jpg', count: 0 },
        { id: 4, name: 'Имеется Purity', img: 'images/SIN.jpg', count: 0 },
        { id: 5, name: 'Имеется Boldness', img: 'images/KR.jpg', count: 0 },
        { id: 6, name: 'Имеется Intellect', img: 'images/BEL.jpg', count: 0 },
        { id: 7, name: 'Имеется Courage', img: 'images/FIOL.jpg', count: 0 }
    ];

    const characterData = [
        { name: 'Acacia - Kaguya', items: [{ id: 4, count: 1 }, { id: 6, count: 2 }] },
        { name: 'Fritia - Hush', items: [{ id: 3, count: 1 }, { id: 4, count: 1 }, { id: 6, count: 1 }] },
        { name: 'Lyfe - Wild Hunt', items: [{ id: 2, count: 1 }, { id: 3, count: 1 }, { id: 5, count: 1 }] },
        { name: 'Marian - Swift', items: [{ id: 2, count: 2 }, { id: 6, count: 1 }] },
        { name: 'Haru - Absconditus', items: [{ id: 1, count: 1 }, { id: 3, count: 2 }] },
        { name: 'Cherno - Enigma', items: [{ id: 2, count: 1 }, { id: 7, count: 2 }] },
        { name: 'Fenny - Coronet', items: [{ id: 1, count: 1 }, { id: 3, count: 1 }, { id: 7, count: 1 }] },
        { name: 'Yao - Winter Solstice', items: [{ id: 5, count: 1 }, { id: 6, count: 1 }, { id: 7, count: 1 }] },
        { name: 'Enya - Exuvia', items: [{ id: 2, count: 2 }, { id: 4, count: 1 }] },
        { name: 'Mauxir - Shadow Ka', items: [{ id: 4, count: 1 }, { id: 6, count: 2 }] },
        { name: 'Siris - Ksana', items: [{ id: 4, count: 2 }, { id: 7, count: 1 }] },
        { name: 'Chenxing - Etheral Cloud', items: [{ id: 1, count: 2 }, { id: 4, count: 1 }] },
        { name: 'Lyfe - Infinite Sight', items: [{ id: 2, count: 1 }, { id: 5, count: 2 }] },
        { name: 'Katya - Blue Bolt', items: [{ id: 5, count: 2 }, { id: 7, count: 1 }] },
        { name: 'Tess - The Magician', items: [{ id: 2, count: 2 }, { id: 7, count: 1 }] },
        { name: 'Fenny - Starshine', items: [{ id: 1, count: 2 }, { id: 3, count: 1 }] },
        { name: 'Vidya - Agave', items: [{ id: 1, count: 1 }, { id: 5, count: 1 }, { id: 6, count: 1 }] },
        { name: 'Marian - Riptide', items: [{ id: 2, count: 1 }, { id: 4, count: 1 }, { id: 7, count: 1 }] },
        { name: 'Katya - Dawnwing', items: [{ id: 1, count: 1 }, { id: 5, count: 1 }, { id: 7, count: 1 }] },
        { name: 'Eatchel - The Cub', items: [{ id: 4, count: 2 }, { id: 5, count: 1 }] }
    ];

    let savedRequiredCounters = JSON.parse(localStorage.getItem('requiredCounters')) || requiredCounterData;
    let savedAvailableCounters = JSON.parse(localStorage.getItem('availableCounters')) || availableCounterData;

    const updateLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    const createCounter = (counter, type) => {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'counter';
        counterDiv.innerHTML = `
            <img src="${counter.img}" alt="${counter.name}">
            <h2>${counter.name}</h2>
            <div class="controls">
                <button onclick="changeCount(${counter.id}, -1, '${type}')">-</button>
                <span id="${type}-count-${counter.id}">${counter.count}</span>
                <button onclick="changeCount(${counter.id}, 1, '${type}')">+</button>
            </div>
            <div class="status" id="${type}-status-${counter.id}"></div>
        `;
        return counterDiv;
    };

    const requiredCountersContainer = document.getElementById('requiredCounters');
    savedRequiredCounters.forEach(counter => {
        requiredCountersContainer.appendChild(createCounter(counter, 'required'));
    });

    const availableCountersContainer = document.getElementById('availableCounters');
    savedAvailableCounters.forEach(counter => {
        availableCountersContainer.appendChild(createCounter(counter, 'available'));
    });

    window.changeCount = (id, delta, type) => {
        let counters, key;
        if (type === 'required') {
            counters = savedRequiredCounters;
            key = 'requiredCounters';
        } else {
            counters = savedAvailableCounters;
            key = 'availableCounters';
        }

        const counter = counters.find(counter => counter.id === id);
        counter.count = Math.max(0, counter.count + delta);
        document.getElementById(`${type}-count-${id}`).textContent = counter.count;
        updateLocalStorage(key, counters);

        updateStatus(id);
        updateAllStatuses();
    };

    const updateStatus = (id) => {
        const requiredCount = savedRequiredCounters.find(counter => counter.id === id).count;
        const availableCount = savedAvailableCounters.find(counter => counter.id === id).count;
        const statusElement = document.getElementById(`required-status-${id}`);
        const exchangeSwitch = document.getElementById('exchangeSwitch').checked;

        if (exchangeSwitch) {
            let excessItems = 0;
            savedAvailableCounters.forEach(counter => {
                if (!savedRequiredCounters.some(req => req.id === counter.id && req.count > 0)) {
                    excessItems += counter.count;
                }
            });

            if (availableCount >= requiredCount) {
                statusElement.textContent = 'Предметов достаточно';
                statusElement.style.color = 'green';
            } else {
                const needed = requiredCount - availableCount;
                const possibleExchanges = Math.floor(excessItems / 3);
                if (possibleExchanges >= needed) {
                    statusElement.textContent = `Можно обменять для получения: ${needed}`;
                    statusElement.style.color = 'orange';
                } else {
                    statusElement.textContent = `Требуется еще: ${needed}`;
                    statusElement.style.color = 'red';
                }
            }
        } else {
            if (availableCount >= requiredCount) {
                statusElement.textContent = 'Предметов достаточно';
                statusElement.style.color = 'green';
            } else {
                const needed = requiredCount - availableCount;
                statusElement.textContent = `Требуется еще: ${needed}`;
                statusElement.style.color = 'red';
            }
        }
    };

    const updateAllStatuses = () => {
        savedRequiredCounters.forEach(counter => updateStatus(counter.id));
        savedAvailableCounters.forEach(counter => updateStatus(counter.id));
    };

    const resetCounters = () => {
        localStorage.removeItem('requiredCounters');
        localStorage.removeItem('availableCounters');
        savedRequiredCounters = requiredCounterData.map(counter => ({ ...counter, count: 0 }));
        savedAvailableCounters = availableCounterData.map(counter => ({ ...counter, count: 0 }));
        requiredCountersContainer.innerHTML = '';
        availableCountersContainer.innerHTML = '';
        savedRequiredCounters.forEach(counter => {
            requiredCountersContainer.appendChild(createCounter(counter, 'required'));
        });
        savedAvailableCounters.forEach(counter => {
            availableCountersContainer.appendChild(createCounter(counter, 'available'));
        });
        updateAllStatuses();
    };
    document.getElementById('exchangeSwitch').addEventListener('change', () => {
        updateAllStatuses();
    });

    window.resetCounters = resetCounters;

    savedRequiredCounters.forEach(counter => updateStatus(counter.id));
    savedAvailableCounters.forEach(counter => updateStatus(counter.id));




    let mandatoryCharacters = [];

    const openModal = () => {
        const modal = document.getElementById('modal');
        const characterList = document.getElementById('characterList');
        characterList.innerHTML = '';
        characterData.forEach(character => {
            const characterDiv = document.createElement('div');
            characterDiv.className = 'character';
            characterDiv.innerHTML = `
                <input type="checkbox" id="char-${character.name}" name="mandatoryCharacter" value="${character.name}">
                <label for="char-${character.name}">${character.name}</label>
            `;
            characterList.appendChild(characterDiv);
        });
        modal.style.display = "block";
    };

    const closeModal = () => {
        const modal = document.getElementById('modal');
        modal.style.display = "none";
    };

    const saveMandatoryCharacters = () => {
        mandatoryCharacters = Array.from(document.querySelectorAll('input[name="mandatoryCharacter"]:checked')).map(input => input.value);
        closeModal();
    };

    window.openModal = openModal;
    window.closeModal = closeModal;
    window.saveMandatoryCharacters = saveMandatoryCharacters;

    const selectCharacters = () => {
    // Копируем данные о требуемых предметах
    const requirements = savedRequiredCounters.map(counter => ({ ...counter }));

    // Учитываем доступные предметы
    requirements.forEach((requirement, index) => {
        const available = savedAvailableCounters.find(counter => counter.id === requirement.id);
        if (available) {
            requirement.count = Math.max(0, requirement.count - available.count); // вычитаем доступные предметы
        }
    });

    // Вычисление очков для каждого персонажа
    characterData.forEach(character => {
        character.score = 0;
        character.items.forEach(item => {
            const requirement = requirements.find(req => req.id === item.id);
            if (requirement) {
                character.score += Math.min(item.count, requirement.count);
            }
        });
    });

    // Сортировка персонажей по очкам
    characterData.sort((a, b) => b.score - a.score);

    let selectedCharacters = [];
    let totalProvided = Array(7).fill(0);

    // Добавляем самого выгодного обязательного персонажа
    if (mandatoryCharacters.length > 0) {
        const bestMandatoryCharacter = characterData.filter(character => mandatoryCharacters.includes(character.name))[0];
        if (bestMandatoryCharacter) {
            selectedCharacters.push(bestMandatoryCharacter);
            bestMandatoryCharacter.items.forEach(item => {
                totalProvided[item.id - 1] += item.count;
            });
        }
    }

    // Добавляем остальных самых выгодных персонажей
    for (const character of characterData) {
        if (selectedCharacters.length < 3) {
            if (!selectedCharacters.includes(character)) {
                selectedCharacters.push(character);
                character.items.forEach(item => {
                    totalProvided[item.id - 1] += item.count;
                });
            }
        } else {
            break;
        }
    }

    // Обновление списка выбранных персонажей на странице
    const characterList = document.getElementById('selectedCharacters');
    characterList.innerHTML = '<h2>Подобранные персонажи:</h2>';
    selectedCharacters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.className = 'character';
        characterDiv.textContent = `${character.name}`;
        characterList.appendChild(characterDiv);
    });
};


    window.selectCharacters = selectCharacters;
    });