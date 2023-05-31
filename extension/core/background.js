const extensionURL = "http://localhost:8000/";
async function clipboard(url) {
    await navigator.clipboard.writeText(url);
}
async function shortenURL(tab) {
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
        body: JSON.stringify({ target_url: tab.url }),
    });
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return `${extensionURL}${data.key}`;
}
async function onClick(tab) {
    const shortenedURL = await shortenURL(tab);
    try {
        await chrome.scripting.executeScript({
            args: [shortenedURL],
            func: clipboard,
            target: { tabId: tab.id }
        });
        chrome.notifications.create({
            iconUrl: "icons/icon-48.png",
            message: `${shortenedURL}\n`
                + "has successfully been copied to your clipboard.",
            silent: true,
            title: "Copied Short URL to Clipboard",
            type: "basic"
        });
    }
    catch {
        console.warn(`Failed to copy ${shortenedURL} to clipboard.`);
    }
}
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: "Copy shortened URL to Clipboard",
        contexts: ["all"],
        id: "url_shortener"
    });
});
chrome.contextMenus.onClicked.addListener(async (_info, tab) => { await onClick(tab); });
