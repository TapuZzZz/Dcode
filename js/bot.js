const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (chatElement, selectedOption) => {
    const messageElement = chatElement.querySelector("p");
    const userMessageLowerCase = selectedOption.toLowerCase()
    ;
    const messageSound = document.getElementById("messageSound");
    messageSound.play();
    
    if (userMessageLowerCase.includes("account")) {
        messageElement.textContent = "Sure, let me help you with your account.";
    } else if (userMessageLowerCase.includes("course")) {
        messageElement.innerHTML = "Which course are you interested in?<br>- Python<br>- C++<br>- Web<br>- Bash";
    } else if (userMessageLowerCase.includes("price")) {
        messageElement.innerHTML = "The prices are in our website.<br>- Python: <b>14.99$</b> <br>- C++: <b>29.99$</b> <br>- Web: <b>24.99$</b> <br>- Bash: <b>19.99$</b> ";
    } else if (userMessageLowerCase.includes("python")) {
        messageElement.textContent = "Great choice! Python is a versatile programming language known for its readability and ease of use.";
    } else if (userMessageLowerCase.includes("cpp") || userMessageLowerCase.includes("c++")) {
        messageElement.textContent = "Great choice! C++ is a powerful programming language commonly used for system/application development.";
    } else if (userMessageLowerCase.includes("web")) {
        messageElement.textContent = "Great choice! Web development involves creating websites and web applications using technologies like HTML, CSS, and JavaScript.";
    } else if (userMessageLowerCase.includes("bash")) {
        messageElement.textContent = "Great choice! Bash scripting is a valuable skill for automating tasks in a Unix-like operating system using the Bash shell.";
    } else if (userMessageLowerCase.includes("pay")) {
        messageElement.innerHTML = "To pay for the course we approve those methods:<br> - <b>Visa</b> <br> - <b>MasterCard</b> <br> - <b>PayPal</b> <br> - <b>Stripe</b>";
    } else if (userMessageLowerCase.includes("secret for the best")) {
        messageElement.innerHTML = "How????, You Are Found Me, Discount For You ;)  <br>Code: '<b>DcodeBot</b>' ,Extra 10% Discount from us";
    } else {
        messageElement.textContent = "Tell me more about what you're looking for.";
    }

    chatbox.scrollTo(0, chatbox.scrollHeight);
}

const handleChat = () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            generateResponse(incomingChatLi, userMessage);
        }, 1000);
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

const handleOptionClick = (selectedOption) => {
    chatInput.value = selectedOption;
    handleChat();
};

const questionOptions = document.querySelectorAll(".question-option");

questionOptions.forEach(option => {
    option.addEventListener("click", () => {
        const selectedOption = option.dataset.question;
       
        chatbox.appendChild(createChatLi(selectedOption, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);


        setTimeout(() => {
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi, selectedOption);
        }, 600);

        // Handle the selected option
        handleOptionClick(selectedOption);
    });
});
