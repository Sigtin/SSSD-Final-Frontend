let modalId = 0;
const app = {
    // URL to the backend API
    BASE_URL: "http://localhost/SSSD-Final/SSSD-Final-Backend/project_files/",
    // Get the decks made by the current user and put them in the navbar
    get_decks_for_nav: () => {
        fetch(app.BASE_URL + "get_decks.php")
            .then(response => response.json())
            .then(data => {
                // console.log(data);

                if (data) {
                    let dropdown = document.getElementById('dropdowncontent');

                    for (let i = 0; i < data.decks.length; i++) {
                        let content = document.createElement('a');
                        content.href = `./deck.html?id=${data.decks[i].id}`;
                        content.innerText = data.decks[i].deck_name;
                        dropdown.appendChild(content);
                    }
                }
            })
            .catch(e => console.log(e));
    },

    // Get the decks made by the current user and add them to the deck_list page
    get_decks_for_list: () => {
        fetch(app.BASE_URL + "get_decks.php")
            .then(response => response.json())
            .then(data => {
                let deck_list = document.getElementById("deck_list");
                for (let i = 0; i < data.decks.length; i++) {
                    let deckList = document.createElement('div');
                    deckList.id = "deckListCard";
                    let deck = document.createElement("div");
                    deck.classList = "cardcontainer";

                    let deckname = document.createElement("h1");
                    deckname.classList = "deckName";
                    deckname.innerText = data.decks[i].deck_name;
                    deck.appendChild(deckname);

                    let numberOfCards = document.createElement("h3");
                    numberOfCards.classList = "numOfCards";
                    numberOfCards.innerText = `Number of Cards: ${data.decks[i].cardlist.length}`;
                    deck.appendChild(numberOfCards);

                    deckList.appendChild(deck);

                    deck.addEventListener("click", () => {
                        window.location.href = `http://localhost/SSSD-Final/SSSD-Final-Frontend/project_files/pages/deck.html?id=${data.decks[i].id}`;
                    })

                    deck_list.appendChild(deckList);
                }
            })
            .catch(e => console.log(e));
    },

    get_cards_for_deck: () => {
        fetch(app.BASE_URL + "get_decks.php")
            .then(response => response.json())
            .then(data => {
                let url = window.location.href;
                let splitUrl = url.split('=');
                let deckID = Number(splitUrl[1]);
                let currentDeck = data.decks[deckID].cardlist;
                let deck = currentDeck.split(',');
                for (var i = 0; i < deck.length; i++) {
                    fetch(`https://api.magicthegathering.io/v1/cards?name=${deck[i]}`)
                        .then(response => response.json())
                        .then(json => {
                            console.log(json);

                            var card = document.createElement('div');
                            card.classList('deckCard');
                            var container = document.createElement('div');
                            container.classList('cardContainer');
                            var name = document.createElement('h2');
                            name.classList('deckCardName');
                            name.innerHTML = json.cards[0].name;
                            var br = document.createElement('br');
                            var img = document.createElement('img');
                            img.src = json.cards[0].imageUrl;

                            var detailContainer = document.createElement('div');
                            detailContainer.classList('deckCardDetailContainer');
                            var manaCost = document.createElement('div');
                            manaCost.classList('manaCost');
                            manaCost.innerText = 'Mana Cost: ' + json.cards[0].manaCost;
                            var cardType = document.createElement('div');
                            cardType.classList('cardType');
                            cardType.innerText = 'Card Type: ' + json.cards[0].type;
                            var cardDescription = document.createElement('div');
                            cardDescription.classList('cardDescription');
                            cardDescription.innerText = 'Description: ' + json.cards[0].text;
                            detailContainer.appendChild(manaCost);
                            detailContainer.appendChild(cardType);
                            detailContainer.appendChild(cardDescription);
                            container.appendChild(name);
                            container.appendChild(br);
                            container.appendChild(img);
                            card.appendChild(container);
                            card.appendChild(detailContainer);
                        });

                    // var cardQuantityContainer = document.createElement('div');
                    // cardQuantityContainer.classList('cardQuantityContainer');
                    // var quantityNum = document.createElement('div');
                    // quantityNum.classList('quantityNum');
                    // quantityNum.innerText = 'Quantity: ' + 'QUANTITY';
                    // var addQuantityBtn = document.createElement('div');
                    // addQuantityBtn.classList('addQuantityBtn');
                    // addQuantityBtn.innerText = 'Add';
                    // addQuantityBtn.addEventListener('onclick', AddCard);
                    var removeQuantityBtn = document.createElement('div');
                    removeQuantityBtn.classList('removeQuantityBtn');
                    removeQuantityBtn.innerText = 'Remove';
                    removeQuantityBtn.addEventListener('onclick', RemoveCard);
                    // cardQuantityContainer.appendChild(quantityNum);
                    // cardQuantityContainer.appendChild(addQuantityBtn);
                    cardQuantityContainer.appendChild(removeQuantityBtn);

                    container.appendChild(name);
                    container.appendChild(br);
                    container.appendChild(img);
                    container.appendChild(detailContainer);
                    card.appendChild(container);
                    document.appendChild(card);
                }
            }).catch(e => console.log(e));
    },
    search_card_modal_popup: (evt, id) => {
        var content = document.getElementById('modal-content');
        content.children = new Array();
        var card = document.createElement('div');
        console.log(id);
        fetch(`https://api.magicthegathering.io/v1/cards?name=${id.path[2].innerText}`)
            .then(response => response.json())
            .then(json => {
                card.classList = 'deckCard';
                var container = document.createElement('div');
                container.classList = 'cardContainer';
                var name = document.createElement('h2');
                name.classList = 'deckCardName';
                name.innerHTML = json.cards[0].name;
                var br = document.createElement('br');
                var img = document.createElement('img');
                img.src = json.cards[0].imageUrl;

                var detailContainer = document.createElement('div');
                detailContainer.classList = 'deckCardDetailContainer';
                var manaCost = document.createElement('div');
                manaCost.classList = 'manaCost';
                manaCost.innerText = 'Mana Cost: ' + json.cards[0].manaCost;
                var cardType = document.createElement('div');
                cardType.classList = 'cardType';
                cardType.innerText = 'Card Type: ' + json.cards[0].type;
                var cardDescription = document.createElement('div');
                cardDescription.classList = 'cardDescription';
                cardDescription.innerText = 'Description: ' + json.cards[0].text;
                var addQuantityForm = document.createElement('div');
                addQuantityForm.method = "POST";
                addQuantityForm.action = `${app.BASE_URL}update_deck.php`;
                var nameInput = document.createElement('input');
                nameInput.type = 'hidden';
                nameInput.name = 'name';
                var addBtn = document.createElement('button');
                addBtn.classList = 'addQuantityBtn submit';
                addBtn.type = 'submit';
                addBtn.value = 'Add'
                //     <form action="http://localhost/SSSD-Final/SSSD-Final-Backend/project_files/sign_up.php" method="POST">
                //     <input type="text" name="username" placeholder="Username" />
                //     <input type="password" name="password" placeholder="Password" />
                //     <input type="password" name="password_confirm" placeholder="Confirm Password" />
                //     <button class="submit" type="submit">Register</button>
                // </form>
                // addQuantityBtn.addEventListener('onclick', app.add_card.bind(null, name));
                detailContainer.appendChild(manaCost);
                detailContainer.appendChild(cardType);
                detailContainer.appendChild(cardDescription);
                container.appendChild(name);
                container.appendChild(br);
                container.appendChild(img);
                card.appendChild(container);
                card.appendChild(detailContainer);
                card.appendChild(addQuantityBtn);
            });
        var modal = document.getElementById('modal');
        modal.style.display = "block";
        content.appendChild(card);
        window.addEventListener('click', app.close_modal);
    },
    close_modal: () => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    },
    add_card: () => {

    },
    search_mtg_api: () => {
        // console.log("searching");
        var searchbar = document.getElementById('searchBar');
        // console.log(searchbar.value);
        if (searchbar.value != null && searchbar.value.trim != "") {
            fetch(`https://api.magicthegathering.io/v1/cards?name=${searchbar.value}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json);

                    let cardsContainer = document.getElementById("cards");
                    cardsContainer.children = null;
                    for (var i = 0; i < json.cards.length; i++) {
                        var card = document.createElement('div');
                        card.classList = 'searchCard';
                        var nameBind = json.cards[i].name;
                        card.addEventListener('click', app.search_card_modal_popup.bind(null, nameBind));

                        var container = document.createElement('div');
                        container.classList = 'cardContainer';

                        var name = document.createElement('h2');
                        name.classList = 'searchCardName';
                        name.innerHTML = json.cards[i].name;

                        var br = document.createElement('br');

                        var img = document.createElement('img');

                        if (json.cards[i].imageUrl) {
                            img.src = json.cards[i].imageUrl;
                        } else {
                            img.src = "https://i.redd.it/qnnotlcehu731.jpg";
                        }

                        container.appendChild(name);
                        container.appendChild(br);
                        container.appendChild(img);
                        card.appendChild(container);
                        cardsContainer.appendChild(card);
                    }
                });
        }

    },
    // Initiation method that gets called on script call
    init: () => {
        if (document.getElementById("dropdowncontent")) {
            app.get_decks_for_nav();
        }

        if (document.getElementById("deck_list")) {
            app.get_decks_for_list();
        }
        if (document.getElementById("searchBar")) {
            document.getElementById("searchBar").addEventListener('keyup', app.search_mtg_api);
        }
    }
}

// var modal = document.getElementById('modal');
// document.getElementsByClassName("close")[0].addEventListener('click', closeModal);
// function viewModal(evt) {
// modal.style.display = "block";
// }
// function closeModal(evt) {
// modal.style.display = "none";
// }
// window.onclick = function(event) {
// if (event.target == modal) {
// modal.style.display = "none";
// }
// }

app.init();