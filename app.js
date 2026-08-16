const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const courses={
HVAC:[
{id:'h1',n:'01',title:'Safety, Tools & PPE',tier:'Free',body:'Before troubleshooting equipment, a technician must control hazards. Identify electrical disconnects, use proper PPE, understand rotating equipment, and verify safe conditions before touching components.',callout:'Safe work comes before diagnosis. A correct answer is never worth an unsafe test.',q:'Before opening an outdoor condenser cabinet, what should you do first?',opts:['Add refrigerant','Verify power is safely disconnected or controlled','Replace the capacitor','Turn the thermostat lower'],a:1},
{id:'h2',n:'02',title:'Voltage, Current, Resistance & Meter Use',tier:'Free',body:'Voltage is electrical potential, current is the flow of charge, and resistance opposes current. A multimeter lets a technician measure these values to prove what a circuit is doing.',callout:'A meter reading should answer a specific troubleshooting question.',q:'If you want to verify whether a 24V control signal is present, which meter function should you use?',opts:['AC volts','Ohms on a live circuit','Amps without opening the circuit','Temperature'],a:0},
{id:'h3',n:'03',title:'Thermostats, Transformers, Contactors & Relays',tier:'Premium',body:'A typical cooling call begins at the thermostat, passes through a 24V control circuit, and energizes a contactor or relay that switches higher-voltage loads.',callout:'Control voltage at a coil proves the command is arriving; it does not prove the contacts are passing power.',q:'You measure 24.5 VAC across a contactor coil but the contactor does not pull in. What is the best conclusion?',opts:['The thermostat cannot be calling','The coil/contactor may be faulty or mechanically stuck','The system definitely needs refrigerant','The indoor blower must be bad'],a:1},
{id:'h4',n:'04',title:'Motors, Capacitors & Airflow',tier:'Premium',body:'Motors move air and refrigerant. Capacitors help certain motors start and run. Airflow problems can mimic refrigeration problems, so technicians verify filters, blowers, coils, and duct restrictions.',callout:'Never diagnose refrigerant charge before verifying airflow.',q:'A dirty indoor filter is most likely to cause which problem?',opts:['Reduced airflow','Higher transformer voltage','A shorted thermostat','A stronger condenser fan'],a:0},
{id:'h5',n:'05',title:'No-Cooling Service Call',tier:'Premium',body:'Customer complaint: indoor blower runs, outdoor unit is off. Thermostat is calling. You measure 24.4 VAC at the contactor coil and line voltage is present.',callout:'Use measurements to narrow the problem instead of replacing parts by guesswork.',q:'What is the best next test?',opts:['Add refrigerant','Verify the contactor pulls in and passes power','Replace the thermostat','Replace the blower motor'],a:1,challenge:true}
],
Electrical:[
{id:'e1',n:'01',title:'Electrical Safety & Safe Work Habits',tier:'Free',body:'Electrical work requires hazard recognition, de-energization when appropriate, proper PPE, correct test equipment, and verification before contact.',callout:'Treat conductors as energized until properly verified otherwise.',q:'What is the safest first assumption about an unknown conductor?',opts:['It is dead','It is energized until verified otherwise','It is low voltage','It is grounded'],a:1},
{id:'e2',n:'02',title:'Voltage, Current, Resistance & Ohm’s Law',tier:'Free',body:'Ohm’s Law relates voltage, current, and resistance. Understanding the relationship helps explain opens, shorts, excessive resistance, and normal circuit behavior.',callout:'Never use the resistance setting on an energized circuit.',q:'Which meter mode should only be used on a de-energized circuit?',opts:['Voltage','Resistance/ohms','Frequency','Temperature'],a:1},
{id:'e3',n:'03',title:'Residential Circuits & Devices',tier:'Premium',body:'Branch circuits distribute power to receptacles, lighting, and fixed loads. Troubleshooting begins with understanding source, overcurrent protection, conductors, and the load.',callout:'A dead receptacle may be caused upstream, not at the receptacle itself.',q:'Several downstream receptacles are dead but the breaker is on. What is a useful next step?',opts:['Check upstream connections/GFCI protection','Replace every receptacle','Increase breaker size','Ignore neutral connections'],a:0},
{id:'e4',n:'04',title:'Panels, Breakers, Grounding & Bonding',tier:'Premium',body:'Panels distribute circuits and provide overcurrent protection. Grounding and bonding provide fault-current paths and help reduce shock hazards.',callout:'Grounding and bonding are safety systems, not normal load-current paths.',q:'What is the primary purpose of an equipment grounding conductor?',opts:['Carry normal load current','Provide a low-impedance fault path','Increase voltage','Reduce appliance wattage'],a:1},
{id:'e5',n:'05',title:'Dead-Circuit Troubleshooting',tier:'Premium',body:'A circuit is reported dead. Breaker appears on. The technician verifies source voltage, then works through the circuit logically to locate the open.',callout:'Troubleshooting should move from known-good source toward the failed load.',q:'After verifying voltage at the breaker, where should you test next?',opts:['Random unrelated circuit','Next accessible point in the affected circuit','Water service','HVAC refrigerant line'],a:1,challenge:true}
],
Plumbing:[
{id:'p1',n:'01',title:'Safety, Tools, Materials & Fittings',tier:'Free',body:'Plumbing work involves pressure, heat, sharp tools, confined spaces, contaminated water, and heavy components. Correct tools and safe isolation matter.',callout:'Control pressure and temperature before opening a system.',q:'Before disconnecting a pressurized water line, what should you do?',opts:['Open it quickly','Isolate the supply and relieve pressure','Heat the fitting','Increase pump pressure'],a:1},
{id:'p2',n:'02',title:'Water Supply, Pressure, Valves & Fixtures',tier:'Free',body:'Water supply systems depend on adequate pressure, open valves, clean strainers/aerators, and correctly sized piping. Low flow and low pressure are not always the same problem.',callout:'Compare pressure at multiple locations before blaming the supply.',q:'One faucet has low flow but the rest of the house is normal. What should you check first?',opts:['Municipal main','Faucet aerator/fixture restriction','Main sewer','Water heater anode'],a:1},
{id:'p3',n:'03',title:'Drain, Waste & Vent Fundamentals',tier:'Premium',body:'DWV systems use gravity, slope, traps, and venting to move waste while protecting the building from sewer gas.',callout:'A vent problem can cause slow drainage or trap siphoning.',q:'What is the primary purpose of a plumbing trap?',opts:['Increase water pressure','Block sewer gas while allowing drainage','Heat water','Vent the roof'],a:1},
{id:'p4',n:'04',title:'Water Heaters, Pumps & Diagnostics',tier:'Premium',body:'Water-heating problems require checking energy source, controls, temperature settings, flow, and safety devices before replacing components.',callout:'Verify the symptom and energy source before condemning a heater.',q:'An electric water heater has no hot water. What is a logical first check?',opts:['Verify power/breaker and supply','Replace all plumbing','Increase house pressure','Clean the sewer'],a:0},
{id:'p5',n:'05',title:'Low-Pressure Service Call',tier:'Premium',body:'Customer reports low pressure throughout the house. Compare static pressure, check the main valve, pressure regulator, filters, and supply restrictions.',callout:'Whole-house symptoms point to shared upstream components.',q:'Low pressure exists at every fixture. What should you inspect early?',opts:['One faucet aerator','Main shutoff/regulator/supply condition','One toilet flapper','One sink trap'],a:1,challenge:true}
]};
let state={
name:localStorage.tw3_name||'Future Trades Professional',
interest:localStorage.tw3_interest||'Undecided',
goal:localStorage.tw3_goal||'Explore a career',
points:+(localStorage.tw3_points||0),
premium:localStorage.tw3_premium==='1'
};
const done=()=>Object.keys(localStorage).filter(k=>k.startsWith('tw3_done_'));
const challenges=()=>Object.keys(localStorage).filter(k=>k.startsWith('tw3_challenge_'));
function save(){localStorage.tw3_name=state.name;localStorage.tw3_interest=state.interest;localStorage.tw3_goal=state.goal;localStorage.tw3_points=state.points;localStorage.tw3_premium=state.premium?'1':'0'}
function progress(trade){return done().filter(k=>k.startsWith('tw3_done_'+trade+'_')).length}
function ui(){
 $('#studentName').textContent=state.name; $('#previewName').textContent=state.name; $('#studentGoal').textContent=state.goal;
 $('#points').textContent=state.points; $('#previewPoints').textContent=state.points;
 $('#completedLessons').textContent=done().length; $('#previewLessons').textContent=done().length;
 $('#passedChallenges').textContent=challenges().length; $('#previewChallenges').textContent=challenges().length;
 const lvl=Math.max(1,Math.floor(state.points/150)+1); $('#level').textContent=lvl; $('#previewLevel').textContent='APPRENTICE LEVEL '+lvl;
 [['HVAC','hvac'],['Electrical','elec'],['Plumbing','plumb']].forEach(([t,p])=>{let pct=Math.round(progress(t)/5*100);$('#'+p+'Pct').textContent=pct+'%';$('#'+p+'Bar').style.width=pct+'%'});
 let next=nextLesson();
 if(next){$('#nextTitle').textContent=next.title;$('#nextCopy').textContent=next.trade+' • '+next.tier+' lesson';$('#previewNext').textContent='Next: '+next.title}else{$('#nextTitle').textContent='Foundation paths complete';$('#nextCopy').textContent='Explore another academy or unlock premium.';$('#previewNext').textContent='Keep building your skills'}
}
function nextLesson(){
 const order=state.interest!=='Undecided'?[state.interest,...['HVAC','Electrical','Plumbing'].filter(x=>x!==state.interest)]:['HVAC','Electrical','Plumbing'];
 for(const trade of order){for(const l of courses[trade]){if(!localStorage['tw3_done_'+trade+'_'+l.id] && (l.tier==='Free'||state.premium))return {...l,trade}}}
 return null
}
ui();
$('#menuBtn').onclick=()=>$('#nav').classList.toggle('open'); $$('#nav a').forEach(a=>a.onclick=()=>$('#nav').classList.remove('open'));
function open(id){$(id).classList.add('open')} function close(){ $$('.modal').forEach(m=>m.classList.remove('open')) }
$$('.close').forEach(b=>b.onclick=close); $$('.modal').forEach(m=>m.onclick=e=>{if(e.target===m)close()});
function profile(){ $('#nameInput').value=state.name==='Future Trades Professional'?'':state.name;$('#interestInput').value=state.interest;$('#goalInput').value=state.goal;open('#profileModal') }
$('#startBtn').onclick=profile; $('#editProfile').onclick=profile;
$('#saveProfile').onclick=()=>{let n=$('#nameInput').value.trim();if(n)state.name=n;state.interest=$('#interestInput').value;state.goal=$('#goalInput').value;save();ui();close();openTrade(state.interest==='Undecided'?'HVAC':state.interest)};
function openTrade(trade){
 $('#tradeEyebrow').textContent=trade.toUpperCase()+' ACADEMY';$('#tradeTitle').textContent=trade+' Training Path';$('#tradeIntro').textContent='Complete each lesson, pass the knowledge check, and build your training record.';
 $('#lessonList').innerHTML=courses[trade].map(l=>{let key='tw3_done_'+trade+'_'+l.id,d=localStorage[key]==='1',lock=l.tier==='Premium'&&!state.premium;return `<div class="lesson-row"><div><small>MODULE ${l.n}<span class="tag ${l.tier==='Free'?'free':'premium'}">${l.tier}</span></small><b>${l.title}</b><p>${d?'Completed ✓':lock?'Premium membership required':'Ready to begin'}</p></div><button data-id="${l.id}" data-trade="${trade}" data-lock="${lock}">${d?'Review':lock?'Unlock':'Open Lesson'}</button></div>`}).join('');
 $$('#lessonList button').forEach(b=>b.onclick=()=>{if(b.dataset.lock==='true'){close();open('#upgradeModal')}else openLesson(b.dataset.trade,b.dataset.id)});
 open('#tradeModal')
}
$$('.open-trade').forEach(b=>b.onclick=()=>openTrade(b.dataset.trade));
function openLesson(trade,id){
 const l=courses[trade].find(x=>x.id===id); close();
 $('#lessonView').innerHTML=`<div class="lesson-content"><div class="eyebrow">${trade.toUpperCase()} • MODULE ${l.n}</div><h2>${l.title}</h2><div class="lesson-body"><p>${l.body}</p><div class="callout">${l.callout}</div></div><h3>Knowledge Check</h3><p>${l.q}</p><div class="quiz">${l.opts.map((o,i)=>`<button data-i="${i}">${o}</button>`).join('')}</div><div id="quizResult"></div><div class="lesson-actions"><button class="btn secondary" id="backTrade">Back to ${trade}</button></div></div>`;
 $$('#lessonView .quiz button').forEach(btn=>btn.onclick=()=>grade(trade,l,+btn.dataset.i));
 $('#backTrade').onclick=()=>{close();openTrade(trade)}; open('#lessonModal')
}
function grade(trade,l,choice){
 const buttons=$$('#lessonView .quiz button');buttons.forEach(b=>b.disabled=true);buttons[l.a].classList.add('correct');
 if(choice===l.a){
   let key='tw3_done_'+trade+'_'+l.id;
   if(!localStorage[key]){localStorage[key]='1';state.points+=l.challenge?125:50;if(l.challenge)localStorage['tw3_challenge_'+trade+'_'+l.id]='1';save();ui()}
   $('#quizResult').innerHTML=`<div class="result"><b>Correct.</b> You completed this ${l.challenge?'service-call challenge':'lesson'} and earned ${l.challenge?'125':'50'} TradePoints.</div>`;
 }else{
   buttons[choice].classList.add('wrong');$('#quizResult').innerHTML='<div class="result"><b>Not quite.</b> Review the lesson explanation and compare your choice with the correct answer.</div>';
 }
}
$('#continueBtn').onclick=()=>{let n=nextLesson();if(n)openLesson(n.trade,n.id);else location.hash='#academies'};
$('#upgradeBtn').onclick=()=>open('#upgradeModal');$('#demoUnlock').onclick=()=>{state.premium=true;save();ui();close();alert('Premium demo unlocked on this device. Advanced lessons are now available.')};
$('#orgBtn').onclick=()=>alert('Production version: this will open a school/employer contact and demo-request form.');