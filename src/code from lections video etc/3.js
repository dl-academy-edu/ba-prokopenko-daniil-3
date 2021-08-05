//code from lection 3 "functions". Some functions temporary deactivated, see comments below on row 27.

(function() {
    let name = prompt("Введите имя: ");
    while(!validateStr(name)) {
        name = prompt("Вы ввели неправильное имя. Введите имя заново: ");
    }
    
    let sName = prompt("Введите фамилию: ");
    while(!validateStr(sName)) {
        sName = prompt("Вы ввели неправильную фамилию. Введите фамилию заново: ");
    }
    
    let ageStr = prompt("Введите возраст: ");
    let age = +ageStr;
    while(!validateNumber(age) || !validateNumberStr(ageStr)) {
        ageStr = prompt("Вы ввели неправильный возраст. Введите возраст заново: ");
        age = +ageStr;
    }
    const user = {
        name,
        sName,
        age
    };
    
    console.log(user);
});   // removed () at the and to make function temporary not executing.

(function() {
    let counterInvalid = counterCreator();    
    let counterNullExeption = counterCreator();
    const age = getAge((checker) => {
        if (checker) {
            console.log(`Он безнадёжен, он уже ${counterNullExeption()} раз отказался, он не знает что такое число...`)
        } else {
            console.log(`Он безнадёжен, он сделал уже ${counterInvalid()} попыток, он не знает что такое число...`)
        }
    });

    console.log(age);

    function getAge(onReject) {
        let ageStr = prompt("Введите возраст: ");
        let age = +ageStr;
        if(validateNumber(age) && validateNumberStr(ageStr)) {
            return age;
        }
        onReject && onReject(ageStr === null);  //does the same as following: if(onReject) {onReject(ageStr === null);}
        return getAge(onReject);
    }
})();

function counterCreator(step = 1) {
    let index = 0;
    return function() {
        index += step;
        return index;
    }
}

function validateStr(string) {
    return typeof string === "string" && string.length;
}

function validateNumber(number) {
    return typeof number === "number" && number === number;
}

function validateNumberStr(numberStr) {
    return numberStr !== null && numberStr.length;
}