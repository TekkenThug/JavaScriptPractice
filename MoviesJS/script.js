const numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");

let personalMovieDB = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  privat: false
};

for (let i = 0; i < 2; i++) {
  const a = prompt("Один из последних просмотренных фильмов?", ""),
        b = prompt("На сколько вы оцените его?", "");

  if (a != null && a.length < 50 && a != "" && b != null && b != "") {
    personalMovieDB.movies[a] = b;
  } else {
    i--;
  }
}

console.log(personalMovieDB);