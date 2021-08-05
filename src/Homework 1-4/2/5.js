let rand = Math.floor(1 + Math.random() * 10);
let number;
while(true) {
    number = prompt("Введите число:");
    if (number == rand) {
        console.log("Верно!");
        break;
    }
    else if (number === null) {
        console.log("Отменено");
        break;
    }
console.log("Не угадал!")
}