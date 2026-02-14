import { Human } from './objects.js';

class baby extends Human
{
    constructor(firstname, lastname, age, city, petName)
    {
        super(firstname, lastname, age, city);
        this.petName = petName;
    }
}