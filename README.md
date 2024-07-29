# youtube-video-saver
A chrome extension that can save YouTube videos and shorts \
[Link to Extension](https://chromewebstore.google.com/detail/youtube-video-and-short-s/nnfkkgaiaddnneedlilchlgcdkegkgoh)

# Privacy Policy
This extension collects some data in order to function, including:
- Tab data such as the title and url of the current tab
- YouTube data such as the title and link to the video being watched
- However, no data is ever stored, unless the user stores the details of the current tab.
\
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
- To delete any entry in the list, you must first click the "delete" button to enter the deletion mode, then click on the entry you want to remove. When in deletion mode, the text in the delete button will be red, making it easy to tell when it is on. If you accidentally press the button and don't wish to delete anything, clicking the button again will disable deletion mode. To delete all the entries in the list, click "delete all"
- Once you click the Save Video button, you should see the video you just saved get added to the list. Clicking it in the list will navigate to that video.


# Planned Features
- ### Stretch Feature - Ability to search for a video or short
The ability to search for specific content in the list
- ### Ability to export list JSON
The ability to click a button, and have the entire dataset of the list be outputted as a JSON file. Useful for people switching machines who want to keep their saved data.

# In-progress Features
- Ability to trigger the save using the keyboard shortcut

# Finished Features
- ### Ability to view saved videos in a list format
- ### Ability to open the extension using Keyboard commands
I haven't quite added the ability to directly save, but you can now open the extension using the keyboard command `Ctrl+Shift+Y`, `Cmd+Shift+Y` for MacOS
- ### Ability to delete a single video
- ### Ability to set a custom title for saved list entries


# Contributor(s)
[CodeInferno03](https://github.com/CodeInferno03)