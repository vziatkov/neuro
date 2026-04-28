const nav = document.getElementById("chapters-nav");
const titleEl = document.getElementById("chapter-title");
const subjectEl = document.getElementById("chapter-subject");
const bodyEl = document.getElementById("chapter-body");

async function fetchChapterFileNames() {
  const response = await fetch("./chapters/chapters.json");
  if (!response.ok) {
    throw new Error("Unable to load chapters.json");
  }

  return response.json();
}

async function fetchChapterMarkdown(fileName) {
  const response = await fetch(`./chapters/${fileName}`);
  if (!response.ok) {
    throw new Error(`Unable to load chapter: ${fileName}`);
  }

  return response.text();
}

function parseChapter(markdownText) {
  const lines = markdownText.split(/\r?\n/);
  const titleLine = lines[0] || "# Untitled";
  const subjectLine = lines[1] || "";
  const bodyMarkdown = lines.slice(2).join("\n").trim();

  const title = titleLine.replace(/^#\s*/, "").trim() || "Untitled";
  const subject = subjectLine.trim();

  return { title, subject, bodyMarkdown };
}

function renderChapter(chapter) {
  titleEl.textContent = chapter.title;
  subjectEl.textContent = chapter.subject;
  bodyEl.innerHTML = marked.parse(chapter.bodyMarkdown);
}

function setActiveButton(activeFileName) {
  const buttons = nav.querySelectorAll(".chapter-link");
  buttons.forEach((button) => {
    const isActive = button.dataset.fileName === activeFileName;
    button.classList.toggle("active", isActive);
  });
}

async function openChapter(fileName) {
  const markdownText = await fetchChapterMarkdown(fileName);
  const chapter = parseChapter(markdownText);
  renderChapter(chapter);
  setActiveButton(fileName);
}

function createChapterButton(fileName, title) {
  const button = document.createElement("button");
  button.className = "chapter-link";
  button.type = "button";
  button.dataset.fileName = fileName;
  button.textContent = title;
  button.addEventListener("click", () => {
    openChapter(fileName).catch(showError);
  });
  return button;
}

function showError(error) {
  titleEl.textContent = "Error";
  subjectEl.textContent = "";
  bodyEl.innerHTML = `<p>${error.message}</p>`;
}

async function initBookViewer() {
  try {
    const chapterFiles = await fetchChapterFileNames();

    const chapterSummaries = await Promise.all(
      chapterFiles.map(async (fileName) => {
        const markdownText = await fetchChapterMarkdown(fileName);
        const chapter = parseChapter(markdownText);
        return { fileName, title: chapter.title };
      })
    );

    chapterSummaries.forEach(({ fileName, title }) => {
      nav.appendChild(createChapterButton(fileName, title));
    });

    if (chapterSummaries.length > 0) {
      await openChapter(chapterSummaries[0].fileName);
    } else {
      titleEl.textContent = "No chapters";
      bodyEl.innerHTML = "<p>Add markdown files to ./chapters.</p>";
    }
  } catch (error) {
    showError(error);
  }
}

initBookViewer();
