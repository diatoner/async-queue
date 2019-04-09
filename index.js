'use strict';

// queueAsync :: [ x -> Promise ] -> Promise
/* Takes an Array of functions that return promises, given particular
 * input, and performs them in series.
 */
function queueAsync (promiseFuncs) {

  const result = promiseFuncs.reduce(async (prev, next) => {

    try {

      const result = await prev;
      return next(result);

    } catch (err) {
    
      console.error(err);
      throw err;
    
    }
  
  }, true);

}

function test () {

  const queue = [
    (dat) => new Promise((res) => setTimeout(() => res(dat), 1000)),
    console.log,
    (dat) => new Promise((res) => setTimeout(() => res('Oi!'), 1000)),
    console.log,
    (dat) => new Promise((r, x) => setTimeout(() => x('Fail!'), 1000)),
  ];

  (async () => {

    // Should log in intervals of 1 second:
    // 1. "true"
    // 2. "Oi!"
    // Should then throw an error: "Fail!"
    await queueAsync(queue);

  })();

}

test();
