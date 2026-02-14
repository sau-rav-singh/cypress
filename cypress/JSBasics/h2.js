import { Human, person } from './objects.js';
import * as baby from './pet.js'

let h2 = new Human("steve", "jobs", 50, "usa");
console.log(h2.fullName());
console.log(person);

const greet = (name) =>
{
    console.log("Hello " + name);
}

greet("Saurav");//Hello Saurav

console.log(typeof greet);//function

let bacha = new baby.baby("Saurav", "Singh", 25, "Pune", "Buddy");
console.log(bacha);