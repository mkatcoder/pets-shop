const items = [
  {
    title: "Игрушка мячик",
    description: "Ваш питомец будет счастлив!",
    tags: ["cat", "dog"],
    price: 500,
    img: "./img/1.jpeg",
  },
  {
    title: "Игрушка лабиринт",
    description: "Поможет в развитии интеллекта!",
    tags: ["cat", "dog"],
    price: 900,
    img: "./img/2.jpeg",
  },
  {
    title: "Игрушка для котят",
    description: "Отвлечет вашего питомца!",
    tags: ["cat"],
    price: 300,
    img: "./img/3.jpeg",
  },
  {
    title: "Миска «Котик»",
    description: "Подойдет и для собак!",
    tags: ["cat", "dog"],
    price: 660,
    img: "./img/4.jpeg",
  },
  {
    title: "Лоток розовый",
    description: "Теперь вы можете забыть о проблемах с туалетом",
    tags: ["cat"],
    price: 400,
    img: "./img/5.jpeg",
  },
  {
    title: "Сухой корм для кошек",
    description: "Специальная формула для милых усатиков!",
    tags: ["cat"],
    price: 200,
    img: "./img/6.jpeg",
  },
  {
    title: "Сухой корм для собак",
    description: "Содержит полный комплекс витаминов",
    tags: ["dog"],
    price: 300,
    img: "./img/7.jpeg",
  },
  {
    title: "Игрушка для собак",
    description: "Теперь вы можете не переживать за личные вещи",
    tags: ["dog"],
    price: 500,
    img: "./img/8.jpeg",
  },
  {
    title: "Лежанка",
    description: "Идеальное место для отдыха!",
    tags: ["cat", "dog"],
    price: 1500,
    img: "./img/9.jpeg",
  },
  {
    title: "Поилка для собак",
    description: "Возьмите с собой в путешествие",
    tags: ["dog"],
    price: 800,
    img: "./img/10.jpeg",
  },
  {
    title: "Переноска",
    description: "Путешествуйте с комфортом!",
    tags: ["cat", "dog"],
    price: 3500,
    img: "./img/11.jpeg",
  },
  {
    title: "Поводок для собак",
    description: "Для чудесных прогулок вместе",
    tags: ["dog"],
    price: 800,
    img: "./img/12.jpeg",
  },
];

//## Базовый уровень

// Находим элементы с `id="shop-items"` и шаблон (template) с `id="item-template"` и записываем их в переменные
const itemTemplate = document.querySelector('#item-template');
const shopItems = document.querySelector('#shop-items');

function createCard(item) {
   // Обращаемся к содержимому шаблона с помощью content, копируем его структуру с помощью cloneNode(true) и записываем все это в переменную
   const itemOfArray = itemTemplate.content.cloneNode(true);

   // Заполняем карточку на базе темплейта: отыскиваем нужные теги и заполняем их содержимым
   itemOfArray.querySelector('h1').textContent = item.title;
   itemOfArray.querySelector('p').textContent = item.description;
   itemOfArray.querySelector('img').src = item.img;
   itemOfArray.querySelector('.price').textContent = `${item.price} ₽`;
 
   //перебором создаем span, добавляем класс tag , текст контент, находим контейнер для тегов и туда их вставляем. Там есть пустой див куда и надо их вставить. 
   //Делаем выборку этого контейнера. А потом forEach для массива тегов, создаем span, навешиваем класс, добавляем текст контент и вставляем их в контейнер для тегов
 
   const tagsContainer = itemOfArray.querySelector('.tags');
 
   item.tags.forEach(tag => {
     const tagElement = document.createElement('span');
     tagElement.classList.add('tag');
     tagElement.textContent = tag;
     tagsContainer.append(tagElement);
   })
   return itemOfArray;
}

// Перебираем массив с помощью forEach,чтобы подставить в каждый его элемент структуру темплейта
items.forEach(item => {
  const card = createCard(item);
  shopItems.append(card); 
});

//## Продвинутый уровень - Добавь поиск на сайт

//При клике на кнопку c `id="search-btn"` должно браться значение из поля с `id="search-input"`
const searchButton = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');

searchButton.addEventListener('click', function () {
  performSearch();
});

//добавим еще обработчик на кнопку Enter, т.к. ей часто пользуются при поиске 
searchInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    performSearch();
  }
});

  //Оборачиваем действия в функцию performSearch и делаем поиск нечувствительным к регистру и лишним пробелам.
  function performSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Для очистки контейнера от результатов предыдущего поиска используем свойство `innerHTML` и очищаем содержимое элемента с `id="nothing-found"`
  const nothingFound = document.querySelector('#nothing-found');
  shopItems.innerHTML = '';
  nothingFound.textContent = '';

  // Проверим товары на соответствие условию: введенная строка содержится в `title` товара. 
  
  const filteredItems = items.filter(item => item.title.trim().toLowerCase().includes(searchTerm));

  // Если под условие поиска подошел хотя бы один товар (т.е. проверяем, что отфильтрованный массив не пустой), отображаем массив результатов в элементе с `id="shop-items"`. 

  if (filteredItems.length > 0) {
    filteredItems.forEach(item => {
      const card = createCard(item);
      shopItems.append(card); 
    });
    //Если не нашлось ни одного товара, подходящего под условие поиска, показываем текст "Ничего не найдено".  
  } else {
    nothingFound.textContent = 'Ничего не найдено';
  }
};

