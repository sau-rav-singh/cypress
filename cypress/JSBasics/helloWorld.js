console.log("Hello World");//Hello World
let a = 4;
console.log("Value of a is " + a + " Type of a is " + typeof (a));//Value of a is 4 Type of a is number
a = "Saurav";
console.log("Value of a is " + a + " Type of a is " + typeof (a));//Value of a is Saurav Type of a is string
a = 234.5;
console.log("Value of a is " + a + " Type of a is " + typeof (a));//Value of a is 234.5 Type of a is number
a = true;
console.log("Value of a is " + a + " Type of a is " + typeof (a));//Value of a is true Type of a is boolean
a = null;
console.log("Value of a is " + a + " Type of a is " + typeof (a));//Value of a is null Type of a is object
a = undefined;
console.log("Value of a is " + a + " Type of a is " + typeof (a));//Value of a is undefined Type of a is undefined

var day = "Monday"

if (true)
{
    day = "Tuesday"
}

console.log("Value of day is " + day);//Tuesday

let day2 = "Monday";
if (true)
{
    let day2 = "Tuesday"
}

console.log("Value of day2 is " + day2);//Monday

if (true)
{
    var x = 1; // Leaks outside the block
    let y = 2; // Stays inside
}
console.log(x); // 1
//console.log(y); // ReferenceError

console.log("---------------");//---------------
const flag = true;

if (!flag)
{
    console.log("Condition Satisfied");
} else
{
    console.log("Condition Not Satisfied");//Condition Not Satisfied
}
var count = 0;

while (flag)
{
    console.log("Printing")//Printing
    count++;
    if (count >= 5)
        break;
};

for (let i = 0; i < 5; i++)
{
    console.log("For Loop " + i);//For Loop 0, For Loop 1, For Loop 2, For Loop 3, For Loop 4
}

const playlist = ['Song A', 'Song B', 'Song C'];

playlist.forEach((track, index) =>
{
    console.log(`${index + 1}. Now playing: ${track}`);// 1. Now playing: Song A
});

var array1 = new Array(6);
var array2 = new Array(10, 20, 30);
var array3 = [10, 20, 30];
console.log("Array3 is " + array3[0]);//Array3 is 10
console.log("Array3 length is " + array3.length);//Array3 length is 3
array3.push(40);//add at end
console.log("Array3 after push is " + array3);//Array3 after push is 10,20,30,40
array3.pop();//delete from end
console.log("Array3 after pop is " + array3);//Array3 after pop is 10,20,30
array3.unshift(5);//add at beginning
console.log("Array3 after unshift is " + array3);//Array3 after unshift is 5,10,20,30
console.log("Index of 20 in array3 is " + array3.indexOf(20));//Index of 20 in array3 is 2
console.log("Is 20 in array3? " + array3.includes(20));//Is 20 in array3? true
console.log("Array 3 is " + array3);//Array 3 is 5,10,20,30
console.log("Array 3 sliced from index 1 to 3 is " + array3.slice(1, 3));//Array 3 sliced from index 1 to 3 is 10,20
console.log("Sum of array3 elements is " + array3.reduce((sum, value) => sum + value, 0));//Sum of array3 elements is 65

let scores = [11, 20, 33, 44, 50];
let evenScores = scores.filter(score => score % 2 === 0);
console.log("Original scores are " + scores);//Original scores are 11,20,33,44,50
console.log("Even scores are " + evenScores);//Even scores are 20,44,50

console.log("Original scores are " + scores);//Original scores are 11,20,33,44,50
var mappedScores = scores.map(score => score * 2);
console.log("Mapped scores are " + mappedScores);//Mapped scores are 22,40,66,88,100

//array filter, then map then reduce
var sum = scores.filter(score => score % 2 === 0).map(score => score * 2).reduce((sum, value) => sum + value, 0);

//sort string of array
var stringArray = ["harry", "banana", "apple", "cherry"];
console.log("String array before sorting: " + stringArray);//String array before sorting: harry,banana,apple,cherry
stringArray.sort();
console.log("String array after sorting: " + stringArray);//String array after sorting: apple,banana,cherry,harry

//sort array of numbers
var numbersArray = [5, 2, 8, 1, 9];
console.log("Numbers array before sorting: " + numbersArray);//Numbers array before sorting: 5,2,8,1,9
numbersArray.sort((a, b) => a - b);//Ascending Bubble Sort
console.log("Numbers array after sorting: " + numbersArray)//Numbers array after sorting: 1,2,5,8,9

//function to add
function add(a, b)
{
    return a + b;
}

console.log("Sum of 2 and 3 is " + add(2, 3));//Sum of 2 and 3 is 5

//Anonymous Function
var addAnonymous = function(a, b)
{
    return a + b;
}
console.log("Sum of 2 and 3 using anonymous function is " + addAnonymous(2, 3));//Sum of 2 and 3 using anonymous function is 5

var addAnonymousArrow = (a, b) => a + b;

console.log("Sum of 2 and 3 using anonymous arrow function is " + addAnonymousArrow(2, 3));//Sum of 2 and 3 using anonymous arrow function is 5

let myname = "Saurav";
console.log("Length of name is " + myname.length);//Length of name is 6

//string slice
console.log("Substring of myname from index 2 to 5 is " + myname.slice(2, 5));//Substring of myname from index 2 to 5 is ura

//String Split
var str = 'Hello World';
console.log("String is " + str);//String is Hello World
console.log("String split by space is " + str.split(' '));//String split by space is Hello,World

//array.splice(start, deleteCount, item1, item2, ...)
// start,"The index where the ""surgery"" begins."
// deleteCount,"(Optional) How many items to remove. If 0, no items are removed."
// "item1, ...",(Optional) The new elements you want to inject into the array.
var array4 = [1, 2, 3, 4, 5];
console.log("Array4 before splice is " + array4);//Array4 before splice is 1,2,3,4,5
array4.splice(2, 1); // Remove element at index 2 (3)
console.log("Array4 after splice is " + array4);//Array4 after splice is 1,2,4,5

//Parse int to string and then toString
var num = 123;
var numStr = num.toString();
var numParsed = parseInt(numStr);
console.log("Original number is " + num);//Original number is 123
console.log("Number as string is " + numStr);//Number as string is 123
console.log("Parsed number is " + numParsed);//Parsed number is 123

//index of string with 2 param indexof()
let quote = "sunday is a funday";
let counter = 0;
let val = quote.indexOf('day');
while (val != -1)
{
    counter++;
    val = quote.indexOf('day', val + 1);
}
console.log("Number of occurrences of 'day' in quote is " + counter);//Number of occurrences of 'day' in quote is 2

//Person Object
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

console.log("Name is " + person.firstname);//Name is saurav
console.log("Age is " + person['age']);//Age is 30
console.log("City is " + person.city);//City is new york
console.log("Full Name is " + person.fullName());//Full Name is saurav singh
person.city = "Pune";
console.log("City is " + person.city);//City is Pune
person.gender = "Male";

//Print Person Object
console.log("Person Object is " + JSON.stringify(person));//Person Object is {"firstname":"saurav","lastname":"singh","age":30,"city":"Pune","gender":"Male"}

//check property exists in person
console.log("Does person have 'name' property? " + person.hasOwnProperty('name'));//Does person have 'name' property? false

//check value exists in object
console.log("Does person have value 'saurav'? " + Object.values(person).includes('saurav'));//Does person have value 'saurav'? true

//Print key and Values of Person object
for (let key in person)
{
    console.log(key + " = " + person[key]);
}

//Create class human similar to person object
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

let h1 = new Human("saurav", "singh", 30, "new york");
console.log("Human object is " + JSON.stringify(h1));//Human object is {"country":"india","firstname":"saurav","lastname":"singh","age":30,"city":"new york"}
console.log("Full name of human is " + h1.fullName());//Full name of human is saurav singh
console.log("Country of human is " + h1.country);//Country of human is india
console.log("Age of human is " + h1.age);//Age of human is 30

//Array of Person Object and h1 object
const people = [person, h1];
//Print properties of people
people.forEach((p, i) =>
{
    console.log("Person " + i + " is " + JSON.stringify(p));
});

// 1. Create the array with 5 expense amounts
const expenses = [45.50, 12.25, 120.00, 8.99, 33.40];

// 2. Calculate the total expenses using .reduce()
const totalExpenses = expenses.reduce((accumulator, current) => accumulator + current, 0);

// 3. Find the highest and lowest expenses using Math methods and the spread operator (...)
const highestExpense = Math.max(...expenses);
const lowestExpense = Math.min(...expenses);

// Output the results
// Total Expenses: $220.14
// Highest Expense: $120.00
// Lowest Expense: $8.99
console.log(`Total Expenses: $${totalExpenses.toFixed(2)}`);
console.log(`Highest Expense: $${highestExpense.toFixed(2)}`);
console.log(`Lowest Expense: $${lowestExpense.toFixed(2)}`);

//Example to Prove javascript is asynchronous
console.log("Start of script");
setTimeout(() =>
{
    console.log("Inside setTimeout");
}, 0);
console.log("End of script");
//Start of script
// End of script
// Inside setTimeout

