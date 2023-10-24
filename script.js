'use strict';
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate =  [4, 1, 15, 8, 3];
function checkDogs(dogsJulia, dogsKate){
    const dogsJuliaCorrected = dogsJulia.slice(1,3);
    const allDogs = [...dogsJuliaCorrected, ...dogsKate];
    console.log(allDogs);
    for ( const [dog , age] of allDogs.entries()){
        const dogAge = allDogs[dog] >= 3 ? 'Adult':'Puppy';
        if (dogAge === 'Adult'){
        console.log(`dog number ${dog +1} is an Adult , and is ${age} years old`)
    }
    else { console.log(`dog number ${dog+1} is still a puppy`)}
    }
}
checkDogs(dogsJulia , dogsKate);