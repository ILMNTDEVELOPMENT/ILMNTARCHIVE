document.addEventListener('DOMContentLoaded', function() {
    const mp3Files = [
        { title: 'FXNT', url: 'https://raw.githubusercontent.com/ILMNTDEVELOPMENT/ILMNTARCHIVE/main/FXNT.mp3' },
        { title: 'X', url: 'https://raw.githubusercontent.com/ILMNTDEVELOPMENT/ILMNTARCHIVE/main/X.mp3' },
        { title: 'enclosure!', url: 'https://raw.githubusercontent.com/ILMNTDEVELOPMENT/ILMNTARCHIVE/main/enclosure!.mp3' },{ title: 'enclosure', url: 'https://raw.githubusercontent.com/ILMNTDEVELOPMENT/ILMNTARCHIVE/main/enclosure!.mp3' },
        { title: 'this bible*', url: 'https://raw.githubusercontent.com/ILMNTDEVELOPMENT/ILMNTARCHIVE/main/this_bible_sxullsquadremix_prod3rdeyeblink__sxullsquad.mp3' }, { title: 'this bible', url: 'https://raw.githubusercontent.com/ILMNTDEVELOPMENT/ILMNTARCHIVE/main/this_bible_sxullsquadremix_prod3rdeyeblink__sxullsquad.mp3' },
        { title: 'money', url: 'https://raw.githubusercontent.com/ILMNTDEVELOPMENT/ILMNTARCHIVE/main/money_3162022.mp3' },
        { title: 'foreign', url: 'https://raw.githubusercontent.com/ILMNTDEVELOPMENT/ILMNTARCHIVE/main/foreign.mp3' },
        { title: 'dirt', url: 'https://raw.githubusercontent.com/ILMNTDEVELOPMENT/ILMNTARCHIVE/main/dirt.mp3' },
        { title: 'white/black', url: 'https://raw.githubusercontent.com/ILMNTDEVELOPMENT/ILMNTARCHIVE/main/whiteblack.mp3' },{ title: 'white black', url: 'https://raw.githubusercontent.com/ILMNTDEVELOPMENT/ILMNTARCHIVE/main/whiteblack.mp3' },{ title: 'whiteblack', url: 'https://raw.githubusercontent.com/ILMNTDEVELOPMENT/ILMNTARCHIVE/main/whiteblack.mp3' },
    ];

    const searchButton = document.getElementById('searchButtonSong');
    const searchBar = document.getElementById('searchBarSong');
    const audioPlayer = document.getElementById('audioPlayer');
    const albumCover = document.getElementById('albumCover');
    const songTitle = document.getElementById('songTitle');
    const artistName = document.getElementById('artistName');
    const playButton = document.getElementById('playButton');

    let currentSongUrl = '';

    searchButton.addEventListener('click', async function() {
        const query = searchBar.value.trim().toLowerCase();
        const song = mp3Files.find(song => song.title.toLowerCase() === query);

        if (!song) {
            console.log('No matching song found.');
            return;
        }

        console.log(`Fetching song from: ${song.url}`);

        try {
            const response = await fetch(song.url);
            const blob = await response.blob();

            jsmediatags.read(blob, {
                onSuccess: function(tag) {
                    console.log('Metadata:', tag);
                    const { title, artist, picture, comment} = tag.tags;

                    // Update the audio player
                    audioPlayer.src = song.url;

                    // Update song details
                    songTitle.textContent = (title || 'Unknown Title') + (comment == 'explicit' ? ' 🅴' : '');
                    artistName.textContent = artist || 'Unknown Artist';
                    searchBar.value = "";

                    playButton.classList.replace("fa-pause", "fa-play")

                    // Update album cover
                    if (picture && picture.data) {
                        const base64String = arrayBufferToBase64(picture.data);
                        albumCover.src = `data:${picture.format};base64,${base64String}`;
                    } else {
                        albumCover.src = ''; // Clear album cover if no picture
                    }
                    
                    currentSongUrl = song.url;

                    albumCover.addEventListener('click', async function(){
                        if (audioPlayer.src != ""){
                           window.open(currentSongUrl);
                           currentSongUrl = "";
                        }
                    });
                },
            });
        } catch (error) {
            console.log('Error fetching song:', error);
        }
    });

    // Helper function to convert ArrayBuffer to base64 string
    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
});


