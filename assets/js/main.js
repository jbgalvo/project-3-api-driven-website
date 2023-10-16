//Get API Options
const apiKey = 'fdd3c16ff0bbdc6a5f71e7aa4ad500da';
const options = {method: 'GET', headers: {accept: 'application/json'}};


fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
  .then((response) => response.json())
  .then((response) => {
    const movieCard = document.getElementById("popular-movies-content");
    response.results.forEach((movie) => {
      console.log(movie);
      movieCard.appendChild(createMovieCard(movie));
    });
  })
  .catch((err) => console.error(err));


// Create Movie Card
const createMovieCard = (movie) => {

  //Define Variables
  const movieCard = document.createElement("div");
  let dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let getDate = new Date(movie.release_date);
  
  movieCard.classList.add("col-lg-3", "col-md-6");
  movieCard.innerHTML = `
    <div class="card h-100">
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" 
            class="card-img-top" 
            alt="Card Image"/>
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

  return movieCard;
}
