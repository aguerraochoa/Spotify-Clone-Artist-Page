const songs = [
    {
        name: "Here Comes The Sun - Remastered 2009",
        artist: "The Beatles",
        album: "./images/abbey-road.jpg",
        audio: "./audio/here-comes-the-sun.mp3"
    },
    {
        name: "Come Together - Remastered 2009",
        artist: "The Beatles",
        album: "./images/abbey-road.jpg",
        audio: "./audio/come-together.mp3"
    },
    {
        name: "Let It Be - Remastered 2009",
        artist: "The Beatles",
        album: "./images/let-it-be.jpg",
        audio: "./audio/let-it-be.mp3"
    },
    {
        name: "Yesterday - Remastered 2009",
        artist: "The Beatles",
        album: "./images/help.jpg",
        audio: "./audio/yesterday.mp3"
    },
    {
        name: "Twist And Shout - Remastered 2009",
        artist: "The Beatles",
        album: "./images/please-please-me.jpg",
        audio: "./audio/twist-and-shout.mp3"
    }
]



const playlistBtn = document.querySelector("#playlist-button");
const albumBtn = document.querySelector("#album-button");
let playlistActive = true;
let albumActive = true;

playlistBtn.addEventListener("click", function(){
    playlistActive = !playlistActive;
    if (playlistActive){
        playlistBtn.style.color = "rgb(36,36,36)"
        playlistBtn.style.backgroundColor = "rgb(229,229,229)"
    }
    else {
        playlistBtn.style.backgroundColor = "rgb(36,36,36)"
        playlistBtn.style.color = "rgb(229,229,229)"
    }
    updateList();
});

albumBtn.addEventListener("click", function(){
    albumActive = !albumActive;
    if (albumActive){
        albumBtn.style.color = "rgb(36,36,36)"
        albumBtn.style.backgroundColor = "rgb(229,229,229)"
    }
    else {
        albumBtn.style.backgroundColor = "rgb(36,36,36)"
        albumBtn.style.color = "rgb(229,229,229)"
    }
    updateList();
});

function updateList(){
    const playlists = document.querySelectorAll(".album[data-type='p']");
    const albums = document.querySelectorAll(".album[data-type='a']");

    if (playlistActive && albumActive){
        playlists.forEach(function(playlist){
            playlist.style.display = "flex";
        })
        albums.forEach(function(album){
            album.style.display = "flex";
        })
    }
    else if (playlistActive) {
        playlists.forEach(function(playlist){
            playlist.style.display = "flex";
        })
        albums.forEach(function(album){
            album.style.display = "none";
        })
    }
    else if (albumActive) {
        playlists.forEach(function(playlist){
            playlist.style.display = "none";
        })
        albums.forEach(function(album){
            album.style.display = "flex";
        })
    }
    else {
        playlists.forEach(function(playlist){
            playlist.style.display = "none";
        })
        albums.forEach(function(album){
            album.style.display = "none";
        })
    }
    
}

const topSongs = document.querySelectorAll(".top-song");
const displaySongs = document.querySelectorAll(".current-song");
let currentSong = null;

const csAlbum = document.querySelector(".cs-album");
const csName = document.querySelector(".cs-name");
const csArtist = document.querySelector(".cs-artist");
const audio = document.querySelector(".audio");

topSongs.forEach(function(topSong) {
    const number = topSong.querySelector(".number");
    const songName = topSong.querySelector(".song-name");
    const heart = topSong.querySelector(".heart");
    const more = topSong.querySelector(".more");
    const originalNum = number.innerHTML;
    let activeHeart = false;

    topSong.addEventListener("mouseenter", function() {
        number.style.color = "rgb(177,177,177)";
        if (currentSong === topSong) {
            number.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
        else{
            number.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
        if (activeHeart){
            heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
        }
        else{
            heart.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }
        more.innerHTML = '<i class="fa-solid fa-ellipsis fa-more"></i>';
    });

    topSong.addEventListener("mouseleave", function() {
        number.innerHTML = originalNum;
        if (currentSong === topSong){
            number.style.color = "rgb(101,211,111)";
        }
        else{
            number.style.color = "rgb(177,177,177)";
        }
        if (activeHeart){
            heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
        }
        else{
            heart.innerHTML = '';
        }
        more.innerHTML = '';
    });

    heart.addEventListener("click", function() {
        if (activeHeart){
            activeHeart = false
            heart.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }
        else{
            activeHeart = true
            heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
        }
    });

    number.addEventListener("click", function(){
        if (currentSong === topSong){
            number.innerHTML = '<i class="fa-solid fa-play"></i>';
            songName.style.color = "rgb(255,255,255)";
            currentSong = null;
            songs.forEach(function(song){
                if (songName.innerText === song.name){
                    audio.pause();
                }
            });
        }
        else{
            if (currentSong){
                const currSongName = currentSong.querySelector(".song-name");
                const currSongNum = currentSong.querySelector(".number");
                currSongName.style.color = "rgb(255,255,255)";
                currSongNum.style.color = "rgb(177,177,177)";
            }
            currentSong = topSong;
            number.innerHTML = '<i class="fa-solid fa-pause"></i>';
            songName.style.color = "rgb(101,211,111)";
            songs.forEach(function(song){
                if (songName.innerText === song.name){
                    csAlbum.src = song.album;
                    csName.innerText = song.name;
                    csArtist.innerText = song.artist;
                    audio.src = song.audio;
                    audio.play();
                }
            });
        }
    });
});