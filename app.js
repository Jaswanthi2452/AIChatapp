const promptEl = document.getElementById("prompt");
const responseEl = document.getElementById("response");
const historyEl = document.getElementById("history");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");

let history = [];

sendBtn.onclick = async () => {
  const prompt = promptEl.value.trim();
  if (!prompt) return;
  responseEl.textContent = "⏳ Generating...";

  try {
    const res = await fetch("http://localhost:4000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    const text = data.generated_text || "No response";
    responseEl.textContent = text;

    history.push({ prompt, response: text });
    updateHistory();
    promptEl.value = "";
  } catch (err) {
    responseEl.textContent = "❌ Error fetching AI response";
    console.error(err);
  }
};

clearBtn.onclick = () => {
  history = [];
  responseEl.textContent = "";
  promptEl.value = "";
  historyEl.innerHTML = "";
};

function updateHistory() {
  historyEl.innerHTML = "";
  history.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<b>Prompt:</b> ${item.prompt} <br> <b>Response:</b> ${item.response}`;
    historyEl.appendChild(li);
  });
}
