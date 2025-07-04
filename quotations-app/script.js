const CITATION = document.getElementById("citation")
const NOM_AUTEUR = document.getElementById("nomAuteur")
const AJOUT_BUTTON = document.getElementById("ajoutButton")
const TEXTE_CITATIONS = document.getElementsByClassName("text")
const AUTHOR_CITATIONS = document.getElementsByClassName("author")

/*--------------------------------------------------------------------------------------------------------------------------------------------*/

AJOUT_BUTTON.addEventListener("click", ajoutCitation)


//Il faut ajouter un .value pour récupérer la valeur interne de nos input
//Va savoir mais ça ne veut pas garder nos données bizarrement
function ajoutCitation(event){
    let citation = CITATION.value
    let nomAuteur = NOM_AUTEUR.value
    console.log(citation)
    console.log(nomAuteur)
    event.preventDefault() // Permet d'empecher le rechargement de notre page a chaque fois qu'on appuie sur le bouton
}