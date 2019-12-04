const app = {
    // URL to the backend API
    BASE_URL: "http://localhost/SSSD-Final/SSSD-Final-Backend/project_files/",

    // Get the decks made by the current user and put them in the navbar
    get_decks_for_nav: () => {
        fetch(app.BASE_URL + "get_decks.php")
            .then(response => response.json())
            .then(data => {
                console.log(data);

                let dropdown = document.getElementById('dropdowncontent');

                for (let i = 0; i < data.decks.length; i++) {
                    let content = document.createElement('a');
                    content.href = `./deck.html?id=${data.decks[i].id}`;
                    content.innerText = data.decks[i].deck_name;
                    dropdown.appendChild(content);
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
                for (var i = 0; i < currentDeck.length; i++) {
                    var card = document.createElement('div');
                    card.classList('deckCard');
                    var container = document.createElement('div');
                    container.classList('cardContainer');
                    var name = document.createElement('h2');
                    name.classList('deckCardName');
                    name.innerHTML = currentDeck[i].name;
                    var br = document.createElement('br');
                    var img = document.createElement('img');
                    img.src = currentDeck[i].imageUrl;

                    var detailContainer = document.createElement('div');
                    detailContainer.classList('deckCardDetailContainer');
                    var manaCost = document.createElement('div');
                    manaCost.classList('manaCost');
                    manaCost.innerText = 'Mana Cost: ' + currentDeck[i].manaCost;
                    var cardType = document.createElement('div');
                    cardType.classList('cardType');
                    cardType.innerText = 'Card Type: ' + currentDeck[i].type;
                    var cardDescription = document.createElement('div');
                    cardDescription.classList('cardDescription');
                    cardDescription.innerText = 'Description: ' + currentDeck[i].oracleText;
                    detailContainer.appendChild(manaCost);
                    detailContainer.appendChild(cardType);
                    detailContainer.appendChild(cardDescription);

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

    search_mtg_api: () => {
        // console.log("searching");
        var searchbar = document.getElementById('searchBar');
        // console.log(searchbar.value);
        var results = [];
        if (searchbar.value != null && searchbar.value.trim != "") {
            fetch(`https://api.magicthegathering.io/v1/cards/${searchbar.value}`, {
                method: 'GET'
            }).then(response => response.json()).then(json => {
                for (var j = 0; j < json.cards.length; j++) {
                    results.push(json.cards[i]);
                }
            });
        }
        for (var i = 0; i < results.length; i++) {
            var card = document.createElement('div');
            card.classList('searchCard');
            card.addEventListener('click', searchCardModalPopUp);
            var container = document.createElement('div');
            container.classList('cardContainer');
            var name = document.createElement('h2');
            name.classList('searchCardName');
            name.innerHTML = results[i].name;
            var br = document.createElement('br');
            var img = document.createElement('img');
            img.src = results[i].imageUrl;

            container.appendChild(name);
            container.appendChild(br);
            container.appendChild(img);
            card.appendChild(container);
            document.appendChild(card);
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
            document.getElementById("searchBar").addEventListener('keypress', app.search_mtg_api);
        }
    }
}


app.init();