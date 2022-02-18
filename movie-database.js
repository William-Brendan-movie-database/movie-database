
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

fetchMovies().then(movies => console.log(movies));
// createMovie();
// updateMovie(10);
// deleteMovie(8);

function fetchMovies(){
    return fetch(url).then(function (result){
        return result.json();
    }).then(function (movies){
        return movies;
    });
}

function createMovie() {
    fetch(url, createOptions).then(function (result){
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