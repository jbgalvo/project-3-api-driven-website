//Get API Options
const apiKey = 'fdd3c16ff0bbdc6a5f71e7aa4ad500da';
const options = {method: 'GET', headers: {accept: 'application/json'}};
const movieCard = document.getElementById("popular-movies-content");
let moviePage = 1;

//Button Variables
const searchBtnMovie = document.getElementById("search-btn-movie");
const resetBtnMovie = document.getElementById("reset-btn-movie");
const loadMoreBtnMovie = document.getElementById("load-more-btn-movie");

//Function for returning movies data
const fetchGamesMovies = (page) => {
  
  return fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${apiKey}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((movie) => {
            movieCard.appendChild(createMovieCard(movie));
          });
        })
        .catch((err) => console.error(err));
}

//Call fetch Game Movies
fetchGamesMovies(moviePage);

//Get Search Data Filter for Movies
searchBtnMovie.addEventListener("click", () => {

  //Input Value
  const searchInputMovie = document.getElementById("search-input-movie").value;
  
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInputMovie}`)
    .then((response) => response.json())
    .then((response) => {

      if (response.results.length === 0){

        //Hide Load More button 
        loadMoreBtnMovie.classList.add('d-none');

        movieCard.innerHTML = `
          <div class="d-flex flex-column align-items-center">
             <div class="mb-2">
                <div class="py-10 text-center">
                   <img class="img-fluid" src="assets/images/illustration-realestate.svg" alt="Photo">
                </div>
                <h2 class="text-center lh-lg">           
                    <span class="fw-bolder"> No records found.</span>
                </h2>
             </div>
          </div>
        `;
      } else {

        //Empty First the movie contents
        movieCard.innerHTML = "";

        response.results.forEach((movie) => {
          movieCard.appendChild(createMovieCard(movie));
        });
      }
        
    })
    .catch((err) => console.error(err));
  
});


//Load More Btn Filter
loadMoreBtnMovie.addEventListener("click", () => {

  //Increment Page value
  moviePage++;

  //Set Timeout for displaying the movie page
  setTimeout(() => {

    fetchGamesMovies(moviePage);

  }, "400");

});


//Reset Filter
resetBtnMovie.addEventListener("click", () => {

  //Remove diplsay none
  loadMoreBtnMovie.classList.remove("d-none");

  //Search input valeu to empty
  document.getElementById("search-input-movie").value = '';

  //Empty First the movie contents
  movieCard.innerHTML = "";
  
  //Reset Movie Page to 1
  moviePage = 1;

  //Revert back load more page to 1
  fetchGamesMovies(moviePage);

});



// Create Movie Card
const createMovieCard = (movie) => {

  //Define Variables
  const movieCardContent = document.createElement("div");
  let dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let getDate = new Date(movie.release_date);
  
  //Initialize Card Class
  movieCardContent.classList.add("col-lg-3", "col-md-6");
  movieCardContent.innerHTML = `
    <div class="card h-100">
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" 
            class="card-img-top" 
            alt="Card Image"
            onerror="this.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'" />
      <div class="card-body">
        <h5 class="card-title mb-4">
          ${movie.original_title}
        </h5>
        <p class="card-text mb-4">
          ${getDate.toLocaleDateString("en-US", dateOptions)} 
        </p>
      </div>
      <div class="card-footer text-center">
        <a href="https://www.themoviedb.org/movie/${movie.id}"
            target="_blank" 
            class="btn btn-primary w-100">View Movie</a>
      </div>
    </div>
  `;

  //Return Movie card content
  return movieCardContent;
}


