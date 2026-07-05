const nav = document.getElementById("chapters-nav");
const titleEl = document.getElementById("chapter-title");
const subjectEl = document.getElementById("chapter-subject");
const bodyEl = document.getElementById("chapter-body");
const canvas = document.getElementById("chapter-canvas");
const canvasTitleEl = document.getElementById("canvas-example-title");
let activeFileName = "";

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

function setupCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);

  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width: rect.width, height: rect.height };
}

function clearCanvas(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#17120f";
  ctx.fillRect(0, 0, width, height);
}

function drawGrid(ctx, width, height, step = 40) {
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  ctx.lineWidth = 1;

  for (let x = 0; x <= width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.restore();
}

function drawLabel(ctx, text, x, y, color = "#f5efe7") {
  ctx.fillStyle = color;
  ctx.font = "12px Inter, system-ui, sans-serif";
  ctx.fillText(text, x, y);
}

function drawCoordinateExample(ctx, width, height) {
  clearCanvas(ctx, width, height);
  drawGrid(ctx, width, height);

  const origin = { x: width * 0.5, y: height * 0.58 };
  ctx.strokeStyle = "#f27d26";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(32, origin.y);
  ctx.lineTo(width - 32, origin.y);
  ctx.moveTo(origin.x, height - 28);
  ctx.lineTo(origin.x, 28);
  ctx.stroke();

  ctx.fillStyle = "#63ff9b";
  ctx.beginPath();
  ctx.arc(origin.x + 110, origin.y - 72, 6, 0, Math.PI * 2);
  ctx.fill();

  drawLabel(ctx, "screen y grows down", 34, 34, "#8f8075");
  drawLabel(ctx, "world point (x: 110, y: 72)", origin.x + 122, origin.y - 78, "#63ff9b");
}

function drawPrimitiveExample(ctx, width, height) {
  clearCanvas(ctx, width, height);
  drawGrid(ctx, width, height, 36);

  ctx.strokeStyle = "#63ff9b";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width * 0.16, height * 0.72);
  ctx.lineTo(width * 0.42, height * 0.26);
  ctx.stroke();

  ctx.fillStyle = "rgba(242, 125, 38, 0.22)";
  ctx.strokeStyle = "#f27d26";
  ctx.lineWidth = 2;
  ctx.fillRect(width * 0.5, height * 0.32, width * 0.24, height * 0.28);
  ctx.strokeRect(width * 0.5, height * 0.32, width * 0.24, height * 0.28);

  ctx.fillStyle = "rgba(255, 220, 120, 0.2)";
  ctx.strokeStyle = "#ffd27a";
  ctx.beginPath();
  ctx.moveTo(width * 0.76, height * 0.72);
  ctx.lineTo(width * 0.86, height * 0.36);
  ctx.lineTo(width * 0.94, height * 0.72);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  drawLabel(ctx, "line", width * 0.16, height * 0.76, "#63ff9b");
  drawLabel(ctx, "rect", width * 0.5, height * 0.28, "#f27d26");
  drawLabel(ctx, "triangle", width * 0.8, height * 0.78, "#ffd27a");
}

function drawCandlesExample(ctx, width, height) {
  clearCanvas(ctx, width, height);
  drawGrid(ctx, width, height, 38);

  const candles = [
    [102, 109, 99, 107],
    [107, 111, 104, 105],
    [105, 114, 103, 112],
    [112, 116, 108, 110],
    [110, 118, 109, 117],
    [117, 121, 113, 115],
    [115, 119, 111, 112],
    [112, 116, 107, 109],
    [109, 113, 105, 111],
    [111, 120, 110, 119],
    [119, 124, 116, 122],
    [122, 126, 118, 120],
  ];

  const padding = { left: 46, right: 54, top: 30, bottom: 38 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const minPrice = Math.min(...candles.map(([, , low]) => low));
  const maxPrice = Math.max(...candles.map(([, high]) => high));
  const priceToY = (price) =>
    padding.top + ((maxPrice - price) / (maxPrice - minPrice)) * chartHeight;

  ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
  ctx.strokeRect(padding.left, padding.top, chartWidth, chartHeight);

  candles.forEach(([open, high, low, close], index) => {
    const slot = chartWidth / candles.length;
    const x = padding.left + slot * index + slot * 0.5;
    const bodyWidth = Math.max(8, slot * 0.52);
    const up = close >= open;
    const color = up ? "#63ff9b" : "#ff5c5c";
    const yOpen = priceToY(open);
    const yClose = priceToY(close);
    const yHigh = priceToY(high);
    const yLow = priceToY(low);
    const bodyTop = Math.min(yOpen, yClose);
    const bodyHeight = Math.max(2, Math.abs(yClose - yOpen));

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, yHigh);
    ctx.lineTo(x, yLow);
    ctx.stroke();

    ctx.fillStyle = up ? "rgba(99, 255, 155, 0.24)" : "rgba(255, 92, 92, 0.24)";
    ctx.strokeStyle = color;
    ctx.fillRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyHeight);
    ctx.strokeRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyHeight);
  });

  drawLabel(ctx, `high ${maxPrice}`, width - padding.right + 10, priceToY(maxPrice) + 4, "#8f8075");
  drawLabel(ctx, `low ${minPrice}`, width - padding.right + 10, priceToY(minPrice), "#8f8075");
  drawLabel(ctx, "OHLC -> screen coordinates -> wick + body", padding.left, height - 14, "#f5efe7");
}

function renderCanvasExample(fileName) {
  const { ctx, width, height } = setupCanvas();
  activeFileName = fileName;

  if (fileName === "chapter-03.md") {
    canvasTitleEl.textContent = "Exercise 03: Candlestick chart";
    drawCandlesExample(ctx, width, height);
    return;
  }

  if (fileName === "chapter-02.md") {
    canvasTitleEl.textContent = "Exercise 02: Lines, rects, triangles";
    drawPrimitiveExample(ctx, width, height);
    return;
  }

  if (fileName === "chapter-01.md") {
    canvasTitleEl.textContent = "Exercise 01: Coordinate system";
    drawCoordinateExample(ctx, width, height);
    return;
  }

  canvasTitleEl.textContent = "Deep notes";
  clearCanvas(ctx, width, height);
  drawLabel(ctx, "No canvas exercise for this note yet.", 28, 38, "#8f8075");
}

function renderChapter(chapter, fileName) {
  titleEl.textContent = chapter.title;
  subjectEl.textContent = chapter.subject;
  bodyEl.innerHTML = marked.parse(linkMoodReferences(chapter.bodyMarkdown, fileName));
  applyHeadingAnchors();
  renderCanvasExample(fileName);
}

function setActiveButton(activeFileName) {
  const buttons = nav.querySelectorAll(".chapter-link");
  buttons.forEach((button) => {
    const isActive = button.dataset.fileName === activeFileName;
    button.classList.toggle("active", isActive);
  });
}

async function openChapter(fileName, options = {}) {
  const markdownText = await fetchChapterMarkdown(fileName);
  const chapter = parseChapter(markdownText);
  renderChapter(chapter, fileName);
  setActiveButton(fileName);

  if (options.updateUrl !== false) {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("chapter", fileName);
    nextUrl.hash = options.hash || "";
    window.history.pushState({ fileName }, "", nextUrl);
  }

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

bodyEl.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const link = event.target.closest("a");
  if (!link) {
    return;
  }

  const url = new URL(link.href);
  const chapterFileName = url.searchParams.get("chapter");
  if (!chapterFileName) {
    return;
  }

  event.preventDefault();
  openChapter(chapterFileName, { hash: url.hash }).catch(showError);
});

window.addEventListener("popstate", () => {
  const chapterFileName = new URLSearchParams(window.location.search).get("chapter");
  if (chapterFileName) {
    openChapter(chapterFileName, { updateUrl: false }).catch(showError);
  }
});

window.addEventListener("resize", () => {
  if (activeFileName) {
    renderCanvasExample(activeFileName);
  }
});

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

initBookViewer();
