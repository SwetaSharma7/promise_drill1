/***Problem3:**
- Create a function named `dynamicChain`.
- This function should take an array of functions that return Promises as input.
- Use a loop to dynamically chain the Promises returned by each function in the array.
- The final Promise should resolve with the result of the last function in the array.
 */

function dynamicChain(functionsArray) {
  let resultPromise = Promise.resolve();

  for (const func of functionsArray) {
    resultPromise = resultPromise.then(func);
  }

  return resultPromise;
}

function promise1() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("racePromise1 is done");
    }, 3000);
  });
}

function promise2() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("racePromise2 is done");
    }, 1000);
  });
}

//Array of functions
const functionsArray = [promise1, promise2];

dynamicChain(functionsArray)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });
