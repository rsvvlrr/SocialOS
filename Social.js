const pages = document.querySelectorAll(".page");
const navItems = document.querySelectorAll(".nav-item");

function showPage(name) {

    pages.forEach(page => {
        page.classList.add("hidden");
    });

    const page = document.getElementById(name + "-page");

    if (page) {
        page.classList.remove("hidden");
    }

    navItems.forEach(item => {
        item.classList.remove("active");

        if (item.dataset.page === name) {
            item.classList.add("active");
        }
    });

    document.getElementById("pageTitle").textContent =
        name.charAt(0).toUpperCase() + name.slice(1);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
navItems.forEach(item => {

    item.addEventListener("click", () => {
        showPage(item.dataset.page);
    });

});
document.getElementById("startBtn").onclick = () => {

    document.querySelector(".goals").scrollIntoView({
        behavior: "smooth"
    });

};
const goalData = {

    create: {
        title: "Create with purpose",
        desc: "Turn your ideas into useful content and creative work.",
        coach: "You have an idea. Let's turn it into your next meaningful action.",
        channels: [
            ["🎨", "Visual", "Create a visual post or creative idea."],
            ["💬", "Circle", "Get feedback from people you trust."],
            ["⚡", "Pulse", "Share your creation with the right audience."]
        ]
    },

    explore: {
        title: "Explore beyond your bubble",
        desc: "Discover ideas and perspectives outside your usual feed.",
        coach: "Instead of endless scrolling, choose something worth discovering.",
        channels: [
            ["💡", "Learn", "Explore a new topic or skill."],
            ["🌍", "Perspectives", "Discover different viewpoints."],
            ["👥", "Communities", "Find people around shared interests."]
        ]
    },

    connect: {
        title: "Connect meaningfully",
        desc: "Find people and conversations that actually matter.",
        coach: "Focus on meaningful conversations instead of follower counts.",
        channels: [
            ["💬", "Circle", "Start a meaningful conversation."],
            ["👥", "Community", "Find people with similar interests."],
            ["⚡", "Pulse", "Join an active conversation."]
        ]
    },

    grow: {
        title: "Grow through social",
        desc: "Use social interaction for learning and progress.",
        coach: "Turn inspiration into one useful action.",
        channels: [
            ["📚", "Learn", "Discover something useful."],
            ["🤝", "Mentor", "Find someone who can guide you."],
            ["🚀", "Progress", "Turn knowledge into action."]
        ]
    }

};


document.querySelectorAll(".goal").forEach(goal => {

    goal.addEventListener("click", () => {

        const data = goalData[goal.dataset.goal];

        document.getElementById("dashboard").style.display = "block";

        document.getElementById("dashTitle").textContent =
            data.title;

        document.getElementById("dashDesc").textContent =
            data.desc;

        document.getElementById("coachText").textContent =
            data.coach;


        const channels =
            document.getElementById("channels");

        channels.innerHTML = "";


        data.channels.forEach(channel => {

            const box = document.createElement("div");

            box.className = "channel";

            box.innerHTML = `
                <div class="channel-icon">${channel[0]}</div>

                <h3>${channel[1]}</h3>

                <p>${channel[2]}</p>

                <button class="small">
                    Explore this →
                </button>
            `;


            box.querySelector("button").onclick = () => {

                document.getElementById("channelTitle")
                    .textContent = channel[1];

                document.getElementById("channelDesc")
                    .textContent = channel[2];

                document.getElementById("channelModal")
                    .style.display = "flex";

            };


            channels.appendChild(box);

        });


        document.getElementById("dashboard")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});
document.getElementById("changeGoal").onclick = () => {

    document.getElementById("dashboard").style.display = "none";

    document.querySelector(".goals").scrollIntoView({
        behavior: "smooth"
    });

};
document.querySelectorAll(".explore-grid .small")
.forEach(button => {

    button.onclick = () => {

        openAI();

        setTimeout(() => {

            aiInput.value =
                button.dataset.question;

            sendMessage();

        }, 150);

    };

});
const aiModal = document.getElementById("aiModal");

const aiInput = document.getElementById("aiInput");

const chat = document.getElementById("chat");


function openAI() {

    aiModal.style.display = "flex";

    setTimeout(() => {
        aiInput.focus();
    }, 100);

}
document.getElementById("openAI").onclick = openAI;

document.getElementById("topAI").onclick = openAI;


document.getElementById("closeAI").onclick = () => {

    aiModal.style.display = "none";

};
function sendMessage() {

    const question =
        aiInput.value.trim();

    if (!question) {
        return;
    }
   addMessage(question, "user");

    aiInput.value = "";


    setTimeout(() => {

        addMessage(
            getAIResponse(question),
            "bot"
        );

    }, 500);

}
document.getElementById("sendAI")
    .onclick = sendMessage;


aiInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        sendMessage();
    }

});
document.querySelectorAll(".quick button")
.forEach(button => {

    button.onclick = () => {

        aiInput.value =
            button.dataset.q;

        sendMessage();

    };

});
function getAIResponse(question) {

    const q =
        question.toLowerCase();


    if (
        q.includes("create") ||
        q.includes("idea") ||
        q.includes("content") ||
        q.includes("post")
    ) {

        return "🎨 Great! Tell me what you want to create. I'll help you turn the idea into a simple next action.";

    }


    if (
        q.includes("explore") ||
        q.includes("learn") ||
        q.includes("discover")
    ) {

        return "🌱 Tell me what you're interested in. I'll help you find something useful to explore instead of simply scrolling.";

    }


    if (
        q.includes("connect") ||
        q.includes("community") ||
        q.includes("people")
    ) {

        return "💬 Tell me what kind of people or community you're looking for. I'll help you think about a meaningful way to connect.";

    }


    if (
        q.includes("grow") ||
        q.includes("skill") ||
        q.includes("career") ||
        q.includes("improve")
    ) {

        return "🚀 Tell me what you want to improve. We can break it into one small and practical next step.";

    }


    if (
        q.includes("project") ||
        q.includes("hackathon") ||
        q.includes("website")
    ) {

        return "🚀 Tell me about your project and what you want to achieve. I'll help you decide what your next meaningful action could be.";

    }


    if (
        q.includes("instagram") ||
        q.includes("linkedin") ||
        q.includes("whatsapp") ||
        q.includes("platform")
    ) {

        return "🎯 SocialOS starts with your purpose, not the platform. Tell me what you're trying to achieve and I'll help you decide what kind of social action fits.";

    }


    if (
        q.includes("study") ||
        q.includes("exam") ||
        q.includes("college")
    ) {

        return "📚 Tell me what you're studying and what you want to achieve. I'll help you break it into a useful next step.";

    }


    if (
        q.includes("confused") ||
        q.includes("help") ||
        q.includes("next")
    ) {

        return "😊 No problem. Tell me what you're trying to achieve. You don't need to know the platform or exact solution first.";

    }


    return "👋 I'm here to help. You can ask me about a project, idea, community, learning, social media, or simply tell me what you're trying to achieve.";

}
function addMessage(text, type) {

    const message =
        document.createElement("div");

    message.className = type;

    message.textContent = text;

    chat.appendChild(message);

    chat.scrollTop =
        chat.scrollHeight;

}
document.getElementById("previewBtn").onclick = () => {

    const idea =
        document.getElementById("idea")
        .value.trim();


    if (!idea) {

        toast("Write an idea first ✍️");

        return;
    }
document.getElementById("preview").innerHTML = `
<div class="preview">
<b>💡 Your idea</b>
<p>${escapeHTML(idea)}</p>
<br>
 <b>Suggested next step</b>
<p> Turn your idea into a simple post,
visual or conversation and share it
with the right audience.
</p>
</div>
`;
toast("Preview created ✨");

};

document.getElementById("saveBtn").onclick = () => {

    const idea =
        document.getElementById("idea")
        .value.trim();
    if (!idea) {

        toast("Write an idea first ✍️");

        return;
    }
    const saved =
        JSON.parse(
            localStorage.getItem("savedIdeas") || "[]"
        );
saved.push(idea);
 localStorage.setItem(
        "savedIdeas",
        JSON.stringify(saved)
    );
 renderSaved();

    toast("Idea saved ♡");

};
function renderSaved() {

    const box =
        document.getElementById("saved");


    const saved =
        JSON.parse(
            localStorage.getItem("savedIdeas") || "[]"
        );


    if (saved.length === 0) {

        box.innerHTML =
            "<p>No saved ideas yet.</p>";

        return;
    }box.innerHTML = saved.map(item => `

        <div class="saved-item">
            💡 ${escapeHTML(item)}
        </div>

    `).join("");

}
renderSaved();
document.getElementById("closeChannel").onclick = () => {

    document.getElementById("channelModal")
        .style.display = "none";

};
document.getElementById("channelAction").onclick = () => {

    document.getElementById("channelModal")
        .style.display = "none";

    toast(
        "Great! Meaningful action started 🚀"
    );

};
document.getElementById("settingsBtn").onclick = () => {

    document.getElementById("settingsModal")
        .style.display = "flex";

};

document.getElementById("closeSettings").onclick = () => {

    document.getElementById("settingsModal")
        .style.display = "none";

};
document.getElementById("light").onclick = () => {

    document.body.classList.remove("dark");

    localStorage.setItem(
        "theme",
        "light"
    );

};
document.getElementById("dark").onclick = () => {

    document.body.classList.add("dark");

    localStorage.setItem(
        "theme",
        "dark"
    );

};
if (
    localStorage.getItem("theme") === "dark"
) {

    document.body.classList.add("dark");

}
document.getElementById("reset").onclick = () => {

    localStorage.removeItem("theme");

    document.body.classList.remove("dark");

    toast("Preferences reset");

};
function toast(message) {

    const box =
        document.getElementById("toast");

    box.textContent = message;

    box.style.display = "block";


    setTimeout(() => {

        box.style.display = "none";

    }, 2200);

}
document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        document.querySelectorAll(".modal")
        .forEach(modal => {

            modal.style.display = "none";

        });

    }

});
document.querySelectorAll(".modal")
.forEach(modal => {

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            modal.style.display = "none";
        }

    });

});
function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}