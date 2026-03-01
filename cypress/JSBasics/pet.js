//import { Human } from './objects.js';

import * as object from './objects.js';

export class baby extends object.Human {
  constructor(firstname, lastname, age, city, petName) {
    super(firstname, lastname, age, city);
    this.petName = petName;
  }
}
