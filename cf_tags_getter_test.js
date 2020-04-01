const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
o.addArguments('start-fullscreen');
o.addArguments('disable-infobars');
o.addArguments('headless'); // running test on visual chrome browser
o.setUserPreferences({ credential_enable_service: false });
 

function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleep(n) {
    msleep(n*1000);
}

