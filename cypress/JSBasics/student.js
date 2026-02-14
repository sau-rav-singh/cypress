export class Student
{
    constructor(name, marks)
    {
        this.name = name;
        this.marks = marks;
    }
}

let s1 = new Student("John", 85);
let s2 = new Student("Jane", 30);
let s3 = new Student("Bob", 45);

let students = [s1, s2, s3];

//let passedStudents = [];
// let sum=0;
// for (let i = 0; i < students.length; i++)
// {
//     if (students[i].marks >= 36)
//     {
//         students[i].name=students[i].name.toUpperCase();
//         passedStudents.push(students[i].name);
//         sum+=students[i].marks;
//     }
// }

// console.log("Passed Students are: " + JSON.stringify(passedStudents));
// console.log("Sum of marks is: " + sum);

let passedStudents = students.filter((a) => a.marks >= 36);
console.log("Passed Students are: " + JSON.stringify(passedStudents));

passedStudents.map(student => student.name = student.name.toUpperCase());
console.log("Passed Students with Uppercase names are: " + JSON.stringify(passedStudents));

let totalMarks = passedStudents.reduce((sum, student) => sum + student.marks, 0);
console.log("Total marks of passed students is: " + totalMarks);