// Задание 1
function pickPropArray(arr, param) {
    let result = new Array();
    for(let i = 0; i<arr.length; i++){
        result.push(arr[i][param]);
    };
    return result;
};

const students = [
    { name: 'Павел', age: 20 },
    { name: 'Иван', age: 20 },
    { name: 'Эдем', age: 20 },
    { name: 'Денис', age: 20 },
    { name: 'Виктория', age: 20 },
    { age: 40 },
];
 
const result = pickPropArray(students, 'name');
 
console.log(result) ;
// Задание 2

function createCounter() {
    let i = 0;
    return function () {
      console.log(++i);
    };
  };
  
  const counter1 = createCounter();
  counter1(); // 1
  counter1(); // 2
  
  const counter2 = createCounter();
  counter2(); // 1
  counter2(); // 2
  
// Задание 3
function spinWords(from){
    let mass = from.split(' ');
    let result = new Array();
    for(let i = 0; i < mass.length;i++){
        if(mass[i].length >= 5){
            result.push(mass[i].split('').reverse().join());
        } else{
            result.push(mass[i]);
        };
    };
    return result;
};

const result1 = spinWords( "Привет от Legacy" );
console.log(result1); // тевирП от ycageL

const result2 = spinWords( "This is a test" );
console.log(result2); // This is a test

// Задание 4
function funk(nums, target){
    for(let i = 0; i < nums.length-1; i++){
        let a = nums[i];
        for(let j = i+1; j < nums.length;j++){
            let b = nums[j];
            if(a+b == target){
                return [i,j];
            }
        }
    }
}
let nums = [2,77,11,7];
target = 9;
console.log(funk(nums, target));

// Задание 5

