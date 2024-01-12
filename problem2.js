/***Problem2:**
- Create a function named `composePromises`.
- This function should take an array of Promises as input and return a new Promise.
- The new Promise should resolve with an array containing the results of all the input Promises, 
  in the order they were provided.
 */
function composePromises(promisesArray) {
  return Promise.allSettled(promisesArray).then((result) => {
    return result.map((promiseResult) => {
      return promiseResult.status === "fulfilled"
        ? promiseResult.value
        : promiseResult.reason;
    });
  });
}

const promise1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("promise1 is done");
  }, 1000);
});

const promise2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject("promise2 got rejected");
  }, 2000);
});

const promise3 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("promise3 is done");
  }, 3000);
});

composePromises([promise1, promise2, promise3])
  .then((resultArray) => {
    console.log(resultArray);
  })
  .catch((err) => {
    console.error(err);
  });
