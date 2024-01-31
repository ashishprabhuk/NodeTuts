const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let movies = [
  { id: 1, title: 'Inception', director: 'Christopher Nolan' },
  { id: 2, title: 'The Shawshank Redemption', director: 'Frank Darabont' },
];

// Routes

// Get all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Get a specific movie by ID
app.get('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === movieId);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

// Create a new movie
app.post('/movies', (req, res) => {
  const { title, director } = req.body;

  // If all movies were deleted, start with ID 1
  const newMovieId = movies.length === 0 ? 1 : movies[movies.length - 1].id + 1;

  const newMovie = { id: newMovieId, title, director };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// Update a movie by ID
app.put('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === movieId);

  if (movie) {
    movie.title = req.body.title || movie.title;
    movie.director = req.body.director || movie.director;
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

// Delete a movie by ID
app.delete('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  movies = movies.filter((m) => m.id !== movieId);
  res.json({ message: 'Movie deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
