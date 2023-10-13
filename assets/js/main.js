//Get API Options

const options = {method: 'GET', headers: {accept: 'application/json'}};


fetch("https://api.themoviedb.org/3/movie/popular")
.then(response => response.json())
.then(response => {
  response.results.forEach((movie) => {
    console.log(movie.original_title);
  });
})
.catch(err => console.error(err));
