const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const menuBtn = $("#menuBtn");
menuBtn.addEventListener("click", () => $("#nav").classList.toggle("open"));
$$("#nav a").forEach(a => a.addEventListener("click", () => $("#nav").classList.remove("open")));

const quiz = [
  {
    q: "Which sounds most like you?",
    answers: [
      ["I like fixing things and figuring out why they failed", "trade", "hvac"],
      ["I enjoy academic subjects and want a career that usually requires a degree", "college", "general"],
      ["I want to earn while I learn", "apprentice", "electrical"],
      ["I'm not sure yet—I want to try different careers first", "explore", "general"]
    ]
  },
  {
    q: "What kind of work would you rather do?",
    answers: [
      ["Work with equipment, tools, and mechanical systems", "trade", "hvac"],
      ["Work with wiring, circuits, and precise measurements", "trade", "electrical"],
      ["Build, repair, and route water/drain systems", "trade", "plumbing"],
      ["Mostly office, research, design, or professional work", "college", "general"]
    ]
  },
  {
    q: "How do you feel about schooling after high school?",
    answers: [
      ["I would rather begin earning sooner and train on the job", "apprentice", "general"],
      ["I am comfortable with 4+ years if my career requires it", "college", "general"],
      ["I like shorter technical training with hands-on work", "trade", "general"],
      ["I need to compare cost, time, and earnings first", "explore", "general"]
    ]
  },
  {
    q: "Would owning your own service business interest you someday?",
    answers: [
      ["Yes, definitely", "trade", "general"],
      ["Maybe, after I learn the trade", "apprentice", "general"],
      ["Probably not", "college", "general"],
      ["I'm not sure", "explore", "general"]
    ]
  }
];

let quizIndex = 0;
const tally = {trade:0, college:0, apprentice:0, explore:0, hvac:0, electrical:0, plumbing:0};

function renderQuiz(){
  const item = quiz[quizIndex];
  $("#quizProgress").style.width = `${(quizIndex / quiz.length) * 100}%`;
  $("#quizBox").innerHTML = `
    <div class="quiz-question">
      <span class="job-label">QUESTION ${quizIndex + 1} OF ${quiz.length}</span>
      <h3>${item.q}</h3>
      <div class="quiz-options">
        ${item.answers.map((a,i)=>`<button data-i="${i}">${a[0]}</button>`).join("")}
      </div>
    </div>`;
  $$("#quizBox button").forEach(btn => btn.addEventListener("click", () => {
    const a = item.answers[+btn.dataset.i];
    tally[a[1]]++;
    tally[a[2]] = (tally[a[2]] || 0) + 1;
    quizIndex++;
    if(quizIndex < quiz.length) renderQuiz(); else showResult();
  }));
}
function showResult(){
  $("#quizProgress").style.width = "100%";
  $("#quizBox").innerHTML = `<div class="quiz-question"><span class="job-label">COMPLETE</span><h3>Career Path Finder complete.</h3><button class="btn secondary" id="retake">Retake</button></div>`;
  const route = Object.entries({trade:tally.trade, college:tally.college, apprentice:tally.apprentice, explore:tally.explore}).sort((a,b)=>b[1]-a[1])[0][0];
  const trade = Object.entries({HVAC:tally.hvac, Electrical:tally.electrical, Plumbing:tally.plumbing}).sort((a,b)=>b[1]-a[1])[0][0];
  const copy = {
    trade: ["Hands-on technical training may fit you well", `Your answers suggest you may enjoy skilled-trade training. Start by exploring ${trade}, then compare trade school and apprenticeship routes.`],
    apprentice: ["An apprenticeship path may fit you well", `You seem interested in learning while working. Explore ${trade} and compare local apprenticeship, employer-training, and trade-school options.`],
    college: ["A college path may fit your goals", `Your answers suggest you are comfortable with a longer academic route. Keep comparing cost, time, career requirements, and outcomes—and still try a skilled-trades challenge before deciding.`],
    explore: ["Explore before you commit", `You don't need to choose today. Try the HVAC, Electrical, and Plumbing academies, then compare college, trade school, community college, and apprenticeship routes.`]
  };
  $("#careerResult").innerHTML = `
    <div class="result-icon">🎯</div>
    <span class="job-label">STARTING RECOMMENDATION</span>
    <h3>${copy[route][0]}</h3>
    <p>${copy[route][1]}</p>
    <div class="path-tags"><span>${trade}</span><span>Compare Cost</span><span>Compare Time</span><span>Try the Work</span></div>`;
  $("#retake").addEventListener("click", () => {
    Object.keys(tally).forEach(k=>tally[k]=0);
    quizIndex=0; renderQuiz();
    $("#careerResult").innerHTML = `<div class="result-icon">🧭</div><h3>Your path will appear here</h3><p>We'll compare hands-on work, problem solving, schooling preferences, entrepreneurship, and work environment.</p><div class="path-tags"><span>College</span><span>Trade School</span><span>Apprenticeship</span><span>Community College</span></div>`;
  });
}
renderQuiz();

let points = Number(localStorage.getItem("tw_points") || 0);
function updatePoints(){
  $("#pointsValue").textContent = points;
  localStorage.setItem("tw_points", points);
}
updatePoints();

$$("#challengeChoices button").forEach(btn => btn.addEventListener("click", () => {
  const feedback = $("#challengeFeedback");
  $$("#challengeChoices button").forEach(b => {b.disabled=true; if(b.dataset.correct==="true") b.classList.add("correct");});
  if(btn.dataset.correct==="true"){
    btn.classList.add("correct");
    if(!localStorage.getItem("tw_challenge_complete")){
      points += 100;
      localStorage.setItem("tw_challenge_complete","1");
      updatePoints();
    }
    feedback.innerHTML = `<strong>Correct.</strong> You already know the thermostat is calling and 24.2 VAC is reaching the contactor coil. The next useful check is whether the contactor is mechanically pulling in and whether its contacts are passing power to the load.`;
  } else {
    btn.classList.add("wrong");
    feedback.innerHTML = `<strong>Not the best next step.</strong> The measurements already tell you the thermostat is calling and control voltage is reaching the contactor. Use that information before replacing unrelated parts.`;
  }
  feedback.classList.add("show");
}));

const lessons = {
  HVAC: [
    ["01", "Safety, tools, and PPE"],
    ["02", "Voltage, current, resistance, and meters"],
    ["03", "Thermostats, transformers, contactors, and relays"],
    ["04", "Airflow, motors, capacitors, and basic refrigeration"],
    ["05", "Residential no-cooling service call"]
  ],
  Electrical: [
    ["01", "Electrical safety and safe work habits"],
    ["02", "Voltage, current, resistance, and Ohm's Law"],
    ["03", "Residential branch circuits and devices"],
    ["04", "Panels, breakers, grounding, and bonding concepts"],
    ["05", "Troubleshooting a dead receptacle circuit"]
  ],
  Plumbing: [
    ["01", "Safety, tools, materials, and fittings"],
    ["02", "Water supply, pressure, valves, and fixtures"],
    ["03", "Drain, waste, and vent fundamentals"],
    ["04", "Water heaters, pumps, and common service issues"],
    ["05", "Troubleshooting a low-pressure service call"]
  ]
};
const intros = {
  HVAC:"Start with the electrical and mechanical fundamentals used on residential comfort systems, then apply them to service calls.",
  Electrical:"Build safe electrical fundamentals before moving into residential circuits, panels, devices, and troubleshooting.",
  Plumbing:"Learn how water supply and drain systems work, then apply that knowledge to real service and repair decisions."
};
const modal = $("#academyModal");
function openAcademy(trade){
  $("#modalLabel").textContent = `${trade.toUpperCase()} ACADEMY`;
  $("#modalTitle").textContent = `${trade} Starter Path`;
  $("#modalIntro").textContent = intros[trade];
  $("#lessonList").innerHTML = lessons[trade].map(([n,title]) => {
    const key = `tw_${trade}_${n}`;
    const done = localStorage.getItem(key);
    return `<div class="lesson ${done ? "lesson-done" : ""}" data-key="${key}">
      <div><span>MODULE ${n}</span><b>${title}</b></div>
      <button>${done ? "Completed ✓" : "Mark explored"}</button>
    </div>`;
  }).join("");
  $$("#lessonList .lesson button").forEach(btn => btn.addEventListener("click", e => {
    const row = e.currentTarget.closest(".lesson");
    if(!localStorage.getItem(row.dataset.key)){
      localStorage.setItem(row.dataset.key, "1");
      points += 25; updatePoints();
      row.classList.add("lesson-done");
      e.currentTarget.textContent = "Completed ✓";
    }
  }));
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
}
$$(".academy-open").forEach(btn => btn.addEventListener("click", () => openAcademy(btn.dataset.trade)));
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
$("#modalClose").addEventListener("click",closeModal);
$("#modalDone").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
