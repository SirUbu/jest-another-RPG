// requires the Potion object constructor
const Potion = require('./Potion');
// require the Character object constructor
const Character = require('./Character');

// object constructor for a new Enemy
class Enemy extends Character {
    constructor(name, weapon) {
        // call parent constructor
        super(name);

        // assigns name, weapon, and random potion
        this.weapon = weapon;
        this.potion = new Potion();
    };
    
    // returns a description of the enemy object
    getDescription() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`;
    };
};

// exports Enemy object
module.exports = Enemy;