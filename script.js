const jsonPaths = ["processed_txt/comb_queer_chaps_process.json"];

function typeText(paragraphData, elementId, delay = 250) {
  let sentenceIndex = 0;
  let wordIndex = 0;
  const contentDiv = document.getElementById(elementId);

  function typeWriter() {
    if (sentenceIndex < paragraphData.length) {
      const sentenceData = paragraphData[sentenceIndex];
      if (wordIndex < sentenceData.pos_data.length) {
        const [word, pos] = sentenceData.pos_data[wordIndex];
        const wordElement = document.createElement("span");

        // check if next element is punct, don't add space if so
        let nextElIsPunct = false;
        if (wordIndex + 1 < sentenceData.pos_data.length) {
          const nextPos = sentenceData.pos_data[wordIndex + 1][1];
          if (nextPos === "PUNCT") {
            nextElIsPunct = true;
          }
        }

        wordElement.textContent = word + (nextElIsPunct ? "" : " ");

        if (pos === "ADJ") {
          wordElement.classList.add("adjective");
        }
        if (pos === "ADV") {
          wordElement.classList.add("adverb");
        }
        if (pos === "NOUN") {
          wordElement.classList.add("noun");
        }
        if (pos === "VERB") {
          wordElement.classList.add("verb");
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

function deflateClassForElements(className) {
  const elements = document.querySelectorAll(`.${className}`);
  elements.forEach((element) => {
    element.classList.toggle("text-slate-400");

    element.classList.toggle("line-through");
    element.classList.toggle("animate-stirke");

    element.classList.toggle("text-2xl");
  });
}

function inflateClassForElements(className) {
  const elements = document.querySelectorAll(`.${className}`);
  elements.forEach((element) => {
    element.classList.toggle("text-slate-50");
    element.classList.toggle("font-bold");
    element.classList.toggle("text-4xl");
  });
}

function deflateAdjectives() {
  deflateClassForElements("adjective");
}

function deflateAdverbs() {
  deflateClassForElements("adverb");
}

function deflateNouns() {
  deflateClassForElements("noun");
}

function deflateVerbs() {
  deflateClassForElements("verb");
}

function inflateAdjectives() {
  inflateClassForElements("adjective");
}

function inflateAdverbs() {
  inflateClassForElements("adverb");
}

function inflateNouns() {
  inflateClassForElements("noun");
}

function instflateVerbs() {
  inflateClassForElements("verb");
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

// Bind funcs to buttons

document
  .getElementById("deflateAdjectives")
  .addEventListener("click", deflateAdjectives);
document
  .getElementById("deflateAdverbs")
  .addEventListener("click", deflateAdverbs);
document.getElementById("deflateNouns").addEventListener("click", deflateNouns);
document.getElementById("deflateVerbs").addEventListener("click", deflateVerbs);
document
  .getElementById("inflateAdjectives")
  .addEventListener("click", inflateAdjectives);
document
  .getElementById("inflateAdverbs")
  .addEventListener("click", inflateAdverbs);
document.getElementById("inflateNouns").addEventListener("click", inflateNouns);
document
  .getElementById("inflateVerbs")
  .addEventListener("click", instflateVerbs);
document.getElementById("collectNouns").addEventListener("click", collectNouns);

loadInitialJSON();
