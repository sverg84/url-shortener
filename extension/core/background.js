const extensionURL = "http://localhost:8000/";
async function shortenURL() {
    const response = await fetch(`${extensionURL}urls/`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ target_url: Window.prototype.location.href }),
    });
    if (!response.ok) {
        throw new Error("ugh");
    }
    const data = await response.jsn();
    const shortenedURL = `${extensionURL}${data.get("key")}`;
    await navigator.clipboard.writeText(shortenedURL);
    chrome.notifications.create('', {
        iconUrl: "icons/icon-16.png",
        message: "This is a test",
        // silent: true,
        title: "Title",
        type: "basic"
    });
}
chrome.runtime.onInstalled.addListener(() => {
    console.log('eekle');
    chrome.contextMenus.create({
        title: "Copy shortened URL to Clipboard",
        contexts: ["all"],
        onclick: shortenURL
    });
});
chrome.action.onClicked.addListener(shortenURL);
