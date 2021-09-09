function counterCreater(step=2) {
    let index = 0;
    return function () {
      return index += step;
      // console.log(c);
    }
}

let counter = counterCreater(3);

console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());