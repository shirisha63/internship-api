const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

// HOME
app.get("/", (req, res) => {
res.json({
message: "Internship API is running successfully!"
});
});

// CREATE INTERNSHIP
app.post("/internships", (req, res) => {
const { title, company, location, description, stipend } = req.body;


if (!title || !company || !location || !description) {
    return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
    });
}

const result = db.prepare(`
    INSERT INTO internships
    (title, company, location, description, stipend)
    VALUES (?, ?, ?, ?, ?)
`).run(title, company, location, description, stipend || "Not specified");

res.status(201).json({
    success: true,
    message: "Internship added successfully!",
    id: result.lastInsertRowid
});


});

// GET ALL INTERNSHIPS WITH PAGINATION
app.get("/internships", (req, res) => {
const page = Math.max(1, Number(req.query.page) || 1);
const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 5));
const offset = (page - 1) * limit;


const internships = db.prepare(
    "SELECT * FROM internships LIMIT ? OFFSET ?"
).all(limit, offset);

const total = db.prepare(
    "SELECT COUNT(*) AS total FROM internships"
).get().total;

res.json({
    success: true,
    page,
    limit,
    totalRecords: total,
    totalPages: Math.ceil(total / limit),
    data: internships
});


});

// GET INTERNSHIP BY ID
app.get("/internships/:id", (req, res) => {
const id = Number(req.params.id);


if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
        success: false,
        message: "Invalid internship ID"
    });
}

const internship = db.prepare(
    "SELECT * FROM internships WHERE id = ?"
).get(id);

if (!internship) {
    return res.status(404).json({
        success: false,
        message: "Internship not found"
    });
}

res.json({
    success: true,
    data: internship
});


});

// UPDATE INTERNSHIP
app.put("/internships/:id", (req, res) => {
const id = Number(req.params.id);
const { title, company, location, description, stipend } = req.body;


if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
        success: false,
        message: "Invalid internship ID"
    });
}

if (!title || !company || !location || !description) {
    return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
    });
}

const result = db.prepare(`
    UPDATE internships
    SET title = ?, company = ?, location = ?, description = ?, stipend = ?
    WHERE id = ?
`).run(title, company, location, description, stipend || "Not specified", id);

if (result.changes === 0) {
    return res.status(404).json({
        success: false,
        message: "Internship not found"
    });
}

res.json({
    success: true,
    message: "Internship updated successfully!"
});


});

// DELETE INTERNSHIP
app.delete("/internships/:id", (req, res) => {
const id = Number(req.params.id);


if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
        success: false,
        message: "Invalid internship ID"
    });
}

const result = db.prepare(
    "DELETE FROM internships WHERE id = ?"
).run(id);

if (result.changes === 0) {
    return res.status(404).json({
        success: false,
        message: "Internship not found"
    });
}

res.json({
    success: true,
    message: "Internship deleted successfully!"
});


});

// SERVER
const PORT = 5000;

app.listen(PORT, () => {
console.log("SQLite database connected successfully!");
console.log(`Server running at http://localhost:${PORT}`);
});
