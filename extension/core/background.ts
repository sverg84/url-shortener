import "chrome-types";

async function shortenURL(): Promise<void> {
    const response: Response = await fetch("http://127.0.0.1:8000/urls/", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({target_url: location.href}),
    });

    if (!response.ok) {
        throw new Error("ugh");
    }

    const data: Map<string, string> = await response.json();
    const shortenedURL: string = `http://127.0.0.1:8000/${data.get("key")}`;

    await navigator.clipboard.writeText(shortenedURL);

    chrome.notifications.create(undefined, {
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
