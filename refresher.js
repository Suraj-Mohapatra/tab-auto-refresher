// to refresh selected tab
document.getElementById("start").addEventListener("click", () => {
    const selectedElement = document.querySelector('.custom-dropdown-selected');
    const tabId = parseInt(selectedElement.dataset.value, 10);
    const intervalInput = document.getElementById("interval").value;
    const intervalSeconds = Number(intervalInput);

    if (!selectedElement.dataset.value || isNaN(tabId)) {
        showCustomAlert("Please select a tab");
        return;
    }

    if (!intervalInput || isNaN(intervalSeconds) || intervalSeconds <= 0) {
        showCustomAlert("Please enter a valid interval");
        return;
    }

    // sends start request to the service worker

    chrome.runtime.sendMessage({
        action: "start",
        tabId,
        interval: intervalSeconds
    });

    // to sabve this tab as active in chrome.storage.local
    if (chrome?.storage?.local) {
        chrome.storage.local.get({ activeTabs: [] }, (data) => {
            let activeTabs = data.activeTabs || [];

            if (!activeTabs.includes(tabId)) {
                activeTabs.push(tabId);
                chrome.storage.local.set({ activeTabs }, () => {
                    if (typeof updateDropdownActiveStatus === 'function') {
                        updateDropdownActiveStatus();
                    }
                });
            }
        });
    }
});

// stop refresh on a selected tab
document.getElementById("stop").addEventListener("click", () => {
    const selectedElement = document.querySelector('.custom-dropdown-selected');
    const tabId = parseInt(selectedElement.dataset.value, 10);

    if (!selectedElement.dataset.value || isNaN(tabId)) {
        showCustomAlert("Please select a tab");
        return;
    }

    // to send stop message to service worker
    chrome.runtime.sendMessage({
        action: "stop",
        tabId
    });

    // removes this tab from activeTabs in chrome.storage.local
    if (chrome?.storage?.local) {
        chrome.storage.local.get({ activeTabs: [] }, (data) => {
            let activeTabs = data.activeTabs || [];

            if (activeTabs.includes(tabId)) {
                activeTabs = activeTabs.filter(id => id !== tabId);
                chrome.storage.local.set({ activeTabs }, () => {
                    if (typeof updateDropdownActiveStatus === 'function') {
                        updateDropdownActiveStatus();
                    }
                });
            }
        });
    }
});
