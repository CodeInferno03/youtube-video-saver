document.addEventListener('DOMContentLoaded', function () {
    const URL_PATH = "https://www.youtube.com/"
    // const delay = ms => new Promise(res => setTimeout(res, ms));

    // pull the previously saved tabs from storage
    function loadSavedTabs() {
        chrome.storage.sync.get(['tabs'], function (result) {
            const tabsList = result.tabs || [];        
            tabsList.forEach(tab => {

                if (!('customTitle' in tab)) {
                    tab.customTitle = null;
                }

                createTablistEntry(
                    tab.id, tab.url, tab.title, tab.customTitle
                );
            });
    
        });
    }

    // to ensure that all the tabs actually load before the rest of the stuff happens
    loadSavedTabs();

    // takes a message from the background.js script to save a video using a keyboard shortcut
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'save_video') {
            document.getElementById('ext_title').innerHTML = 'Got Message!'
            loadSavedTabs();
            document.getElementById('saver').click();
        }
    });

    // to empty the list and storage
    document.getElementById('deleter').addEventListener('click', async() => {
        chrome.storage.sync.clear();

        document.getElementById('tabList').innerHTML = '';
    });

   
    // on clicking the button, you get the Title of the Current Tab
    // and save its title and url to chrome storage
    const saveButton = document.getElementById("saver");
    saveButton.addEventListener("click", async () => {
        

        // from https://stackoverflow.com/questions/74225476/how-can-i-get-current-tab-title-in-a-chrome-extension
        const getTabInfo = async function getCurrentTab() {
            let queryOptions = { active: true, lastFocusedWindow: true };

            let [tab] = await chrome.tabs.query(queryOptions);
            return tab;
        }

        // generating a unique id for each saved tab
        const tabId = Date.now().toString();
        const tabTitle = (await getTabInfo()).title;
        const tabUrl = (await getTabInfo()).url;
        
        const inputVal = document.getElementById('customTitleInput');
        const customTitle = inputVal.value == "" ? null : inputVal.value;

        let urlExistsFlag = false;
        
        if (tabUrl.includes(URL_PATH)) {  
            // Add the list of tabs to storage
            chrome.storage.sync.get(['tabs'], function (result) {
                const tabsList = result.tabs || [];
                const newTab = {
                    id: tabId,
                    url: tabUrl,
                    title: tabTitle,
                    customTitle: null,
                };

                // checks that the user is not trying to save the same video twice
                for (const tabData of tabsList) {
                    if (tabData.url === tabUrl) {
                        urlExistsFlag = true;
                        alert("Video already saved!");
                        break;
                    }
                }

                if (!urlExistsFlag) {
                    const updatedTabList = [...tabsList, newTab];
                    chrome.storage.sync.set({ 'tabs': updatedTabList });

                    createTablistEntry(tabId, tabUrl, tabTitle, customTitle); 
                }
            });
        } 
        
        inputVal.innerHTML = "";
    });

    // creates an entry for the newest tab, and adds it to chrome storage
    function createTablistEntry(elementId, elementUrl, elementTitle, elementCustomTitle) {
        const tabList = document.getElementById('tabList');
    
        const listItem = document.createElement('div');
        listItem.innerHTML = `
            <li class="tabListElement">
                <p id="${elementId}" class"tabListTextHolder"></p>
            </li>
            `;
        
        tabList.appendChild(listItem);


        
        decideOrChangeTitle(
            elementId, elementTitle, elementCustomTitle
        );



        // Didn't realise I could put event listeners inside other functions and they would work properly T_T
        document.getElementById(elementId).addEventListener('click', async () => {
            chrome.tabs.create({
                url: elementUrl
            });
        });
        
    }

    // function that assigns a customTitle if the user uses it, otherwise gives the default title. 
    // in future will allow users to change already saved content
    function decideOrChangeTitle(elementId, elementTitle, customTitle) {
        if (customTitle) {
            document.getElementById(elementId).innerHTML = customTitle;
        } else {
            document.getElementById(elementId).innerHTML = cleanTitle(elementTitle);
        }
    }

    // to remove the " - YouTube" suffix from every title
    function cleanTitle(elementTitle) {
        const suffix = " - YouTube";
        if (elementTitle.endsWith(suffix)) {
            return elementTitle.slice(0, -suffix.length).trim();
        }

        return elementTitle
    }

});

  