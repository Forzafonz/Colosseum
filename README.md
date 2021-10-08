# Project Colosseum:

## About:

This is a single page Full Stack application which supports synchronization features. It allows user to create, save, watch and share playlists in real time with other people. The application supports live chat as well.


## Key Features:

*  Single Page Application
*  Built using functional React for front-end and Node/Express for  back-end
*  **Reducer** was used to control global application state
*  **Socket.io** was used to enable playlist, video and chat synchronization across multiple clients
*  Allows mutliple-clients connection and synchornizes media playing across all clients listening to the same playlist
*  Supports youtube and soundclound media
*  Landing page is built using THREE.js for React

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
* `APIs : youtube API, soundcloud API`


# Functionality Demonstration:

## Video Synchronization Features
If there are multiple users currently listening to the same playlist it will be synchronized across all connected to this playlist clients, so that all actions performed at one instance are broadcasted to all other connected users:

![New appointment](/public/images/Sync.gif)
___
## Landing Page
Landing Page which was built using React-Three-fiber:

![New appointment](/public/images/landingpage.gif)
___
## Saved Playlists:
Browse Saved Playlists:

![Edit](/public/images/Playlists.gif)
___
## Enjoy saved playlists on your own:
The application allows listen to saved playlists:

![Delete](/public/images/Play1.gif)
___
## Create a new playlist and share with others
But its main purpose is to create and share with others, so it supports creation of new playlist and sharing it easily with your friends:

![Errors](/public/images/new-playlist-sharing.gif)
___
## Add a media to newly created playlist.
Any user can add their favorite youtube video using built in search form that utilizes youtube API:

![spotsupdate](/public/images/Media_Add.gif)
___
## Add a soundcloud songs to the playlist.
The application also supports adding a soundcloud songs using direct link. Just paste the link into the Search bar and there will be an option to add it to playlist:

![spotsupdate](/public/images/add_soundcloud.gif)
___
## Vote on a live queue.
Each user can cast(rescind) their vote for each media, which will promote(demote) this media in the queue. Media that has the most votes will be playled next. Currently playing media will remain first:

![spotsupdate](/public/images/voting.gif)
___
## Remove video from playlist.
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
1. Use ```.env.example``` file which can be found in the server folder as a template to create `.env` file which should contain your set-ip for a newly created database . Save it in the same folder as `.env.example`
1. Go to browser and run ```localhost:8000\reset``` to create tables and seed database
1. Switch into client directory to launch client: ```cd ../client```
1. Install all client dependencies: ```npm install```
1. Run the client server using the ```npm start``` command from client folder. ```If React-three-fiber fails to load, try to refresh page 2 times```
