import { createMarkdownViewer } from "../viewer/markdown-viewer.js";

const nav = document.getElementById("chapters-nav");
const titleEl = document.getElementById("chapter-title");
const subjectEl = document.getElementById("chapter-subject");
const bodyEl = document.getElementById("chapter-body");

export async function initBookViewer(options = {}) {
  const viewer = createMarkdownViewer({
    navEl: nav,
    titleEl,
    subjectEl,
    bodyEl,
    chaptersUrl: "./chapters/chapters.json",
    chapterBaseUrl: "./chapters/",
    onChapterRender: options.renderCanvasExample,
  });

  await viewer.init();
}
