export const person = {
    firstname: "saurav",
    lastname: "singh",
    age: 30,
    city: "new york",
    fullName: function()
    {
        return this.firstname + " " + this.lastname;
    }
};

export class Human
{
    country = 'india';
    constructor(firstname, lastname, age, city)
    {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.city = city;
    }

    fullName()
    {
        return this.firstname + " " + this.lastname;
    }
}