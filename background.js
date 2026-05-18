function drawIcon(color) {
    const canvas = new OffscreenCanvas(128, 128);
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 128, 128);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(64, 64, 55, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "bold 70px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Y", 64, 68);
}

function setIcon(enabled) {
    const color = enabled ? "#ff3b3b" : "#777777";

    const canvas = new OffscreenCanvas(128, 128);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(64, 64, 55, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "bold 70px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Y", 64, 68);

    const imageData = ctx.getImageData(0, 0, 128, 128);
    chrome.action.setIcon({ imageData });
}

async function initIcon() {
    const res = await chrome.storage.sync.get(["enabled"]);
    const enabled = res.enabled !== false;
    setIcon(enabled);
}

chrome.runtime.onInstalled.addListener(initIcon);

chrome.runtime.onStartup.addListener(initIcon);

chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
        setIcon(changes.enabled.newValue);
    }
});