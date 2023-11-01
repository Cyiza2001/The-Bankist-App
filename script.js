'use strict';
/*const movements= [200, 450, -400, 3000, -650, -130, 70, 1300];
const withdrawals = movements.filter(function(mov){
    return mov < 0;
});
console.log(withdrawals);*/

const dogAge1 = [5, 2, 4, 1, 15, 8, 3];
const dogAge2 = [16, 6, 10, 5, 6, 1, 4];
function calcAverageHumanAge (ages) {

 /*const humanAges = ages.map(age =>
    (age <=2 ? 2* age: 16 + age *4));
const adults = humanAges.filter(age => age >= 18);
const  average = adults.reduce( (acc, age) => acc + age,0)/adults.length;
return average;*/
     let humanAge = [];
     for (const age of ages){
        if (age <= 2){
            const dogToHumanAge = 2* age;
            humanAge.push(dogToHumanAge);
        }
        else {
            const dogToHumanAge = 16 + age *4;
            humanAge.push(dogToHumanAge);
        }
     };
     const filteredHumanAge = humanAge.filter(function(manAge){
        return manAge >= 18;
      });
   const AverageHumanAge = filteredHumanAge.reduce(function(acc , mansAge){
return acc + mansAge;
   }, 0)/filteredHumanAge.length;
   return AverageHumanAge;
}

console.log(calcAverageHumanAge(dogAge1));
console.log(calcAverageHumanAge(dogAge2));