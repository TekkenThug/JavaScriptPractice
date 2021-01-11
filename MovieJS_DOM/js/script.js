/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

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
    filmList = document.querySelector('.promo__interactive-list');


advBlock.forEach(item => item.remove());
genreName.textContent = 'драма';
filmPoster.style.backgroundImage = 'url(img/bg.jpg)';

movieDB.movies.sort();

filmList.innerHTML = "";

movieDB.movies.forEach((film, index) => {
    filmList.innerHTML += `
    <li class="promo__interactive-item"> ${index + 1}. ${film}
        <div class="delete"></div>
    </li>
    
    `
})





