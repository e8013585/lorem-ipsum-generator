"use strict";

const LOREM_WORDS = [
  "lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit",
  "sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore",
  "magna","aliqua","enim","ad","minim","veniam","quis","nostrud",
  "exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo",
  "consequat","duis","aute","irure","in","reprehenderit","voluptate","velit",
  "esse","cillum","eu","fugiat","nulla","pariatur","excepteur","sint",
  "occaecat","cupidatat","non","proident","sunt","culpa","qui","officia",
  "deserunt","mollit","anim","id","est","laborum","pellentesque","habitant",
  "morbi","tristique","senectus","netus","malesuada","fames","turpis",
  "egestas","venenatis","cras","felis","eget","velit","aliquet",
  "sagittis","id","consectetur","purus","ut","faucibus","pulvinar",
  "elementum","integer","enim","neque","volutpat","ac","tincidunt","vitae",
  "semper","quis","lectus","nulla","at","volutpat","diam","ut",
  "tellus","in","hac","habitasse","platea","dictumst","vestibulum","rhoncus",
  "est","ullamcorper","dignissim","cras","tincidunt",
  "lobortis","feugiat","vivamus","at","augue","eget","arcu","dictum","varius",
  "duis","at","consectetur","lorem","donec","massa","sapien","faucibus","et",
  "molestie","ac","feugiat","sed","lectus","vestibulum","mattis",
  "velit","morbi","tincidunt","ornare","massa","eget",
  "egestas","purus","viverra","accumsan","in","nisl","nisi","scelerisque",
  "eu","ultrices","vitae","auctor","eu","augue","ut","lectus","arcu","bibendum",
  "at","varius","vel","pharetra","vel","turpis","nunc","eget","lorem","dolor",
  "sed","viverra","ipsum","nunc","aliquet","bibendum","enim","facilisis",
  "gravida","neque","convallis","a","cras","semper","auctor","neque","vitae",
  "tempus","quam","pellentesque","nec","nam","aliquam","sem","et","tortor",
  "consequat","id","porta","nibh","venenatis","cras","sed","felis","eget",
  "velit","aliquet","sagittis","id","consectetur","nullam","vehicula","ipsum",
  "a","arcu","cursus","vitae","congue","mauris","rhoncus","aenean","vel",
  "elit","scelerisque","mauris","pellentesque","pulvinar","pellentesque",
  "habitant","morbi","tristique","faucibus","nisl","tincidunt","eget","nullam",
  "non","nisi","est","sit","amet","facilisis","magna","etiam","tempor",
  "orci","eu","lobortis","elementum","nibh","tellus","molestie","nunc","non",
  "blandit","massa","enim","nec","dui","nunc","mattis","enim","ut","tellus",
  "elementum","sagittis","vitae","et","leo","duis","ut","diam","quam","nulla",
  "porttitor","massa","id","neque","aliquam","vestibulum","morbi","blandit",
  "cursus","risus","at","ultrices","mi","tempus","imperdiet","nulla",
  "malesuada","pellentesque","elit","congue","interdum",
  "varius","enim","at","elementum","ultrices",
  "sodales","neque","sodales","ut","etiam","sit","amet","nibh","viverra",
  "ipsum","nunc","aliquet","bibendum","enim","facilisis"
];

const PUNCT = [".", ".", ".", "?", "!"];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[rand(0, arr.length - 1)];
}

function pickWords(count) {
  const words = [];
  for (let i = 0; i < count; i++) words.push(pick(LOREM_WORDS));
  return words;
}

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function sentence(wMin, wMax) {
  const words = pickWords(rand(wMin || 5, wMax || 14));
  words[0] = cap(words[0]);
  return words.join(" ") + pick(PUNCT);
}

function paragraph(sMin, sMax) {
  const n = rand(sMin || 3, sMax || 7);
  const out = [];
  for (let i = 0; i < n; i++) out.push(sentence());
  return out.join(" ");
}

function genParagraphs(n) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(paragraph());
  return out.join("\n\n");
}

function genWords(n) {
  const words = pickWords(n);
  if (!words.length) return "";
  words[0] = cap(words[0]);
  let text = words.join(" ");
  if (!".?!".includes(text[text.length - 1])) text += ".";
  return text;
}

function genBytes(target) {
  const enc = (s) => new TextEncoder().encode(s).length;
  let result = "";
  for (;;) {
    const p = paragraph();
    const sep = result ? "\n\n" : "";
    if (enc(result + sep + p) > target) {
      const words = p.split(" ");
      let partial = "";
      for (const w of words) {
        const cand = partial ? partial + " " + w : w;
        if (enc((result ? result + "\n\n" : "") + cand) > target) break;
        partial = cand;
      }
      if (partial) result = result ? result + "\n\n" + partial : partial;
      break;
    }
    result = result ? result + "\n\n" + p : p;
  }
  return result;
}

function genLists(n) {
  const starters = [
    "Lorem ipsum dolor sit amet",
    "Consectetur adipiscing elit",
    "Sed do eiusmod tempor incididunt",
    "Ut labore et dolore magna aliqua",
    "Ut enim ad minim veniam",
    "Duis aute irure dolor in reprehenderit",
    "Excepteur sint occaecat cupidatat non",
    "Nemo enim ipsam voluptatem quia",
    "Quis autem vel eum iure",
    "At vero eos et accusamus",
    "Nam libero tempore cum soluta",
    "Temporibus autem quibusdam et"
  ];
  const items = [];
  for (let i = 0; i < n; i++) {
    const s = pick(starters);
    const end = pickWords(rand(2, 5)).join(" ");
    items.push("• " + s + " " + end + pick([".", "…", ""]));
  }
  return items.join("\n");
}

function getStats(text, mode) {
  if (!text) return "";
  const words = text.split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  const bytes = new TextEncoder().encode(text).length;
  const lines = text.split("\n").filter(Boolean).length;
  const parts = [`${words}w`, `${chars}c`, `${bytes}B`];
  if (mode === "paragraphs") parts.push(`${lines}¶`);
  return parts.join(" · ");
}

const UNIT = {
  paragraphs: chrome.i18n.getMessage("unitParagraphs"),
  words: chrome.i18n.getMessage("unitWords"),
  bytes: chrome.i18n.getMessage("unitBytes"),
  lists: chrome.i18n.getMessage("unitItems")
};

const state = { mode: "paragraphs", quantity: 3, output: "" };

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const tabs = $$(".tab");
const qtyInp = $("#quantity-input");
const qtyDec = $("#qty-dec");
const qtyInc = $("#qty-inc");
const unitLabel = $("#quantity-unit");
const genBtn = $("#btn-generate");
const output = $("#output-area");
const stats = $("#output-stats");
const copyBtn = $("#btn-copy");
const copyIcon = copyBtn?.querySelector(".icon-copy");
const checkIcon = copyBtn?.querySelector(".icon-check");
const copyLabel = copyBtn?.querySelector(".copy-label");

function setMode(mode) {
  state.mode = mode;
  tabs.forEach((t) => {
    const act = t.dataset.mode === mode;
    t.classList.toggle("active", act);
    t.setAttribute("aria-selected", act);
  });
  unitLabel.textContent = UNIT[mode];
  qtyInp.max = mode === "bytes" ? "999999" : "9999";
  state.quantity = clamp(state.quantity);
  qtyInp.value = state.quantity;
  copyBtn.disabled = true;
}

tabs.forEach((t) => t.addEventListener("click", () => { setMode(t.dataset.mode); saveState(); }));

function clamp(v) {
  const mx = state.mode === "bytes" ? 999999 : 9999;
  return Math.min(mx, Math.max(1, v));
}

function setQty(v) {
  state.quantity = clamp(v);
  qtyInp.value = state.quantity;
}

qtyDec.addEventListener("click", () => setQty(state.quantity - 1));
qtyInc.addEventListener("click", () => setQty(state.quantity + 1));
qtyInp.addEventListener("input", () => {
  const v = parseInt(qtyInp.value, 10);
  if (!isNaN(v)) { state.quantity = clamp(v); qtyInp.value = state.quantity; }
});
qtyInp.addEventListener("blur", () => {
  if (!qtyInp.value || isNaN(parseInt(qtyInp.value, 10))) setQty(1);
});

let copyTimer = null;

function showCopied() {
  clearTimeout(copyTimer);
  copyBtn.classList.add("copied");
  copyIcon?.classList.add("hidden");
  checkIcon?.classList.remove("hidden");
  if (copyLabel) copyLabel.textContent = chrome.i18n.getMessage("copyConfirmation");
  copyTimer = setTimeout(() => {
    copyBtn.classList.remove("copied");
    copyIcon?.classList.remove("hidden");
    checkIcon?.classList.add("hidden");
    if (copyLabel) copyLabel.textContent = chrome.i18n.getMessage("btnCopy");
    copyTimer = null;
  }, 2000);
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    showCopied();
  } catch {
    /* unable to copy */
  }
  document.body.removeChild(ta);
}

copyBtn.addEventListener("click", async () => {
  if (!state.output) return;
  try {
    await navigator.clipboard.writeText(state.output);
    showCopied();
  } catch {
    fallbackCopy(state.output);
  }
});

function generate() {
  const { mode, quantity } = state;
  let text = "";
  switch (mode) {
    case "paragraphs": text = genParagraphs(quantity); break;
    case "words":      text = genWords(quantity); break;
    case "bytes":      text = genBytes(quantity); break;
    case "lists":      text = genLists(quantity); break;
  }
  state.output = text;
  output.classList.remove("has-content");
  void output.offsetWidth;
  output.value = text;
  output.classList.add("has-content");
  stats.textContent = getStats(text, mode);
  copyBtn.disabled = !text.length;
}

genBtn.addEventListener("click", generate);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.ctrlKey) generate();
  if (e.key === "c" && e.ctrlKey && e.shiftKey && state.output) { e.preventDefault(); copyBtn.click(); }
});

const SK = "loremState";
async function saveState() {
  try { await chrome.storage.local.set({ [SK]: { mode: state.mode, quantity: state.quantity } }); } catch {}
}
async function loadState() {
  try {
    const d = await chrome.storage.local.get(SK);
    const s = d[SK];
    if (s) {
      if (s.mode) setMode(s.mode);
      if (s.quantity != null) setQty(s.quantity);
    }
  } catch {}
}

function localizeUI() {
  const msg = (k) => chrome.i18n.getMessage(k);
  document.title = msg("appTitle") + " " + msg("appSubtitle");
  $(".title").textContent = msg("appTitle");
  $(".subtitle").textContent = msg("appSubtitle");
  tabs.forEach((t) => {
    const mode = t.dataset.mode;
    const key = "tab" + mode.charAt(0).toUpperCase() + mode.slice(1);
    const svg = t.querySelector("svg");
    if (svg) {
      const svgHTML = svg.outerHTML;
      t.innerHTML = svgHTML + " " + msg(key);
    } else {
      t.textContent = msg(key);
    }
    t.title = msg(key + "Title");
  });
  $(".quantity-label").textContent = msg("quantityLabel");
  qtyDec.setAttribute("aria-label", msg("qtyDecrease"));
  qtyInc.setAttribute("aria-label", msg("qtyIncrease"));
  qtyInp.setAttribute("aria-label", msg("quantityAria"));
  unitLabel.textContent = UNIT[state.mode];
  const genSvg = genBtn.querySelector("svg");
  if (genSvg) {
    const svgHTML = genSvg.outerHTML;
    genBtn.innerHTML = svgHTML + " " + msg("btnGenerate");
  } else {
    genBtn.textContent = msg("btnGenerate");
  }
  copyBtn.setAttribute("aria-label", msg("btnCopyAria"));
  copyLabel.textContent = msg("btnCopy");
  output.setAttribute("placeholder", msg("outputPlaceholder"));
  output.setAttribute("aria-label", msg("outputAria"));
}

(async function init() {
  localizeUI();
  await loadState();
  generate();
})();