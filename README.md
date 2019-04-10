# async-queue
Queuing asynchronous operations in ES8, per [this blog post of mine](https://www.fourzerofour.pw/posts/asynchronous-queues/).

Fundamentally, we want to perform a number of arbitrary asynchronous functions in series.

For repeat operations - for example, performing the same asynchronous operation across multiple pieces of data which we already have, using for-of syntax generally suits:

```js

const readFile = require('util').promisify(require('fs').readFile);

(async () => {
  const files = [ './2019-01-02.log', './2018-01-01.log', './2000-12-12-.log' ];
  
  for (const file of files) {
    const result = await readFile(file);
    
    // ... do something ...
    
  }
})();
```

But when he have various operations, often acting in an asynchronous chain and passing results to each other, I'd argue that it's more idiomatic to use `Array.reduce()`. Take a look at `index.js` to see how I've done it - and let me know what you think!
