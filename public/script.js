
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");
const errorMessage = document.getElementById("errorMessage");

chatForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const message = messageInput.value.trim();

    if (message === "") {
        return;
    }

    // Display user message
    const userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.textContent = message;
    chatMessages.appendChild(userDiv);

    messageInput.value = "";
    errorMessage.textContent = "";

    // Display loading message
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "bot-message";
    loadingDiv.textContent = "AI is thinking...";
    chatMessages.appendChild(loadingDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        loadingDiv.textContent = data.reply || data.error || "No response received.";

    } catch (error) {
        loadingDiv.textContent = "Unable to connect to AI. Please try again.";
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
});
