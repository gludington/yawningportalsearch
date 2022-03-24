# yawningportalsearch

A bookmarklet and browser exstension for advanced search functionality on Wizard of the Coast's Yawning Portal events page.

![Advanced Search](https://gludington.github.io/ypsearch.png)
## To install - browser extension
### Chrome

Install at the [Chrome Web Store](https://chrome.google.com/webstore/detail/yawning-portal-search/dfaicgiaobejpiiddamoimobkbpmikig)   

### Firefox
Install at the [Firefox Add-Ons Store](https://addons.mozilla.org/en-US/firefox/addon/yawning-portal-search/)

## To install - bookmarklet
Please visit <a href="https://gludington.github.io/yawningportalsearch/">the installation page to install this in your browser</a>

## What is this
Yawningportalsearch is a  bookmarklet - a little snippet of javascript that can add functionality to the current page.  This bookmarklet adds a search form to a WoTC Yawning Portal Events Page.
## Why is this
WoTC's yawning portal events pages lists popular games with talented DMs for upcoming games such as Virtual Weekend and D&D Celebration events.  These games are presented as one long page, and I wanted to be able to search by game, by time, by VTT, and even by DM or other text.

## How is this
It works by parsing the HTML of WoTC's events page, identifying searchable parameters, and creating a form for them.  That means if WoTC changes their HTML and/or game admins start writing their game entries differently, this will break.  It works for the format WoTC has been using in 2021 to date.  If something changes and breaks the parsing, feel free to [file an issue](https://github.com/gludington/yawningportalsearch/issues).

## Building
node and npm on a UNIX-like shell are required to build this project.  Primary development is done on OSX, using node v12.22.1 and npm6.14.12,
though there should be no issues with later versions of node or npm

`npm install`

will install necessary modules and dependencies, after which

`npm run build`

will create a dist folder, with one folder each for the bookmarklet,
chrome, and firefox output
## Versions

1. 1.0 - sometime in 2021: initial release
2. 1.1 - 2022-03-15: improved handling of titles with dashes]
3. 1.2 - 2022-03-15: change date/time parsing hooks to work against "GMT" instead of anything language-specific, as we now have Portuguese as well as English games

## Thanks
Icon converted to bookmarklet using [Dungeon icons created by Smashicons - Flaticon](https://www.flaticon.com/free-icons/dungeon)
