// handle alarm events
chrome.alarms.onAlarm.addListener((alarm) => {
    const tabId = parseInt(alarm.name, 10);
    chrome.tabs.reload(tabId);
});

// listen to start/stop event from popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "start") {
        chrome.alarms.create(String(msg.tabId), {
            periodInMinutes: msg.interval / 60 // Convert seconds to minutes
        });
        chrome.storage.local.set({ [msg.tabId]: msg.interval });
    }
    else if (msg.action === "stop") {
        chrome.alarms.clear(String(msg.tabId));
        chrome.storage.local.remove(String(msg.tabId));
    }
});
