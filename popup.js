const toggleSwitch = document.getElementById("toggleSwitch");
const status = document.getElementById("status");

function updateStatus(enabled) {
    if (!status) return;

    status.textContent = enabled
        ? "Extension: ON"
        : "Extension: OFF";
}

chrome.storage.sync.get(["enabled"], (res) => {
    const enabled = res.enabled !== false;

    if (toggleSwitch) {
        toggleSwitch.checked = enabled;
    }

    updateStatus(enabled);
});

if (toggleSwitch) {
    toggleSwitch.addEventListener("change", () => {
        const enabled = toggleSwitch.checked;

        chrome.storage.sync.set({ enabled }, () => {
            updateStatus(enabled);

            chrome.tabs.query({}, (tabs) => {
                tabs.forEach(tab => {
                    if (tab.url && tab.url.includes("youtube.com")) {
                        chrome.tabs.reload(tab.id);
                    }
                });
            });
        });
    });
}