// requires the Potion object constructor
const Potion = require('./Potion');
// require the Character object constructor
const Character = require('./Character');

// object constructor for a new Enemy
function Enemy(name, weapon) {
    // assigns name, weapon, and random potion
    this.name = name;
    this.weapon = weapon;
    this.potion = new Potion();

    // randomly assigns attribute values
    this.health = Math.floor(Math.random() * 10 + 85);
    this.strength = Math.floor(Math.random() * 5 + 5);
    this.agility = Math.floor(Math.random() * 5 + 5);
};

// inherit prototype methods from Character constructor
Enemy.prototype = Object.create(Character.prototype);

// returns a description of the enemy object
Enemy.prototype.getDescription = function() {
    return `A ${this.name} holding a ${this.weapon} has appeared!`;
};

// exports Enemy object
module.exports = Enemy;