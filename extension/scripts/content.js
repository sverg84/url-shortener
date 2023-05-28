import "chrome-types";
import "fetch";
async function shortenURL() {
    const response = await fetch("http://127.0.0.1:8000/urls/", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ target_url: document.location.href }),
    });
    if (!response.ok) {
        throw new Error("ugh");
    }
    const data = await response.json();
    const shortenedURL = `http://127.0.0.1:8000/${data.get("key")}`;
    await navigator.clipboard.writeText(shortenedURL);
    chrome.notifications.create(undefined, {
        message: "This is a test",
        silent: true,
        title: "Title",
        type: "basic"
    });
}
chrome.runtime.onInstalled.addListener(() => {
    console.log('eekle');
    chrome.contextMenus.create({
        title: "Copy shortened URL to Clipboard",
        contexts: ["all"],
        onclick: async () => { await shortenURL(); }
    });
});
chrome.action.onClicked.addListener(async () => { await shortenURL(); });
