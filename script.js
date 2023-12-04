const jsonPaths = [
  "processed_txt/a_mysterious_night_in_london_process.json",
  "processed_txt/placards_brass-jewelers_truck-horses_and_steamers_process.json",
  "processed_txt/what_redburn_saw_in_launcelott's-hey_process.json",
];

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

function formatLinkText(path) {
  const formattedText = path
    .split("/")
    .pop()
    .split(".json")[0]
    .replace(/_/g, " ")
    .replace(" process", "");

  return formattedText
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function createLinks() {
  const linksDiv = document.getElementById("links");

  jsonPaths.forEach((path, index) => {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = formatLinkText(path);
    link.onclick = () => loadAndDisplayJSON(path);

    linksDiv.appendChild(link);
    if (index < jsonPaths.length - 1) {
      linksDiv.appendChild(document.createTextNode(" | "));
    }
  });
}

createLinks();

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
    adjective.style.display = adjective.style.display === "none" ? "" : "none";
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
  nouns.forEach((noun) => {
    const nounElement = document.createElement("div");
    nounElement.textContent = noun;
    // apply main paragraph style
    nounElement.classList.add("text-3xl");
    nounsDiv.appendChild(nounElement);
  });
}

document
  .getElementById("toggleButton")
  .addEventListener("click", toggleAdjectives);
document.getElementById("collectNouns").addEventListener("click", collectNouns);

loadInitialJSON();
