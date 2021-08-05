// код с 3-й лекции с изменениями от 1:24:59. В результате перестало срабатывать выведение сообщения с количеством отказов (см. строку 9).

(function() {
    let counterInvalid = counterCreator();    
    let counterNullExeption = counterCreator();
    const age = getAge({
        onReject: (checker) => {
            if (checker) {
                console.log(`Он безнадёжен, он уже ${counterNullExeption()} раз отказался, он не знает что такое число...`)
            } else {
                console.log(`Он безнадёжен, он сделал уже ${counterInvalid()} попыток, он не знает что такое число...`)
            }
        }
    });

    console.log(age);

    function getAge(options = {}) {
        let ageStr = prompt("Введите возраст: ");
        let age = +ageStr;
        if(validateNumber(age) && validateNumberStr(ageStr)) {
            return age;
        }
        // onReject && onReject(ageStr === null);  does the same as following: if(onReject) {onReject(ageStr === null);}
        if (typeof options.onReject === 'function') {
            options.onReject(ageStr === null);
        }
        return getAge(options.onReject);
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


// 50 > 6 && console.log("условие истинно")