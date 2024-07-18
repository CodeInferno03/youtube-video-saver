chrome.commands.onCommand.addListener(function (command) {
    // const delay = ms => new Promise(res => setTimeout(res, ms));
    if (command === "_execute_action") {
        chrome.runtime.sendMessage({ action: "save_video" });
    }
});

// to remove the " - YouTube" suffix from every title
// function cleanTitle(elementTitle) {
//     const suffix = " - YouTube";
//     if (elementTitle.endsWith(suffix)) {
//         return elementTitle.slice(0, -suffix.length).trim();
//     }

//     return elementTitle
// }

// function loadSavedTabs() {
//     chrome.storage.sync.get(['tabs'], function (result) {
//         const tabsList = result.tabs || [];        
//         tabsList.forEach(tab => {
//             createTablistEntry(
//                 tab.id, tab.url, tab.title
//             );
//         });

//     });
// }

// // creates an entry for the newest tab, and adds it to chrome storage
// function createTablistEntry(elementId, elementUrl, elementTitle) {
//     const tabList = document.getElementById('tabList');

//     const listItem = document.createElement('li');
//     listItem.innerHTML = `
//         <p id="${elementId}" ></p>
//         `;
//     tabList.appendChild(listItem);

//     document.getElementById(elementId).innerHTML = cleanTitle(elementTitle);

//     // Didn't realise I could put event listeners inside other functions and they would work properly T_T
//     document.getElementById(elementId).addEventListener('click', async () => {
//         chrome.tabs.create({
//             url: elementUrl
//         });
//     });
// }


// async function saveVideo() {
//     const URL_PATH = "https://www.youtube.com/"
//     // const delay = ms => new Promise(res => setTimeout(res, ms));

//     // pull the previously saved tabs from storage

//     // to ensure that all the tabs actually load before the rest of the stuff happens
//     // loadSavedTabs();

//     // to empty the list and storage
//     document.getElementById('deleter').addEventListener('click', async() => {
//         chrome.storage.sync.clear();

//         document.getElementById('tabList').innerHTML = '';
//     });

//     // gets tab title
//     // from https://stackoverflow.com/questions/74225476/how-can-i-get-current-tab-title-in-a-chrome-extension
//     const getTabInfo = async function getCurrentTab() {
//         let queryOptions = { active: true, lastFocusedWindow: true};

//         let [tab] = await chrome.tabs.query(queryOptions);
//         return tab;
//     }

//     // generating a unique id for each saved tab
//     const tabId = Date.now().toString();
//     const tabTitle = (await getTabInfo()).title
//     const tabUrl = (await getTabInfo()).url

//     // Add the list of tabs to storage
//     chrome.storage.sync.get(['tabs'], function (result) {
//         const tabsList = result.tabs || [];
//         const newTab = {
//             id: tabId,
//             url: tabUrl,
//             title: tabTitle
//         };
//         const updatedTabList = [...tabsList, newTab];

//         chrome.storage.sync.set({ 'tabs': updatedTabList });
//     });

//     if (tabUrl.includes(URL_PATH)) {
//         createTablistEntry(tabId, tabUrl, tabTitle);
//         // document.getElementById(tabId).innerHTML = (await getTabInfo()).title
//     }


// }