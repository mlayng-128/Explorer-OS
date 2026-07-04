const locations = [
  "The Whispering Path",
  "The Echo Clearing",
  "The Story Fog",
  "The Watchtower",
  "The Mirror Pond",
  "The Courage Bridge",
  "The Resting Grove"
];

const storageKey = "fearWoodsFieldBookEntries";
const locationButtons = document.querySelector("#locationButtons");
const entryLocation = document.querySelector("#entryLocation");
const entryType = document.querySelector("#entryType");
const entryDate = document.querySelector("#entryDate");
const editor = document.querySelector("#editor");
const writingWrap = document.querySelector(".writing-wrap");
const contextLine = document.querySelector("#contextLine");
const statusMessage = document.querySelector("#statusMessage");
const saveEntry = document.querySelector("#saveEntry");
const newEntry = document.querySelector("#newEntry");
const lookBack = document.querySelector("#lookBack");
const moveForward = document.querySelector("#moveForward");
const returnBook = document.querySelector("#returnBook");
const typeButtons = [...document.querySelectorAll(".type-toggle button")];

let currentId = null;

function today() {
  return new Date().toISOString().slice(0, 10);
}

function readEntries() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}

function writeEntries(entries) {
  localStorage.setItem(storageKey, JSON.stringify(entries));
}

function setStatus(message) {
  statusMessage.textContent = message;
}

function canWrite() {
  return entryLocation.value && entryType.value && entryDate.value;
}

function refreshState() {
  typeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.type === entryType.value);
  });

  [...locationButtons.children].forEach((button) => {
    button.classList.toggle("is-active", button.dataset.location === entryLocation.value);
  });

  const ready = canWrite();
  editor.contentEditable = ready ? "true" : "false";
  writingWrap.dataset.disabled = ready ? "false" : "true";

  if (entryLocation.value) {
    contextLine.textContent = `Location: ${entryLocation.value}`;
  } else {
    contextLine.textContent = "Choose a location to begin";
  }

  if (ready && !editor.textContent.trim()) {
    setStatus("Write or paste your entry, then save it privately on this device.");
  }
}

function chooseLocation(location) {
  entryLocation.value = location;
  if (!entryDate.value) entryDate.value = today();
  refreshState();
  if (!entryType.value) setStatus("Choose Trail Note or Field Note.");
}

function chooseType(type) {
  entryType.value = type;
  if (!entryDate.value) entryDate.value = today();
  refreshState();
  if (canWrite()) editor.focus();
}

function clearEntry(keepContext = true) {
  currentId = null;
  editor.innerHTML = "";
  if (!keepContext) {
    entryLocation.value = "";
    entryType.value = "";
  }
  entryDate.value = today();
  refreshState();
  setStatus("New entry ready.");
}

function loadEntry(entry) {
  currentId = entry.id;
  entryLocation.value = entry.location;
  entryType.value = entry.type;
  entryDate.value = entry.date;
  editor.innerHTML = entry.body;
  refreshState();
  setStatus("Entry opened.");
}

function matchingEntries() {
  return readEntries()
    .filter((entry) => entry.location === entryLocation.value)
    .sort((a, b) => `${a.date}-${a.createdAt}`.localeCompare(`${b.date}-${b.createdAt}`));
}

function currentIndex(entries) {
  return entries.findIndex((entry) => entry.id === currentId);
}

function move(direction) {
  if (!entryLocation.value) {
    setStatus("Choose a location first.");
    return;
  }

  const entries = matchingEntries();
  if (!entries.length) {
    clearEntry(true);
    setStatus("No saved entries for this location yet. A blank entry is ready.");
    return;
  }

  const index = currentIndex(entries);
  const nextIndex = index === -1 ? (direction > 0 ? 0 : entries.length - 1) : index + direction;

  if (nextIndex < 0) {
    loadEntry(entries[0]);
    setStatus("This is the first saved entry for this location.");
    return;
  }

  if (nextIndex >= entries.length) {
    clearEntry(true);
    setStatus("No next entry yet. A blank new entry is ready.");
    return;
  }

  loadEntry(entries[nextIndex]);
}

locations.forEach((location) => {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.location = location;
  button.textContent = location;
  button.addEventListener("click", () => chooseLocation(location));
  locationButtons.append(button);

  const option = document.createElement("option");
  option.value = location;
  option.textContent = location;
  entryLocation.append(option);
});

entryLocation.insertAdjacentHTML("afterbegin", '<option value="">Choose location</option>');
entryDate.value = today();

entryLocation.addEventListener("change", () => chooseLocation(entryLocation.value));
entryType.addEventListener("change", () => chooseType(entryType.value));
entryDate.addEventListener("change", refreshState);

typeButtons.forEach((button) => {
  button.addEventListener("click", () => chooseType(button.dataset.type));
});

document.querySelectorAll("[data-command]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!canWrite()) return;
    if (button.dataset.command === "createLink") {
      const url = window.prompt("Paste the link URL");
      if (!url) return;
      document.execCommand("createLink", false, url);
      return;
    }
    document.execCommand(button.dataset.command, false, null);
    editor.focus();
  });
});

saveEntry.addEventListener("click", () => {
  if (!canWrite()) {
    setStatus("Choose Location, Entry Type, and Date before saving.");
    return;
  }

  const entries = readEntries();
  const now = new Date().toISOString();
  const entry = {
    id: currentId || `entry-${Date.now()}`,
    location: entryLocation.value,
    type: entryType.value,
    date: entryDate.value,
    body: editor.innerHTML,
    createdAt: currentId ? entries.find((item) => item.id === currentId)?.createdAt || now : now,
    updatedAt: now
  };

  const index = entries.findIndex((item) => item.id === entry.id);
  if (index >= 0) entries[index] = entry;
  else entries.push(entry);
  writeEntries(entries);
  currentId = entry.id;
  setStatus("Entry saved privately on this device.");
});

newEntry.addEventListener("click", () => clearEntry(true));
lookBack.addEventListener("click", () => move(-1));
moveForward.addEventListener("click", () => move(1));
returnBook.addEventListener("click", () => {
  if (history.length > 1) history.back();
  else location.href = "fear-woods-overview.html";
});

refreshState();
