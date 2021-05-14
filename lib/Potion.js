// object constructor for a new Potion
class Potion {
    constructor(name){
        // array of type options
        this.types = ['strength', 'agility', 'health'];
        
        // if name is passed into constructor, assign it as name; if no name passed in, randomly pick name
        this.name = name || this.types[Math.floor(Math.random() * this.types.length)];
        
        // based on name, assign random value
        if (this.name === 'health') {
            this.value = Math.floor(Math.random() *10 +30);
        } else {
            this.value = Math.floor(Math.random() * 5 + 7);
        }
    };
};

// export the Potion constructor
module.exports = Potion;