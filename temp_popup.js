// import data from './videoStorage.json';

/* 
    Json Format:
    [
        {
            "video_title":
            "video_url":
            "date_saved"
        }
    ]
*/

let jsonData;

fetch('./saveTitle.json').then(response => response.json()).then(data => {
        jsonData = data;
    }).catch(error => console.error('Error loading JSON:', error));


const URL_PATH = "https://www.youtube.com/"

// document.addEventListener('DOMContentLoaded', function () {
//     let videoStorageData = data;

//     function addTabToList(videoStorageData) {
//         let tempVidData = {
//             "video_title": "jhel"
//         }
//     }
// });



function refreshTabList() {
    const tabList = document.getElementById('tabList');
    tabList.innerHTML = '';
}



const tabs = await chrome.tabs.query({
    url: [
        "https://www.youtube.com/*",
    ]
});

const collator = new Intl.Collator();
tabs.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById("li_template");
const elements = new Set();

for (const tab of tabs) {
    const element = template.content.firstElementChild.cloneNode(true);

    const title = tab.title.split("-")[0].trim();
    const pathname = new URL(tab.url).pathname.slice("/docs".length);

    element.querySelector(".title").textContent = title;
    element.querySelector(".pathname").textContent = pathname;
    element.querySelector("a").addEventListener("click", async () => {
        // need to focus window as well as the active tab
        await chrome.tabs.update(tab.id, { active: true });
        await chrome.windows.update(tab.windowId, { focused: true });
    });

    elements.add(element);
}
document.querySelector("ul").append(...elements);

const delay = ms => new Promise(res => setTimeout(res, ms))

// on clicking the button, you get the Title of the Current Tab
const button = document.querySelector("button");
button.addEventListener("click", async () => {

    // refreshTabList();

    // gets tab title FUCKING FINALLY
    // from https://stackoverflow.com/questions/74225476/how-can-i-get-current-tab-title-in-a-chrome-extension
    const tabTitleOrSomethingIdk = async function getCurrentTab() {
        let queryOptions = { active: true, lastFocusedWindow: true};

        let [tab] = await chrome.tabs.query(queryOptions);
        return tab;
    }

    insertTabTitle("hehenewelement");
    document.getElementById('hehenewelement').innerHTML = (await tabTitleOrSomethingIdk()).title

    await delay(5000);

    insertTabTitle("trialElement");
    document.getElementById('trialElement').innerHTML = `test element: ${jsonData[0].name}`;


function insertTabTitle(elementName) {
    const tabList = document.getElementById('tabList');
    // tabList.innerHTML = '';

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <p id="${elementName}"> </p>
        `;
    tabList.appendChild(listItem);
}
    // if (tab.url.startsWith(URL_PATH)) {
    //     addTabToList(tab.url);
    // }


    // const tabIds = tabs.map(({ id }) => id);
    // if (tabIds.length) {
    //     const group = await chrome.tabs.group({ tabIds });
    //     await chrome.tabGroups.update(group, { title: "TAB" });
    // }
});

// function addTabToList(url) {
//     const tabList = document.getElementById('tabList');
//     tabList.innerHTML = '';

    
// }

// Creates a new tab with the given url
function openTab(url) {
    chrome.tabs.create({
        url: url
    });
}
    