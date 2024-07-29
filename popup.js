document.addEventListener('DOMContentLoaded', function () {
    const URL_PATH = "https://www.youtube.com/"
    // const delay = ms => new Promise(res => setTimeout(res, ms));

    /**
     * Load the previously saved tabs from chrome storage and format them into the list
     */
    function loadSavedTabs() {
        chrome.storage.sync.get(['tabs'], function (result) {
            const tabsList = result.tabs || [];        
            tabsList.forEach(tab => {
                createTablistEntry(
                    tab.id, tab.url, tab.title, tab.customTitle
                );
            });
    
        });
    }

    // to ensure that all the tabs actually load before the rest of the stuff happens
    loadSavedTabs();

    // How the hell is this as broken as it is T_T
    // takes a message from the background.js script to save a video using a keyboard shortcut
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'save_video') {
            document.getElementById('ext_title').innerHTML = 'Got Message!'
            loadSavedTabs();
            document.getElementById('saver').click();
        }
    });


    document.getElementById('deleteAll').addEventListener('click', async() => {
        chrome.storage.sync.clear();

        document.getElementById('tabList').innerHTML = '';
    });


    // on clicking the button, you get the Title of the Current Tab
    // and save its title and url to chrome storage
    const saveButton = document.getElementById("saver");
    saveButton.addEventListener("click", async () => {
        
        /**
         * Function that fetches the data of the active tab.
         * Link to source code: https://stackoverflow.com/questions/74225476/how-can-i-get-current-tab-title-in-a-chrome-extension
         * @returns Promise with the data from the active tab
         */
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

        // checks if a video already exists in storage
        let urlExistsFlag = false;
        
        if (tabUrl.includes(URL_PATH)) {  
            // Add the list of tabs to storage
            chrome.storage.sync.get(['tabs'], function (result) {
                const tabsList = result.tabs || [];
                const newTab = {
                    id: tabId,
                    url: tabUrl,
                    title: tabTitle,
                    customTitle: customTitle,
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

    // jumps between deletion and non-deletion mode
    let deleteModeFlag = false;

    /**
     * Function that creates a list entry for the tab the user wishes to save. It then saves the tab data
     * to chrome storage as well. This function also handles list entry deletion
     * @param {string} elementId The id of the tab to be saved. Created by getting the string version of the current date in unicode
     * @param {string} elementUrl The URL of the tab to be saved
     * @param {string} elementTitle The title of the tab to be saved
     * @param {string} elementCustomTitle Optionally a custom title set by the user to save the video with in the list
     * @returns {void}
     */
    function createTablistEntry(elementId, elementUrl, elementTitle, elementCustomTitle) {
        const tabList = document.getElementById('tabList');
    
        const listItem = document.createElement('div');
        listItem.innerHTML = `
            <li class="tabListElement">
                <p id="${elementId}" class="tabListTextHolder"></p>
            </li>
            `;
        
        tabList.appendChild(listItem);
        
        decideOrChangeTitle(
            elementId, elementTitle, elementCustomTitle
        );

        // Didn't realise I could put event listeners inside other functions and they would work properly T_T
        document.getElementById(elementId).addEventListener('click', async (event) => {
            if (deleteModeFlag) {
                // removing element from list
                const pElement = event.target;
                const liElement = pElement.parentElement;
                liElement.parentElement.removeChild(liElement);
                
                // removing it from chrome storage
                chrome.storage.sync.get(['tabs'], function (result) {
                    const tabsList = result.tabs || [];
                    const updatedTabs = tabsList.filter(tab => tab.id !== elementId)

                    const filteredTabList = [...updatedTabs];
                    chrome.storage.sync.set({ 'tabs': filteredTabList })

                });

                // restoring to non-deletion mode
                toggleDeleteMode();
            } else {  
                chrome.tabs.create({
                    url: elementUrl
                });
            }

        });
 
        document.getElementById("deleteListEntry").addEventListener("click", toggleDeleteMode);
        
    }

    /**
     * A function that assigns a custom title if the user uses it, otherwise assigns the default tab title
     * for the list entry.
     * @param {string} elementId The id of the tab being passed 
     * @param {string} elementTitle The title of the tab being passed
     * @param {string} customTitle Optional custom title of the tab being passed. Is either a string or null
     */
    function decideOrChangeTitle(elementId, elementTitle, customTitle) {
        if (customTitle) {
            document.getElementById(elementId).innerHTML = customTitle;
        } else {
            document.getElementById(elementId).innerHTML = cleanTitle(elementTitle);
        }
    }

    /**
     * A function that removes the " - YouTube" suffix from the titles passed to it
     * @param {string} elementTitle The title from which we need to remove " - YouTube" 
     * @returns {string} The parsed title without "- YouTube"
     */
    function cleanTitle(elementTitle) {
        const suffix = " - YouTube";
        if (elementTitle.endsWith(suffix)) {
            return elementTitle.slice(0, -suffix.length).trim();
        }

        return elementTitle
    }

    /**
     * A function that toggles whether or not the user is in deletion mode.
     * If the user is in the mode, it turns the button text red, else the text remains black
     */
    function toggleDeleteMode() {
        deleteModeFlag = !deleteModeFlag;

        if (deleteModeFlag) {
            document.getElementById('deleteListEntry').style.color = 'red'
        } else {
            document.getElementById('deleteListEntry').style.color = 'black'
        }
    }

});

  