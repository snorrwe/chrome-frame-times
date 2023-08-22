var frameTimes = [];
var last = Date.now();

function __frameTime() {
    const now = Date.now();
    if (!window.frameTimes) window.frameTimes = [];
    if (!window.last) window.last = Date.now();

    window.frameTimes.push(now - window.last);
    window.last = now;
    if (window.enabled) requestAnimationFrame(__frameTime);
    else {
        // save data
        const a = document.createElement("a");
        a.href = URL.createObjectURL(
            new Blob([JSON.stringify(window.frameTimes, null, 0)], {
                type: `text/plain`,
            }),
        );
        a.download = "frame-times.json";
        a.click();
        frameTimes.length = 0;
    }
}

chrome.runtime.onMessage.addListener(function() {
    window.enabled = !window.enabled;
    if (window.enabled) requestAnimationFrame(__frameTime);
    return true;
});
console.log("Timer initilized");
