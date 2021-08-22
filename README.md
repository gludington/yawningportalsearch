# yawningportalsearch

A bookmarklet for advanced search functionality on WoTC's Yawnign Portal events page.

![Advanced Search](https://gludington.github.io/ypsearch.png)
## To install
Please visit <a href="https://gludington.github.io/yawningportalsearch.html">the installation page to install this in your browser</a>

## What is this
A bookmarklet is a little snippet of javascript that can add functionality to the current page.  This adds a search form to WoTC's Yawning Portal Search
## Why is this
WoTC's yawning portal site lists upcoming games for Virtual Weekend and D&D Celebration events.  The games are presented as one long page.  I wanted to be able to search by game, by time, by VTT, and even by DM or other text.

## How is this
It works by parsing the HTML of WoTC's events page, identifying searchable parameters, and creating a form for them.  That means if WoTC changes their HTML and/or game admins start writing their game entries differently, this will break.  It works for the format WoTC has been using in 2021 to date.