let headerBtn = document.querySelector('.header__btn');
let popUpBtn = document.querySelector('.pop-up__btn');

let searchInput = document.querySelector('.search__input');

let popUp = document.querySelector('.pop-up');

const API_URL = 'https://raw.githubusercontent.com/Dmitrii-Saprankov/URLS/branch-1.1/rest.json';

let openForm = () => popUp.style.display = 'block';
let closeForm = () => popUp.style.display = 'none';


headerBtn.onclick = openForm;
popUpBtn.onclick = closeForm;
popUp.onclick = closeForm;

function makeGETRequest(url) {
    return new Promise((resolve) => {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    });
    
}

class RestItem {
    constructor(name = 'Здесь скоро будет новый ресторан', image = 'images/nofoto.jpg', desc = 'Мы подключаем ресторан к UberEats', time = '') {
        this.name = name;
        this.image = image;
        this.desc = desc;
        this.time = time;
    }

    render() {
        return `<div class="restaurants__card">
                    <a href="restaurant.html"><img class="restaurants__img" src=${this.image}
                            alt="image of restaurant"></a>
                    <a href="../UberEats/Restaurant.html">
                        <h3 class="restaurants__heading">${this.name}</h3>
                    </a>
                    <p class="restaurants__desc">${this.desc}</p>
                    <p class="restaurants__desc">${this.time}</p>
                </div>`;
    }
}

class RestList {
    constructor() {
        this.restaurants = [];
        this.filteredRests = [];
    }

    fetchRest() {    
        return makeGETRequest(API_URL)
            .then((prop) => {
            this.restaurants = JSON.parse(prop);
            this.filteredRests = JSON.parse(prop);
            console.log(this.filteredRests)
        })
    }

    filterRests(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredRests = this.restaurants.filter(rest => regexp.test(rest.name));
        this.render();
    }

    render() {
        let listHtml = '';
        this.filteredRests.forEach(rest => {
            const restItem = new RestItem(rest.name, rest.image, rest.desc, rest.time);
            listHtml += restItem.render();
        });
        document.querySelector('.restaurants').innerHTML = listHtml;
    }
}

searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        const value = searchInput.value;
        list.filterRests(value);
    }
});

const list = new RestList();
list.fetchRest()
    .then(() => list.render());