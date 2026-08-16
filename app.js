const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const questions=[
{q:'Which type of task sounds most interesting?',a:[['Diagnosing why heating or cooling equipment is not working',{HVAC:3,Electrical:1}],['Tracing a wiring or circuit problem',{Electrical:3,HVAC:1}],['Finding the cause of a leak, pressure, or drain problem',{Plumbing:3}],['I am not sure yet',{HVAC:1,Electrical:1,Plumbing:1}]]},
{q:'How do you feel about troubleshooting problems that may have several possible causes?',a:[['I enjoy narrowing down possibilities step by step',{HVAC:3,Electrical:3,Plumbing:2}],['I like it if I can use measurements or tools',{HVAC:3,Electrical:3,Plumbing:2}],['I prefer straightforward repair tasks',{Plumbing:2,HVAC:1}],['I do not know yet',{HVAC:1,Electrical:1,Plumbing:1}]]},
{q:'Which work environment sounds most appealing?',a:[['Different homes and businesses every day',{HVAC:3,Plumbing:3,Electrical:2}],['Construction sites and new installations',{Electrical:3,Plumbing:3,HVAC:2}],['Mechanical rooms, equipment, and controls',{HVAC:3,Electrical:2}],['No preference',{HVAC:1,Electrical:1,Plumbing:1}]]},
{q:'How interested are you in electricity and electrical measurements?',a:[['Very interested',{Electrical:4,HVAC:3}],['Somewhat interested',{Electrical:2,HVAC:2,Plumbing:1}],['Not very interested',{Plumbing:3}],['I have not tried it',{HVAC:1,Electrical:1,Plumbing:1}]]},
{q:'How interested are you in mechanical equipment, motors, fans, compressors, and controls?',a:[['Very interested',{HVAC:4,Electrical:1}],['Somewhat interested',{HVAC:2,Electrical:1,Plumbing:1}],['Not very interested',{Plumbing:2,Electrical:1}],['I have not tried it',{HVAC:1,Electrical:1,Plumbing:1}]]},
{q:'How interested are you in water systems, piping, fixtures, drains, and pressure problems?',a:[['Very interested',{Plumbing:4}],['Somewhat interested',{Plumbing:2,HVAC:1}],['Not very interested',{HVAC:2,Electrical:2}],['I have not tried it',{HVAC:1,Electrical:1,Plumbing:1}]]},
{q:'How do you feel about working directly with customers?',a:[['I enjoy explaining problems and solutions',{HVAC:3,Plumbing:3,Electrical:2}],['I can do it when needed',{HVAC:2,Plumbing:2,Electrical:2}],['I would rather focus mostly on the technical work',{Electrical:3,HVAC:1}],['Not sure',{HVAC:1,Electrical:1,Plumbing:1}]]},
{q:'Would you be comfortable sometimes working outdoors in hot or cold weather?',a:[['Yes',{HVAC:3,Plumbing:2,Electrical:2}],['Sometimes',{HVAC:2,Plumbing:2,Electrical:2}],['I would strongly prefer indoor work',{Electrical:2,Plumbing:1}],['Not sure',{HVAC:1,Electrical:1,Plumbing:1}]]},
{q:'Would ladders, attics, crawlspaces, or tight work areas bother you?',a:[['I can handle them',{HVAC:3,Electrical:3,Plumbing:3}],['Some are okay',{HVAC:2,Electrical:2,Plumbing:2}],['I would rather avoid them',{Electrical:1,Plumbing:1,HVAC:1}],['I have not experienced that kind of work',{HVAC:1,Electrical:1,Plumbing:1}]]},
{q:'How do you feel about math and measurements?',a:[['I like them',{Electrical:3,HVAC:3,Plumbing:2}],['I am okay with practical math',{HVAC:2,Electrical:2,Plumbing:2}],['I prefer less math-heavy work',{Plumbing:2}],['I am willing to improve',{HVAC:2,Electrical:2,Plumbing:2}]]},
{q:'Which sounds more satisfying?',a:[['Getting a machine or system running again',{HVAC:4}],['Making a circuit operate correctly and safely',{Electrical:4}],['Restoring water flow or drainage',{Plumbing:4}],['All of those sound satisfying',{HVAC:2,Electrical:2,Plumbing:2}]]},
{q:'Would you enjoy reading diagrams, wiring schematics, or technical drawings?',a:[['Yes',{Electrical:3,HVAC:3,Plumbing:1}],['Maybe after learning how',{Electrical:2,HVAC:2,Plumbing:2}],['Not much',{Plumbing:2}],['Not sure',{HVAC:1,Electrical:1,Plumbing:1}]]},
{q:'How important is variety in your workday?',a:[['Very important',{HVAC:3,Plumbing:3,Electrical:2}],['Somewhat important',{HVAC:2,Electrical:2,Plumbing:2}],['I like predictable work',{Electrical:2,Plumbing:2}],['No preference',{HVAC:1,Electrical:1,Plumbing:1}]]},
{q:'Would owning a service business someday interest you?',a:[['Yes',{HVAC:3,Plumbing:3,Electrical:3}],['Maybe',{HVAC:2,Plumbing:2,Electrical:2}],['Probably not',{HVAC:1,Electrical:1,Plumbing:1}],['I have never considered it',{HVAC:1,Electrical:1,Plumbing:1}]]},
{q:'Which learning style fits you best?',a:[['Show me, then let me try it',{HVAC:3,Electrical:3,Plumbing:3}],['I learn best from diagrams and explanations',{Electrical:3,HVAC:2,Plumbing:1}],['I learn by physically building or repairing',{Plumbing:3,HVAC:2,Electrical:2}],['A mix of all three',{HVAC:2,Electrical:2,Plumbing:2}]]},
{q:'How do you feel about emergency or after-hours service work?',a:[['I could handle some on-call work',{HVAC:3,Plumbing:3,Electrical:2}],['Only occasionally',{HVAC:2,Plumbing:2,Electrical:2}],['I strongly prefer a regular schedule',{Electrical:2}],['Not sure',{HVAC:1,Electrical:1,Plumbing:1}]]},
{q:'What matters most to you when choosing a career?',a:[['Solving technical problems',{HVAC:3,Electrical:3,Plumbing:2}],['Building and installing things',{Electrical:3,Plumbing:3,HVAC:2}],['Helping customers fix urgent problems',{HVAC:3,Plumbing:3,Electrical:2}],['I am still figuring that out',{HVAC:1,Electrical:1,Plumbing:1}]]},
{q:'Right now, how certain are you that you want a skilled-trade career?',a:[['Very interested',{HVAC:2,Electrical:2,Plumbing:2}],['Interested but still comparing options',{HVAC:2,Electrical:2,Plumbing:2}],['Mostly exploring',{HVAC:1,Electrical:1,Plumbing:1}],['Not sure trades are for me',{HVAC:1,Electrical:1,Plumbing:1}]]}
];
const experiences={
HVAC:{title:'HVAC: No-Cooling Service Call',intro:'The indoor blower is running, but the outdoor unit is not.',facts:['Thermostat: Calling for cool','Contactor coil: 24.4 VAC','Line voltage: Present'],q:'What is the best next step?',opts:['Add refrigerant','Verify the contactor pulls in and passes power','Replace the thermostat','Replace the indoor blower motor'],a:1,explain:'Control voltage is reaching the contactor. The next useful check is whether the contactor is mechanically operating and passing power.'},
Electrical:{title:'Electrical: Dead Circuit',intro:'Several receptacles on one branch circuit are dead, but the breaker appears on.',facts:['Breaker: On','Voltage at breaker: Present','Downstream receptacles: Dead'],q:'What is a useful next step?',opts:['Increase the breaker size','Check the next accessible upstream device/GFCI/connection','Replace every receptacle','Ignore the neutral'],a:1,explain:'After verifying source voltage, troubleshoot along the affected circuit from known-good toward the failed load.'},
Plumbing:{title:'Plumbing: Low Pressure',intro:'The customer reports low water pressure throughout the entire house.',facts:['All fixtures: Low pressure','Main supply: On','One faucet aerator: Clean'],q:'What should you inspect early?',opts:['Only one sink trap','Main shutoff, regulator, filter, or supply condition','One toilet flapper','The roof vent'],a:1,explain:'A whole-house symptom points toward a shared upstream component rather than one individual fixture.'}
};
let idx=0,scores={HVAC:0,Electrical:0,Plumbing:0};
let state={name:localStorage.tw4_name||'Future Trades Professional',goal:localStorage.tw4_goal||'Exploring career options'};
function save(){localStorage.tw4_name=state.name;localStorage.tw4_goal=state.goal}
function open(id){$(id).classList.add('open')} function close(){ $$('.modal').forEach(m=>m.classList.remove('open')) }
$$('.close').forEach(b=>b.onclick=close); $$('.modal').forEach(m=>m.onclick=e=>{if(e.target===m)close()});
$('#menuBtn').onclick=()=>$('#nav').classList.toggle('open');$$('#nav a').forEach(a=>a.onclick=()=>$('#nav').classList.remove('open'));
function renderQ(){let item=questions[idx];$('#assessmentProgress').style.width=(idx/questions.length*100)+'%';$('#assessmentBox').innerHTML=`<div class="question"><div class="question-number">QUESTION ${idx+1} OF ${questions.length}</div><h3>${item.q}</h3><div class="answer-grid">${item.a.map((x,i)=>`<button data-i="${i}">${x[0]}</button>`).join('')}</div></div>`;$$('#assessmentBox button').forEach(b=>b.onclick=()=>answer(+b.dataset.i))}
function answer(i){let weights=questions[idx].a[i][1];Object.entries(weights).forEach(([k,v])=>scores[k]+=v);idx++;if(idx<questions.length)renderQ();else finish()}
function finish(){
 $('#assessmentProgress').style.width='100%';
 $('#assessmentBox').innerHTML='<div class="question"><div class="question-number">ASSESSMENT COMPLETE</div><h3>Your career matches are ready.</h3><button class="btn secondary" id="retake">Retake Assessment</button></div>';
 let maxPossible=questions.length*4;
 let pct={};Object.keys(scores).forEach(k=>pct[k]=Math.max(1,Math.min(99,Math.round(scores[k]/maxPossible*100+28))));
 let order=Object.entries(pct).sort((a,b)=>b[1]-a[1]), top=order[0][0];
 localStorage.tw4_results=JSON.stringify(pct);localStorage.tw4_top=top;
 showResults(pct);
 $('#retake').onclick=()=>{idx=0;scores={HVAC:0,Electrical:0,Plumbing:0};renderQ()};
 location.hash='#results'; updateDashboard();
}
function showResults(pct){
 let order=Object.entries(pct).sort((a,b)=>b[1]-a[1]), top=order[0][0];
 const copy={
 HVAC:'Your answers suggest you may enjoy mechanical/electrical troubleshooting, varied service work, practical measurements, and solving comfort-system problems.',
 Electrical:'Your answers suggest you may enjoy circuits, precise measurements, diagrams, installation work, and methodical troubleshooting.',
 Plumbing:'Your answers suggest you may enjoy hands-on repair, piping and fixture systems, practical problem solving, and restoring water flow or drainage.'
 };
 $('#resultsPanel').classList.remove('empty');
 $('#resultsPanel').innerHTML=`<div class="result-top"><div><div class="eyebrow">TOP CURRENT MATCH</div><h3>${top}</h3><p>This does not mean you should choose ${top}. It means your answers currently align most closely with common parts of that work.</p></div><div class="match-badge"><div><b>${pct[top]}%</b><span>Match</span></div></div></div>
 <div class="match-bars">${order.map(([t,v])=>`<div><span>${t}</span><i style="width:${v}%"></i><b>${v}%</b></div>`).join('')}</div>
 <div class="why-box"><b>Why ${top} ranked highest</b><p>${copy[top]}</p></div>
 <div class="next-step-box"><b>Recommended next step</b><p>Try the free ${top} work experience below. Afterward, ask yourself whether the problem-solving process felt interesting enough to explore further.</p></div>
 <div class="result-actions"><button class="btn primary" id="tryTop">Try ${top}</button><button class="btn secondary" id="retake2">Retake Assessment</button></div>`;
 $('#tryTop').onclick=()=>showExperience(top);$('#retake2').onclick=()=>{idx=0;scores={HVAC:0,Electrical:0,Plumbing:0};location.hash='#assessment';renderQ()}
}
renderQ();
if(localStorage.tw4_results){try{showResults(JSON.parse(localStorage.tw4_results))}catch(e){}}
function showExperience(trade){
 let e=experiences[trade];
 $('#experienceView').innerHTML=`<div class="eyebrow">${trade.toUpperCase()} CAREER EXPERIENCE</div><h2>${e.title}</h2><div class="experience-body"><p>${e.intro}</p><div class="experience-facts">${e.facts.map(f=>`<div>${f}</div>`).join('')}</div></div><h3>${e.q}</h3><div class="experience-choices">${e.opts.map((o,i)=>`<button data-i="${i}">${o}</button>`).join('')}</div><div id="experienceResult"></div>`;
 $$('#experienceView .experience-choices button').forEach(b=>b.onclick=()=>gradeExperience(trade,e,+b.dataset.i));
 open('#experienceModal');
}
$$('.experience').forEach(b=>b.onclick=()=>showExperience(b.dataset.trade));
function gradeExperience(trade,e,choice){
 let bs=$$('#experienceView .experience-choices button');bs.forEach(b=>b.disabled=true);bs[e.a].classList.add('correct');
 if(choice!==e.a)bs[choice].classList.add('wrong');
 if(choice===e.a)localStorage['tw4_exp_'+trade]='1';
 $('#experienceResult').innerHTML=`<div class="experience-result"><b>${choice===e.a?'Correct.':'Review the correct choice.'}</b> ${e.explain}</div><div class="reflect-box"><b>Career reflection</b><p>How did this type of problem-solving feel?</p><div class="reflect-buttons"><button>Interesting</button><button>I could learn this</button><button>Not sure</button><button>Not for me</button></div></div>`;
 $$('#experienceResult .reflect-buttons button').forEach(b=>b.onclick=()=>{localStorage['tw4_reflect_'+trade]=b.textContent;updateDashboard();b.textContent='Saved ✓'});
 updateDashboard();
}
function updateDashboard(){
 $('#studentName').textContent=state.name;$('#studentGoal').textContent=state.goal;
 let done=['HVAC','Electrical','Plumbing'].filter(t=>localStorage['tw4_exp_'+t]).length;
 $('#experiencesDone').textContent=done;$('#assessmentDone').textContent=localStorage.tw4_results?'Yes':'No';$('#topMatch').textContent=localStorage.tw4_top||'—';
 [['HVAC','hvacDone'],['Electrical','elecDone'],['Plumbing','plumbDone']].forEach(([t,id])=>$('#'+id).textContent=localStorage['tw4_exp_'+t]?'Tried ✓':'Not tried');
}
updateDashboard();
$('#profileBtn').onclick=()=>{$('#nameInput').value=state.name==='Future Trades Professional'?'':state.name;$('#goalInput').value=state.goal;open('#profileModal')};
$('#saveProfile').onclick=()=>{let n=$('#nameInput').value.trim();if(n)state.name=n;state.goal=$('#goalInput').value;save();updateDashboard();close()};