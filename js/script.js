let movieSearchBox = document.getElementById("movie-search-box");
let searchList = document.getElementById("search-list");
let resultGrid = document.getElementById("result-grid");


async function loadMovies(searchTerm){
    let URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=85788913`;
    let res = await fetch(`${URL}`);
    let data = await res.json();
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove("hide-search-list");
        loadMovies(searchTerm);
    } else {
        searchList.classList.add("hide-search-list");
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let i = 0; i < movies.length; i++){
        let movieListItem = document.createElement("div");
        movieListItem.dataset.id = movies[i].imdbID;
        movieListItem.classList.add("search-list-item");
        if(movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3 class="title">${movies[i].Title}</h3>
            <div>
            <h5 class="d-inline-block">Release: </h5> <p class="d-inline-block">${movies[i].Year}</p>
            </div>
            <h5 class="d-inline-block">Type: </h5> <p class="d-inline-block">${movies[i].Type}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
        let title = document.querySelector("title");

    }
    loadMovieDetails();
}

function loadMovieDetails(){
    let searchListMovies = searchList.querySelectorAll(".search-list-item");
    searchListMovies.forEach(movie => {
        movie.addEventListener("click", async () => {
            searchList.classList.add("hide-search-list");
            movieSearchBox.value = "";
            let result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=85788913`);
            let movieDetails = await result.json();
            displayMovieDetails(movieDetails);
    });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <a href="#"><div class = "movie-poster">
     <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div></a>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">ID: ${details.imdbID}</li>
            <li class = "released">Type: ${details.Type}</li>
        </ul>
    </div>
    `;
}

window.addEventListener("click", (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add("hide-search-list");
    }
});


