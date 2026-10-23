
/* Skilled Pathways Version 14 upgrade */
(() => {
  const hero = document.querySelector("#home .hero");
  if (hero) {
    hero.innerHTML = `
      <div class="kicker">Explore your future in the skilled trades</div>
      <h1>DISCOVER A CAREER THAT <span>FITS YOUR FUTURE.</span></h1>
      <p class="lead">Not sure what career to choose? Discover eight skilled-trade fields, compare career opportunities, and find work you may enjoy.</p>
      <div class="row">
        <button class="btn gold" onclick="openAssessment()">Find My Career — Free</button>
        <button class="btn secondary" onclick="document.getElementById('trades').scrollIntoView()">Explore 8 Careers</button>
      </div>
      <p class="muted">No account or payment required to explore careers.</p>`;
  }

  const account = document.getElementById("accountCard");
  if (account) {
    const feature = document.createElement("div");
    feature.className = "card";
    feature.innerHTML = `
      <div class="sectiontag">Free Career Explorer</div>
      <h2>What kind of work interests you?</h2>
      <p class="muted">Answer eight questions about your interests and discover three skilled careers worth exploring.</p>
      <button class="btn gold block" onclick="openAssessment()">Take the Free Career Assessment</button>`;
    account.before(feature);
  }

  const paidCard = [...document.querySelectorAll("#home > .card")]
    .find(c => c.querySelector(".price"));
  if (paidCard) {
    paidCard.querySelector("h2").textContent =
      "Go Further With the Complete Career Guide";
    const p = paidCard.querySelector("p.muted");
    if (p) p.textContent =
      "Unlock beginner lessons, tools of the trade, job scenarios and knowledge challenges across all eight career areas. One payment gives you account-based access.";
  }

  const questions = [
    ["Which project sounds most interesting?",[
      ["Repairing an engine",["auto","heavy"]],
      ["Building a metal frame",["welding"]],
      ["Installing wiring",["electrical"]],
      ["Building a room",["carpentry"]]
    ]],
    ["Where would you enjoy working?",[
      ["Vehicle repair shop",["auto"]],
      ["Outdoor equipment site",["heavy","renewable"]],
      ["Homes and businesses",["hvac","plumbing","electrical"]],
      ["Fabrication shop",["welding","carpentry"]]
    ]],
    ["Which problem would you enjoy solving?",[
      ["An air conditioner not cooling",["hvac"]],
      ["An electrical circuit problem",["electrical"]],
      ["A plumbing problem",["plumbing"]],
      ["A truck not starting",["auto","heavy"]]
    ]],
    ["What finished job sounds satisfying?",[
      ["A completed building project",["carpentry","welding"]],
      ["A working energy system",["electrical","renewable"]],
      ["A repaired machine",["auto","heavy","hvac"]],
      ["A working water system",["plumbing"]]
    ]],
    ["Which skill interests you?",[
      ["Metal fabrication",["welding"]],
      ["Electrical troubleshooting",["electrical"]],
      ["Mechanical diagnosis",["auto","heavy","hvac"]],
      ["Measuring and construction",["carpentry","plumbing"]]
    ]],
    ["Which equipment interests you?",[
      ["Excavators",["heavy"]],
      ["Cars and trucks",["auto"]],
      ["Solar panels and wind turbines",["renewable"]],
      ["Heating and cooling equipment",["hvac"]]
    ]],
    ["Which job would you try first?",[
      ["Repairing a water system",["plumbing"]],
      ["Building a handrail",["welding"]],
      ["Remodeling a house",["carpentry"]],
      ["Installing an energy system",["renewable","electrical"]]
    ]],
    ["How do you prefer learning?",[
      ["Finding and testing problems",["auto","hvac","electrical"]],
      ["Measuring and building things",["carpentry","welding"]],
      ["Installing useful systems",["plumbing","hvac"]],
      ["Working with large machinery",["heavy","renewable"]]
    ]]
  ];

  let answers = {};

  window.openAssessment = function() {
    document.querySelectorAll(".screen")
      .forEach(s => s.classList.remove("active"));
    document.getElementById("assessmentScreen")
      .classList.add("active");
    renderV14Questions();
    window.scrollTo(0,0);
  };

  function renderV14Questions() {
    document.getElementById("assessmentQs").innerHTML =
      questions.map((q,i) => `
        <div class="q">
          <b>${i+1}. ${q[0]}</b>
          ${q[1].map((a,j) => `
            <button class="answer ${answers[i]===j?"good":""}"
              onclick="selectV14Answer(${i},${j})">${a[0]}</button>
          `).join("")}
        </div>
      `).join("");
  }

  window.selectV14Answer = function(i,j) {
    answers[i] = j;
    renderV14Questions();
    document.getElementById("assessmentResults").innerHTML = "";
  };

  window.scoreAssessment = function() {
    const root = document.getElementById("assessmentResults");
    if (Object.keys(answers).length < questions.length) {
      root.innerHTML =
        `<div class="notice">Please answer all eight questions before viewing your results.</div>`;
      root.scrollIntoView({behavior:"smooth"});
      return;
    }

    const scores = {};
    Object.keys(trades).forEach(k => scores[k] = 0);

    questions.forEach((q,i) => {
      q[1][answers[i]][1].forEach(k => scores[k]++);
    });

    const top = Object.entries(scores)
      .sort((a,b) => b[1]-a[1]).slice(0,3);

    root.innerHTML = `
      <div class="card">
        <div class="sectiontag">Your Career Interests</div>
        <h2>Three Careers to Explore First</h2>
        <p class="muted">These are suggestions based on your interests, not a test of your abilities or a prediction of career success.</p>
        ${top.map(([id,n],i) => `
          <div class="module">
            <h3>${i+1}. ${trades[id].icon} ${trades[id].name}</h3>
            <p class="muted">${trades[id].desc}</p>
            <p>${n} of your 8 answers related to this career.</p>
            <button class="btn block" onclick="openTrade('${id}')">Explore This Career</button>
          </div>
        `).join("")}
        <button class="btn secondary block" onclick="resetV14Assessment()">Retake Assessment</button>
      </div>`;
    root.scrollIntoView({behavior:"smooth"});
  };

  window.resetV14Assessment = function() {
    answers = {};
    document.getElementById("assessmentResults").innerHTML = "";
    renderV14Questions();
    document.getElementById("assessmentQs").scrollIntoView();
  };

  window.renderQuiz = function() {
    freeQuiz.innerHTML = quiz.slice(0,2).map((q,i) => `
      <div class="q">
        <b>${i+1}. ${q[0]}</b>
        ${q[1].map((a,j) => `
          <button class="answer"
            onclick="answer(this,${j},${q[2]},'${current}free${i}')">${a}</button>
        `).join("")}
        <div class="feedback"></div>
      </div>
    `).join("");
  };
})();
