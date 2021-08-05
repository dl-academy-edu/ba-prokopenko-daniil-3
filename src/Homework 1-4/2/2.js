let number = prompt("Введите целое неотрицательное число:");
if (number !== null && !isNaN(number) && +number >= 0 && number !== "") {
    number = +number;
    let i = 1;
    let factorial = 1;
    while (i <= number) {
        factorial *= i;
        i++;
    }
    console.log(factorial);
}
else {
console.log("Кажется, вы ввели неправильное число или нажали кнопку 'отмена' или 'escape'");
}