const SELECTOR = 'img.branding-img.iv-click-target';

function applyState(enabled) {
    const elements = document.querySelectorAll(SELECTOR);

    elements.forEach(el => {
        if (enabled) {
            el.style.display = "none";
        } else {
            el.style.display = "";
        }
    });
}

chrome.storage.sync.get(["enabled"], (res) => {
    const enabled = res.enabled !== false;
    applyState(enabled);
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
        applyState(changes.enabled.newValue);
    }
});


const observer = new MutationObserver(() => {
    chrome.storage.sync.get(["enabled"], (res) => {
        const enabled = res.enabled !== false;
        applyState(enabled);
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});