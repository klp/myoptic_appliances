const jsonPaths = ["processed_txt/comb_queer_chaps_process.json"];

function typeText(paragraphData, elementId, delay = 100) {
  let sentenceIndex = 0;
  let wordIndex = 0;
  const contentDiv = document.getElementById(elementId);

  function typeWriter() {
    if (sentenceIndex < paragraphData.length) {
      const sentenceData = paragraphData[sentenceIndex];
      if (wordIndex < sentenceData.pos_data.length) {
        const [word, pos] = sentenceData.pos_data[wordIndex];
        const wordElement = document.createElement("span");
        wordElement.textContent = word + " ";
        if (pos === "ADJ") {
          wordElement.classList.add("adjective");
        }
        if (pos === "NOUN") {
          wordElement.classList.add("noun");
        }
        contentDiv.appendChild(wordElement);
        wordIndex++;
        setTimeout(typeWriter, delay);
      } else {
        contentDiv.appendChild(document.createElement("br"));
        sentenceIndex++;
        wordIndex = 0;
        setTimeout(typeWriter, delay);
      }
    }
  }
  typeWriter();
}

async function loadAndDisplayJSON(jsonPath) {
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const selectedParagraphIndex = Math.floor(Math.random() * data.length);
    const selectedParagraphData = data[selectedParagraphIndex];

    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = ""; // clear previous content

    const paraElement = document.createElement("p");
    paraElement.id = "selected-paragraph";
    contentDiv.appendChild(paraElement);

    typeText(selectedParagraphData.sentences, "selected-paragraph");
  } catch (error) {
    console.error("Error fetching the JSON file:", error);
  }
}

function loadInitialJSON() {
  const lastSelectedJsonPath = localStorage.getItem("lastSelectedJsonPath");
  if (lastSelectedJsonPath) {
    loadAndDisplayJSON(lastSelectedJsonPath);
  } else {
    const randomJsonPath =
      jsonPaths[Math.floor(Math.random() * jsonPaths.length)];
    loadAndDisplayJSON(randomJsonPath);
  }
}

function toggleAdjectives() {
  const adjectives = document.querySelectorAll(".adjective");
  adjectives.forEach((adjective) => {
    // darker text color
    adjective.classList.toggle("text-gray-500");

    // strike-through with animation
    adjective.classList.toggle("line-through");
    adjective.classList.toggle("animate-strike");
  });
}

function collectNouns() {
  const paragraph = document.getElementById("selected-paragraph");
  const nouns = [];

  // Directly collect spans with 'noun' class within the paragraph
  paragraph.querySelectorAll(".noun").forEach((nounElement) => {
    nouns.push(nounElement.textContent);
  });

  displayNouns(nouns);
}

function displayNouns(nouns) {
  const nounsDiv = document.getElementById("nounsGrid");
  nounsDiv.innerHTML = ""; // clear previous nouns

  // Update the nounsDiv to use grid layout
  nounsDiv.classList.add("grid", "grid-cols-5", "gap-1"); // Add gap for spacing

  nouns.forEach((noun) => {
    const nounElement = document.createElement("div");
    nounElement.textContent = noun.trim();
    // apply main paragraph style
    nounElement.classList.add("text-3xl");
    // Add additional styling here if needed
    nounsDiv.appendChild(nounElement);
  });
}

document
  .getElementById("toggleButton")
  .addEventListener("click", toggleAdjectives);
document.getElementById("collectNouns").addEventListener("click", collectNouns);

loadInitialJSON();
