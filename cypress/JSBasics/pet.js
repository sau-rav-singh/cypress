import { Human } from './objects.js';

class baby extends Human {
    constructor(firstname, lastname, age, city, petName) {
        super(firstname, lastname, age, city);
        this.petName = petName;
    }
}

let b1=new baby("saurav", "singh", 1, "pune", "fluffy");
console.log(b1.petName);
console.log(b1.fullName());