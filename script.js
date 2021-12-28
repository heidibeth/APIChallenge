function displayPokemon(pokemon) {
    let name = pokemon.name;
    console.log(name);
    updateImageContent(pokemon);
    updateTextContent("height", pokemon, "height");
    updateTextContent("name", pokemon, "name");
    updateTextContent("type", pokemon, "types");
    updateTextContent("weight", pokemon, "weight");
    updateTextContent("moves", pokemon, "moves");
    moveBall();
    document.getElementById("selector").value = "I choose you!";
}

function moveBall() {
    let ball = document.getElementById('ballContainer')
    ball.setAttribute("class", "start corner");
    let header = document.getElementById('headerContainer');
    header.setAttribute("class", "start corner");
    let pikachu = document.getElementById('pika');
    pikachu.setAttribute("class", "disappear");
  }

  
  function randomPokemon(listOfPokemon) {
    let randomIndex = Math.floor(Math.random() * listOfPokemon.length);
    pokemonLookup(listOfPokemon, listOfPokemon[randomIndex].name);
  }
  
  function updateImageContent(pokemon) {
    let pokemonImage = document.getElementById("photo");
    pokemonImage.innerHTML = `<img src='assets/${pokemon.name}.png' alt='photo of ${pokemon.name}'/>`;
  }
  
  function updateTextContent(elementId, pokemon, pokemonProp) {
    let element = document.getElementById(elementId);
    let targetProp = pokemon[pokemonProp];
    element.innerHTML = "<span class='descLabel'>" + elementId.charAt(0).toUpperCase() + elementId.slice(1) + ":</span>" + " ";
    if (pokemonProp === "types") {
      element.innerHTML += typeListToString(pokemon);
    } else if (pokemonProp === "moves") {
      element.innerHTML += moveListToString(pokemon);
    } else if (pokemonProp === "name") {
      element.innerHTML += targetProp.charAt(0).toUpperCase() + targetProp.slice(1);
    } else {
      element.innerHTML += targetProp;
    }
  }
  
  function typeListToString(pokemon) {
    let types = pokemon.types;
    let result = ""
    for (let i = 0; i < types.length; i++) {
      let type = types[i].type.name;
      result += type.charAt(0).toUpperCase() + type.slice(1);
      if (i < types.length - 1) {
        result += ', '
      }
    } 
    return result;
  }
  
  function moveListToString(pokemon) {
    let moves = pokemon.moves;
    let result = ""
    for (let i = 0; i < moves.length; i++) {
      let move = moves[i].move.name;
      result += move.charAt(0).toUpperCase() + move.slice(1);
      if (i < moves.length - 1) {
        result += ', '
      }
    }
    return result;
  }
  
  function pokemonLookup(arr, nameOfPokemon) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === nameOfPokemon) {
        let url = arr[i].url;
        fetch(url).then((response) => response.json()).then( function(pokemon) {
          // pokemon is a single pokemon object
          
          displayPokemon(pokemon);
        });
      }
    }
  }
  
  fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then( function(response) {
    return response.json();
  }).then( function(data) {
    // data is an Object containing pokemon names and urls
    let dropDown = document.getElementById('selector');
    let pokemon = data.results;
    
    let pokemonNames = [];
    for (let i = 0; i < pokemon.length; i++) {
      pokemonNames.push(pokemon[i].name)
    }

    pokemonNames = pokemonNames.sort();

    for (let i = 0; i < pokemonNames.length; i++) {
      let pokemonName = pokemonNames[i]
      dropDown.innerHTML += '<option>' + pokemonName + '</option>'
    }

    dropDown.addEventListener('change', function() {
    pokemonLookup(pokemon, this.value);
  })
  // pokemon is an Array of pokemon objects
  // pokemonLookup(pokemon, 'pikachu');
  document.getElementById('ball').addEventListener("click", function() {
    randomPokemon(pokemon);
  })
})
