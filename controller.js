function saveSelectedBeverage(newBeverage) {
    localStorage.setItem('beverage', newBeverage);
}

function saveSelectedCondiments(condiments) {
    localStorage.setItem('condiments', JSON.stringify(condiments));
}

function saveOrder() {
    const order = {
        beverage: localStorage.getItem('beverage'),
        condiments: JSON.parse(localStorage.getItem('condiments')),
        name: localStorage.getItem('beverage') + ' with ' + joinCondiments(localStorage.getItem('condiments')),
        id: Math.floor(Math.random() * 1000),
        price: (Math.random() * 10).toFixed(2)
    };
    localStorage.setItem('order', JSON.stringify(order));
}

function joinCondiments(condiments) {
    let newCondiments = JSON.parse(localStorage.getItem('condiments'));
    return newCondiments.join(', ');
}