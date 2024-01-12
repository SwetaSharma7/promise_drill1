/***Problem4:**
- Create a function named `parallelLimit`.
- This function should take an array of Promises and a limit parameter (number of Promises that can run in parallel).
- Execute the Promises in parallel, but ensure that no more than the specified limit are running simultaneously.
- The function should resolve with an array containing the results of all the Promises.
 */
function parallelLimit(arrayOfPromises, limit) {
  return new Promise((resolve, reject) => {
    if (limit >= arrayOfPromises.length) {
      return Promise.allSettled(arrayOfPromises)
        .then((results) => resolve(results))
        .catch((err) => reject(err));
    }

    let initialPromises = arrayOfPromises.slice(0, limit);

    Promise.all(initialPromises)
      .then((firstArray) => {
        let array = [];
        let count = limit;

        function check() {
          if (count >= arrayOfPromises.length) {
            let finalResult = firstArray.concat(array);
            resolve(finalResult);
            return;
          }

          if (
            arrayOfPromises.length > limit &&
            count < arrayOfPromises.length
          ) {
            arrayOfPromises[count]
              .then((innerResult) => {
                array.push(innerResult);
                count += 1;
                check();
              })
              .catch((err) => {
                array.push(err);
                count += 1;
                check();
              });
          }
        }

        check();
      })
      .catch((err) => {
        reject(err);
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
    resolve("promise2 is done");
  }, 2000);
});

const promise3 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("promise3 is successful");
  }, 3000);
});

let res = parallelLimit([promise1, promise2, promise3], 1)
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.error(err);
  });
