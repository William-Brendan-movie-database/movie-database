
const url = 'https://standing-zest-glass.glitch.me/movies';
const blogPost = {title: 'Ajax Requests', body: 'Are a fun way to use JS!'};

const createOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogPost),
};

const options = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogPost),
};


fetchMovies().then(movies => console.log(movies));
// createMovies();

function fetchMovies(){
    return fetch(url).then(function (result){
        return result.json();
    }).then(function (movies){
        return movies;
    });
}

function createMovies() {
    fetch(url, createOptions).then(function (result){
        console.log('post created successfully');
    });
}