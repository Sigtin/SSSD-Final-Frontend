const BASE_URL = "http://localhost/SSSD-Final/SSSD-Final-Backend/project_files/";

// Get the decks made by the person currently logged in
fetch(BASE_URL + "get_decks.php")
.then(response => response.json())
.then(data => {
    console.log(data.decks);

    let dropdown = document.getElementById('dropdowncontent');

    for (let i = 0; i < data.decks.length; i++) {
        let content = document.createElement('a');
        content.href = `./deck.html?id=${data.decks[i].id}`;
        content.innerText = data.decks[i].deck_name;
        dropdown.appendChild(content);
    }
})
.catch(e => console.log(e));