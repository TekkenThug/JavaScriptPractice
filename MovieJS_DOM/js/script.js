'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const advBlock = document.querySelectorAll('.promo__adv *'),
        filmPoster = document.querySelector('.promo__bg'),
        genreName = filmPoster.querySelector('.promo__genre'),
        filmList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addingInput = addForm.querySelector('input.adding__input'),
        favoriteCheckbox = addForm.querySelector('[type="checkbox"]');

    const deleteAdv = function(block) {
        block.forEach(item => item.remove());
    };

    const makeChanges = function(title, posterImage) {
        title.textContent = 'драма';
        posterImage.style.backgroundImage = 'url(img/bg.jpg)';
    };

    const sortArray = (arr) => {
        arr.sort();
    };

    function createMoviesList(films, parent) {
        parent.innerHTML = "";
        sortArray(films);

        films.forEach((film, index) => {
            parent.innerHTML += `
            <li class="promo__interactive-item"> ${index + 1}. ${film}
                <div class="delete"></div>
            </li>`;
        });

        document.querySelectorAll('.delete').forEach((bucket, index) => {
            bucket.addEventListener('click', () => {
                bucket.parentElement.remove();
                films.splice(index, 1);
                createMoviesList(films, parent);
            });
        });
    }

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (addingInput.value) {
            if (addingInput.value.length > 21) {
                addingInput.value = `${addingInput.value.slice(0, 21)}...`;
            }

            if (favoriteCheckbox.checked) { 
                console.log("Добавляется любимый фильм");
            }

            movieDB.movies.push(addingInput.value);
            sortArray(movieDB.movies);
            createMoviesList(movieDB.movies, filmList);
        }

        e.target.reset();
        console.log(movieDB);

    });

    deleteAdv(advBlock);
    makeChanges(genreName, filmPoster);
    createMoviesList(movieDB.movies, filmList);
});







