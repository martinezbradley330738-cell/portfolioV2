let visitorName = "";

let voiceOn = true;





// LOAD SAVED CHAT


window.onload = function() {


    let savedChat = localStorage.getItem("bradleyAIChat");


    if(savedChat) {


        document.getElementById("messages").innerHTML = savedChat;


    }


};









// OPEN / CLOSE AI


function toggleAI() {


    let chat = document.getElementById("aiChat");



    if(chat.style.display === "flex") {


        chat.style.display = "none";


    } else {


        chat.style.display = "flex";


    }


}









// SETTINGS


function toggleSettings() {


    let settings = document.getElementById("aiSettings");



    if(settings.style.display === "block") {


        settings.style.display = "none";


    } else {


        settings.style.display = "block";


    }


}









function saveChat() {


    let chat = document.getElementById("messages").innerHTML;


    localStorage.setItem(
        "bradleyAIChat",
        chat
    );


}









// SEND MESSAGE


function sendMessage() {


    let input = document.getElementById("userInput");


    let text = input.value.trim();



    if(text === "") {


        return;


    }




    let message = text.toLowerCase();


    let messages = document.getElementById("messages");





    messages.innerHTML += `

    <p class="user">

        ${text}

    </p>

    `;





    let reply =

    "I'm still learning 🤖 Ask me about FocusFlow, Bradley, or my projects.";








    if(message.includes("my name is")) {



        visitorName = text
        .replace("my name is","")
        .trim();




        reply =

        "Nice to meet you " 
        + visitorName 
        + "! 👋";



    }







    else if(message.includes("focusflow")) {



        reply =

        "FocusFlow 🚀 is Bradley's productivity app. It helps users manage tasks, organize goals, and stay productive.";



    }








    else if(
        message.includes("who made")
        ||
        message.includes("creator")
        ||
        message.includes("bradley")
    ) {



        reply =

        "Bradley Martinez created this portfolio and FocusFlow to showcase coding and creative projects.";



    }
    else if(
        message.includes("technology")
        ||
        message.includes("code")
        ||
        message.includes("html")
        ||
        message.includes("css")
        ||
        message.includes("javascript")
    ) {


        reply =

        "This portfolio uses HTML, CSS, and JavaScript. It is hosted using GitHub Pages 🚀";


    }







    else if(
        message.includes("project")
        ||
        message.includes("projects")
    ) {


        reply =

        "Bradley's main project is FocusFlow 🚀. More projects will be added in the future.";


    }







    else if(
        message.includes("hello")
        ||
        message.includes("hi")
        ||
        message.includes("hey")
    ) {


        if(visitorName !== "") {


            reply =

            "Hey " + visitorName + "! 👋 What would you like to know?";


        } else {


            reply =

            "Hey! 👋 I'm Bradley AI. What's your name?";


        }


    }









    messages.innerHTML += `

    <p class="bot typing" id="typing">

        <span></span>

        <span></span>

        <span></span>

    </p>

    `;





    messages.scrollTop =
    messages.scrollHeight;






    saveChat();







    setTimeout(function(){



        let typing =
        document.getElementById("typing");



        if(typing){


            typing.remove();


        }






        messages.innerHTML += `

        <p class="bot">

            ${reply}

        </p>

        `;




        saveChat();





        if(voiceOn){


            speak(reply);


        }






    },1200);






    input.value = "";

}









// QUICK BUTTONS


function quickQuestion(question){


    document.getElementById("userInput").value =
    question;


    sendMessage();


}









// CLEAR CHAT


function clearChat(){


    localStorage.removeItem(
        "bradleyAIChat"
    );



    document.getElementById("messages").innerHTML = `


    <p class="bot">


    👋 Hey! I'm Bradley AI 🤖

    <br><br>

    Ask me about FocusFlow or Bradley's projects.


    </p>


    `;


}









// VOICE INPUT


function startVoice(){



    if(!("webkitSpeechRecognition" in window)){


        alert("Voice is not supported on this browser.");

        return;


    }






    let recognition =
    new webkitSpeechRecognition();




    recognition.lang = "en-US";


    recognition.start();






    recognition.onresult = function(event){



        let speech =
        event.results[0][0].transcript;




        document.getElementById("userInput").value =
        speech;




        sendMessage();



    };


}









// VOICE OUTPUT


function speak(text){



    if("speechSynthesis" in window){



        let voice =
        new SpeechSynthesisUtterance(text);



        voice.rate = 1;


        voice.pitch = 1;


        voice.volume = 1;




        speechSynthesis.speak(voice);



    }


}









// VOICE SETTINGS


document.addEventListener(
"change",
function(event){


    if(event.target.id === "voiceToggle"){


        voiceOn =
        event.target.checked;


    }


});