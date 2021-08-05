let number = prompt("Введите число:");
let power = prompt("Введите степень числа (дробная часть будет отброшена):");
let result = 1;
if (number !== null && !isNaN(number) && power !== null && !isNaN(power) && number !== "" && power !== "") {
  power = +power;
  number = +number;
  if (power < 0) {
    for (let i = -1; i >= power; i-- ) {
      result *= number;
    }
    result = 1 / result;
  }
  else if (power > 0) {
    for (let i = 1; i <= power; i++ ) {
      result *= number;
    }
  }
  console.log(result);
}
else {
  console.log("Данные введены некорректно или действие было отменено")
}