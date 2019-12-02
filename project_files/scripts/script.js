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
                let deckList = document.getElementById('deckListCard');

                for (let i = 0; i < data.decks.length; i++) {
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
                }
            })
            .catch(e => console.log(e));
    },



    // Initiation method that gets called on script call
    init: () => {
        if (document.getElementById("dropdowncontent")) {
            app.get_decks_for_nav();
        }

        if (document.getElementById("deckListCard")) {
            app.get_decks_for_list();
        }
    }
}

app.init();