let jsonData;

fetch('./saveTitle.json').then(response => response.json()).then(data => {
        jsonData = data;
    }).catch(error => console.error('Error loading JSON:', error));


const URL_PATH = "https://www.youtube.com/"

function refreshTabList() {
    const tabList = document.getElementById('tabList');
    tabList.innerHTML = '';
}

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
});

function insertTabTitle(elementName) {
    const tabList = document.getElementById('tabList');
    // tabList.innerHTML = '';

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <p id="${elementName}"> </p>
        `;
    tabList.appendChild(listItem);
}


// Creates a new tab with the given url
function openTab(url) {
    chrome.tabs.create({
        url: url
    });
}
    