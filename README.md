# youtube-video-saver
A chrome extension that can save YouTube videos and shorts

# Privacy Policy
This extension collects some data in order to function, including:
- Tab data such as the title and url of the current tab
- YouTube data such as the title and link to the video being watched, and also saves the title and url should the user decide to save it in the list \
This information is only used for the purpose of putting the data in the list when saved, and to open tabs with the selected list entry when clicked.
This information is never shared with any external party, nor is it visible to me when the extension is used by any user.
No data is ever transferred in any way, and no sensitive data like usernames, passwords, and personal data is ever collected.


# Notes
A lot of the logic for this is based on [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/get-started), specifically
- [Inject Scripts Into The Active Tab](https://developer.chrome.com/docs/extensions/get-started/tutorial/scripts-activetab)
- [Manage Tabs](https://developer.chrome.com/docs/extensions/get-started/tutorial/popup-tabs-manager)
\
Some of the elements of the code come from [here](https://www.geeksforgeeks.org/create-a-chrome-extension-in-html-css-javascript/) too

# Usage Guide
This extension requires storage, tabs, and active tab permissions in order to run. The main purpose of the extension is to
save YouTube Videos and Shorts, and make them easily accessible in the future. It saves them in a list form, where clicking
on any of the saved ones will open a window navigated to them. \
In order to save a video, please follow the steps below
- First, ensure that the tab you are on is a YouTube tab (its url must start with https://www.youtube.com/ or just youtube.com/)
- You can open the extension either by clicking the extension button on the top right of the screen (the button which looks like a puzzle piece), or by using the keyboard shortcuts `Ctrl+Shift+Y` for Windows, and `Cmd+Shift+Y` for MacOS.
- Once you open the extension, you can click the "Save Video" button in order to save the details of the current tab you are on. 
- Currently, there is no option to delete a single video from the list, but clicking "Delete All" will empty the list out.
- Once you click the Save Video button, you should see the video you just saved get added to the list. Clicking it in the list will navigate to that video.


# Planned Features
- ### Ability to delete a single list entry
Exactly what it sounds like. This feature is in development as I am trying to decide what the best way for it to look is
- ### Ability to optionally give each video a title
The ability to decide what the video should be saved as in the list, rather than saving the video title by default. Useful if you have a little note about what in the video is interesting
- ### Stretch Feature - Ability to search for a video or short
The ability to search for specific content in the list
- ### Ability to export list JSON
The ability to click a button, and have the entire dataset of the list be outputted as a JSON file. Useful for people switching machines who want to keep their saved data.

# In-progress Features
- Ability to delete a single entry from the list
- Ability to trigger the save using the keyboard shortcut

# Finished Features
- ### Ability to view saved videos in a list format
- ### Ability to open the extension using Keyboard commands
I haven't quite added the ability to directly save, but you can now open the extension using the keyboard command `Ctrl+Shift+Y`, `Cmd+Shift+Y` for MacOS


# Contributor(s)
[CodeInferno03](https://github.com/CodeInferno03)