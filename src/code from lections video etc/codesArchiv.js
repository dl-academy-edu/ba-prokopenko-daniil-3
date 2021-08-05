// var es5V = "Hello, DL Academy!";
// let es6V = "Hello, new DL Academy!";
// const es6C = "Меня нельзя изменять";
// es6C = "Нет можно";
// alert(es5V);
// console.log(es5V);
// console.log(es5V);
// es5V += " I'm waiting for you."
// console.log(es5V);

// let str = prompt("Enter your name: ");
// console.log(str);
// alert(str === null);

// const obj = {
//     a: "123",
//     b: null
// };
// obj.a = "456";
// console.log(obj);

    // hw1

// const name = prompt("Введите имя: ");
// const sName = prompt("Введите фамилию: ");
// const age = +prompt("Введите возраст: ");

// const user = {
//     name,
//     sName,
//     age
// };

// console.log(user);

// let age = Number("Любая строка вместо числа");

// alert(age); // NaN, преобразование не удалось

// let age = prompt ("Введите возраст:");
// console.log(age);
// let verifyAge = (age<14)||(age>90);
// console.log(verifyAge);

// let userName = prompt("Кто там?");
// let password;
// // console.log(userName);
// if ((userName === null)||(userName === "")) {
//     alert("Отменено");
// }
// else if (userName === "Admin") {
//     password = prompt("Пароль?");
//     if ((password === null)||(password === "")) {
//         alert("Отменено");
//     }
//     else if (password === "Я Главный") {
//         alert("Здравствуйте!");
//     }
//     else alert("Неверный пароль");
// }
// else alert("Я вас не знаю");

// let i = 3;
// console.log(i % 2);

// let value = 0;

// while (value<=100 && value !== null) {
//     value = prompt("Введите число, большее 100:");
// }

// console.log(null>100);

// let value = prompt("Введите число, большее 100:");

// console.log(value);

// let num;

// do {
//   num = prompt("Введите число, большее 100?", 0);
//   console.log(num <= 100 && num !== null)
// } while (num <= 100 && num);

// console.log(Boolean(0))

// for (let i = 0; i <= 100; ) {
//     i = prompt('Введите число, большее 100', '');
//     if (!i) break;
// }

// let i=0;

// console.log(!i);

// let start = 2;  // начало диапазона чисел
// let n = 10;  // конец диапазона чисел
// let num;  // проверяемое число внутри диапазона
// let check;  // 

// num = 5;

// for (let i=start; i<num; i++) {
//     check = Boolean(num % i);
//     console.log(check);


// }

// let n = 10;

// nextPrime:
// for (let i = 2; i <= n; i++) { // Для всех i...

//   for (let j = 2; j < i; j++) { // проверить, делится ли число..
//     if (i % j == 0) continue nextPrime; // не подходит, берём следующее
//   }

//   alert( i ); // простое число
// }

// let catAge = 10;
// for (let i = 0; i < 9; i++) {
    
//     catAge += 5;
//     console.log(catAge);
//    }

// console.log(0%4)
// console.log(-0 === 0)


    //hw2-1
// let number = +prompt("Введите число, большее 0:");
// if (number > 0) {
//      for (let i = 1; i <= number; i++) {
//         if ((i % 4) !== 0) {
//             console.log(i)
//         }
//     }  
// }
// else {
//     console.log("Кажется, вы ввели неправильное число или нажали кнопку 'отмена' или 'escape'");
// }

     //hw2-2
// let number = prompt("Введите целое неотрицательное число:");
// if (number !== null && +number !== NaN && +number >= 0) {
//     number = +number;
//     let i = 1;
//     let factorial = 1;
//     while (i <= number) {
//         factorial *= i;
//         i++;
//     }
//     console.log(factorial);
// }
// else {
// console.log("Кажется, вы ввели неправильное число или нажали кнопку 'отмена' или 'escape'");
// }

   //hw2-3
// let number = prompt("Введите число:");
// let power = prompt("Введите степень числа (дробная часть будет отброшена):");
// let result = 1;
// if (number !== null && !isNaN(number) && power !== null && !isNaN(power)) {
//   power = +power;
//   number = +number;
//   if (power < 0) {
//     for (let i = -1; i >= power; i-- ) {
//       result *= number;
//     }
//     result = 1 / result;
//   }
//   else if (power > 0) {
//     for (let i = 1; i <= power; i++ ) {
//       result *= number;
//     }
//   }
//   console.log(result);
// }
// else {
//   console.log("Данные введены некорректно или действие было отменено")
// }

   //hw2-5
// let rand = Math.floor(1 + Math.random() * 10);
// let number;
// while(true) {
//     number = prompt("Введите число:");
//     if (number == rand) {
//         console.log("Верно!");
//         break;
//     }
//     else if (number === null) {
//         console.log("Отменено");
//         break;
//     }
// console.log("Не угадал!")
// }

// let number = prompt("Введите число:");
// let power = prompt("Введите степень числа (дробная часть будет отброшена):");
// let result = 1;
// if (number !== null && !isNaN(number) && power !== null && !isNaN(power) && number !== "" && power !== "") {
//   power = +power;
//   number = +number;
//   if (power < 0) {
//     for (let i = -1; i >= power; i-- ) {
//       result *= number;
//     }
//     result = 1 / result;
//   }
//   else if (power > 0) {
//     for (let i = 1; i <= power; i++ ) {
//       result *= number;
//     }
//   }
//   console.log(result);
// }
// else {
//   console.log("Данные введены некорректно или действие было отменено")
// }

// let number = prompt("Введите целое неотрицательное число:");
// if (number !== null && !isNaN(number) && +number >= 0 && number !== "") {
//     number = +number;
//     let i = 1;
//     let factorial = 1;
//     while (i <= number) {
//         factorial *= i;
//         i++;
//     }
//     console.log(factorial);
// }
// else {
// console.log("Кажется, вы ввели неправильное число или нажали кнопку 'отмена' или 'escape'");
// }

// function checkAge(age) {
//     if (age > 18) {
//       return true;
//     } else {
//       return confirm('Родители разрешили?');
//     }
// }

// function checkAge(age) {
//     let result = (age > 18) ? true : confirm('Родители разрешили?');
//     return result;
// }

// function checkAge(age) {
//     let result = (age > 18) || confirm('Родители разрешили?');
//     return result;
// }

// let age1 = prompt("Please enter your age");

// console.log(checkAge(prompt("Please enter your age")));

// function min (a, b) {
//     return (a < b) ? a : b;
// }

// console.log(min (3, 3));

// function pow(x, y) {
//     let result = 1;
//     for (let i = 0; i < y; i++) {
//         result *= x;
//     }
//     return result;
// }

// console.log(pow(3, 30));
// alert( pow );

// let ask = question => confirm(question) ? alert("Вы согласились") : alert("Вы отменили выполнение");

// ask("Вы согласны?");

// function hello(name) {
//     let phrase = `Hello, ${name}!`;
  
//     say(phrase);
//   }
  
//   function say(phrase) {
//     alert(`** ${phrase} **`);
//   }

//   hello("world");

// function pow(x, n) {
//     if (n < 0) {
//       alert("Отрицательные значения 'n' не поддерживаются");
//       return;
//     }
  
//     let result = 1;
  
//     for (let i = 0; i < n; i++) {
//       result *= x;
//     }
  
//     return result;
// }

// function pow(x, n) {
//     if (n < 0) {
//       alert("Отрицательные значения 'n' не поддерживаются");
//     } else {
//       let result = 1;
  
//       for (let i = 0; i < n; i++) {
//         result *= x;
//       }
  
//       return result;
//     }
//   }

// console.log(pow(2, -1));

// hw3-4
// function counterCreater(step=2) {
//   let index = 0;
//   return function () {
//     return index += step;
//     // console.log(c);
//   }
// }

// let counter = counterCreater(3);

// console.log(counter());
// console.log(counter());
// console.log(counter());
// console.log(counter());

// console.log(cs2);
// console.log(cs2);
// console.log(cs2);
// cs2();
// cs2();
// cs2();

// hw3-3 - not ready, have questions
// function addCreator(base = 0) {
//   return function (step = 1) {
//     return base + step;
//     // console.log(c);
//   }
// }

// const add = addCreator();
// const add5 = addCreator(5);
// const add6 = addCreator(6);

// console.log(add());
// console.log(add(2));
// console.log(add5(3));
// console.log(add6(3));
// console.log(addCreator(1)(3));




// hw3-1
// function checkAge () {
//   let age = prompt( "Введите ваш возраст:");
//   age > 18 ? alert("Успешно!") : checkAge()
// }

// checkAge();


// hw3-2
// function add(x, y) {
//   return x + y;
// }

// function subtract(x, y) {
//   return x - y;
// }

// function divide(x, y) {
//   return x/y;
// }

// function multiply(x, y) {
//   return x*y;
// }

// console.log(add(2, 5));
// console.log(subtract(2, 5));
// console.log(divide(2, 5));
// console.log(multiply(2, 5));

//lection 3

// (function() {
//     let name = prompt("Введите имя: ");
//     while(!validateStr(name)) {
//         name = prompt("Вы ввели неправильное имя. Введите имя заново: ");
//     }
    
//     let sName = prompt("Введите фамилию: ");
//     while(!validateStr(sName)) {
//         sName = prompt("Вы ввели неправильную фамилию. Введите фамилию заново: ");
//     }
    
//     let ageStr = prompt("Введите возраст: ");
//     let age = +ageStr;
//     while(!validateNumber(age) || !validateNumberStr(ageStr)) {
//         ageStr = prompt("Вы ввели неправильный возраст. Введите возраст заново: ");
//         age = +ageStr;
//     }
//     const user = {
//         name,
//         sName,
//         age
//     };
    
//     console.log(user);
// });   // removed () at the and to make function temporary not executing.

// (function() {
//     let counterInvalid = counterCreator();    
//     let counterNullExeption = counterCreator();
//     const age = getAge((checker) => {
//         if (checker) {
//             console.log(`Он безнадёжен, он уже ${counterNullExeption()} раз отказался, он не знает что такое число...`)
//         } else {
//             console.log(`Он безнадёжен, он сделал уже ${counterInvalid()} попыток, он не знает что такое число...`)
//         }
//     });

//     console.log(age);

//     function getAge(onReject) {
//         let ageStr = prompt("Введите возраст: ");
//         let age = +ageStr;
//         if(validateNumber(age) && validateNumberStr(ageStr)) {
//             return age;
//         }
//         onReject && onReject(ageStr === null);  //does the same as following: if(onReject) {onReject(ageStr === null);}
//         return getAge(onReject);
//     }
// })();

// function counterCreator(step = 1) {
//     let index = 0;
//     return function() {
//         index += step;
//         return index;
//     }
// }

// function validateStr(string) {
//     return typeof string === "string" && string.length;
// }

// function validateNumber(number) {
//     return typeof number === "number" && number === number;
// }

// function validateNumberStr(numberStr) {
//     return numberStr !== null && numberStr.length;
// }

// function printNumbers(from, to {

// })


// let str = "Hello world";
// let arr = ["werwer", "sdfh", "dfgdfkt", "null"];

// console.log(str.length);
// console.log(arr.length);

// console.log(arr[3]);
// console.log(str[6]);

// console.log(str.charAt(6));

// let Tu154 = {
//   type: "passenger plane",
//   majorVersions: ["", "A", "B", "B1", "B2", "M"],
//   manufacturer: {
//     name: "Tupolev",
//     country: "USSR" 
//   },
//   firstFlightDate: {
//     year: 1968,
//     month: 10,
//     day: 3,
//   },
//   dimensions: {
//     wingspan: 37.55,
//     wingArea: 201.5,
//     length: 47.9,
//     height: 11.4,
//     fuselageDiam: 3.8,
//   },
//   weights: {
//     maxTakeOffWeight: 102000,
//     emptyWeight: 51000,
//     maxPayloadWeight: 18000,
//     fuelCapacityWeight: 39750,
//   },
//   performance: {
//     maxSpeed: 975,
//     cruiseSpeed: 900,
//     maxRange: 3900,
//     ceiling: 12100,
//     fuellConsumption: 6200,
//   },
//   enginesNumber: 3,
//   maxPaxSeatsNumber: 180,
//   cockpitCrue: 4,
//   engine: {
//     name: "NK-8-2U",
//     manufacturer: {
//       name: "Kuznetsov",
//       country: "USSR"
//     },
//     type: "by-pass turbofan",
//     takeOffTrust: 105000,
//   }
// }

// let Boeing787 = {
//   type: "passenger plane",
//   majorVersions: ["-8", "-9", "-10"],
//   manufacturer: {
//     name: "Boeing",
//     country: "USA" 
//   },
//   firstFlightDate: {
//     year: 2009,
//     month: 12,
//     day: 15,
//   },
//   dimensions: {
//     wingspan: 60.17,
//     wingArea: 325,
//     length: 56.69,
//     height: 17,
//     fuselageDiam: 5.77,
//   },
//   weights: {
//     maxTakeOffWeight: 227930,
//     emptyWeight: 118000,
//     maxPayloadWeight: 43318,
//     fuelCapacityWeight: 39750,
//   },
//   performance: {
//     maxSpeed: 956,
//     cruiseSpeed: 902,
//     maxRange: 13620,
//     ceiling: 13100,
//     fuellConsumption: 4800,
//   },
//   enginesNumber: 2,
//   maxPaxSeatsNumber: 242,
//   cockpitCrue: 2,
//   engine: {
//     name: "GEnx-1B",
//     manufacturer: {
//       name: "General Electric",
//       country: "USA"
//     },
//     type: "by-pass turbofan",
//     takeOffTrust: 280000,
//   }
// }

// console.log(Boeing787.firstFlightDate);
// console.log(Tu154.firstFlightDate);
// console.log(`Самолёт Ту-154 совершил свой первый полёт ${Tu154.firstFlightDate.day}-${Tu154.firstFlightDate.month}-${Tu154.firstFlightDate.year}.`);
// console.log(`Самолёт Boeing 787 совершил свой первый полёт ${Boeing787.firstFlightDate.day}-${Boeing787.firstFlightDate.month}-${Boeing787.firstFlightDate.year}.`);
// console.log(Object.keys(Tu154));
// console.log(Object.keys(Tu154.weights));


  //lection 4
  (function() {
    let obj = {};
    while(true) {
      let key = prompt("Введите название ключа: ");
      if(!key) {
        break;
      }
      let value = prompt(`Введите значение для ключа: ${key}: `);
      if(!value) {
        break;
      }
      obj[key] = value;
    }
    const keys = Object.keys(obj);
    // console.log(keys);
    keys.forEach((key, index) => {
      console.log(`${index + 1}) obj.${key} = ${obj[key]};`);
    });
    // console.log(obj);
  });
  
  //continue watching movie at 1:21:00;
  
  (function() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
    const arr2 = arr.filter((number, index, array) => {
      if(number % 2 === 0) {
        return true;
      } else {
        return false;
      }
    });
    console.log(arr2)
  });
  
  //the same as previous but simplier and shorter code:
  
  (function() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const arr2 = arr.filter(number => !(number % 2));
    console.log(arr2);
  });
  
  (function() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let id = 1;
    const arr2 = arr
      .map(item => {
        return {
          id: id++,
          name: item % 2 ? "Петя" : "Катя",
          age: item + 20,
        }
      })
    console.log(arr2);
  });
  
  (function() {
    const arr = [1, 2, 3];
    let id = 1;
    const users = arr
      .map(item => ({
          id: id++,
          name: prompt("Введите имя пользователя"),
          age: item + 20,
      }))
      // .every(item => item < 18)
      // .findIndex(item => item.age === 23)
    console.log(users);
    // console.log(
    //   users
    //   .some(item => item.age < 18)
    // );
  
    // console.log(
    //   users
    //     .map(item => item.name)
    //     .join(', ') + '.'
    // );
    const findName = prompt("Введите имя для поиска: ");
  
    // const user = users.find(item => item.name
    //   .toLocaleLowerCase()
    //   .trim()
    //   .includes(
    //     findName
    //     .toLocaleLowerCase()
    //     .trim()
    //   )
    // );
  
    //following is the same as prev.:
  
    const user = users.find(({name}) => name   
      .toLocaleLowerCase()
      .trim()
      .includes(
        findName
        .toLocaleLowerCase()
        .trim()
      )
    );
    console.log(user);
  
    const summAge = users.reduce((prev, item, index, array) => {
      return prev + item.age;
    }, 0);
    console.log(summAge / users.length);
    const deletedUsers = users.splice(1, 1);
    console.log(deletedUsers);
  });
  
  (function() {
    const timeoutId = setTimeout(() => {
      alert("Привет, это таймер!");
    }, 10000);
  
    const intervalId = setInterval(() => {
      console.log("Привет, это интервал!");
    }, 1000)
  
    const timeoutId1 = setTimeout(() => {
      clearInterval(intervalId);
    }, 20000);
  
  });
  
  //continue watching movie at 1:48:00;
  
    //Array methods examples
  
  //indexOf
  
  // const a = [9, 8, 7, 5, 7, 5, 2];
  // const b = ["Hi", "hello"]
  // console.log (a.indexOf(7));
  // console.log (a.indexOf(7, 3));
  // console.log (b.indexOf("hello"));
  // console.table(a);
  // if (a.indexOf(7) !== -1) {
  //   console.log("yes");
  // } else {
  //   console.log("no");
  // }
  
  // const a = [3, 4, 5, 6, 8, 0, 143, 45];
  // const a = [];
  // a[0] = 5;
  // a[4] = 6;
  
  
  //map
  
  // let b = a.map((item, index) => {
  //   // console.log(index);
  //   return 1;
  // });
  
  // console.log(b);
  
  //filter
  
  // let c = a.filter((item, index) => {
  //   if (item % 2 === 0) {
  //     return true;
  //   }
  // })
  
  // console.log(c);
  
  //includes
  // const test = [44, 55, 66, 77, 88, 2, 3, 4];
  
  // if (test.includes(55, 2)) {
  //   console.log("yes");
  // } else {
  //   console.log("no");
  // }
  
  // console.log(!test.indexOf(737));
  
  // const users = [
  //   {"name": "Ivanov", "age": 44},
  //   {"name": "Petrov", "age": 14},
  //   {"name": "Pitrov", "age": 37},
  //   {"name": "Alexeev", "age": 43},
  // ]
  
  // console.log(users);
  
  // let newUsers = users.filter(item => item.name.includes("ov"));
  // console.log(newUsers);
  
  // const temp = [0, 4,4,6,8,10, 6, 4, 3, -1, -2, -2];
  // // F = C*1.85 + 32
  
  // const z = [];
  
  // let tF = temp.map(item => {
  //   console.log(item);
  //   return 10+item*1.8;
  // })
  
  // console.log(tF);
  
  //push
  
  // let a = [99, 88];
  // console.log(a);
  // a[0] = 66;
  
  // console.log(a);
  // a[a.length] = 55;
  // a[a.length] = 77;
  // console.log(a);
  
  // a.push(44, 33, 22);
  // console.log(a);
  // console.log(a.push(111));
  // console.log(a);
  
  //pop
  
  // a.pop();
  // console.log(a);
  // console.log(a.pop());
  // console.log(a);
  
  // const b = [3];
  // console.log(b);
  // console.log(b.pop());
  // console.log(b);
  
  // let car = [];
  
  //filter
  
  // const a = [3, 1, 3, -5, -3, -4, 5, -2, 67, 2, 9, 7, 0];
  
  // let b = a.filter(item => {
  //   if (item > -1) return true;
  // }).sort((a, b) => (a - b));
  
  // console.log(b);
  
     //reduce, isArray
  
  // let a = [-3, 4, -5, 7, -6, 2];
  
  // let b = a.reduce((accum, item) => {
  //   if (item > 0) {
  //     accum += item;
  //   }
  //   return accum;
    
  // }, 0);  // 0 - стартовое значение переменной accum (по умолчанию в неё кладётся первый элемент массива), без неё работает некорректно.
  
  // let b = a.reduce((accum, item) => {
  //   if (item > accum) {
  //     accum = item;
  //   }
  //   return accum;
  // });  
  
  // console.log(b);
  
  // [55, 75, 175]
  
  // let a = [
  //   {"id" : 55, "city" : "arc"},
  //   {"id" : 75, "city" : "rca"},
  //   {"id" : 175, "city" : "bra"},
  // ];
  
  // let b = a.reduce((accum, item) => {
  //   accum.push(item.id);
  //   return accum;
  // }, []); 
  
  // console.log(b);
  // console.log(Array.isArray(b));
  
     // shift, unshift, slice
  
  // let a = [3,4,5];
  
  // let b = a.shift();
  
  // console.log(b);
  // console.log(a);
  
  // let c = a.unshift(22);
  // console.log(a);
  // console.log(c);
  
  // let d = [22, 33, 44, 55, 66, 77, 88, 99];
  // let f = d.slice(3, 6);
  // console.log(d);
  // console.log(f);
  
  // let e = "hello";
  // console.log(e.slice(0,4));
  
    // concat
  
  // const a1 = [21, 22, 23, 24];
  // const a2 = [31, 32, 33, 34];
  // const a3 = [48, 49, 50];
  // const a4 = [];
  // a4[22] = 100;
  // console.table(a4);
  // const b = a1.concat(a2, a3, a4);
  // console.table(b);
  // console.log(b[11]);
  
     //concat -> string
  
  // let c = "hello";
  // let d = "hi";
  // let f = c.concat(d);
  // console.log(f);
  
     //splice
  
  // let k = [33, 44, 55, 66, 77, 88];
  // k.splice(2, 2, "hi", "dd", "tt");
  // console.log(k);
  
  
    //hw 4
  
    // Обратный отсчёт версия 1
  (function() {
    let delay = 10;
    alert(`Информация будет выведена через ${delay} секунд в консоль!`);
    for (let i = 0; i < delay; i++) {
      let step;
      step = i*1000;
      let timer = setTimeout(() => {
        console.log(delay - i)
      }, step);
    };
    let launch = setTimeout(() => {
      console.log("Поехали!");  // <-- Заменить на вызов нужной функции, показывающий текст
      for (let i = 0; i < 3; i++) {
        console.log(` `);
        printLanguageStory(i);
      }
    }, (delay*1000));
  });
  
    // Обратный отсчёт версия 2
  (function() {
    let delay = 10;
    alert(`Информация будет выведена через ${delay} секунд в консоль!`);
    const launch = setTimeout(() => {
      console.log("Поехали!");  // <-- Заменить на вызов нужной функции, показывающий текст
    }, (delay*1000));
    let counter = delay;
    let getOneStep = function(interval) {
      console.log(interval);
      counter--;
    }
    let getStep = function(interval) {
      if (counter) {
        let timer = setTimeout(() => {
          getOneStep(counter);
          getStep(counter);
        }, 1000);
      }
    }
    getOneStep(counter);
    getStep(counter);
  });
  
    // Обратный отсчёт версия 3
  (function() {
    let delay = 10;
    alert(`Информация будет выведена через ${delay} секунд в консоль!`);
    const launch = setTimeout(() => {
      console.log("Поехали!");  // <-- Заменить на вызов нужной функции, показывающий текст
    }, (delay*1000));
    let step = delay;
    let getStep = function(interval) {
      console.log(interval);
      step--;
    }
    getStep(step);
    const backwardsTimer = setInterval(() => {
      getStep(step);
    }, 1000)
    const killTimer = setTimeout(() => {
      clearInterval(backwardsTimer);
    }, (delay*1000));
  });
  
    // program
  const developers = [
    {
        index:0,
        name:"Брендан Эйх",
        work: "специалист в области информатики, программист, технический директор"
    },
    {
        index:2,
        name: "Джеймс Гослинг",
        work: "специалист в области информационных технологий"
    },
    {
        index:3,
        name: "Бьёрн Страуструп",
        work: "программист"
    }
  ]
  
  const data = [
    {
        name:"JavaScript",
        year: 1995,
        filenameExtensions: "js, mjs",
        influencedBy: ["AWK", "C", "HyperTalk", "Java", "Lua", "Perl", "Python", "Scheme", "Self"],
        affectedBy: ["ActionScript", "AtScript", "CoffeeScript", "Dart", "JScript .NET", "LiveScript", "Objective-J", "Opa", "QML", "Raku", "TypeScript"],
        developerIndex:0,
    },
    {
        name:"Java",
        year: 1995,
        filenameExtensions: "java, class, jar, jad, jmod",
        influencedBy: ["C++", "Си", "Ада", "Simula 67", "Smalltalk", "Objective-C", "Object Pascal", "Оберон", "Eiffel", "Модула-3", "Mesa", "Симула", "C#", "UCSD Pascal"],
        affectedBy: ["Ada 2005", "BeanShell", "C#", "Chapel", "Clojure", "ECMAScript", "Fantom", "Gambas", "Groovy", "Hack", "Haxe", "J#", "Kotlin", "PHP", "Python", "Scala", "Seed7", "Vala"],
        developerIndex: 2,
    },
    {
        name:"C++",
        year: 1983,
        filenameExtensions: "cc, cpp, cxx, c, c++, h, hpp, hh, hxx, h++",
        influencedBy: ["C++", "Си", "Ада", "Simula 67", "Smalltalk", "Objective-C", "Object Pascal", "Оберон", "Eiffel", "Модула-3", "Mesa", "Симула", "C#", "UCSD Pascal"],
        affectedBy: ["Ada", "C", "Modula-2", "Simula"],
        developerIndex: 3,
    },
  ];
  
  let delay = 10;
  alert(`Информация будет выведена через ${delay} секунд в консоль!`);
  for (let i = 0; i < delay; i++) {
    let step;
    step = i*1000;
    let timer = setTimeout(() => {
      console.log(delay - i)
    }, step);
  };
  let launch = setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      console.log(` `);
      printLanguageStory(i);
    }
  }, (delay*1000));
  
  function printLanguageStory (languageNumber) {
    let languageName = data[languageNumber].name;
    let languageYearOfRelease = data[languageNumber].year;
    let languageDeveloperName = developers[languageNumber].name;
    let languageDeveloperWork = developers[languageNumber].work;
    let languageFileExtensions = "." + data[languageNumber].filenameExtensions.split(", ").join(", .");
    let languagesInfluencedByQty = data[languageNumber].influencedBy.length;
    let languagesInfluencedBy = languagesInfluencedByQty > 4 ? 
      data[languageNumber].influencedBy.slice(0, 4).join(", ") + " и другие языки программирования" : 
        data[languageNumber].influencedBy.join(", ");
    let languagesAffectedBy = data[languageNumber].affectedBy.join(", ");
    console.log(`${languageName} - язык программирования, выпущенный в ${languageYearOfRelease} году.`);
    console.log(`Автором языка программирования стал ${languageDeveloperName} - ${languageDeveloperWork}.`);
    console.log(`Файлы программ, написанных на ${languageName}, могут иметь расширения ${languageFileExtensions}.`);
    console.log(`${languageName} испытал влияние ${languagesInfluencedByQty} языков программирования: ${languagesInfluencedBy}.`);
    console.log(`${languageName} повлиял на ${languagesAffectedBy}.`);
  };
  
  
  
  
  
  
  