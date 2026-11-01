
const db = require("./database");

const internships = [
    {
        title: "Frontend Developer Intern",
        company: "ABC Technologies",
        location: "Hyderabad",
        description: "Develop responsive web applications",
        stipend: "10000"
    },
    {
        title: "Java Developer Intern",
        company: "Tech Solutions",
        location: "Bangalore",
        description: "Work on Java and backend development",
        stipend: "12000"
    },
    {
        title: "Web Developer Intern",
        company: "Digital Solutions",
        location: "Chennai",
        description: "Develop and maintain websites",
        stipend: "8000"
    }
];

const insert = db.prepare(`
    INSERT INTO internships
    (title, company, location, description, stipend)
    VALUES (?, ?, ?, ?, ?)
`);

for (const item of internships) {
    insert.run(
        item.title,
        item.company,
        item.location,
        item.description,
        item.stipend
    );
}

console.log("Seed data inserted successfully!");

db.close();

