const assetBase = "assets/";

const pages = {
  start: {
    title: "The Echoing Thought",
    image: "The Echoing Thought with icons page(1).png",
    width: 1024,
    height: 1536,
    hotspots: [
      {
        label: "Open From Whisper to Echo",
        target: "from-whisper-to-echo",
        x: 10,
        y: 28,
        w: 18,
        h: 13
      },
      {
        label: "Open Repeated Sentence",
        target: "repeated-sentence",
        x: 13,
        y: 50,
        w: 18,
        h: 13
      },
      {
        label: "Open Pattern Trail",
        target: "pattern-trail",
        x: 38,
        y: 62,
        w: 22,
        h: 13
      },
      {
        label: "Open Familiar Loop",
        target: "familiar-loop",
        x: 62,
        y: 58,
        w: 19,
        h: 13
      }

      /*
        Pause Point was intentionally left inactive because you decided
        this section should stay focused on observation, not action.
      */
    ]
  },

  "from-whisper-to-echo": {
    title: "From Whisper to Echo",
    image: "From Whisper to Echo(2).png",
    width: 1024,
    height: 1536,
    hotspots: [
      {
        label: "Back to The Echoing Thought",
        target: "start",
        x: 0,
        y: 0,
        w: 12,
        h: 100
      },
      {
        label: "Next: Repeated Sentence",
        target: "repeated-sentence",
        x: 88,
        y: 0,
        w: 12,
        h: 100
      },
      {
        label: "Open Field Book",
        target: "field-book",
        x: 40,
        y: 75,
        w: 32,
        h: 20
      },
      {
        label: "Familiar",
        target: "field-book",
        x: 28,
        y: 69,
        w: 17,
        h: 5
      },
      {
        label: "New",
        target: "field-book",
        x: 49,
        y: 69,
        w: 16,
        h: 5
      },
      {
        label: "Uncertain",
        target: "field-book",
        x: 70,
        y: 69,
        w: 17,
        h: 5
      }
    ]
  },

  "repeated-sentence": {
    title: "Repeated Sentence",
    image: "Repeated Sentence(2).png",
    width: 1024,
    height: 1536,
    hotspots: [
      {
        label: "Previous: From Whisper to Echo",
        target: "from-whisper-to-echo",
        x: 0,
        y: 0,
        w: 12,
        h: 100
      },
      {
        label: "Next: Pattern Trail",
        target: "pattern-trail",
        x: 88,
        y: 0,
        w: 12,
        h: 100
      },
      {
        label: "Open Field Book",
        target: "field-book",
        x: 40,
        y: 75,
        w: 32,
        h: 20
      }
    ]
  },

  "pattern-trail": {
    title: "Pattern Trail",
    image: "Pattern Trail(1).png",
    width: 1024,
    height: 1536,
    hotspots: [
      {
        label: "Previous: Repeated Sentence",
        target: "repeated-sentence",
        x: 0,
        y: 0,
        w: 12,
        h: 100
      },
      {
        label: "Next: Familiar Loop",
        target: "familiar-loop",
        x: 88,
        y: 0,
        w: 12,
        h: 100
      },
      {
        label: "Open Field Book",
        target: "field-book",
        x: 40,
        y: 77,
        w: 34,
        h: 19
      }
    ]
  },

  "familiar-loop": {
    title: "Familiar Loop",
    image: "Familiar Loop(1).png",
    width: 1024,
    height: 1536,
    hotspots: [
      {
        label: "Previous: Pattern Trail",
        target: "pattern-trail",
        x: 0,
        y: 0,
        w: 12,
        h: 100
      },
      {
        label: "Return to The Echoing Thought",
        target: "start",
        x: 88,
        y: 0,
        w: 12,
        h: 100
      },
      {
        label: "Open Field Book",
        target: "field-book",
        x: 40,
        y: 76,
        w: 34,
        h: 20
      }
    ]
  }
};

const imageStage = document.querySelector("#imageStage");
const pageImage = document.querySelector("#pageImage");
const hotspotLayer = document.querySelector("#hotspotLayer");

let currentPageId = "start";

function goTo(target) {
  if (target === "field-book") {
    window.location.href = "../field-book.html?from=echoing-thought";
    return;
  }

  const pageId = pages[target] ? target : "start";
  currentPageId = pageId;
  renderPage(pageId);
  window.location.hash = pageId === "start" ? "" : pageId;
}

function renderPage(pageId) {
  const page = pages[pageId];

  imageStage.hidden = false;
  document.title = `${page.title} | The Echoing Thought`;
  imageStage.style.setProperty("--image-ratio", page.width / page.height);

  pageImage.src = assetBase + page.image;
  pageImage.alt = page.title;

  hotspotLayer.replaceChildren();

  page.hotspots.forEach((hotspot) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "hotspot";
    button.setAttribute("aria-label", hotspot.label);
    button.title = hotspot.label;

    button.style.left = `${hotspot.x}%`;
    button.style.top = `${hotspot.y}%`;
    button.style.width = `${hotspot.w}%`;
    button.style.height = `${hotspot.h}%`;

    button.addEventListener("click", () => goTo(hotspot.target));
    hotspotLayer.append(button);
  });
}

window.addEventListener("hashchange", () => {
  const pageId = window.location.hash.replace("#", "");

  if (pageId === "field-book") {
    window.location.href = "../field-book.html?from=echoing-thought";
    return;
  }

  goTo(pageId || "start");
});

goTo(window.location.hash.replace("#", "") || "start");
