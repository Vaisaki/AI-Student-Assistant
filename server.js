
import express from "express";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", (req, res) => {
    const message = req.body.message?.toLowerCase().trim();

    if (!message) {
        return res.status(400).json({
            error: "Please enter a question."
        });
    }

    let reply;

    if (message.includes("hello") || message.includes("hi")) {
        reply = "Hello! Welcome to AI Student Assistant. How can I help you?";
    } else if (message.includes("javascript")) {
        reply = "JavaScript is a programming language used to make websites interactive.";
    } else if (message.includes("html")) {
        reply = "HTML stands for HyperText Markup Language. It is used to create the structure of web pages.";
    } else if (message.includes("python")) {
        reply = "Python is a beginner-friendly programming language used in AI, data science and web development.";
    } else if (message.includes("study")) {
        reply = "Create a study timetable, divide topics into small sections, and revise regularly.";
    } else {
        reply = "I am your Student Assistant demo. Try asking about HTML, JavaScript, Python or study tips.";
    }

    res.json({ reply });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
