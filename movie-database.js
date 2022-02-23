
const url = 'https://standing-zest-glass.glitch.me/movies';

fetchMovies().then(r => console.log(r))
appendMovies();

function fetchMovies(){
    return fetch(url).then(function (result){
        return result.json();
    }).then(function (movies){
        return movies;
    });
}

function htmlDisplay(movie){
    return $('#movie-container').append(
        `
                <div class="card col-12 col-sm-5 col-md-3 m-3 p-1">
                  <div class="card-body card-plot">
                    <h5 class="card-title title">${movie.title}</h5>
                    <p class="card-text">${movie.plot}</p>
                  </div>
                  <ul class="list-group list-group-flush card-list">
                    <li class="list-group-item">Year: ${movie.year}</li>
                    <li class="list-group-item">Rating: ${movie.rating} / 5</li>
                    <li class="list-group-item">Director: ${movie.director}</li>
                  </ul>
                  <div class="card-body d-flex justify-content-end">
                  
                    <button type="button" data-toggle="modal" data-target="#exampleModal" class="edit-btn btn m-1" value="${movie.id}">edit</button>
                    <button class="delete-btn btn m-1" value="${movie.id}">delete</button>
                  </div>
                </div>
                `
    )
}

function appendMovies() {
    fetchMovies().then(function (movies){
        $('#movie-container').html('');
        for (let movie of movies) {
            htmlDisplay(movie)
        }
    });
}

function createMovie(movieInfo) {
    fetch(url, movieInfo).then(function (result){
        console.log('post created successfully');
        appendMovies()
    });
}

function updateMovie(id, updateOptions) {
    fetch(`${url}/${id}`, updateOptions).then(function (result){
        console.log('updated successfully');
        appendMovies();
    });
}

function deleteMovie(id){
    fetch(`${url}/${id}`,{method: 'DELETE'}).then(function (result){
        console.log('deleted successfully');
        appendMovies();
    });
}


function movieInfo(){
    let movieTitle = $('#moviesTitle').val();
    let movieRating = $('#moviesRating').val();
    let movieYear = $('#moviesYear').val();
    let moviePlot = $('#moviesPlot').val();
    let movieDirector = $('#moviesDirector').val();


    return {
        title: movieTitle,
        rating: movieRating,
        year: movieYear,
        plot: moviePlot,
        director: movieDirector
    };
}

function titleSort(){
    fetchMovies().then(movies => {
        $('#movie-container').html('');

        movies.sort((a, b) => {
            if (a.title < b.title) return -1
            return a.title > b.title ? 1 : 0
        })

        for (let movie of movies) {
            htmlDisplay(movie)
        }

        console.log(movies)
    });
}
// yearSort();
function yearSort(){
    fetchMovies().then(movies => {
        movies.sort((a, b) => {
            if (a.year < b.year) return -1
            return a.year > b.year ? 1 : 0
        })
        console.log(movies);
    });
}



$('#create-movie-btn').click(function (e){


    let createOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieInfo()),
    };

    createMovie(createOptions)
    fetchMovies().then(r => console.log(r));

});



$(document).on('click', '.edit-btn', function (){
    let id = parseInt($(this).val())
    console.log(id)

    fetchMovies().then(movies => {
        for (let movie of movies) {
            if (id === movie.id){

                $('#formId').val(movie.id);
                $('#titleForm').val(movie.title);
                $('#plotForm').val(movie.plot);
                $('#yearForm').val(movie.year);
                $('#ratingForm').val(movie.rating);
                $('#directorForm').val(movie.director);

            }
        }
    });
});


$(document).on('click', '.update-btn', function (){
    let id = parseInt($('#formId').val());

    let updatedMovie = {
        title: $('#titleForm').val(),
        plot: $('#plotForm').val(),
        year: $('#yearForm').val(),
        rating: $('#ratingForm').val(),
        director: $('#directorForm').val()
    }
    console.log(updatedMovie);

    let updateOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
    };
    updateMovie(id, updateOptions);
    fetchMovies().then(r => console.log(r))
});

$(document).on('click','.delete-btn',function(){
    deleteMovie($(this).val());
});

$('#titleFilter').click(e => {
    titleSort()
});
$('#yearFilter').click(e => {
    console.log("sort by year")
})
$('#ratingFilter').click(e => {
    console.log("sort by rating")
})
$('#directorFilter').click(e => {
    console.log("sort by director")
})


