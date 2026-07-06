export function registerBookNavigation({ bodyEl, getActiveFileName, openChapter, renderActiveCanvas, showError }) {
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
    const activeFileName = getActiveFileName();
    if (activeFileName) {
      renderActiveCanvas(activeFileName);
    }
  });
}
