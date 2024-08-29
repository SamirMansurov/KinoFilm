const film_container = document.querySelector('.film_container');
const toggle_button = document.querySelector('#toggle_button');
let showAll = false;
let items = [];


const popular_film = document.querySelector('.popular_film');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
let currentIndex = 0;
let totalResults = []


fetch('https://api.themoviedb.org/3/movie/now_playing', {
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YThjZmFiMGRiMWJiMWQyOWVlMGMwZWM5OTAyODEwOCIsIm5iZiI6MTcyNDg1MDMzMS45ODg3MTUsInN1YiI6IjY2Y2YxMDczZjg3MDkyZjgzMWRkMzE4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y8oRFOxPVvClGmMg6MwWie9axvv6GeiwnhGV9CifvJY` // Replace with your actual API key
    }
})
.then(res => res.json())
.then(data => {
    items = data.results || []; 
    displayItems();
})



function displayItems() {
    film_container.innerHTML = '';
    const moviesToShow = showAll ? items : items.slice(0, 8); 
    moviesToShow.forEach(item => {
        film_container.innerHTML += `
            <div class="item">
                <img src="https://image.tmdb.org/t/p/original${item.poster_path}" alt="${item.title}">
                <span>${item.title}</span>
            </div>
        `;
    });
    toggle_button.textContent = showAll ? '8 новинок' : 'Все новинки'; 
}


toggle_button.onclick = () => {
    showAll = !showAll;
    displayItems(); 
}


;

fetch('https://api.themoviedb.org/3/movie/top_rated', {
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YThjZmFiMGRiMWJiMWQyOWVlMGMwZWM5OTAyODEwOCIsIm5iZiI6MTcyNDg1MDMzMS45ODg3MTUsInN1YiI6IjY2Y2YxMDczZjg3MDkyZjgzMWRkMzE4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y8oRFOxPVvClGmMg6MwWie9axvv6GeiwnhGV9CifvJY`
    }
})
.then(ress => ress.json())
.then(ress => {
    totalResults = ress.results;
    showMovies(currentIndex);
});

function showMovies(index) {
    popular_film.innerHTML = ''; 
    for (let i = index; i < index + 4; i++) {
        if (i >= totalResults.length) break; 
        const elem = totalResults[i];
        popular_film.innerHTML += `
            <div class="elem">
                <img src="https://image.tmdb.org/t/p/original${elem.poster_path}" alt="${elem.title}">
                <span>${elem.title}</span>
            </div>
        `;
    }
}

leftBtn.onclick = () => {
    if (currentIndex > 0) {
        currentIndex -= 4;
        showMovies(currentIndex);
    }
};

rightBtn.onclick =() => {
    if (currentIndex + 4 < totalResults.length) {
        currentIndex += 4;
        showMovies(currentIndex);
    }
};



