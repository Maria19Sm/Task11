const prompt = require('prompt-sync')();
const fs = require('fs');
console.clear();

class MenuManager {
    constructor() {
        this.menu = [];
        this.selectedMenu = null;
        this.sushiMenu = [
            {
                title: 'UnagiRoll',
                price: 8000,
                category: 'rolls',
                ingredients: ['rise', 'eel', 'cucumber', 'avocado', 'soy sauce']
            },
            {
                title: 'TempuraRoll',
                price: 7500,
                category: 'rolls',
                ingredients: ['rise', 'shrimp', 'tempura batter', 'avocado', 'spicy mayo']
            },
            {
                title: 'CaesarRole',
                price: 7800,
                category: 'rolls',
                ingredients: ['rise', 'chicken', 'lettuce', 'parmesan', 'caesar dressing']
            },
            {
                title: 'PhiladelphiaWithSalmon',
                price: 8500,
                category: 'rolls',
                ingredients: ['rise', 'cream cheese', 'salmon', 'cucumber', 'nori']
            },
        ];

        this.soupSaladMenu = [
            {
                title: 'MisoSoup',
                price: 4000,
                category: 'soup',
                ingredients: ['tofu', 'seaweed', 'green onions', 'mushrooms', 'misu paste']
            },
            {
                title: 'FruitSalad',
                price: 5500,
                category: 'salad',
                ingredients: ['romaine lettuce', 'croutons', 'parmesan cheese', 'caesar dressing']
            },
        ];
    }

    chooseMenu() {
        console.log('Вітаємо у менеджері меню!');
        let menuChoice;

        do {
            menuChoice = prompt('Оберіть тип меню (1 - Суші, 2 - Супи та салати): ');

            if (menuChoice === '1') {
                this.selectedMenu = 'sushi';
                this.menu = this.sushiMenu;
            } else if (menuChoice === '2') {
                this.selectedMenu = 'soupSalad';
                this.menu = this.soupSaladMenu;
            } else {
                console.log('Будь ласка, оберіть правильний тип меню.');
            }
        } while (!this.selectedMenu);

        console.log(`Ви обрали ${this.selectedMenu === 'sushi' ? 'суші' : 'супи та салати'}.`);
    }

    start() {
        let chooseAct;
        do {
            chooseAct = prompt("Виберіть, що хочете зробити:\n1 -- змінити, 2 -- видалити, 3 -- додати, 4 -- зберегти, 5 -- переглянути меню, 6 -- вийти: ");

            if (chooseAct === '1') {
                this.changeProperties();
            }
            if (chooseAct === '2') {
                this.deleteProperties();
            }
            if (chooseAct === '3') {
                this.addProperties();
            }
            if (chooseAct === '4') {
                this.saveMenu();
            }
            if (chooseAct === '5') {
                this.viewMenu();
            }
        } while (chooseAct !== '6');
    }

    deleteProperties() {
        const titleToDelete = prompt("Введіть назву страви, яку хочете видалити: ");
        const menuItemIndex = this.findMenuItemIndex(titleToDelete);

        if (menuItemIndex !== -1) {
            this.menu.splice(menuItemIndex, 1);
            console.log(`Страву з назвою ${titleToDelete} видалено.`);
        } else {
            console.log(`Страву з назвою ${titleToDelete} не знайдено у меню.`);
        }
    }

    changeProperties() {
        const titleToChange = prompt("Введіть назву страви, яку хочете змінити: ");
        const menuItemIndex = this.findMenuItemIndex(titleToChange);

        if (menuItemIndex !== -1) {
            const menuItem = this.menu[menuItemIndex];
            const propToChange = prompt("Введіть назву властивості, яку хочете змінити: ");
            const newValue = prompt(`Введіть нове значення для властивості ${propToChange}: `);

            if (menuItem.hasOwnProperty(propToChange)) {
                menuItem[propToChange] = newValue;
                console.log(`Властивість ${propToChange} змінено в елементі з назвою ${titleToChange} на ${newValue}`);
            } else {
                console.log(`Властивість ${propToChange} не існує у страви з назвою ${titleToChange}.`);
            }
        } else {
            console.log(`Страву з назвою ${titleToChange} не знайдено у меню.`);
        }
    }

    addProperties() {
        const newTitle = prompt('Введіть назву страви: ');
        const newPrice = parseFloat(prompt('Введіть ціну страви: '));
        const newCategory = prompt('Введіть категорію: ');
        const newIngredients = prompt('Введіть інгредієнти через пробіл: ').split(' ');

        const newMenuItem = {
            title: newTitle,
            price: newPrice,
            category: newCategory,
            ingredients: newIngredients.map(ingredient => ingredient.trim()),
        };

        this.menu.push(newMenuItem);
    }

    findMenuItemIndex(title) {
        return this.menu.findIndex(item => item.title === title);
    }

    saveMenu() {
        try {
            const existingMenu = JSON.parse(fs.readFileSync('menu.txt', 'utf8'));
            const updatedMenu = [...existingMenu, ...this.menu];
            fs.writeFileSync('menu.txt', JSON.stringify(updatedMenu));
            console.log('Інформацію додано до файлу menu.txt');
        } catch (error) {
            console.error('Помилка при збереженні меню:', error.message);
        }
    }
    
    viewMenu() {
        console.log('=== МЕНЮ ===');
        this.menu.forEach(item => console.log(item));
        console.log('============');
    }
}

const manager = new MenuManager();
manager.chooseMenu();
manager.start();
