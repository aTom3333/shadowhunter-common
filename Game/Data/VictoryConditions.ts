import {Faction, VictoryCondition} from "../Character";
import {Board} from "../Board";
import {CharacterState} from "../CharacterState";


// TODO Gérer les boucles infinies:
// Au moins Agnès et Allie ont une condition de victoire dépendant des conditions de victoire d'autres joueurs
// Il faut faire attention à ne pas boucler indéfiniment
export const victoryConditions : {
    agnes: VictoryCondition;
    allie: VictoryCondition;
    bob: VictoryCondition;
    //bryan: VictoryCondition;
    catherine: VictoryCondition;
    //charles: VictoryCondition;
    daniel: VictoryCondition;
    david: VictoryCondition;

    hunter: VictoryCondition;
    shadow: VictoryCondition;
} = {
    agnes: {
        description: "Le joueur à votre droite gagne.",
        isFulfilled(board: Board, self: CharacterState) {
            const self_idx = board.states.findIndex(c => c.id === self.id);
            let target: CharacterState;
            if(self.powerUsed) {
                // Le joueur à gauche gagne
                target = board.states[board.nextOf(self_idx)];
            } else {
                // Le joueur à droite gagne
                target = board.states[board.previousOf(self_idx)];
            }

            return target.hasWon(board);
        }
    },
    allie: {
        description: "Être encore en vie lorsque la partie se termine.",
        isFulfilled(board: Board, self: CharacterState) {
            if(self.dead)
                return false;
            // Si Allie est vivante, elle gagne si la partie est finie, càd au moins un personnage a gagné
            let gameOver = false;
            board.states.every(c => {
                if(c.id !== self.id) {
                    if(c.hasWon(board)) {
                        gameOver = true;
                        return false;
                    }
                }
            });

            return gameOver;
        }
    },
    bob: {
        description: "Posséder 5 cartes équipement ou plus.",
        isFulfilled(board: Board, self: CharacterState) {
            return self.equipment.length >= 5;
        }
    },
    //bryan
    catherine: {
        description: "Être la première à mourir OU être l'un des deux seuls personnages en vie.",
        isFulfilled(board: Board, self: CharacterState) {
            // Première à mourir (morte et seul mort de la partie => 1 mort)
            if(self.dead && board.states.filter(c => c.dead).length === 1)
                return true;
            // Vivante avec maximum une autre personne
            if(!self.dead && board.states.filter(c => !c.dead).length <= 2)
                return true;
            return false;
        }
    },
    //charles
    daniel: {
        description: "Être le premier à mourir OU être en vie quand tous les personnages Shadow sont morts.",
        isFulfilled(board: Board, self: CharacterState) {
            // Premier à mourir
            if(self.dead && board.states.filter(c => c.dead).length === 1)
                return true;
            // Vivant et tous les shadow morts
            if(!self.dead && board.states.filter(c => !c.dead && c.identity.faction === Faction.Shadow).length === 0)
                return true;
            return false;
        }
    },
    david: {
        description: "Avoir au minimum 3 de ces cartes : Crucifix en Argent, Amulette, Lance de Longinus, Toge Sainte",
        isFulfilled(board: Board, self: CharacterState) {
            let ownedWanted = 0;
            if(self.equipment.find(e => e /* TODO detect the wanted equipment */))
                ownedWanted += 1;
            return ownedWanted >= 3;
        }
    },

    hunter: {
        description: "Tous les personnages Shadow sont morts",
        isFulfilled(board: Board, self: CharacterState) {
            return board.states.filter(c => !c.dead && c.identity.faction === Faction.Shadow).length === 0;
        }
    },
    shadow: {
        description: "Tous les personnages Hunter sont morts OU tous les personnages neutres sont morts",
        isFulfilled(board: Board, self: CharacterState) {
            return board.states.filter(c => !c.dead && c.identity.faction === Faction.Hunter).length === 0
                || board.states.filter(c => !c.dead && c.identity.faction === Faction.Neutral).length === 0;
        }
    }
};
