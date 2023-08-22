function __frameTime() {
    const now = Date.now();
    if (!window.frameTimes) window.frameTimes = [];
    if (!window.last) window.last = Date.now();

    window.frameTimes.push(now - window.last);
    window.last = now;
    console.log(window.frameTimes[window.frameTimes.length - 1]);
    if (window.enabled) requestAnimationFrame(__frameTime);
}

chrome.runtime.onMessage.addListener(function() {
    console.log("msg");
    window.enabled = !window.enabled;
    if (window.enabled) requestAnimationFrame(__frameTime);
    return true;
});
console.log("Hello timer");
