# Projet : Pong

  Ce rendu à été réalisé par Paul Lerat-Lambert et correspond au projet n°2 de l'option JavaScript.
  Le sujet est disponible ici : https://www.fil.univ-lille1.fr/~routier/enseignement/licence/js/tdtp/pong.html

# Auteur

  * Auteur : Paul Lerat-Lambert  
  * Groupe : 2

# Description Projet

  L'objectif est de réaliser une version simplifiée de l'historique jeu "Pong", mais dans une version "réseau" puisque les joueurs pourront se trouver sur deux ordinateurs différents. Ce travail sera l'occasion :

  * de réutiliser les classes mises en œuvre dans le TP précédent ;
  * de manipuler une première fois Node et Express ;
  * de découvrir socket.io pour gérer des communications bi-directionnelles entre le client et le serveur.

# Arborsence 
    .
    ├───bin   
    ├───controllers  
    ├───dist  
    │   ├───images  
    │   │   └───img  
    │   └───scripts  
    ├───public  
    │   ├───images  
    │   │   └───img  
    │   ├───scripts  
    │   └───stylesheets  
    ├───routes  
    ├───src  
    │   ├───images  
    │   ├───scripts  
    │   └───style  
    └───views  

## Cahier des charges

  * Utilisation de **node**
  * Utilisation de **Express**
  * Utilisation de **Socket.io**
  * Jouable en réseaux à deux joueurs
  * Vous devez créer un serveur qui proposera plusieurs routes :

      * */* qui livre une page d'accueil qui présente le jeu et fournit des liens vers les autres routes
      * */rules* qui permet d'accéder à une page où sont présentées les * règles du jeu et est décrit la
      * */about* qui informe sur le numéro de version et les auteurs du jeu
      * */play* qui permet d'accéder au jeu  

  * Mis à part la page */play,* les autres pages seront statiques.
  * Pour la page /play, le comportement sera le suivant :
  * Seules les deux premières connexions sont acceptées, les suivantes sont rejetées et une page affichant un message de refus de connexion est envoyée
  * Le premier à se connecter devient "premier joueur".  
  * Les deux premiers joueurs voit apparaître un terrain de jeu avec les deux raquettes sur la gauche et la droite.  
  * Chaque joueur contrôle la raquette située sur la gauche de son écran à l'aide des touches flèche haut et flèche bas.  
  * La raquette de droite est celle de l'autre joueur, tout déplacement de l'adversaire est immédiatement visible.  
  * Le premier joueur peut démarrer les échanges en "lançant la balle" par appui sur la barre espace.  
  * Les joueurs doivent intercepter la balle en déplaçant leur raquette, lorsque la balle touche une raquette elle est renvoyée vers l'autre joueur avec un angle adapté.  
  * Si un joueur ne parvient pas à intercepter la balle, celle-ci s'arrête sur les limites de terrain derrière lui, l'autre joueur a alors marqué un but, le premier joueur peut relancer une nouvelle balle pour poursuivre la partie.  
  * Si l'un des joueurs se déconnecte, le second joueur en est averti par un message et est à son tour déconnecté.   


## Arboresence du projet

# Installation et utilisation du projet

    Pour pouvoir lancer le jeu, il faudra réaliser toutes les étapes suivantes dans l'ordre.


## Télechargement des packages

    $ make install

## Lancer le serveur

    $ make start

## Se connecter au serveur

    Dans un navigateur internet se connecter à la page : http://127.0.0.1:3000/

## Nettoyage du répertoire

    $ make clean
