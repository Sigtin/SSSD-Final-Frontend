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
                for (let i = 0; i < data.decks.length; i++) {
                    let deckList = document.createElement('div');
                    deckList
                    let deck = document.createElement("div");
                    deck.classList = "cardcontainer";

                    let deckname = document.createElement("h1");
                    deckname.classList = "deckName";
                    deckname.innerText = data.decks[i].deck_name;
                    deck.appendChild(deckname);

                    let numberOfCards = document.createElement("h3");
                    numberOfCards.classList = "numOfCards";
                    numberOfCards.innerText = data.decks[i].cardlist.length;
                    deck.appendChild(numberOfCards);

                    deckList.appendChild(deck);

                    deck.addEventListener("click", () => {
                        window.location.href = `http://localhost/SSSD-Final/SSSD-Final-Frontend/project_files/pages/deck.html?id=${data.decks[i].id}`;
                    })
                }
            })
            .catch(e => console.log(e));
    },

    search_mtg_api: () => {
        console.log("searching");
        var searchbar = document.getElementsByClassName('searchBar');
        console.log(searchbar.value);
        var results = [];
        if (searchbar.value != null) {
            //results = search for card by value
        } else {
            //results = search for card by id
        }
        for (var i = 0; i < results.length; i++) {
            var card = document.createElement('div');
            card.classList('searchCard');
            card.addEventListener('onclick', searchCardModalPopUp);
            var container = document.createElement('div');
            container.classList('cardContainer');
            var name = document.createElement('h2');
            name.classList('searchCardName');
            name.innerHTML = 'CARDNAME';
            var br = document.createElement('br');
            var img = document.createElement('img');
            img.src = 'IMAGEURL';

            container.appendChild(name);
            container.appendChild(br);
            container.appendChild(img);
            card.appendChild(container);
            document.appendChild(card);
        }
    },

    search_deck: () => {
        var results = [];
        for (var i = 0; i < results.length; i++) {
            var card = document.createElement('div');
            card.classList('deckCard');
            var container = document.createElement('div');
            container.classList('cardContainer');
            var name = document.createElement('h2');
            name.classList('deckCardName');
            name.innerHTML = 'CARDNAME';
            var br = document.createElement('br');
            var img = document.createElement('img');
            img.src = 'IMAGEURL';

            var detailContainer = document.createElement('div');
            detailContainer.classList('deckCardDetailContainer');
            var manaCost = document.createElement('div');
            manaCost.classList('manaCost');
            manaCost.innerText = 'Mana Cost: ' + 'MANACOST';
            var cardType = document.createElement('div');
            cardType.classList('cardType');
            cardType.innerText = 'Card Type: ' + 'CARDTYPE';
            var cardDescription = document.createElement('div');
            cardDescription.classList('cardDescription');
            cardDescription.innerText = 'Description: ' + 'DESCRIPTION';
            detailContainer.appendChild(manaCost);
            detailContainer.appendChild(cardType);
            detailContainer.appendChild(cardDescription);

            var cardQuantityContainer = document.createElement('div');
            cardQuantityContainer.classList('cardQuantityContainer');
            var quantityNum = document.createElement('div');
            quantityNum.classList('quantityNum');
            quantityNum.innerText = 'Quantity: ' + 'QUANTITY';
            var addQuantityBtn = document.createElement('div');
            addQuantityBtn.classList('addQuantityBtn');
            addQuantityBtn.innerText = 'Add';
            addQuantityBtn.addEventListener('onclick', AddCard);
            var removeQuantityBtn = document.createElement('div');
            removeQuantityBtn.classList('removeQuantityBtn');
            removeQuantityBtn.innerText = 'Remove';
            removeQuantityBtn.addEventListener('onclick', RemoveCard);
            cardQuantityContainer.appendChild(quantityNum);
            cardQuantityContainer.appendChild(addQuantityBtn);
            cardQuantityContainer.appendChild(removeQuantityBtn);

            container.appendChild(name);
            container.appendChild(br);
            container.appendChild(img);
            container.appendChild(detailContainer);
            card.appendChild(container);
            document.appendChild(card);
        }
    },



    // Initiation method that gets called on script call
    init: () => {
        if (document.getElementById("dropdowncontent")) {
            app.get_decks_for_nav();
        }

        if (document.getElementById("deckListCard")) {
            app.get_decks_for_list();
        }
        if (document.getElementsByClassName("searchBar")) {
            document.getElementsByClassName("searchBar").addEventListener('onkeypress', app.search_mtg_api());
        }
    }
}


app.init();