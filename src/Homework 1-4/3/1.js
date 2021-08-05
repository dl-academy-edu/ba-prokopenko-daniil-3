function checkAge () {
    let age = prompt( "Введите ваш возраст:");
    age > 18 ? alert( "Успешно!" ) : checkAge()
}
  
checkAge();