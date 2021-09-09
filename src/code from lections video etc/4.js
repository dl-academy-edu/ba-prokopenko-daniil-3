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