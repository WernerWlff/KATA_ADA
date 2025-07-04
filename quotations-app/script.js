const CITATION = document.getElementById("citation")
const NOM_AUTEUR = document.getElementById("nomAuteur")
const AJOUT_BUTTON = document.getElementById("ajoutButton")
const TEXTE_CITATIONS = document.getElementsByClassName("text")
const AUTHOR_CITATIONS = document.getElementsByClassName("author")
const QUOTE = document.getElementsByClassName("quote")
const QUOTE_LIST = document.getElementById("quote-list")
const COUNT = document.getElementById("count")

let quoteCount = 0
COUNT.innerText = "Vous n'avez pas encore rentré de citations"

/*--------------------------------------------------------------------------------------------------------------------------------------------*/

AJOUT_BUTTON.addEventListener("click", ajoutCitation)


//Il faut ajouter un .value pour récupérer la valeur interne de nos input
//Va savoir mais ça ne veut pas garder nos données bizarrement
function ajoutCitation(event){
    event.preventDefault() // Permet d'empecher le rechargement de notre page a chaque fois qu'on appuie sur le bouton

    //on vérifie bien que l'utilisateur a bien rempli les champs avant de l'ajouter
    if ( CITATION.value == '' || NOM_AUTEUR.value == ''){ 
        alert("Il manque des informations pour ajouter votre citation")
    }

    else{
        let citation = CITATION.value
        let nomAuteur = NOM_AUTEUR.value
        // console.log(citation)
        // console.log(nomAuteur)

        //on va appeler notre fonction d'apres pour rajouter nos données dans un paragraphe cf.étape 5  
        addQuote(citation, nomAuteur)
    }
}

//on va vraisemblablement l'appeler à la fin de ajoutCitation car c'est la deuxième étape
function addQuote(quote, author){
    const NOUVELLE_CITATION = document.createElement('p')
    const NOUVEL_AUTEUR = document.createElement('p')
    NOUVELLE_CITATION.classList.add("text")
    NOUVEL_AUTEUR.classList.add("author")
    NOUVELLE_CITATION.innerText = quote
    NOUVEL_AUTEUR.innerText = author

    const NOUVELLE_DIV = document.createElement('div')
    NOUVELLE_DIV.classList.add("quote")

    //On ajoute nos deux 'p' dans la nouvelle balise 'div'
    NOUVELLE_DIV.appendChild(NOUVELLE_CITATION)
    NOUVELLE_DIV.appendChild(NOUVEL_AUTEUR)

    //On ajoute notre nouvelle balise 'div' dans la 'div' quote-list
    QUOTE_LIST.appendChild(NOUVELLE_DIV)
    
    //étape 6
    quoteCount ++
    COUNT.innerText = `${quoteCount} citations`
}