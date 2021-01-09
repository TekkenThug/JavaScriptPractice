'use strict';

const personalMovieDB = {
  count: 0,
  movies: {},
  actors: {},
  genres: [],
  privat: false,
  start: function() {
    personalMovieDB.count = +prompt("Сколько фильмов вы уже посмотрели?", "");
  
    while (personalMovieDB.count == "" || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
      personalMovieDB.count = +prompt("Сколько фильмов вы уже посмотрели?", "");
    }
  },
  rememberMyFilms: function() {
    for (let i = 0; i < 2; i++) {
      const a = prompt("Один из последних просмотренных фильмов?", ""),
            b = prompt("На сколько вы оцените его?", "");
    
      if (a != null && a.length < 50 && a != "" && b != null && b != "") {
        personalMovieDB.movies[a] = b;
      } else {
        i--;
      }
    }
  },
  detectPersonalLevel: function() {
    if (personalMovieDB.count < 10) {
      alert("Просмотрено довольно мало фильмов");
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
      alert("Вы классический зритель");
    } else if (personalMovieDB > 30) {
      alert("Вы киноман!");
    } else {
      alert("Произошла ошибка :(");
    }
  },
  showMyDB: function() {
    if (!personalMovieDB.privat) {
      console.log(personalMovieDB);
    }
  },
  toggleVisibleMyDB: function() {
    personalMovieDB.privat = personalMovieDB.privat == false ? true : false;
  },
  writeYourGenres: function() {
    for (let i = 1; i <= 3; i++) {
      let genreName = prompt(`Ваш любимый жанр под номером ${i}`, "");
  
      if (genreName == "" || genreName == null) {
        i--;
      } else {
        personalMovieDB.genres.push(genreName);
      }
    }
  }
};
