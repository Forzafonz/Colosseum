# Project Colosseum:

## About:

Colosseum is a single page full stack application that allows a user to create, save, watch and share playlists in real time with other people. The playlists can contain both YouTube and SoundCloud media in the same playlist. The play order in the playlist can be voted on by all users connected to the playlist. 

This app incorporates various synchronization features between multiple connected users. These synchronization features include media fast forwarding/rewinding, media pausing/playing, playlist updating and live chat.  

## Key Features:

*  Single Page Application
*  Built using functional React for the front-end and Node/Express for the back-end
*  **Reducer** was used to control global application state
*  **Socket.io** was used to enable playlist, video and chat synchronization across multiple clients
*  Supports YouTube and SoundCloud media
*  Landing page was built using THREE.js for React

[For installation steps see below](#getting-started)

# Main frameworks/libraries used:

* `React`
* `React router`
* `React-three-fiber`
* `Node.js`
* `SASS`
* `Socket.io`
* `Axios`
* `Express`
* `PostgreSQL`
* `APIs : YouTube API, SoundCloud API`


# Functionality Demonstration:

## Video Synchronization Features
If there are multiple users currently watching/listening to the same playlist, the media will be synchronized across all users connected to this playlist. All actions performed in one users instance are broadcasted to all other connected users:

![New appointment](/public/images/Sync.gif)
___
## Landing Page
The landing page was built using React-Three-fiber:

![New appointment](/public/images/landingpage.gif)
___
## Saved Playlists
A user can browse their saved playlists:

![Edit](/public/images/Playlists.gif)
___
## Enjoy saved playlists on your own
A user can listen to their saved playlists:

![Delete](/public/images/Play1.gif)
___
## Create a new playlist and share with others
The main purpose of the app is to create and share playlists with others. Sharing a new playlist with friends is easily done via generating a unique link and sharing it with friends:

![Errors](/public/images/new-playlist-sharing.gif)
___
## Add a media to newly created playlist
Any user can search and add their favorite YouTube video using the built in search form that utilizes YouTube API:

![spotsupdate](/public/images/Media_Add.gif)
___
## Add a SoundCloud songs to the playlist
The application also supports adding adding media to a playlist via a direct link. This works with both SoundCloud and YouTube links. To add media via this method, a user just needs to paste the link into the search bar and there will be an option to add the linked media to the playlist:

![spotsupdate](/public/images/add_soundcloud.gif)
___
## Vote on a live queue
Each user can cast or rescind their vote for each media, which will promote or demote this media in the queue. Media that has the most votes will be played next. Currently playing media will remain in the first slot of the playlist, regardless of votes. A user casts a vote by clicking on the star that appears when they hover over a media:

![spotsupdate](/public/images/voting.gif)
___
## Remove video from playlist
Each video can be permanently removed from the queue:

![spotsupdate](/public/images/removing.gif)

___
## Playlist is saved in users profile after the session ends
![websocket](/public/images/Saved_pl.gif)

# Getting Started

1. Clone repository in your local folder: 
```git clone git@github.com:Forzafonz/Colosseum.git colosseum```
1. Switch into projects folder: ```cd colosseum```
1. Switch into server directory to launch server: ```cd server```
1. Install all server dependencies: ```npm install```
1. Create a new database using psql.
1. Use ```.env.example``` file which can be found in the server folder as a template to create `.env` file which should contain your set-ip for a newly created database. Save it in the same folder as `.env.example`
    * If you do not have a valid ```YOUTUBE_KEY``` in your ```.env``` file, the YouTube search API functionality when adding songs to a playlist will not work. Pasting links will still work without the key. 
1. Go to browser and run ```localhost:8000/reset``` to create tables and seed database
1. Switch into client directory to launch client: ```cd ../client```
1. Install all client dependencies: ```npm install```
1. Run the client server using the ```npm start``` command from client folder. ```If React-three-fiber fails to load, try to refresh page 2 times```
