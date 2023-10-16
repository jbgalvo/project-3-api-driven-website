//Initialize Datatable
const peopleTable = new DataTable("#popular-people-datatable");

//Get API Options
const apiKey = 'fdd3c16ff0bbdc6a5f71e7aa4ad500da';
const options = {method: 'GET', headers: {accept: 'application/json'}};


fetch(`https://api.themoviedb.org/3/person/popular?api_key=${apiKey}`)
  .then((response) => response.json())
  .then((response) => {
    response.results.forEach((people) => {
      fetch(
        `https://api.themoviedb.org/3/person/${people.id}?api_key=${apiKey}`
      )
        .then((response2) => response2.json())
        .then((peopleInfo) => {
          console.log(peopleInfo);

          //Gender Variables
          const gender = peopleInfo.gender === 1 ? "Female" : "Male";

          //Date Variables
          let dateOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          let getDate = new Date(peopleInfo.birthday);

          //Image Variable
          const profilePhoto = `
            <img
              src="https://image.tmdb.org/t/p/w500/${peopleInfo.profile_path}"
              class="img-fluid rounded-3 border border-dark"
              style="width: 150px;"
              alt="Profile Photo"
              onerror="this.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'"
            />
          `;

          peopleTable.row
            .add([
              profilePhoto,
              peopleInfo.name,
              peopleInfo.known_for_department,
              gender,
              getDate.toLocaleDateString("en-US", dateOptions),
              peopleInfo.place_of_birth ?? 'N/A',
              peopleInfo.popularity,
            ])
            .draw(false);
        })
        .catch((err) => console.error(err));
    });
  })
  .catch((err) => console.error(err));


  const options2 = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer fdd3c16ff0bbdc6a5f71e7aa4ad500da",
    },
  };

  fetch("https://api.themoviedb.org/3/person/popular?language=en-US", options2)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

