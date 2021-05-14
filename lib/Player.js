// require the Potion object constructor
const Potion = require('../lib/Potion');
// require the Character object constructor
const Character = require('./Character');

// object constructor for a new Player 
class Player extends Character {
    constructor(name = '') {
        // call parent constructor
        super(name);
    
        // add a health potion and a random potion to inventory
        this.inventory = [new Potion('health'), new Potion()];
    };
    
    // returns an object with various player properties
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    };
    
    // returns the inventory array or false if empty
    getInventory() {
        if (this.inventory.length) {
            return this.inventory
        }
        return false;
    };
    
    // adds a new potion to the player's inventory
    addPotion(potion) {
        this.inventory.push(potion);
    };
    
    // modifies player's potion inventory after player uses a potion
    usePotion(index) {
        const potion = this.getInventory().splice(index, 1)[0];
        
        switch (potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;
            case 'health':
                this.health += potion.value;
                break;
            case 'strength':
                this.strength += potion.value;
                break;
        }
    };
};

// exports Player object
module.exports = Player;