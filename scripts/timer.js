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
        const payload = {
            url: window.location.href,
            frames: __frameTimer.frameTimes,
            userAgent: navigator.userAgent,
            gpu: navigator.gpu,
            deviceMemoryGb: navigator.deviceMemory,
            hardwareConcurrency: navigator.hardwareConcurrency,
            platform: navigator.userAgentData.platform,
            mobile: navigator.userAgentData.mobile,
            brands: navigator.userAgentData.brands,
        };
        __frameTimer.frameTimes.length = 0;
        a.href = URL.createObjectURL(
            new Blob([JSON.stringify(payload, null, 0)], {
                type: `text/plain`,
            }),
        );
        a.download = "frame-times.json";
        a.click();
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
