
const url = 'http://localhost:8080/movies';

fetchMovies().then(r => console.log(r));
//populates the html on start up
appendMovies();
//function sends fetch request to the movie database and returns movie array
function fetchMovies(){
    return fetch(url).then(function (result){
        return result.json();
    }).then(function (movies){
        return movies;
    });
}
//htmlDisplay function appends the html with movies data to the movie-container div
function htmlDisplay(movie){
    return $('#movie-container').append(
        `
                <div class="card col-10 col-sm-5 col-md-3 m-3 p-1">
                  <div class="card-body card-plot">
                    <h5 class="card-title title">${movie.title}</h5>
                    <p class="card-text">${movie.plot}</p>
                  </div>
                  <ul class="list-group list-group-flush list-group-horizontal card-list-horizontal">
                    <li class="list-group-item">Year: ${movie.year}</li>
                    <li class="list-group-item">Rating: ${movie.rating} / 5</li>
                  </ul>
                  <ul class="list-group list-group-flush card-list">
                     <li class="list-group-item">Director: ${movie.director}</li>
                     <li class="list-group-item">Actors: ${movie.actors}</li>
                     <li class="list-group-item">Genre: ${movie.genre}</li>
                  </ul>
                  <div class="card-body d-flex justify-content-end">
                  
                    <button type="button" data-toggle="modal" data-target="#exampleModal" class="edit-btn btn m-1" value="${movie.id}">edit</button>
                    <button class="delete-btn btn m-1" value="${movie.id}">delete</button>
                  </div>
                </div>
                `
    )
}
//appendMovies function calls fetchMovies function and loops through each movie and appends it to html
function appendMovies() {
    fetchMovies().then(function (movies){
        $('#movie-container').html('');
        for (let movie of movies) {
            htmlDisplay(movie)
        }
    });
}
//createMovie function adds movie to database then updates html
function createMovie(movieInfo) {
    fetch(url, movieInfo).then(function (result){
        console.log('post created successfully');
        appendMovies()
        console.log(fetchMovies());
    });
}
//updateMovie function updates a movie in the database and updates html
function updateMovie(id, updateOptions) {
    fetch(`${url}/${id}`, updateOptions).then(function (result){
        console.log('updated successfully');
        appendMovies();
        fetchMovies().then(r => console.log(r));

    });
}
//deleteMovie function deletes a movie from the database and updates html
function deleteMovie(id){
    fetch(`${url}/${id}`,{method: 'DELETE'}).then(function (result){
        console.log('deleted successfully');
        appendMovies();
    });
}

//movieInfo function gets the values that are in the createMovie modal, returns the info as an object
function movieInfo(){
    let movieTitle = $('#moviesTitle').val();
    let movieRating = $('#moviesRating').val();
    let moviePoster = $('#moviesPoster').val();
    let movieYear = $('#moviesYear').val();
    let movieGenre = $('#moviesGenre').val();
    let moviePlot = $('#moviesPlot').val();
    let movieActors = $('#moviesActors').val();
    let movieDirector = $('#moviesDirector').val();


    return [{
        title: movieTitle,
        rating: movieRating,
        poster: moviePoster,
        year: movieYear,
        genre: movieGenre,
        director: movieDirector,
        plot: moviePlot,
        actors: movieActors
    }];
}

function titleAToZSort(){
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

function titleZToASort(){
    fetchMovies().then(movies => {
        $('#movie-container').html('');

        movies.sort((a, b) => {
            if (b.title < a.title) return -1
            return b.title > a.title ? 1 : 0
        })

        for (let movie of movies) {
            htmlDisplay(movie)
        }

        console.log(movies)
    });
}

function yearSortLowHigh(){
    fetchMovies().then(movies => {
        $('#movie-container').html('');

        movies.sort((a, b) => {
            if (a.year < b.year) return -1
            return a.year > b.year ? 1 : 0
        })

        for (let movie of movies) {
            htmlDisplay(movie)
        }

        console.log(movies);
    });
}

function yearSortHighLow(){
    fetchMovies().then(movies => {
        $('#movie-container').html('');

        movies.sort((a, b) => {
            if (b.year < a.year) return -1
            return b.year > a.year ? 1 : 0
        })

        for (let movie of movies) {
            htmlDisplay(movie)
        }

        console.log(movies);
    });
}

function ratingSortHighLow(){
    fetchMovies().then(movies => {
        $('#movie-container').html('');

        movies.sort((a, b) => {
            if (b.rating < a.rating) return -1
            return b.rating > a.rating ? 1 : 0
        })

        for (let movie of movies) {
            htmlDisplay(movie)
        }

        console.log(movies);
    });
}

function ratingSortLowHigh(){
    fetchMovies().then(movies => {
        $('#movie-container').html('');

        movies.sort((a, b) => {
            if (a.rating < b.rating) return -1
            return a.rating > b.rating ? 1 : 0
        })

        for (let movie of movies) {
            htmlDisplay(movie)
        }

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
                $('#posterForm').val(movie.poster);
                $('#genreForm').val(movie.genre);
                $('#actorsForm').val(movie.actors);

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
        director: $('#directorForm').val(),
        poster: $('#posterForm').val(),
        genre: $('#genreForm').val(),
        actors: $('#actorsForm').val()
    }
    console.log(updatedMovie);

    let updateOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
    };
    updateMovie(id, updateOptions);
});

$(document).on('click','.delete-btn',function(){
    let deleteConfirmation = confirm('Are you sure you want to delete?')

    if (deleteConfirmation){
        deleteMovie($(this).val());
    }
});

$('#titleAToZFilter').click(e => {
    titleAToZSort()
});
$('#titleZToAFilter').click(e => {
    titleZToASort()
});
$('#yearLowHighFilter').click(e => {
    yearSortLowHigh();
})
$('#yearHighLowFilter').click(e => {
    yearSortHighLow();
})
$('#ratingHighLowFilter').click(e => {
    ratingSortHighLow();
})
$('#ratingLowHighFilter').click(e => {
    ratingSortLowHigh()
})

$('#search-bar').keyup(function (e) {
    let searchBarValue = $(this).val().toLowerCase();
    fetchMovies().then(movies => {
        $('#movie-container').html('');


        for (let movie of movies) {
            let lowercaseTitle = movie.title.toLowerCase()
            if (lowercaseTitle.includes(searchBarValue)){
                htmlDisplay(movie)
            }
        }
    })
});



