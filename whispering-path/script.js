const assetBase = "assets/";

const pages = {
  start: {
    title: "The Whispering Path",
    image: "The Whispering Path starter page.png",
    width: 1448,
    height: 1086,
    hotspots: [
      { label: "Open Lantern 1: The First Whisper", target: "first-whisper", x: 5.5, y: 47.5, w: 8.5, h: 20 },
      { label: "Open Lantern 2: Body Signal Check", target: "body-signal-check", x: 32, y: 52.5, w: 8, h: 15.5 },
      { label: "Open Life Situations", target: "life-situations", x: 36.8, y: 43, w: 7.5, h: 13.5 },
      { label: "Open Explorer Stories Part 1", target: "explorer-stories-1", x: 40, y: 31.5, w: 6.5, h: 11.5 }
    ]
  },
  "first-whisper": {
    title: "Lantern 1: The First Whisper",
    image: "The First Whisper page.png",
    width: 1122,
    height: 1402,
    hotspots: [
      { label: "Open Thought Whisper Examples", target: "thought-whisper-examples", x: 39.5, y: 3, w: 21, h: 17 },
      { label: "Open Field Book", target: "field-book", x: 40, y: 75, w: 32, h: 19 }
    ]
  },
  "thought-whisper-examples": {
    title: "Thought Whisper Examples",
    image: "Thought Whisper Examples page.png",
    width: 1086,
    height: 1448,
    hotspots: [
      { label: "Open Field Book", target: "field-book", x: 41, y: 74, w: 33, h: 20 }
    ]
  },
  "body-signal-check": {
    title: "Lantern 2: Body Signal Check",
    image: "Body Signals Check page.png",
    width: 1122,
    height: 1402,
    hotspots: [
      { label: "Open Field Book", target: "field-book", x: 44, y: 75, w: 31, h: 18.5 }
    ]
  },
  "life-situations": {
    title: "Life Situations",
    image: "Life Situations icon page.png",
    width: 1086,
    height: 1448,
    hotspots: [
      { label: "Open Academic Life", target: "academic-life", x: 25, y: 27.5, w: 23, h: 16 },
      { label: "Open Social Belonging", target: "social-belonging", x: 58, y: 27, w: 23, h: 16 },
      { label: "Open Relationships and Conflict", target: "relationships-conflict", x: 24, y: 45, w: 24, h: 16 },
      { label: "Open Family, Home, and Expectations", target: "family-home-expectations", x: 58, y: 45, w: 23, h: 16 },
      { label: "Open Future, Identity, and Direction", target: "future-identity-direction", x: 24, y: 62.5, w: 24, h: 16 },
      { label: "Open Daily Life and Self-Management", target: "daily-life-self-management", x: 58, y: 62.5, w: 23, h: 16 },
      { label: "Open Health, Well-Being, and Inner Life", target: "health-well-being", x: 24, y: 80, w: 24, h: 16 },
      { label: "Open Work, Money, and Responsibility", target: "work-money-responsibility", x: 58, y: 80, w: 23, h: 16 }
    ]
  },
  "explorer-stories-1": {
    title: "Explorer Stories Part 1",
    image: "Explorer Stories Part 1 page.png",
    width: 1086,
    height: 1448,
    hotspots: [
      { label: "Open Field Book", target: "field-book", x: 49, y: 75, w: 30, h: 20 }
    ]
  },
  "academic-life": lifeSituationPage("Academic Life", "academic_life_a_journey_through_fear.png"),
  "social-belonging": lifeSituationPage("Social Belonging", "social_belonging_guidebook_illustration.png"),
  "relationships-conflict": lifeSituationPage("Relationships and Conflict", "relationships_and_conflict_guide.png"),
  "family-home-expectations": lifeSituationPage("Family, Home, and Expectations", "family_home_and_the_weight_of_expectations.png"),
  "future-identity-direction": lifeSituationPage("Future, Identity, and Direction", "future_identity_and_direction_guide.png"),
  "daily-life-self-management": lifeSituationPage("Daily Life and Self-Management", "everyday_moments_of_quiet_fear.png"),
  "health-well-being": lifeSituationPage("Health, Well-Being, and Inner Life", "health_well_being_and_inner_life_guide.png"),
  "work-money-responsibility": lifeSituationPage("Work, Money, and Responsibility", "work_money_and_responsibility_field_guide.png")
};

const imageStage = document.querySelector("#imageStage");
const pageImage = document.querySelector("#pageImage");
const hotspotLayer = document.querySelector("#hotspotLayer");

let currentPageId = "start";

function lifeSituationPage(title, image) {
  return {
    title,
    image: `life_situation_pages/${image}`,
    width: 1086,
    height: 1448,
    hotspots: [
      { label: "Open Field Book", target: "field-book", x: 38, y: 73, w: 34, h: 22 }
    ]
  };
}

function goTo(target) {
  if (target === "field-book") {
    window.location.href = "../field-book.html?from=whispering-path";
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
  document.title = `${page.title} | The Whispering Path`;
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
    window.location.href = "../field-book.html?from=whispering-path";
    return;
  }
  goTo(pageId || "start");
});

goTo(window.location.hash.replace("#", "") || "start");
