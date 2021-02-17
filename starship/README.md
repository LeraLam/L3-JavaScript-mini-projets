# Projet : StarShip

Ce rendu à été réalisé par Paul Lerat-Lambert et correspond au projet n°1 de l'option JavaScript.
Le sujet est disponible ici : https://www.fil.univ-lille1.fr/~routier/enseignement/licence/js/tdtp/starship.html

# Auteur

* Auteur : Paul Lerat-Lambert  
* Groupe : 2

# Description Projet

L'Objectif de ce projet est de réaliser un jeu vidéo simple dans lequel le joueur contrôle à l'aide du clavier le déplacement vertical d'un vaisseau situé sur la gauche de l'écran. Des soucoupes volantes arrivent de la droite de l'écran et le joueur doit les détruire en leur tirant dessus. A chaque tir réussi le joueur marque des points, à l'inverse si un vaisseau parvient à passer sans être détruit, le joueur perd des points.

## Cahier des charges 

### Class

* Game - Class de type Singleton, qui représente le jeux en lui même.
* Mobile - Class parente pour réprésenter tous les éléments mobiles du jeu.
* MoveState - Enum pour les différents états de mouvements du vaisseau du joueur.
* Saucer - Class héritant de Mobile et représentant les soucoupes volantes.
* Shoot - Class héritant de Mobile et représentant les tirs du vaisseau.
* StarShip - Class héritant de Mobile et représentant le vaisseau du joueur.

### Autre Script

* main - Script éxecuté lors du lancement du jeu, il apelle le singleton Game.

### Fonctionnalités ajoutées

* Lorsqu'une soucoupe se fait toucher par un tir son image change, une éxplosion apprait sur celle-ci.
* Un nombre de munitions limité, initialement à 3. C'est à dire qu'il ne peut pas exister plus de 3 tirs en même temps, cela dans le but d'augmenter la difficulté du jeu. 
* Les bonus : en mode flotte de soucoupe un bonus à une chance sur 50 d'apparaitre, sous la forme d'une étoile, et si le joueur le ramasse cela augmente son nombre de munition de 1.

## Arboresence du projet
    .  
    ├── dist  
    │   ├── images  
    │   │   └── img  
    │   │       ├── ciel-nocturne.png  
    │   │       ├── flyingSaucer-petit.png  
    │   │       ├── tir.png  
    │   │       └── vaisseau-ballon-petit.png  
    │   ├── index.html  
    │   └── scripts  
    │       └── bundle.js  
    ├── index.js  
    ├── Makefile   
    ├── package.json  
    ├── package-lock.json  
    ├── README.md  
    ├── src  
    │   ├── images  
    │   │   ├── ciel-nocturne.png  
    │   │   ├── flyingSaucer-petit.png  
    │   │   ├── flyingSaucer.png   
    │   │   ├── tir.png  
    │   │   ├── vaisseau-ballon-petit.png  
    │   │   └── vaisseau-ballon.png  
    │   ├── index.html  
    │   ├── scripts  
    │   │   ├── Game.js  
    │   │   ├── main.js  
    │   │   ├── Mobile.js  
    │   │   ├── MoveState.js  
    │   │   ├── Saucer.js  
    │   │   ├── Shoot.js  
    │   │   └── StarShip.js  
    │   └── style  
    │       └── style.css  
    └── webpack.config.js  


 

# Installation et utilisation du projet

    Pour pouvoir lancer le jeu, il faudra réaliser toutes les étapes suivantes dans l'ordre.
        
## Télechargement des packages 

    $ make package

## Build bundle.js

    $ make bundle

## Lancer le jeu

    $ make start

## Créer un executable

    $ make exec

## Nettoyage du répertoire

    $ make clean
 