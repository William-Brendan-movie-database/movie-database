
const url = 'https://standing-zest-glass.glitch.me/movies';
const blogPost = {title: 'Ajax Requests', body: 'Are a fun way to use JS!'};

const updateOptions = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogPost),
};

fetchMovies().then(r => console.log(r))
// createMovie();
// updateMovie(10);
// deleteMovie(266);
appendMovies();

function fetchMovies(){
    return fetch(url).then(function (result){
        return result.json();
    }).then(function (movies){
        return movies;
    });
}

function appendMovies() {
    $('#movie-container').text('Loading...')
    fetchMovies().then(function (movies){
        $('#movie-container').text('');
        for (let movie of movies) {
            $('#movie-container').append(
                `
                <div class="card col-12 col-sm-5 col-md-3 m-1">
                  <div class="card-body card-plot">
                    <h5 class="card-title title">${movie.title}</h5>
                    <p class="card-text">${movie.plot}</p>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Year: ${movie.year}</li>
                    <li class="list-group-item">Rating: ${movie.rating}/5</li>
                    <li class="list-group-item">Director: ${movie.director}</li>
                  </ul>
                  <div class="card-body d-flex justify-content-between">
                    <button class="edit-btn btn btn-dark" value="${movie.id}">edit</button>

                    
                    <button class="delete-btn btn btn-dark" value="${movie.id}">delete</button>
                  </div>
                </div>
                `
            )
        }
    });
}

function createMovie(movieInfo) {
    fetch(url, movieInfo).then(function (result){
        console.log('post created successfully');
    });
}

function updateMovie(id) {
    fetch(`${url}/${id}`, updateOptions).then(function (result){
        console.log('updated successfully');
    });
}

function deleteMovie(id){
    fetch(`${url}/${id}`,{method: 'DELETE'}).then(function (result){
        console.log('deleted successfully');
    });
}


function movieInfo(){
    let movieTitle = $('#moviesTitle').val();
    let movieRating = $('#moviesRating').val();
    let movieYear = $('#moviesYear').val();
    let moviePlot = $('#moviesPlot').val();


    let movie = {
        title: movieTitle,
        rating: movieRating,
        year: movieYear,
        plot: moviePlot
    }

    return movie;
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

// $('.delete-btn').click(function (e){
//     console.log('test')
// });

$(document).on('click','.delete-btn',function(){
    deleteMovie($(this).val());
});
