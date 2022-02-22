
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
                <div class="card col-12 col-sm-5 col-md-3 m-1 py-2">
                  <div class="card-body card-plot">
                    <h5 class="card-title title">${movie.title}</h5>
                    <p class="card-text">${movie.plot}</p>
                  </div>
                  <ul class="list-group list-group-flush card-list">
                    <li class="list-group-item">Year: ${movie.year}</li>
                    <li class="list-group-item">Rating: ${movie.rating}/5</li>
                    <li class="list-group-item">Director: ${movie.director}</li>
                  </ul>
                  <div class="card-body d-flex justify-content-between">
                  
                    <button type="button" data-toggle="modal" data-target="#exampleModal" class="edit-btn btn" value="${movie.id}">edit</button>
                    
                

                    
                    <button class="delete-btn btn" value="${movie.id}">delete</button>
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
        appendMovies()
    });
}

function updateMovie(id, updateOptions) {
    fetch(`${url}/${id}`, updateOptions).then(function (result){
        console.log('updated successfully');
        appendMovies()
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


    let movie = {
        title: movieTitle,
        rating: movieRating,
        year: movieYear,
        plot: moviePlot,
        director: movieDirector
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

$(document).on('click', '.edit-btn', function (){
    let id = parseInt($(this).val())
    console.log(id)

    fetchMovies().then(movies => {
        for (let movie of movies) {
            if (id === movie.id){

                $('#titleForm').val(movie.title);
                $('#plotForm').val(movie.plot);
                $('#yearForm').val(movie.year);
                $('#ratingForm').val(movie.rating);
                $('#directorForm').val(movie.title);

            }
        }
    });
    $('.update-btn').click(function (){
        let updatedMovie = {
            title: $('#titleForm').val(),
            plot: $('#plotForm').val(),
            year: $('#yearForm').val(),
            rating: $('#ratingForm').val(),
            director: $('#directorForm').val()
        }

        const updateOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMovie),
        };
        updateMovie(id, updateOptions);

        $('#exampleModal')
    });
});

$(document).on('click','.delete-btn',function(){
    deleteMovie($(this).val());
});
// $(document).on('click', '.dismiss-btn', function (){
//     $('#exampleModal').css('display', 'none')
// });


