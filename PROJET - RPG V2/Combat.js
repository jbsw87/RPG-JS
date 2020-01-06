let Joueur = {
    Santé: 100,
    Pouvoir: 20
}

let Adversaire = {
    Santé: 100,
    Pouvoir:20
}

const Attaque = () => {
    let AttaqueBouton = document.getElementById('Attaque-Bouton');
    let RecommencerBouton = document.getElementById('Recommencer-Bouton');
    let MessageJeu = document.getElementById('Message-Jeu');

    let AttaqueJoueur = DéterminerAttaque(Joueur.Pouvoir);
    Adversaire.Santé  -= AttaqueJoueur;
    printToscreen();

    if (GameOver(Adversaire.Santé)){
        Findujeu("Vous avez gagné le combat");
            return;
        

    }

    AttaqueBouton.disabled = true; 
    MessageJeu.innerText="L'adversaire va frapper!"

    setTimeout(() =>{
        let AdversaireAttaque = DéterminerAttaque(Adversaire.Pouvoir);
        Joueur.Santé -= AdversaireAttaque;
        printToscreen();

        if (GameOver(Joueur.Santé)){
            Findujeu("L'adversaire a gagnéle combat");
            return;
        }


        AttaqueBouton.disabled = false;
     }, 250);
    
}

const Findujeu = (message) => {
    document.getElementById('Message-Jeu').innerText = message;
    document.getElementById('Attaque-Bouton').hidden = true;
    document.getElementById('Recommencer-Bouton').hidden = false;


}


const DéterminerAttaque = (Pouvoir) => {
    return Math.floor(Math.random() * Pouvoir);

}

const GameOver = (Santé) => {
    return Santé <= 0;
}

const Recommencer = () =>{
    let AttaqueBouton = document.getElementById('Attaque-Bouton');
    Joueur.Santé = 100;
    Adversaire.Santé = 100;
    document.getElementById('Message-Jeu').innerText = "";
    AttaqueBouton.disabled = false;
    AttaqueBouton.hidden = false;
    document.getElementById('Recommencer-Bouton').hidden = true;
    printToscreen();

}

const printToscreen = () => {
    document.getElementById('Adversaire-Santé').innerText =
    Adversaire.Santé;

    document.getElementById('Joueur-Santé').innerText =
    Joueur.Santé;
}

printToscreen();
