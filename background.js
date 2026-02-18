chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "autoFill") {
        // Get the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                sendResponse({ status: "No active tab" });
                return;
            }

            const activeTabId = tabs[0].id;

            // Get profile from storage
            chrome.storage.local.get(["profile"], (result) => {
                if (result.profile) {
                    // Inject content script
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: activeTabId },
                            files: ["content.js"],
                        },
                        () => {
                            if (chrome.runtime.lastError) {
                                console.error(chrome.runtime.lastError.message);
                                sendResponse({ status: "Error injecting script" });
                            } else {
                                // Send profile data to the content script
                                chrome.tabs.sendMessage(activeTabId, {
                                    action: "fillForm",
                                    profile: result.profile,
                                });
                                sendResponse({ status: "Script injected and message sent" });
                            }
                        }
                    );
                } else {
                    sendResponse({ status: "No profile found" });
                }
            });
        });
        return true; // Keep the message channel open for async response
    }
});
