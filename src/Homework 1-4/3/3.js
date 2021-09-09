const add = addCreator();
const add5 = addCreator(5);
const add6 = addCreator(6);

console.log(add());
console.log(add(2));
console.log(add5(3));
console.log(add6(3));
console.log(addCreator(1)(3));

function addCreator(base = 0) {
    return function (step = 1) {
        return base + step;
    }
}