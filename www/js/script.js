let urlPokemon="https://tyradex.tech/api/v1/pokemon"
let urlTypes="https://tyradex.tech/api/v1/types/"
let urlGen="https://tyradex.tech/api/v1/gen/"
let allPokemon;
let allPokemonLength;
let allTypes;
let allTypesLength;
let allGen;
let allGenLength;
let fiche;

function allPokemonConfig() {
    fetch(urlPokemon)
    .then(reponse => reponse.json())
    .then(reponse => {
        console.log(reponse);
        allPokemon=reponse;
        localStorage.setItem("allPokemon", JSON.stringify(reponse));
        allPokemonLength=allPokemon.length;
    })
    .catch(error => alert(error))
}

function allTypesConfig(type) {
    fetch(urlTypes+type)
    .then(reponse => reponse.json())
    .then(reponse => {
        console.log(reponse);
        allTypes=reponse;
        localStorage.setItem("allTypes", JSON.stringify(reponse));
        allTypesLength=allTypes.pokemons.length;
    })
    .catch(error => alert(error))
}

function allGenConfig(gen) {
    fetch(urlGen+gen)
    .then(reponse => reponse.json())
    .then(reponse => {
        console.log(reponse);
        allGen=reponse;
        localStorage.setItem("allGen", JSON.stringify(reponse));
        allGenLength=allGen.length;
    })
    .catch(error => alert(error))
}

function ficheConfig(pkmn) {
    fetch(urlPokemon+"/"+pkmn)
    .then(reponse => reponse.json())
    .then(reponse => {
        console.log(reponse);
        fiche=reponse;
        localStorage.setItem("fiche", JSON.stringify(reponse));
    })
    .catch(error => alert(error))
}

function allPokemonShow() {
    allPokemonConfig();
    setTimeout(() => {
        document.getElementById("Fiche").innerHTML="";
        document.getElementById("select").innerHTML="";
        document.getElementById("Pokemon").innerHTML="";
        document.getElementById("count").innerHTML="";
        for (let i=1; i<=allPokemonLength-1; i++) {
            document.getElementById("Pokemon").insertAdjacentHTML("beforeend",
                `<div class="grid-item">
                    <p class="text-center p-1" id="pokedex_id">N°${allPokemon[i].pokedex_id}</p>
                    <p class="text-center" id="nom_pokemon">${allPokemon[i].name.fr}</p>
                    <img class="text-center" id="img_pokemon" width="170px" src="${allPokemon[i].sprites.regular}">
                    <div class="types">
                        <img class="text-center" id="type1" width="45px" src="${allPokemon[i].types[0].image}">
                        ${allPokemon[i].types[1] ? `<img class="text-center" id="type2" width="45px" src="${allPokemon[i].types[1].image}">` : ``}
                    </div>
                    <bouton class="btn btn-success m-3" id="fiche" onclick="ficheShow('${allPokemon[i].name.fr}')">Voir la fiche</bouton>
                </div>`
            )
        }
    }, 500);
}

function sendType(type) {
    allTypesConfig(type);
    setTimeout(() => {
        if (allTypesLength === 0) {
            document.getElementById("Fiche").innerHTML="";
            document.getElementById("select").innerHTML="";
            document.getElementById("Pokemon").innerHTML="";
            document.getElementById("count").textContent="Suite à un soucis dû à l'API, il n'y a pas de Pokémons de type "+type+" :( ."; 
        } else {
            document.getElementById("count").innerHTML="";
            document.getElementById("Fiche").innerHTML="";
            document.getElementById("select").innerHTML="";
            document.getElementById("Pokemon").innerHTML="";
            for (let i=0; i<allTypesLength; i++) {
                document.getElementById("Pokemon").insertAdjacentHTML("beforeend",
                    `<div class="grid-item">
                        <p class="text-center" id="pokedex_id">N°${allTypes.pokemons[i].pokedex_id}</p>
                        <p class="text-center m-0" id="nom_pokemon">${allTypes.pokemons[i].name.fr}</p>
                        <img class="text-center" id="img_pokemon" width="170px" src="${allTypes.pokemons[i].sprites.regular}">
                        <div class="types">
                            <img class="text-center" id="type1" width="45px" src="${allTypes.pokemons[i].types[0].image}">
                            ${allTypes.pokemons[i].types[1] ? `<img class="text-center" id="type2" width="45px" src="${allTypes.pokemons[i].types[1].image}">` : ``}
                        </div>
                        <bouton class="btn btn-success m-3" id="fiche" onclick="ficheShow(${allTypes.pokemons[i].name.fr})">Voir la fiche</bouton>
                    </div>`
                )
            }
            document.getElementById("count").textContent="Il y a "+allTypesLength+" Pokémons de type "+type+"."; 
        }
    }, 500);
}

function ficheShow(pkmn) {
    ficheConfig(pkmn);
    setTimeout(() => {
        if (fiche.status === 404) {
            document.getElementById("select").innerHTML="";
            document.getElementById("select").insertAdjacentHTML("beforeend",
                `<div>
                    <p class="erreur_search">Pokémon non trouvé</p>
                </div>`
            )
        } else {
            document.getElementById("count").innerHTML="";
            document.getElementById("select").innerHTML="";
            document.getElementById("Pokemon").innerHTML="";
            document.getElementById("Fiche").innerHTML="";
            document.getElementById("Fiche").insertAdjacentHTML("beforeend",
                `<div>
               
                    <div class="container text-center">
                        <div class="row">
                            <div class="col">
                                <h2>N°${fiche.pokedex_id}</h2>
                            </div>
                            <div class="col-6">
                                <h1>${fiche.name.fr}<h1>
                                <h3>${fiche.category}</h3>
                            </div>
                            <div class="col">
                                <h2>Génération : ${fiche.generation}</h2>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <h5>Type(s) :</h5>
                                <img width="60px" alt="${fiche.types[0].name}" src="${fiche.types[0].image}">
                                ${fiche.types[1] ? `<img width="60px" alt="${fiche.types[1].image}" src="${fiche.types[1].image}">` : ``}
                                <section class="stats">
                                    <h5 class="stats_title">Stats :</h5>
                                    <p class="green">PV : ${fiche.stats.hp}</p>
                                    <p class="red">ATK : ${fiche.stats.atk}</p>
                                    <p class="blue">DEF : ${fiche.stats.def}</p>
                                    <p class="orange">SPE ATK : ${fiche.stats.spe_atk}</p>
                                    <p class="violet">SPE DEF : ${fiche.stats.spe_def}</p>
                                    <p class="cyan">VIT : ${fiche.stats.vit}</p>
                                </section>
                            </div>
                            <div id="sprite" class="col-6">
                                <img src="${fiche.sprites.regular}">
                                <bouton class="btn btn-success m-3" onclick="shiny()">Voir Shiny</bouton>
                            </div>
                            <div class="col">
                                <h5>Talent(s) :</h5>
                                <p>${fiche.talents[0].name}</p>
                                ${fiche.talents[1] ? `<p>${fiche.talents[1].name}</p>` : `` }
                                ${fiche.talents[2] ? `<p>${fiche.talents[2].name}</p>` : `` }
                                ${fiche.talents[3] ? `<p>${fiche.talents[3].name}</p>` : `` }
                                <div class="resiBlock">
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[0].name}.png">X${fiche.resistances[0].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[1].name}.png">X${fiche.resistances[1].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[2].name}.png">X${fiche.resistances[2].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[3].name}.png">X${fiche.resistances[3].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[4].name}.png">X${fiche.resistances[4].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[5].name}.png">X${fiche.resistances[5].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[6].name}.png">X${fiche.resistances[6].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[7].name}.png">X${fiche.resistances[7].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[8].name}.png">X${fiche.resistances[8].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[9].name}.png">X${fiche.resistances[9].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[10].name}.png">X${fiche.resistances[10].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[11].name}.png">X${fiche.resistances[11].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[12].name}.png">X${fiche.resistances[12].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[13].name}.png">X${fiche.resistances[13].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[14].name}.png">X${fiche.resistances[14].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[15].name}.png">X${fiche.resistances[15].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[16].name}.png">X${fiche.resistances[16].multiplier}</p>
                                    <p class="resi"><img width="20px" src="img/${fiche.resistances[17].name}.png">X${fiche.resistances[17].multiplier}</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <h6>Taille : ${fiche.height}</h6>
                                <h6>Poids : ${fiche.weight}</h6>
                            </div>
                            <div class="col-6 evoBlock">
                                ${fiche.evolution ? `
                                    <div>
                                        ${fiche.evolution.pre ? `<h5>Pré-évolution :</h5>
                                        ${fiche.evolution.pre[0] ? `<p>${fiche.evolution.pre[0].name}</p>` : `<p>Aucune</p>` }
                                        ${fiche.evolution.pre[1] ? `<p>${fiche.evolution.pre[1].name}</p>` : `` } ` : ``}
                                    </div>
                                    <div>
                                        ${fiche.evolution.next ? `<h5>Evolution :</h5>
                                        ${fiche.evolution.next[0] ? `<p>${fiche.evolution.next[0].name}</p>` : `<p>Aucune</p>` }
                                        ${fiche.evolution.next[1] ? `<p>${fiche.evolution.next[1].name}</p>` : `` }` : ``}
                                    </div>
                                    <div>
                                        ${fiche.evolution.mega ? `<h5>Mega :</h5>
                                        <p>Mega-${fiche.name.fr}</p>
                                        <img width="100px" src="${fiche.evolution.mega[0].sprites.regular}">
                                        ${fiche.evolution.mega[1] ? `<img width="100px" src="${fiche.evolution.mega[1].sprites.regular}">` : ``}` : ``}
                                    </div>
                                    ` : ``}
                            </div>
                        </div>
                    </div>
                </div>`
            )
            document.getElementById("search_pokemon").value="";
        }
    }, 2000);
}

function shiny() {
    document.getElementById("sprite").innerHTML="";
    document.getElementById("sprite").insertAdjacentHTML("beforeend", 
    `<img src="${fiche.sprites.shiny}">
    <bouton class="btn btn-success m-3" onclick="regular()">Voir Normal</bouton>`
    )
}

function regular() {
    document.getElementById("sprite").innerHTML="";
    document.getElementById("sprite").insertAdjacentHTML("beforeend", 
    `<img src="${fiche.sprites.regular}">
    <bouton class="btn btn-success m-3" onclick="shiny()">Voir Shiny</bouton>`
    )
}

function sendGen(gen) {
    allGenConfig(gen);
    setTimeout(() => {
        document.getElementById("Fiche").innerHTML="";
        document.getElementById("select").innerHTML="";
        document.getElementById("Pokemon").innerHTML="";
        for (let i=0; i<allGenLength; i++) {
            document.getElementById("Pokemon").insertAdjacentHTML("beforeend",
                `<div class="grid-item">
                    <p class="text-center" id="pokedex_id">N°${allGen[i].pokedex_id}</p>
                    <p class="text-center m-0" id="nom_pokemon">${allGen[i].name.fr}</p>
                    <img class="text-center" id="img_pokemon" width="170px" src="${allGen[i].sprites.regular}">
                    <div class="types">
                        <img class="text-center" id="type1" width="45px" src="${allGen[i].types[0].image}">
                        ${allGen[i].types[1] ? `<img class="text-center" id="type2" width="45px" src="${allGen[i].types[1].image}">` : ``}
                    </div>
                    <bouton class="btn btn-success m-3" id="fiche" onclick="ficheShow(${allGen[i].name.fr})">Voir la fiche</bouton>
                </div>`
            )
        }
        document.getElementById("count").textContent="Il y a "+allGenLength+" Pokémons dans la Génération "+gen+"."; 
    }, 500);
}

function search() {
    let search_pokemon=document.getElementById("search_pokemon").value;
    fetch(urlPokemon+"/"+search_pokemon)
    .then(res => res.json())
    .then(response => {
        console.log(response);
        if(response.length < 10){
            displayOptions(response)
        }
    })
}

function searchConfirm(e) {
    let search_pokemon=document.getElementById("search_pokemon").value;
    e.preventDefault();
    console.log(search_pokemon);
    if (search_pokemon === null) {
        
    } else { 
        ficheShow(search_pokemon);
    }
}

function displayOptions(reponse) {
    console.log(reponse);
}