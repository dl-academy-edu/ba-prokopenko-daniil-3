// Приведённые ниже четыре функции чистые, потому что:
//  - результат выполнения всегда одинаков для одного и того же набора аргументов,
//  - у функции нет побочных эффектов (таких как console.log, alert, запись 
//    или чтение внешних переменных, etc.)


function add(x, y) {
    return x + y;
}
  
  function subtract(x, y) {
    return x - y;
}
  
  function divide(x, y) {
    return x/y;
}
  
  function multiply(x, y) {
    return x*y;
}
  
console.log(add(2, 5));
console.log(subtract(2, 5));
console.log(divide(2, 5));
console.log(multiply(2, 5));

