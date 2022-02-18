
const url = 'https://standing-zest-glass.glitch.me/movies';
const blogPost = {title: 'Ajax Requests', body: 'Are a fun way to use JS!'};

const createOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogPost),
};

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
// deleteMovie(8);
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
                <div class="col-6 id-${movie.id} row">
                    <div class="col-6">${movie.title}<span class="ml-3">${movie.year}</span></div>
                    <div class="col-6">${movie.rating}/5</div>
                    <div class="offset-10"><button id="delete-btn">delete</button></div>
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






$('#create-movie-btn').click(function (e){
    let movieTitle = $('#moviesTitle').val();
    let movieRating = $('#moviesRating').val();

    let movie = {
        title: movieTitle,
        rating: movieRating
    }

    let createOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    };

    createMovie(createOptions)
    fetchMovies().then(r => console.log(r));

});

$('')