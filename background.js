chrome.commands.onCommand.addListener(function (command) {
    if (command === "_execute_action") {
        chrome.runtime.sendMessage({ action: "save_video" });
    }
});