# youtube-video-saver
A chrome extension that saves youtube shorts

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
- ### Ability to Save YouTube Videos through a shortcut
The ability to use a keyboard shortcut (`Ctrl+Shift+Y`, `Cmd+Shift+Y` for MacOS) in order to save YouTube videos or shorts, even when the extension is closed
- ### Ability to view saved videos in a list format
The ability to view the saved videos in a list format. Each entry will have the video title, as well as the date it was saved. On clicking an entry, it would redirect to the video in the browser. I plan to save the video thumbnail too, but that will depend on whether I am able to implement it or not
- ### Stretch Feature - Ability to sort by channel
The ability to sort the videos by channel rather than the default (which is by date saved)
- ### Stretch Feature - Ability to add some notes about each video
The ability to add a little blurb under each saved video, only a few words (likely not more than 30-40)
- ### Stretch Feature - Ability to search for a video or short
The ability to search for specific content

# Finished Features
- ### Ability to view saved videos in a list format


# Contributor(s)
[CodeInferno03](https://github.com/CodeInferno03)