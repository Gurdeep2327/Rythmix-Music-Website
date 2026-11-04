/* =========================================
   RYTHMIX MUSIC - script.js
   ========================================= */

// ===============================
// SONG DATA
// ===============================

const songs = [
    {
        title: "Song 1",
        artist: "RYTHMIX",
        file: "song/song1.mp3"
    },
    {
        title: "Humdard",
        artist: "RYTHMIX",
        file: "song/song2.mp3"
    },
    {
        title: "Jatti Da Crush",
        artist: "RYTHMIX",
        file: "song/song3.mp3"
    }
];

let currentSong = 0;

const audio = new Audio();
audio.volume = 0.7;


// ===============================
// GET HTML ELEMENTS
// ===============================

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");

const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

const searchInput = document.getElementById("searchInput");
const songList = document.getElementById("songList");

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

const darkModeBtn = document.getElementById("darkModeBtn");


// ===============================
// LOAD SONG
// ===============================

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    audio.src = song.file;

    if (songTitle) {
        songTitle.textContent = song.title;
    }

    if (artistName) {
        artistName.textContent = song.artist;
    }

    if (progressBar) {
        progressBar.value = 0;
    }
}


// ===============================
// PLAY SONG
// ===============================

function playSong() {

    audio.play();

    if (playBtn) {
        playBtn.innerHTML = "⏸";
        playBtn.title = "Pause";
    }
}


// ===============================
// PAUSE SONG
// ===============================

function pauseSong() {

    audio.pause();

    if (playBtn) {
        playBtn.innerHTML = "▶";
        playBtn.title = "Play";
    }
}


// ===============================
// PLAY / PAUSE BUTTON
// ===============================

if (playBtn) {

    playBtn.addEventListener("click", function () {

        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }

    });

}


// ===============================
// NEXT SONG
// ===============================

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();
}

if (nextBtn) {
    nextBtn.addEventListener("click", nextSong);
}


// ===============================
// PREVIOUS SONG
// ===============================

function previousSong() {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();
}

if (prevBtn) {
    prevBtn.addEventListener("click", previousSong);
}


// ===============================
// AUTO NEXT SONG
// ===============================

audio.addEventListener("ended", function () {
    nextSong();
});


// ===============================
// PROGRESS BAR
// ===============================

audio.addEventListener("timeupdate", function () {

    if (!progressBar || !audio.duration) {
        return;
    }

    const progress =
        (audio.currentTime / audio.duration) * 100;

    progressBar.value = progress;
});


if (progressBar) {

    progressBar.addEventListener("input", function () {

        if (audio.duration) {

            audio.currentTime =
                (progressBar.value / 100) * audio.duration;

        }

    });

}


// ===============================
// VOLUME CONTROL
// ===============================

if (volumeBar) {

    volumeBar.addEventListener("input", function () {

        audio.volume = volumeBar.value;

    });

}


// ===============================
// SEARCH SONG
// ===============================

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText =
            searchInput.value.toLowerCase().trim();

        const items =
            document.querySelectorAll(".song-item");

        items.forEach(function (item) {

            const text =
                item.textContent.toLowerCase();

            if (text.includes(searchText)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }

        });

    });

}


// ===============================
// SONG LIST CLICK
// ===============================

if (songList) {

    songList.addEventListener("click", function (event) {

        const songItem =
            event.target.closest(".song-item");

        if (!songItem) {
            return;
        }

        const index =
            parseInt(songItem.dataset.index);

        if (!isNaN(index)) {

            loadSong(index);
            playSong();

        }

    });

}


// ===============================
// HAMBURGER MENU
// ===============================

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", function () {

        navMenu.classList.toggle("show");

        menuBtn.classList.toggle("active");

    });

}


// Close menu after clicking a link

if (navMenu) {

    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("show");

            if (menuBtn) {
                menuBtn.classList.remove("active");
            }

        });

    });

}


// ===============================
// DARK MODE
// ===============================

function enableDarkMode() {

    document.body.classList.add("dark-mode");

    if (darkModeBtn) {
        darkModeBtn.innerHTML = "☀️";
    }

    localStorage.setItem("rythmixDarkMode", "enabled");
}


function disableDarkMode() {

    document.body.classList.remove("dark-mode");

    if (darkModeBtn) {
        darkModeBtn.innerHTML = "🌙";
    }

    localStorage.setItem("rythmixDarkMode", "disabled");
}


if (darkModeBtn) {

    darkModeBtn.addEventListener("click", function () {

        if (document.body.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }

    });

}


// ===============================
// REMEMBER DARK MODE
// ===============================

const savedMode =
    localStorage.getItem("rythmixDarkMode");

if (savedMode === "enabled") {
    enableDarkMode();
} else {
    disableDarkMode();
}


// ===============================
// INITIAL SONG
// ===============================

loadSong(0);


// ===============================
// KEYBOARD CONTROLS
// ===============================

document.addEventListener("keydown", function (event) {

    // Space = Play/Pause
    if (event.code === "Space") {

        // Don't trigger when typing in search
        if (document.activeElement === searchInput) {
            return;
        }

        event.preventDefault();

        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }
    }


    // Arrow Right = Next
    if (event.code === "ArrowRight") {
        nextSong();
    }


    // Arrow Left = Previous
    if (event.code === "ArrowLeft") {
        previousSong();
    }

});