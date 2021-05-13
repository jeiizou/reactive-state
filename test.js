setTimeout(() => {
    setTimeout(() => {
        console.log('setTimeout');
    }, 200);
    let curTime = Date.now();
    while (Date.now() - curTime > 1000) {}
    setImmediate(() => {
        console.log('setImmediate');
    });
}, 0);
