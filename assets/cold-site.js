const STORAGE_KEY = "tal-colds-site-v2";

const symptoms = [
  { id: "throat", label: "Sore throat" },
  { id: "nose", label: "Runny or stuffy nose" },
  { id: "cough", label: "Cough" },
  { id: "fever", label: "Fever or aches" },
  { id: "sleep", label: "Bad sleep" },
  { id: "energy", label: "Low energy" },
];

const phases = [
  {
    day: -2,
    name: "Quiet incubation",
    short: "Probably nothing yet",
    severity: 8,
    contagion: "Possible",
    symptoms: ["No obvious symptoms", "Maybe a faint tired feeling", "Normal-looking life"],
    notes: "This is the sneaky part. If there was an exposure, symptoms may not have shown up yet.",
    adult: ["Sleep, fluids, and hand washing are the whole plan.", "No cold medicine is usually useful before symptoms."],
    kid: ["Keep normal routines, wash hands, and watch for symptoms.", "No cough or cold medicine is useful before symptoms."],
  },
  {
    day: -1,
    name: "Something maybe?",
    short: "A tiny wobble",
    severity: 15,
    contagion: "Rising",
    symptoms: ["A little tired", "Maybe dry throat", "Maybe absolutely nothing"],
    notes: "Some colds announce themselves politely. Some walk in carrying drums.",
    adult: ["Prioritize sleep and hydration.", "Consider zinc only if you already tolerate it and can start early."],
    kid: ["Fluids and rest are enough here.", "Avoid pre-treating with medicines just in case."],
  },
  {
    day: 0,
    name: "Scratchy throat day",
    short: "The first real sign",
    severity: 30,
    contagion: "High",
    symptoms: ["Scratchy or sore throat", "Mild fatigue", "Maybe sneezing"],
    notes: "For this site, Day 0 is the day the sore throat started. Everything else maps from there.",
    adult: ["Warm liquids, lozenges, honey, or acetaminophen/ibuprofen if sore.", "Check labels so you do not double up on acetaminophen."],
    kid: ["Warm liquids and rest can help.", "Honey can help cough only for kids over 1 year old; ask about dosing for pain medicine."],
  },
  {
    day: 1,
    name: "Throat plus nose",
    short: "The cold is logging in",
    severity: 42,
    contagion: "Peak",
    symptoms: ["Sore throat", "Sneezing", "Runny nose", "Tiredness"],
    notes: "This is often when it becomes clear it is not just dry air or bad vibes.",
    adult: ["Saline spray or rinse can help nasal symptoms.", "Acetaminophen or ibuprofen can help fever, aches, or throat pain."],
    kid: ["Saline drops or spray can help stuffiness.", "Use children's acetaminophen or ibuprofen only as directed; ibuprofen is generally for 6 months and older."],
  },
  {
    day: 2,
    name: "Peak begins",
    short: "Nose takes the wheel",
    severity: 70,
    contagion: "Peak",
    symptoms: ["Runny nose", "Congestion", "Sneezing", "Cough may start"],
    notes: "CDC notes cold symptoms often peak around days 2 to 3 after infection.",
    adult: ["Pseudoephedrine may help congestion if it is safe for you.", "Dextromethorphan may help a dry cough; guaifenesin may help loosen mucus."],
    kid: ["Fluids, saline, and humidified air are the safest basics.", "OTC cough/cold medicines are not recommended under 4; ages 4 to 6 should use only if a doctor says so."],
  },
  {
    day: 3,
    name: "Peak nonsense",
    short: "Maximum tissues",
    severity: 92,
    contagion: "High",
    symptoms: ["Congestion", "Runny nose", "Cough", "Low-grade fever or aches"],
    notes: "The goal is comfort and sleep. The cold is viral, so antibiotics do not help a routine cold.",
    adult: ["Pain relievers for fever/aches; saline, steam, or humidifier for congestion.", "Avoid taking multiple combo products with the same active ingredient."],
    kid: ["Fever or pain medicine can help when used carefully by weight/label.", "Avoid adult medicines, aspirin, and duplicate ingredients."],
  },
  {
    day: 4,
    name: "Still loud",
    short: "Cough moves in",
    severity: 85,
    contagion: "Moderate",
    symptoms: ["Congestion", "Cough", "Post-nasal drip", "Tiredness"],
    notes: "This is a good day for low expectations and high-quality soup.",
    adult: ["Honey or lozenges can soothe cough/throat.", "Guaifenesin plus fluids may help if mucus feels stuck."],
    kid: ["Honey may help nighttime cough for kids over 1.", "Cough drops are a choking risk for younger kids; follow pediatric guidance."],
  },
  {
    day: 5,
    name: "Turning the corner",
    short: "Less intense, still annoying",
    severity: 62,
    contagion: "Moderate",
    symptoms: ["Cough", "Congestion", "Hoarse voice", "Better energy"],
    notes: "If things are easing, that is the pattern you want. If fever or breathing issues show up, pay attention.",
    adult: ["Keep treating the symptom that bothers you most.", "Stop medicines you do not need anymore."],
    kid: ["Keep fluids going and use medicine only for uncomfortable symptoms.", "Call a clinician if breathing, dehydration, or fever concerns show up."],
  },
  {
    day: 6,
    name: "The fake ending",
    short: "Almost better-ish",
    severity: 48,
    contagion: "Lower",
    symptoms: ["Lingering cough", "Less congestion", "Tired at weird times"],
    notes: "The cold may feel mostly done, then remind you it has a small unfinished agenda.",
    adult: ["Sleep, fluids, and patience are doing more than it feels like.", "Consider a cough suppressant only if cough is keeping you from sleeping."],
    kid: ["Humidifier, saline, and honey over age 1 can be useful.", "Avoid unnecessary multi-symptom products."],
  },
  {
    day: 7,
    name: "One-week checkpoint",
    short: "The song was right",
    severity: 35,
    contagion: "Lower",
    symptoms: ["Mild cough", "Residual stuffiness", "Energy returning"],
    notes: "Many colds are mostly better by around a week, though cough can hang around longer.",
    adult: ["Back off meds as symptoms fade.", "If you are worsening instead of improving, reassess."],
    kid: ["Keep it simple unless symptoms are interfering with sleep or drinking.", "Consider checking in if symptoms are not improving."],
  },
  {
    day: 8,
    name: "Cleanup crew",
    short: "Mostly normal",
    severity: 22,
    contagion: "Very low",
    symptoms: ["Occasional cough", "Nose less dramatic", "Energy mostly back"],
    notes: "This is often mostly cleanup. Keep an eye out for symptoms that return after improving.",
    adult: ["No need to keep taking medication out of habit.", "Saline, fluids, and rest still help."],
    kid: ["Keep routines gentle.", "Use medicines only as directed and only when symptoms need it."],
  },
  {
    day: 9,
    name: "Residual cough club",
    short: "Annoying encore",
    severity: 18,
    contagion: "Very low",
    symptoms: ["Lingering cough", "Throat tickle", "Mostly better"],
    notes: "A lingering cough can happen, but the overall direction should be better.",
    adult: ["Honey/lozenges or warm drinks can help a tickle.", "Seek care for trouble breathing, dehydration, or fever lasting more than 4 days."],
    kid: ["Honey over age 1, fluids, and humidified air may help.", "Seek care for breathing trouble, dehydration, or concerning symptoms."],
  },
  {
    day: 10,
    name: "Should be improving",
    short: "Red flag checkpoint",
    severity: 12,
    contagion: "Very low",
    symptoms: ["Mostly resolved", "Maybe cough", "Should not be clearly worsening"],
    notes: "CDC suggests seeking medical care if symptoms last more than 10 days without getting better.",
    adult: ["If symptoms are not improving, or they improve then worsen, consider medical care.", "Test for COVID/flu when relevant, especially if high-risk."],
    kid: ["If symptoms are not improving by now, consider checking with a clinician.", "Seek care sooner for breathing trouble, dehydration, or severe symptoms."],
  },
];

const medGuidance = {
  adult: [
    {
      title: "Pain, fever, sore throat",
      ingredient: "Acetaminophen or ibuprofen",
      symptoms: ["throat", "fever"],
      detail: "Helps discomfort. Watch for duplicate acetaminophen in multi-symptom products.",
    },
    {
      title: "Stuffy nose",
      ingredient: "Saline, plus pseudoephedrine if safe",
      symptoms: ["nose", "sleep"],
      detail: "Saline is low drama. Decongestants can be a bad fit with some heart, blood pressure, or medication situations.",
    },
    {
      title: "Dry cough",
      ingredient: "Dextromethorphan, honey, lozenges",
      symptoms: ["cough", "sleep", "throat"],
      detail: "Best for cough that is mostly tickle/noise and wrecking sleep.",
    },
    {
      title: "Mucus cough",
      ingredient: "Guaifenesin plus fluids",
      symptoms: ["cough", "nose"],
      detail: "May help loosen mucus. Fluids do a lot of the boring-but-real work.",
    },
    {
      title: "The boring best stuff",
      ingredient: "Rest, fluids, humidified air",
      symptoms: ["energy", "sleep", "nose", "cough"],
      detail: "Not glamorous. Annoyingly useful.",
    },
  ],
  kid: [
    {
      title: "Pain or fever",
      ingredient: "Children's acetaminophen or ibuprofen",
      symptoms: ["fever", "throat"],
      detail: "Dose by label/weight. Ibuprofen is generally for 6 months and older; avoid aspirin.",
    },
    {
      title: "Stuffy nose",
      ingredient: "Saline drops/spray, suction, humidifier",
      symptoms: ["nose", "sleep"],
      detail: "Often the safest and most useful first move, especially for little kids.",
    },
    {
      title: "Cough at night",
      ingredient: "Honey if over 1 year old",
      symptoms: ["cough", "sleep", "throat"],
      detail: "Do not give honey to babies under 1 year. For older kids, it can soothe cough.",
    },
    {
      title: "OTC cough/cold meds",
      ingredient: "Age caution",
      symptoms: ["cough", "nose"],
      detail: "FDA: not under 2; labels commonly say not under 4. Ages 4 to 6: use only if the doctor says so.",
    },
    {
      title: "Fluids and comfort",
      ingredient: "Hydration, rest, warm drinks",
      symptoms: ["energy", "sleep", "throat"],
      detail: "Good default when symptoms are annoying but not scary.",
    },
  ],
};

const sourceLinks = [
  { label: "CDC: Manage Common Cold", href: "https://www.cdc.gov/common-cold/treatment/index.html" },
  { label: "CDC: About Common Cold", href: "https://www.cdc.gov/common-cold/about/" },
  { label: "MedlinePlus: Common cold", href: "https://medlineplus.gov/ency/article/000678.htm" },
  { label: "FDA: Kids cough and cold medicines", href: "https://www.fda.gov/consumers/consumer-updates/should-you-give-kids-medicine-coughs-and-colds" },
  { label: "HealthyChildren/AAP: Coughs and colds", href: "https://www.healthychildren.org/english/health-issues/conditions/chest-lungs/pages/coughs-and-colds-medicines-or-home-remedies.aspx" },
];

const defaultState = {
  audience: "adult",
  startWeekday: null,
  selectedDay: 0,
  selectedSymptoms: [],
  rememberDate: true,
  compactMode: false,
  showSources: true,
  reduceMotion: false,
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const weekdays = [
  { short: "Sun", long: "Sunday" },
  { short: "Mon", long: "Monday" },
  { short: "Tue", long: "Tuesday" },
  { short: "Wed", long: "Wednesday" },
  { short: "Thu", long: "Thursday" },
  { short: "Fri", long: "Friday" },
  { short: "Sat", long: "Saturday" },
];

function normalizeWeekday(value) {
  if (value === null || value === undefined || value === "") return null;
  const day = Number(value);
  return Number.isInteger(day) && day >= 0 && day <= 6 ? day : null;
}

function weekdayForDay(startWeekday, dayOffset) {
  const normalized = normalizeWeekday(startWeekday);
  if (normalized === null) return null;
  const index = (normalized + dayOffset + 14) % 7;
  return weekdays[index];
}

function dayLabel(day) {
  if (day === 0) return "Day 0";
  return day > 0 ? `Day +${day}` : `Day ${day}`;
}

function symptomLevel(severity) {
  return Math.max(1, Math.min(4, Math.ceil(severity / 25)));
}

function contagionLevel(contagion) {
  const levels = {
    Possible: 1,
    Rising: 2,
    High: 3,
    Peak: 4,
    Moderate: 2,
    Lower: 1,
    "Very low": 1,
  };
  return levels[contagion] || 1;
}

function signalDots(level) {
  return Array.from({ length: 4 }, (_, index) => (
    `<span class="${index < level ? "is-on" : ""}"></span>`
  )).join("");
}

function phaseSignals(phase) {
  const symptoms = symptomLevel(phase.severity);
  const spread = contagionLevel(phase.contagion);
  const symptomTitle = `Symptom intensity: ${symptoms} of 4`;
  const spreadTitle = `Contagiousness: ${phase.contagion}, ${spread} of 4`;
  return `
    <span class="phase-signals" aria-label="${symptomTitle}. ${spreadTitle}.">
      <span class="signal signal-symptoms" title="${symptomTitle}">
        <span class="signal-icon signal-icon-symptoms" aria-hidden="true"></span>
        <span class="signal-dots" aria-hidden="true">${signalDots(symptoms)}</span>
      </span>
      <span class="signal signal-spread" title="${spreadTitle}">
        <span class="signal-icon signal-icon-spread" aria-hidden="true"></span>
        <span class="signal-dots" aria-hidden="true">${signalDots(spread)}</span>
      </span>
    </span>
  `;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const state = { ...defaultState, ...saved };
    if (!Object.prototype.hasOwnProperty.call(saved, "startWeekday") && state.startDate) {
      const parsed = new Date(`${state.startDate}T00:00:00`);
      if (!Number.isNaN(parsed.getTime())) state.startWeekday = parsed.getDay();
    }
    state.startWeekday = normalizeWeekday(state.startWeekday);
    delete state.startDate;
    return state;
  } catch {
    return { ...defaultState };
  }
}

function saveState(state) {
  const toSave = { ...state };
  if (!toSave.rememberDate) delete toSave.startWeekday;
  delete toSave.startDate;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
}

function renderColdSite() {
  const state = loadState();
  state.startWeekday = normalizeWeekday(state.startWeekday);
  let detailScrollFrame = null;
  let suppressDetailSyncUntil = 0;

  const timeline = $("[data-timeline]");
  const detail = $("[data-detail]");
  const medList = $("[data-med-list]");
  const symptomGrid = $("[data-symptom-grid]");
  const dayPicker = $("[data-day-picker]");
  const dayPickerButton = $("[data-open-day-picker]");
  const sourceSection = $("[data-sources]");
  const selectedDayLabel = $("[data-selected-day]");
  const audienceLabel = $("[data-audience-label]");
  const resetButton = $("[data-reset-site]");

  function updateBody() {
    document.body.dataset.audience = state.audience;
    document.body.classList.toggle("has-start-day", state.startWeekday !== null);
    document.body.classList.toggle("is-compact", state.compactMode);
    document.body.classList.toggle("reduce-motion", state.reduceMotion);
    if (sourceSection) sourceSection.hidden = !state.showSources;
    $$("[data-audience-value]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.audienceValue === state.audience);
      button.setAttribute("aria-pressed", String(button.dataset.audienceValue === state.audience));
    });
    $$("[data-setting]").forEach((input) => {
      if (input.type === "checkbox") input.checked = Boolean(state[input.dataset.setting]);
    });
    $$("[data-start-day-value]").forEach((button) => {
      const isActive = Number(button.dataset.startDayValue) === state.startWeekday;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    if (audienceLabel) audienceLabel.textContent = state.audience === "adult" ? "Adult guidance" : "Kid guidance";
  }

  function renderTimeline() {
    if (!timeline) return;
    timeline.innerHTML = phases.map((phase) => {
      const weekday = weekdayForDay(state.startWeekday, phase.day);
      const isSelected = phase.day === state.selectedDay;
      return `
        <button class="phase-tile ${isSelected ? "is-selected" : ""}" type="button" data-day="${phase.day}" aria-pressed="${isSelected}">
          <span class="phase-day">${dayLabel(phase.day)}</span>
          <span class="phase-date">${weekday ? weekday.short : ""}</span>
          <span class="phase-name">${phase.name}</span>
          <span class="phase-short">${phase.short}</span>
          ${phaseSignals(phase)}
          <span class="phase-meter" aria-hidden="true"><span style="width: ${phase.severity}%"></span></span>
        </button>
      `;
    }).join("");
  }

  function renderDayPickerLabel() {
    if (selectedDayLabel) {
      selectedDayLabel.textContent = state.startWeekday === null
        ? "Select day"
        : `Day 0: ${weekdays[state.startWeekday].short}`;
    }
    if (dayPickerButton) {
      dayPickerButton.setAttribute("aria-label", state.startWeekday === null
        ? "Select the weekday when sore throat started"
        : `Sore throat started on ${weekdays[state.startWeekday].long}. Edit weekday.`);
    }
  }

  function renderDetails() {
    if (!detail) return;
    detail.innerHTML = phases.map((phase) => {
      const weekday = weekdayForDay(state.startWeekday, phase.day);
      const guide = phase[state.audience];
      const isSelected = phase.day === state.selectedDay;
      return `
        <article class="day-detail-card ${isSelected ? "is-selected" : ""}" data-detail-day="${phase.day}" aria-current="${isSelected ? "true" : "false"}">
          <div class="detail-heading">
            <div>
              <p class="eyebrow">${dayLabel(phase.day)}${weekday ? ` · ${weekday.long}` : ""}</p>
              <h2>${phase.name}</h2>
              <p class="detail-contagion">Contagiousness: ${phase.contagion}</p>
            </div>
            <span class="detail-pill">${phase.short}</span>
          </div>
          <p class="detail-note">${phase.notes}</p>
          <div class="detail-grid">
            <section>
              <h3>Likely symptoms</h3>
              <ul>${phase.symptoms.map((item) => `<li>${item}</li>`).join("")}</ul>
            </section>
            <section>
              <h3>What may help</h3>
              <ul>${guide.map((item) => `<li>${item}</li>`).join("")}</ul>
            </section>
          </div>
        </article>
      `;
    }).join("");
    renderDayPickerLabel();
  }

  function renderSymptoms() {
    if (!symptomGrid) return;
    symptomGrid.innerHTML = symptoms.map((symptom) => {
      const isSelected = state.selectedSymptoms.includes(symptom.id);
      return `
        <button class="symptom-chip ${isSelected ? "is-active" : ""}" type="button" data-symptom="${symptom.id}" aria-pressed="${isSelected}">
          ${symptom.label}
        </button>
      `;
    }).join("");
  }

  function renderMeds() {
    if (!medList) return;
    const selected = state.selectedSymptoms;
    const cards = medGuidance[state.audience].filter((card) => {
      return selected.length === 0 || card.symptoms.some((symptom) => selected.includes(symptom));
    });
    medList.innerHTML = cards.map((card) => `
      <article class="med-card">
        <p class="med-kicker">${card.title}</p>
        <h3>${card.ingredient}</h3>
        <p>${card.detail}</p>
      </article>
    `).join("");
  }

  function renderSources() {
    const sourceList = $("[data-source-list]");
    if (!sourceList) return;
    sourceList.innerHTML = sourceLinks.map((source) => `
      <a href="${source.href}" target="_blank" rel="noopener noreferrer">${source.label}</a>
    `).join("");
  }

  function renderSettingsSummary() {
    const summary = $("[data-settings-summary]");
    if (!summary) return;
    const weekday = state.startWeekday === null ? null : weekdays[state.startWeekday];
    summary.innerHTML = `
      <div><span>Audience</span><strong>${state.audience === "adult" ? "Adults" : "Kids"}</strong></div>
      <div><span>Sore throat started</span><strong>${weekday ? weekday.long : "Not selected"}</strong></div>
      <div><span>Saved weekday</span><strong>${state.rememberDate ? "On" : "Off"}</strong></div>
    `;
  }

  function renderAll({ scrollDetail = true, scrollTimeline = true } = {}) {
    updateBody();
    renderTimeline();
    renderDetails();
    renderSymptoms();
    renderMeds();
    renderSources();
    renderSettingsSummary();
    saveState(state);
    updateSelectedDayUi({ scrollTimeline, scrollDetail, save: false });
  }

  function closeDayPicker() {
    if (!dayPicker || !dayPickerButton) return;
    dayPicker.hidden = true;
    dayPickerButton.setAttribute("aria-expanded", "false");
  }

  function toggleDayPicker() {
    if (!dayPicker || !dayPickerButton) return;
    const shouldOpen = dayPicker.hidden;
    dayPicker.hidden = !shouldOpen;
    dayPickerButton.setAttribute("aria-expanded", String(shouldOpen));
  }

  function scrollSelectedPhaseIntoView() {
    if (!timeline) return;
    const selected = timeline.querySelector(".phase-tile.is-selected");
    if (!selected) return;
    window.requestAnimationFrame(() => {
      const targetLeft = selected.offsetLeft - (timeline.clientWidth - selected.offsetWidth) / 2;
      timeline.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: state.reduceMotion ? "auto" : "smooth",
      });
    });
  }

  function scrollSelectedDetailIntoView() {
    if (!detail) return;
    const selected = $$("[data-detail-day]", detail).find((card) => Number(card.dataset.detailDay) === state.selectedDay);
    if (!selected) return;
    const panelRect = detail.getBoundingClientRect();
    const cardRect = selected.getBoundingClientRect();
    const panelStyle = getComputedStyle(detail);
    const leftPadding = Number.parseFloat(panelStyle.paddingLeft) || 0;
    const targetLeft = detail.scrollLeft + cardRect.left - panelRect.left - leftPadding;
    suppressDetailSyncUntil = performance.now() + 550;
    detail.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: state.reduceMotion ? "auto" : "smooth",
    });
  }

  function updateSelectedDayUi({ scrollTimeline = false, scrollDetail = false, save = true } = {}) {
    $$("[data-day]").forEach((button) => {
      const isSelected = Number(button.dataset.day) === state.selectedDay;
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
    $$("[data-detail-day]").forEach((card) => {
      const isSelected = Number(card.dataset.detailDay) === state.selectedDay;
      card.classList.toggle("is-selected", isSelected);
      card.setAttribute("aria-current", String(isSelected));
    });
    if (save) saveState(state);
    if (scrollTimeline) scrollSelectedPhaseIntoView();
    if (scrollDetail) scrollSelectedDetailIntoView();
  }

  function dayFromDetailScroll() {
    if (!detail) return null;
    const cards = $$("[data-detail-day]", detail);
    const panelRect = detail.getBoundingClientRect();
    const focusX = panelRect.left + panelRect.width / 2;
    let bestDay = null;
    let bestDistance = Number.POSITIVE_INFINITY;
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.right < panelRect.left + 24 || rect.left > panelRect.right - 24) return;
      const cardFocusX = rect.left + rect.width / 2;
      const distance = Math.abs(cardFocusX - focusX);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestDay = Number(card.dataset.detailDay);
      }
    });
    return bestDay;
  }

  function handleDetailScroll() {
    if (performance.now() < suppressDetailSyncUntil || detailScrollFrame) return;
    detailScrollFrame = window.requestAnimationFrame(() => {
      detailScrollFrame = null;
      const day = dayFromDetailScroll();
      if (day === null || day === state.selectedDay) return;
      state.selectedDay = day;
      updateSelectedDayUi({ scrollTimeline: true, save: true });
    });
  }

  document.addEventListener("click", (event) => {
    const dayPickerTrigger = event.target.closest("[data-open-day-picker]");
    if (dayPickerTrigger) {
      toggleDayPicker();
      return;
    }

    const dayOption = event.target.closest("[data-start-day-value]");
    if (dayOption) {
      state.startWeekday = normalizeWeekday(dayOption.dataset.startDayValue);
      closeDayPicker();
      renderAll({ scrollDetail: true });
      return;
    }

    if (!event.target.closest("[data-day-picker-wrap]")) {
      closeDayPicker();
    }

    const phaseButton = event.target.closest("[data-day]");
    if (phaseButton) {
      state.selectedDay = Number(phaseButton.dataset.day);
      updateSelectedDayUi({ scrollTimeline: true, scrollDetail: true });
      return;
    }

    const audienceButton = event.target.closest("[data-audience-value]");
    if (audienceButton) {
      state.audience = audienceButton.dataset.audienceValue;
      renderAll({ scrollDetail: true });
      return;
    }

    const symptomButton = event.target.closest("[data-symptom]");
    if (symptomButton) {
      const id = symptomButton.dataset.symptom;
      state.selectedSymptoms = state.selectedSymptoms.includes(id)
        ? state.selectedSymptoms.filter((item) => item !== id)
        : [...state.selectedSymptoms, id];
      renderSymptoms();
      renderMeds();
      saveState(state);
      return;
    }

    if (event.target.closest("[data-clear-symptoms]")) {
      state.selectedSymptoms = [];
      renderSymptoms();
      renderMeds();
      saveState(state);
      return;
    }

    if (event.target.closest("[data-open-settings]")) {
      openSettings();
      return;
    }

    if (event.target.closest("[data-close-settings]") || event.target.matches("[data-settings-backdrop]")) {
      closeSettings();
      return;
    }

    if (event.target.closest("[data-reset-settings]")) {
      Object.assign(state, { ...defaultState, startWeekday: null });
      closeDayPicker();
      renderAll({ scrollDetail: true });
      return;
    }

    if (event.target.closest("[data-reset-site]")) {
      Object.assign(state, { ...defaultState, startWeekday: null });
      closeDayPicker();
      renderAll({ scrollDetail: true });
    }
  });

  if (detail) {
    detail.addEventListener("scroll", handleDetailScroll, { passive: true });
  }

  if (resetButton) {
    resetButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        resetButton.click();
      }
    });
  }

  $$("[data-setting]").forEach((input) => {
    input.addEventListener("change", () => {
      state[input.dataset.setting] = input.type === "checkbox" ? input.checked : input.value;
      renderAll();
    });
  });

  function openSettings() {
    const modal = $("[data-settings-modal]");
    const backdrop = $("[data-settings-backdrop]");
    if (!modal || !backdrop) return;
    modal.hidden = false;
    backdrop.hidden = false;
    requestAnimationFrame(() => document.body.classList.add("is-modal-open"));
    const close = $("[data-close-settings]");
    if (close) close.focus();
  }

  function closeSettings() {
    const modal = $("[data-settings-modal]");
    const backdrop = $("[data-settings-backdrop]");
    document.body.classList.remove("is-modal-open");
    if (modal) modal.hidden = true;
    if (backdrop) backdrop.hidden = true;
    const opener = $("[data-open-settings]");
    if (opener) opener.focus();
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDayPicker();
      closeSettings();
    }
  });

  setupAudio();
  renderAll();
}

function setupAudio() {
  const audio = $("[data-audio]");
  const play = $("[data-audio-play]");
  const progress = $("[data-audio-progress]");
  const time = $("[data-audio-time]");
  if (!audio || !play || !progress || !time) return;

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const rest = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${rest}`;
  };

  play.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        return;
      }
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    play.classList.add("is-playing");
    play.setAttribute("aria-label", "Pause Colds Last for a Week");
    play.textContent = "Pause";
  });

  audio.addEventListener("pause", () => {
    play.classList.remove("is-playing");
    play.setAttribute("aria-label", "Play Colds Last for a Week");
    play.textContent = "Play";
  });

  audio.addEventListener("timeupdate", () => {
    const ratio = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progress.value = ratio;
    time.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  });

  progress.addEventListener("input", () => {
    if (audio.duration) audio.currentTime = (Number(progress.value) / 100) * audio.duration;
  });
}

document.addEventListener("DOMContentLoaded", renderColdSite);
