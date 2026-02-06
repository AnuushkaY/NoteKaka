let savings = 0;

// 🔊 Text-to-Speech
function speak(text) {
  let speech = new SpeechSynthesisUtterance(text);
  speech.lang = "hi-IN";
  window.speechSynthesis.speak(speech);
}

// 🎤 Voice-to-Text
function startListening() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "hi-IN";
  recognition.start();

  recognition.onresult = function (event) {
    let spokenText = event.results[0][0].transcript.toLowerCase();
    document.getElementById("output").innerText =
      "You said: " + spokenText;

    handleCommand(spokenText);
  };
}

// 🎮 Game Actions
function handleCommand(text) {
  if (text.includes("save")) {
    saveMoney();
  } 
  else if (text.includes("loan")) {
    takeLoan();
  } 
  else if (text.includes("business")) {
    startBusiness();
  } 
  else {
    speak("Samajh nahi aaya, dobara boliye");
  }
}

function saveMoney() {
  savings += 2000;
  updateStatus();
  speak("Aapne paise bachaye. Bahut achha faisla");
}

function takeLoan() {
  savings -= 1000;
  updateStatus();
  //speak("Loan lene se EMI ka bojh badhta hai");
  speak("Hello bhai, paisa bachare ho na?");
}

function startBusiness() {
  savings += 3000;
  updateStatus();
  speak("Chhota vyapar shuru karna achha vichar hai");
}

function updateStatus() {
  document.getElementById("status").innerText =
    "Savings: ₹" + savings;
}
