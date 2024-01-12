/***Problem1:**
- Create two functions, `racePromise1` and `racePromise2`.
- Both functions should return a Promise that resolves with a unique success message after a r
andom delay between 1 and 3 seconds.
- Implement a third function, `racePromises`, that races the execution of the two functions.
 The Promise should resolve with the message of the function that resolves first.
 */

function racePromise1() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("racePromise1 is successed");
    }, Math.random() * 2000 + 1000);
  });
}

function racePromise2() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("racePromise2 is done");
    }, Math.random() * 2000 + 1000);
  });
}

function racePromises() {
  let p1 = racePromise1();
  let p2 = racePromise2();
  Promise.race([p1, p2])
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

racePromises();
