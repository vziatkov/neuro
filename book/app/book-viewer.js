import { registerBookNavigation } from "./navigation.js";

const nav = document.getElementById("chapters-nav");
const titleEl = document.getElementById("chapter-title");
const subjectEl = document.getElementById("chapter-subject");
const bodyEl = document.getElementById("chapter-body");

let activeFileName = "";
let renderCanvasExample = () => {};

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

async function loadChapter(fileName) {
  const markdownText = await fetchChapterMarkdown(fileName);
  return parseChapter(markdownText);
}

function getMoodFileName(fileName) {
  return fileName.replace(/\.md$/i, ".mood.md");
}

function linkMoodReferences(markdownText, fileName) {
  if (fileName.includes(".mood.")) {
    return markdownText;
  }

  return markdownText.replace(/\[([A-Z]+\d+)\](?!\()/g, (_match, referenceId) => {
    const moodFileName = getMoodFileName(fileName);
    return `[${referenceId}](?chapter=${encodeURIComponent(moodFileName)}#${encodeURIComponent(referenceId)})`;
  });
}

function slugifyHeading(text) {
  return text
    .replace(/^\[|\]$/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

function applyHeadingAnchors() {
  bodyEl.querySelectorAll("h2, h3").forEach((heading) => {
    const id = slugifyHeading(heading.textContent || "");
    if (id) {
      heading.id = id;
    }
  });
}

function scrollToHash() {
  const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (!id) {
    return;
  }

  document.getElementById(slugifyHeading(id))?.scrollIntoView({ block: "start" });
}

function renderChapter(chapter, fileName) {
  titleEl.textContent = chapter.title;
  subjectEl.textContent = chapter.subject;
  bodyEl.innerHTML = marked.parse(linkMoodReferences(chapter.bodyMarkdown, fileName));
  applyHeadingAnchors();
  renderCanvasExample(fileName);
}

function setActiveButton(fileName) {
  const buttons = nav.querySelectorAll(".chapter-link");
  buttons.forEach((button) => {
    const isActive = button.dataset.fileName === fileName;
    button.classList.toggle("active", isActive);
  });
}

function syncChapterUrl(fileName, options = {}) {
  if (options.updateUrl === false) {
    return;
  }

  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set("chapter", fileName);
  nextUrl.hash = options.hash || "";
  window.history.pushState({ fileName }, "", nextUrl);
}

async function openChapter(fileName, options = {}) {
  const chapter = await loadChapter(fileName);
  activeFileName = fileName;
  renderChapter(chapter, fileName);
  setActiveButton(fileName);
  syncChapterUrl(fileName, options);
  scrollToHash();
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

async function createChapterSummaries(chapterFiles) {
  return Promise.all(
    chapterFiles.map(async (fileName) => {
      const chapter = await loadChapter(fileName);
      return { fileName, title: chapter.title };
    }),
  );
}

export async function initBookViewer(options = {}) {
  renderCanvasExample = options.renderCanvasExample || renderCanvasExample;

  registerBookNavigation({
    bodyEl,
    getActiveFileName: () => activeFileName,
    openChapter,
    renderActiveCanvas: renderCanvasExample,
    showError,
  });

  try {
    const chapterFiles = await fetchChapterFileNames();
    const chapterSummaries = await createChapterSummaries(chapterFiles);

    chapterSummaries.forEach(({ fileName, title }) => {
      nav.appendChild(createChapterButton(fileName, title));
    });

    const requestedChapter = new URLSearchParams(window.location.search).get("chapter");
    const initialChapter = requestedChapter || chapterSummaries[0]?.fileName;

    if (initialChapter) {
      await openChapter(initialChapter, { updateUrl: false });
    } else {
      titleEl.textContent = "No chapters";
      bodyEl.innerHTML = "<p>Add markdown files to ./chapters.</p>";
    }
  } catch (error) {
    showError(error);
  }
}
