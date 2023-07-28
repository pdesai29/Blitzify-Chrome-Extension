chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("github.com")) {
    const url = new URL(tab.url);
    const pathSegments = url.pathname.split("/");
    console.log(pathSegments);

    if (pathSegments.length === 2) {
      console.log(pathSegments);
      chrome.tabs.sendMessage(tabId, {
        type: "GITHUB_PROFILE",
        repo: pathSegments[2],
        url,
      });
    } else if (pathSegments.length >= 3) {
      chrome.tabs.sendMessage(tabId, {
        type: "GITHUB_REPO",
        repo: pathSegments[1] + "/" + pathSegments[2],
      });
    }
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "OPEN_TAB") {
    chrome.tabs.create({
      url: message.url,
    });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "Throw_Error") {
    chrome.notifications.create("errorNotification", message.error);
  }
});
