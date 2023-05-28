import "chrome-types";
import $ from "jquery";
console.log("ugh");
async function shortenURL() {
    await $.ajax({
        data: {
            target_url: document.location.href
        },
        dataType: "json",
        success: (result) => {
            console.log(result);
        },
        type: "POST",
        url: "http://127.0.0.1:8000/urls/",
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
chrome.action.onClicked.addListener(async () => { console.log("plep"); await shortenURL(); });
