var __frameTimer = {};

function __frameTime(now) {
    if (!__frameTimer.frameTimes) __frameTimer.frameTimes = [];
    if (!__frameTimer.last) __frameTimer.last = now;

    __frameTimer.frameTimes.push(now - __frameTimer.last);
    __frameTimer.last = now;
    if (__frameTimer.enabled) requestAnimationFrame(__frameTime);
    else {
        // save data
        const a = document.createElement("a");
        __frameTimer.frameTimes.shift(); // discard the first element, it's just noise
        a.href = URL.createObjectURL(
            new Blob([JSON.stringify(__frameTimer.frameTimes, null, 0)], {
                type: `text/plain`,
            })
        );
        a.download = "frame-times.json";
        a.click();
        __frameTimer.frameTimes.length = 0;
    }
}

chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
    switch (msg.ty) {
        case "toggle": {
            __frameTimer.enabled = !__frameTimer.enabled;
            if (__frameTimer.enabled) requestAnimationFrame(__frameTime);
            sendResponse(__frameTimer.enabled);
            break;
        }
    }
    return true;
});
console.log("Timer initilized");
