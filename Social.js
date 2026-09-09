/* =========================
   PAGE NAVIGATION
========================= */

const pages = document.querySelectorAll(".page");
const navItems = document.querySelectorAll(".nav-item");

function showPage(name){

    pages.forEach(page => {
        page.classList.add("hidden");
    });

    const page = document.getElementById(name + "-page");

    if(page){
        page.classList.remove("hidden");
    }

    navItems.forEach(item => {
        item.classList.toggle(
            "active",
            item.dataset.page === name
        );
    });

    document.getElementById("pageTitle").textContent =
        name.charAt(0).toUpperCase() + name.slice(1);

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}


navItems.forEach(item => {

    item.addEventListener("click", () => {
        showPage(item.dataset.page);
    });

});


/* =========================
   START BUTTON
========================= */

document.getElementById("startBtn").onclick = () => {

    document.getElementById("goalSection").scrollIntoView({
        behavior:"smooth"
    });

};


/* =========================
   GOAL DATA
========================= */

const goalData = {

    create:{
        title:"Create with purpose",
        desc:"Turn your ideas into useful content and creative work.",
        coach:"You have an idea. Let's turn it into one simple next action.",
        channels:[
            ["🎨","Visual","Turn your idea into a visual, post or creative concept."],
            ["💬","Circle","Get feedback from people you trust."],
            ["⚡","Pulse","Share your creation with the right audience."]
        ]
    },

    explore:{
        title:"Explore beyond your bubble",
        desc:"Discover ideas and perspectives outside your usual feed.",
        coach:"Instead of endless scrolling, choose something worth discovering.",
        channels:[
            ["💡","Learn","Explore a new topic or skill."],
            ["🌍","Perspectives","Discover different viewpoints."],
            ["👥","Communities","Find people around shared interests."]
        ]
    },

    connect:{
        title:"Connect meaningfully",
        desc:"Find people and conversations that actually matter.",
        coach:"Focus on meaningful conversations instead of follower counts.",
        channels:[
            ["💬","Circle","Start a meaningful conversation."],
            ["👥","Community","Find people with similar interests."],
            ["⚡","Pulse","Join an active conversation."]
        ]
    },

    grow:{
        title:"Grow through social",
        desc:"Use social interaction for learning and progress.",
        coach:"Turn inspiration into one useful action.",
        channels:[
            ["📚","Learn","Discover something useful."],
            ["🤝","Mentor","Find someone who can guide you."],
            ["🚀","Progress","Turn knowledge into action."]
        ]
    }

};


let currentGoal = "";
let currentChannel = "";


/* =========================
   GOAL SELECTION
========================= */

document.querySelectorAll(".goal").forEach(goal => {

    goal.addEventListener("click", () => {

        const type = goal.dataset.goal;
        const data = goalData[type];

        currentGoal = type;

        document.getElementById("dashboard").style.display = "block";

        document.getElementById("dashTitle").textContent =
            data.title;

        document.getElementById("dashDesc").textContent =
            data.desc;

        document.getElementById("coachText").textContent =
            data.coach;

        const channels = document.getElementById("channels");

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

                currentChannel = channel[1];

                document.getElementById("channelTitle")
                    .textContent = channel[1];

                document.getElementById("channelDesc")
                    .textContent = channel[2];

                document.getElementById("actionText")
                    .textContent = getAction(channel[1]);

                closeAllModals();

                document.getElementById("channelModal")
                    .style.display = "flex";

            };

            channels.appendChild(box);

        });

        document.getElementById("dashboard")
            .scrollIntoView({
                behavior:"smooth"
            });

    });

});


/* =========================
   CHANNEL ACTION
========================= */

function getAction(channel){

    const actions = {

        Visual:
            "Create a simple visual or content draft from your idea.",

        Circle:
            "Start a meaningful conversation and ask for useful feedback.",

        Pulse:
            "Share your idea with people who may genuinely find it useful.",

        Learn:
            "Choose one topic and spend a few minutes learning about it.",

        Perspectives:
            "Explore one different viewpoint before forming your opinion.",

        Communities:
            "Find a community where people share your interest.",

        Community:
            "Look for people with a similar interest and start a conversation.",

        Mentor:
            "Identify someone whose experience can help you learn.",

        Progress:
            "Turn something you learned into one practical action."

    };

    return actions[channel] ||
        "Take one small meaningful action.";

}


document.getElementById("channelAction").onclick = () => {

    document.getElementById("channelModal")
        .style.display = "none";

    updateTrail();

    toast(
        "Great! Your next meaningful action has started 🚀"
    );

};


/* =========================
   CHANGE GOAL
========================= */

document.getElementById("changeGoal").onclick = () => {

    document.getElementById("dashboard")
        .style.display = "none";

    document.getElementById("goalSection")
        .scrollIntoView({
            behavior:"smooth"
        });

};


/* =========================
   EXPLORE ACTIONS
========================= */

document.querySelectorAll(".explore-action")
.forEach(button => {

    button.onclick = () => {

        document.getElementById("channelTitle")
            .textContent = button.dataset.title;

        document.getElementById("channelDesc")
            .textContent = button.dataset.text;

        document.getElementById("actionText")
            .textContent =
            "Use this discovery as your next meaningful step.";

        currentChannel = button.dataset.title;

        closeAllModals();

        document.getElementById("channelModal")
            .style.display = "flex";

    };

});


/* =========================
   AI CHAT
========================= */

const aiModal = document.getElementById("aiModal");
const aiInput = document.getElementById("aiInput");
const chat = document.getElementById("chat");


function openAI(){

    closeAllModals();

    aiModal.style.display = "flex";

    setTimeout(() => {
        aiInput.focus();
    },100);

}


document.getElementById("openAI").onclick = openAI;
document.getElementById("topAI").onclick = openAI;


/* SEND AI MESSAGE */

function sendMessage(){

    const question = aiInput.value.trim();

    if(!question){
        return;
    }

    addMessage(question,"user");

    aiInput.value = "";

    setTimeout(() => {

        addMessage(
            getAIResponse(question),
            "bot"
        );

    },450);

}


document.getElementById("sendAI")
    .onclick = sendMessage;


aiInput.addEventListener("keydown", event => {

    if(event.key === "Enter"){
        event.preventDefault();
        sendMessage();
    }

});


/* QUICK AI QUESTIONS */

document.querySelectorAll(".quick button")
.forEach(button => {

    button.onclick = () => {

        aiInput.value = button.dataset.q;

        sendMessage();

    };

});


/* =========================
   SOCIALOS AI RESPONSE
========================= */

function getAIResponse(question){

    const q = question.toLowerCase();


    if(
        q.includes("hello") ||
        q.includes("hi") ||
        q.includes("hey")
    ){

        return "👋 Hi! Tell me what you're trying to do and I'll help you think about your next step.";

    }


    if(
        q.includes("project") ||
        q.includes("website") ||
        q.includes("hackathon") ||
        q.includes("app")
    ){

        return "💡 Tell me what your project is about, what problem it solves and where you're stuck. I'll help you break it into a practical next step.";

    }


    if(
        q.includes("idea") ||
        q.includes("create") ||
        q.includes("content") ||
        q.includes("post")
    ){

        return "🎨 Start with the idea, not the platform. Tell me what you want to create and I'll help you turn it into a simple first step.";

    }


    if(
        q.includes("study") ||
        q.includes("exam") ||
        q.includes("learn")
    ){

        return "📚 Tell me what you want to learn and how much time you have. We can turn it into a small, manageable action.";

    }


    if(
        q.includes("career") ||
        q.includes("job") ||
        q.includes("skill") ||
        q.includes("improve")
    ){

        return "🚀 Tell me your goal and current skill level. I'll help you identify one useful thing you can work on next.";

    }


    if(
        q.includes("friend") ||
        q.includes("people") ||
        q.includes("connect") ||
        q.includes("community")
    ){

        return "💬 Think about the kind of people or conversation you want. A meaningful connection usually starts with a shared interest or a useful question.";

    }


    if(
        q.includes("instagram") ||
        q.includes("linkedin") ||
        q.includes("whatsapp") ||
        q.includes("platform")
    ){

        return "🎯 SocialOS doesn't start by asking which platform you want. Tell me what you want to achieve first, and then we can think about the right kind of social interaction.";

    }


    if(
        q.includes("confused") ||
        q.includes("stuck") ||
        q.includes("help") ||
        q.includes("next")
    ){

        return "😊 That's okay. Tell me what you're trying to achieve and what is confusing you. You don't need to know the solution first.";

    }


    return "👋 I can help you think through ideas, projects, learning, career goals, communities, social media or everyday questions. Just tell me what you're trying to do.";


}


/* ADD CHAT MESSAGE */

function addMessage(text,type){

    const message = document.createElement("div");

    message.className = type;

    message.textContent = text;

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;

}


/* =========================
   CREATE
========================= */

document.getElementById("previewBtn").onclick = () => {

    const idea =
        document.getElementById("idea").value.trim();

    if(!idea){

        toast("Write an idea first ✍️");

        return;

    }

    document.getElementById("preview").innerHTML = `

        <div class="preview">

            <b>💡 Your idea</b>

            <p>${escapeHTML(idea)}</p>

            <b>Suggested next step</b>

            <p>
                Break the idea into one simple action.
                Decide whether you want to create,
                explore, connect or grow around it.
            </p>

        </div>

    `;

    toast("Preview created ✨");

};


/* =========================
   SAVE IDEA
========================= */

document.getElementById("saveBtn").onclick = () => {

    const idea =
        document.getElementById("idea").value.trim();

    if(!idea){

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


/* =========================
   SAVED IDEAS
========================= */

function renderSaved(){

    const box =
        document.getElementById("saved");

    const saved =
        JSON.parse(
            localStorage.getItem("savedIdeas") || "[]"
        );


    if(saved.length === 0){

        box.innerHTML = `
            <div class="empty">
                No saved ideas yet. Create something and save it here.
            </div>
        `;

        return;

    }


    box.innerHTML = saved.map((item,index) => `

        <div class="saved-item">
            💡 ${escapeHTML(item)}
        </div>

    `).join("");

}


renderSaved();


/* =========================
   TRAIL
========================= */

function updateTrail(){

    let actions =
        Number(
            localStorage.getItem("trailActions") || "0"
        );

    actions++;

    localStorage.setItem(
        "trailActions",
        actions
    );

    document.getElementById("actionsCount")
        .textContent =
        String(8 + actions).padStart(2,"0");

}


let savedActions =
    Number(
        localStorage.getItem("trailActions") || "0"
    );

document.getElementById("actionsCount")
    .textContent =
    String(8 + savedActions).padStart(2,"0");


/* =========================
   SETTINGS
========================= */

function closeAllModals(){

    document.querySelectorAll(".modal")
    .forEach(modal => {
        modal.style.display = "none";
    });

}


/* OPEN SETTINGS */

document.getElementById("settingsBtn").onclick = () => {

    closeAllModals();

    document.getElementById("settingsModal")
        .style.display = "flex";

};


/* CLOSE BUTTONS */

document.getElementById("closeAI").onclick =
    () => aiModal.style.display = "none";


document.getElementById("closeChannel").onclick =
    () => document.getElementById("channelModal")
        .style.display = "none";


document.getElementById("closeSettings").onclick =
    () => document.getElementById("settingsModal")
        .style.display = "none";


/* =========================
   THEME
========================= */

document.getElementById("light").onclick = () => {

    document.body.classList.remove("dark");

    localStorage.setItem(
        "theme",
        "light"
    );

    toast("Light theme selected ☀️");

};


document.getElementById("dark").onclick = () => {

    document.body.classList.add("dark");

    localStorage.setItem(
        "theme",
        "dark"
    );

    toast("Dark theme selected 🌙");

};


/* LOAD THEME */

if(
    localStorage.getItem("theme") === "dark"
){

    document.body.classList.add("dark");

}


/* =========================
   ANIMATION TOGGLE
========================= */

const animationToggle =
    document.getElementById("animationToggle");


animationToggle.onchange = () => {

    document.body.classList.toggle(
        "no-animation",
        !animationToggle.checked
    );

};


/* =========================
   RESET
========================= */

document.getElementById("reset").onclick = () => {

    localStorage.removeItem("theme");

    localStorage.removeItem("trailActions");

    document.body.classList.remove("dark");
    document.body.classList.remove("no-animation");

    animationToggle.checked = true;

    document.getElementById("actionsCount")
        .textContent = "08";

    toast("Preferences reset");

};


/* =========================
   MODAL BACKDROP
========================= */

document.querySelectorAll(".modal")
.forEach(modal => {

    modal.addEventListener("click", event => {

        if(event.target === modal){

            modal.style.display = "none";

        }

    });

});


/* =========================
   ESC KEY
========================= */

document.addEventListener("keydown", event => {

    if(event.key === "Escape"){

        closeAllModals();

    }

});


/* =========================
   TOAST
========================= */

function toast(message){

    const box =
        document.getElementById("toast");

    box.textContent = message;

    box.style.display = "block";

    clearTimeout(window.toastTimer);

    window.toastTimer =
        setTimeout(() => {

            box.style.display = "none";

        },2200);

}


/* =========================
   SECURITY
========================= */

function escapeHTML(text){

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}
