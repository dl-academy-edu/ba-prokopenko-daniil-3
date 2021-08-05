let number = +prompt("Введите число, большее 0:");
if (number > 0) {
    for (let i = 1; i <= number; i++) {
        if ((i % 4) !== 0) {
            console.log(i);
        }
    }  
}
else {
    console.log("Кажется, вы ввели неправильное число или нажали кнопку 'отмена' или 'escape'");
}