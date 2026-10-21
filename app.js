
/*
 * SCIE SUSTAINABLE CAMPUS DIGITAL TWIN — LEADERSHIP DEMO
 * All campus numbers are fictional deterministic demonstration values.
 * No data is retrieved from school systems or sensor APIs.
 */
(() => {
  'use strict';
  const ORIGINAL_DEMO = 'https://scie-digital-campus-jet.vercel.app/';
  const pages = [
    { id:'overview',title:'Command Center',zh:'总览',icon:'layout-dashboard',section:'PLATFORM' },
    { id:'digital-twin',title:'Digital Twin 101',zh:'数字孪生概念',icon:'boxes',section:'PLATFORM' },
    { id:'architecture',title:'System Architecture',zh:'系统架构',icon:'server',section:'PLATFORM' },
    { id:'campus',title:'3D Campus',zh:'校园模型',icon:'boxes',section:'PLATFORM' },
    { id:'energy',title:'Energy & Carbon',zh:'能源与可持续性',icon:'zap',section:'APPLICATIONS' },
    { id:'environment',title:'Environment',zh:'环境传感器',icon:'wind',section:'APPLICATIONS' },
    { id:'study',title:'Study Spaces',zh:'自习教室',icon:'book-open',section:'APPLICATIONS' },
    { id:'elevator',title:'Elevator Forecast',zh:'电梯估时',icon:'arrow-up-down',section:'APPLICATIONS' },
    { id:'maintenance',title:'Facilities & ICT',zh:'设施报修',icon:'wrench',section:'APPLICATIONS' },
    { id:'navigation',title:'Campus Navigator',zh:'校园导航',icon:'route',section:'APPLICATIONS' },
    { id:'feasibility',title:'Feasibility Lab',zh:'模块可行性决策',icon:'clipboard-check',section:'LEADERSHIP' },
    { id:'roadmap',title:'Progress & Roadmap',zh:'进度与规划',icon:'calendar-clock',section:'LEADERSHIP' },
    { id:'case-studies',title:'Case Studies',zh:'参考案例',icon:'book-open',section:'LEADERSHIP' },
    { id:'leadership',title:'Leadership Brief',zh:'管理层决策与问答',icon:'users',section:'LEADERSHIP' },
    { id:'about',title:'Project Context',zh:'项目说明',icon:'info',section:'LEADERSHIP' }
  ];
  const icons = {
    'layout-dashboard':'<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="10" width="8" height="11" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/>',
    'boxes':'<path d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2Z"/><path d="m4 6.5 8 4.5 8-4.5M12 11v9"/>',
    'zap':'<path d="m13 2-3 8h7l-6 12 1-9H5l8-11Z"/>',
    'wind':'<path d="M3 8h12a3 3 0 1 0-3-3M2 12h17a2 2 0 1 1-2 2M3 16h8a3 3 0 1 1-3 3"/>',
    'book-open':'<path d="M12 7c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V6c-3-1-6-1-9 1Zm0 0v14"/>',
    'arrow-up-down':'<path d="M8 19V5m0 0-3 3m3-3 3 3m5-3v14m0 0-3-3m3 3 3-3"/>',
    'wrench':'<path d="M14 7a5 5 0 0 0-6 6l-5 5a2 2 0 0 0 3 3l5-5a5 5 0 0 0 6-6l-4 2-3-3 2-4Z"/>',
    'route':'<circle cx="6" cy="19" r="2"/><path d="M8 19h8a4 4 0 0 0 0-8H8a4 4 0 0 1 0-8h8"/><circle cx="18" cy="3" r="2"/>',
    'clipboard-check':'<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2M9 14l2 2 4-4"/>',
    'calendar-clock':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 10h18"/><circle cx="13" cy="16" r="3"/><path d="M13 14v2l1 1"/>',
    'info':'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
    'chevron-right':'<path d="m9 18 6-6-6-6"/>',
    'external-link':'<path d="M13 5h6v6M19 5l-9 9"/><path d="M19 13v6H5V5h6"/>',
    'download':'<path d="M12 3v12m0 0-5-5m5 5 5-5M4 17v4h16v-4"/>',
    'users':'<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M2 20v-3a6 6 0 0 1 12 0v3M16 15a4 4 0 0 1 6 4v1"/>',
    'thermometer':'<path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0Z"/><path d="M12 9v9"/>',
    'activity':'<path d="M2 12h4l3-7 4 14 3-7h6"/>',
    'server':'<rect x="3" y="3" width="18" height="8" rx="2"/><rect x="3" y="13" width="18" height="8" rx="2"/><path d="M7 7h.01M7 17h.01M12 7h6M12 17h6"/>',
    'check':'<path d="m4 12 5 5L20 6"/>',
    'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    'menu':'<path d="M4 6h16M4 12h16M4 18h16"/>',
    'maximize':'<path d="M7 3H3v4m14-4h4v4M3 17v4h4m14-4v4h-4"/>',
    'filter':'<path d="M4 4h16l-6 8v6l-4 2v-8Z"/>',
    'layers':'<path d="m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5"/>',
    'file-check':'<path d="M6 2h8l5 5v15H6Z"/><path d="M14 2v5h5m-10 8 2 2 4-4"/>',
    'building':'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h2m3 0h2M9 12h2m3 0h2M9 17h2m3 0h2"/>',
    'shield':'<path d="M12 2 20 6v6c0 5-3 8-8 10-5-2-8-5-8-10V6Z"/><path d="m8 12 3 3 5-6"/>',
    'plus':'<path d="M12 5v14M5 12h14"/>',
    'search':'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
    'file-text':'<path d="M6 2h8l5 5v15H6Z"/><path d="M14 2v5h5M9 12h7M9 16h7"/>',
    'leaf':'<path d="M21 3c-8 0-14 2-16 8-2 5 1 9 6 9 7 0 10-8 10-17Z"/><path d="M5 20c4-7 8-10 13-12"/>',
    'refresh':'<path d="M20 5v5h-5M4 19v-5h5M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4"/>',
    'arrow-right':'<path d="M4 12h16m0 0-6-6m6 6-6 6"/>'
  };
  const I = (name, size=18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.info}</svg>`;
  const escapeHTML = (v) => String(v??'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const label = (text, style='') => `<span class="micro-tag ${style}">${escapeHTML(text)}</span>`;
  const DATA_NOTE = 'All values on this page are fictional demonstration data, not live SCIE measurements.';
  const cn = (msg) => `<p class="cn-note">${escapeHTML(msg)}</p>`;
  const e = (v) => escapeHTML(v);

  const roomRecords = [
    {id:'A201',building:'A',floor:'2',capacity:32,base:'occupied',next:'11:40',sensor:true,co2:912,temp:24.9,rh:60,lux:428},
    {id:'A203',building:'A',floor:'2',capacity:28,base:'available',next:'13:20',sensor:true,co2:588,temp:25.1,rh:56,lux:490},
    {id:'A205',building:'A',floor:'2',capacity:32,base:'scheduled',next:'12:25',sensor:false,co2:820,temp:24.3,rh:59,lux:399},
    {id:'A306',building:'A',floor:'3',capacity:30,base:'unknown',next:'14:15',sensor:false,co2:730,temp:24.7,rh:57,lux:458},
    {id:'B201',building:'B',floor:'2',capacity:36,base:'available',next:'15:00',sensor:true,co2:567,temp:25.6,rh:62,lux:510},
    {id:'B212',building:'B',floor:'2',capacity:30,base:'occupied',next:'11:40',sensor:true,co2:1015,temp:24.6,rh:57,lux:373},
    {id:'B305',building:'B',floor:'3',capacity:32,base:'scheduled',next:'12:25',sensor:false,co2:879,temp:24.1,rh:54,lux:435},
    {id:'G105',building:'A',floor:'G',capacity:26,base:'available',next:'16:10',sensor:true,co2:611,temp:25.4,rh:61,lux:450}
  ];
  const buildingData = {
    A:{name:'Teaching Building A',cn:'A 栋教学楼',floors:8,rooms:68,description:'Classrooms, laboratories, corridors and elevator access.',energy:134,temperature:24.8,co2:810},
    B:{name:'Teaching Building B',cn:'B 栋教学楼',floors:7,rooms:61,description:'Teaching rooms and shared learning spaces.',energy:117,temperature:25.3,co2:768},
    D:{name:'Student Residence',cn:'宿舍楼',floors:7,rooms:74,description:'Accommodation and student common facilities.',energy:89,temperature:25.5,co2:700}
  };
  const MODS = [
    {id:'M01',name:'3D Modelling & Spatial Accuracy',cn:'三维建模及空间准确性',priority:'P0',rec:'Proceed',time:'Ongoing — core 3D model targeted by December 2026',desc:'Accurate geometry and reliable room labels are prerequisites for room-linked data.',tasks:['Verify official floor plans and room ratios','Continue Blender modelling; optimise GLB for browser use','Check selected rooms against the school floor plans'],support:'Accurate floor plans, suitable PCs (e.g. A417A), school contact to validate rooms.',stop:'If accurate drawings are unavailable, keep it a labelled visual demonstration.'},
    {id:'M02',name:'Room IDs & Spatial Database',cn:'空间编号与数据库',priority:'P0',rec:'Proceed',time:'1–2 weeks after room list approval',desc:'Connect a physical classroom, its 3D object and every future dataset to one stable identifier.',tasks:['Confirm building/floor/room taxonomy','Assign consistent Location IDs and metadata','Test joins between room entries and model objects'],support:'Official room list, agreed naming convention, designated reviewer.',stop:'Use pilot-floor IDs first if the campus-wide room list is incomplete.'},
    {id:'M03',name:'Website & 3D Viewer',cn:'网页和三维浏览器',priority:'P0',rec:'Proceed',time:'2–4 weeks for pilot integration',desc:'Turn the existing simulation into a modular interface with clearly labelled real/demo states.',tasks:['Keep simulation features separated into modules','Load a browser-friendly GLB model','Display room details and explicit demo/live flags'],support:'Hosting policy review, permission to keep an external concept demo.',stop:'If 3D web performance is poor, offer a 2D room selector with 3D as optional.'},
    {id:'M04',name:'Backend, API & Hosting',cn:'后端、接口和托管',priority:'P0',rec:'Proceed',time:'2–4 weeks for a small proof of concept',desc:'A reliable flow for approved data, timestamps, validations and backups.',tasks:['Design database and API schema','Connect one approved non-sensitive source','Check missing/stale readings and recovery'],support:'ICT network, hosting, security and account review.',stop:'Continue in an isolated test environment if production access is unavailable.'},
    {id:'M05',name:'Environmental Sensors',cn:'CO₂、温湿度与光照监测',priority:'P1',rec:'Pilot',time:'2 weeks setup + 2–3 weeks validation',desc:'Low-voltage classroom measurements to support ventilation and comfort analysis.',tasks:['Select 2–3 representative rooms','Test CO₂, temperature, humidity and lux sensors','Upload timestamped readings; validate placement and data quality'],support:'Room installation approval, ICT network/gateway guidance, small prototype budget.',stop:'Use supervised portable offline logging if permanent mounting or networks are not approved.'},
    {id:'M06',name:'Anonymous Occupancy Sensors',cn:'匿名占用检测',priority:'P1',rec:'Pilot',time:'2–4 weeks of controlled testing',desc:'Evaluate whether non-camera sensing can identify room-level presence reliably.',tasks:['Test mmWave/PIR sensing methods','Check stationary people, corridor false detections','Measure false-positive and false-negative rates'],support:'Permission to test selected rooms and privacy review.',stop:'Do not publish room availability from inaccurate sensors.'},
    {id:'M07',name:'Timetable Data Access',cn:'课程表数据接入',priority:'P1',rec:'Pilot',time:'1–2 weeks after authorised export',desc:'Provide scheduled classroom use without using personal student timetables.',tasks:['Request approved room-level CSV','Map room names to spatial IDs','Define schedule refresh and stale-data display'],support:'Authorised export and a timetable-data contact.',stop:'Remain demo-only if school schedule sharing is unavailable.'},
    {id:'M08',name:'Smart Study Spaces',cn:'自习空间状态',priority:'P2',rec:'Defer',time:'1–2 weeks after M06 + M07 validation',desc:'Combine scheduled use and measured presence, without changing school room policy.',tasks:['Create transparent AVAILABLE / OCCUPIED / SCHEDULED / UNKNOWN rules','Exclude rooms not approved for self-study','Validate with representative student observations'],support:'Permission to display selected room statuses; school-use policy clarity.',stop:'Do not recommend rooms if timetable or presence data are unreliable.'},
    {id:'M09',name:'Existing Electricity Data Access',cn:'现有电量数据可访问性',priority:'P1',rec:'Pilot',time:'1–2 weeks for initial audit (dependent on staff)',desc:'Determine whether reliable metered electricity records can actually be accessed.',tasks:['Audit smart meters and historical electricity records','Document meter coverage: campus, building, floor or circuit','Test a small approved data export'],support:'Facilities/ICT contact and permission to review meter records.',stop:'Defer any real electricity claims if useful approved data are not available.'},
    {id:'M10',name:'Energy Dashboard & Reporting',cn:'能源可视化与环保报告',priority:'P1',rec:'Defer',time:'2–3 weeks after M09 data access',desc:'Compare verified electricity trends and support sustainability evaluation.',tasks:['Build charts only at actual meter granularity','Compare similar teaching days and after-hours usage','Prepare cautious pilot sustainability summary'],support:'Approved meter records and permission to display aggregate data.',stop:'If only monthly bills are accessible, provide monthly summaries—not fake real-time figures.'},
    {id:'M11',name:'Elevator Waiting-Time Estimate',cn:'电梯等待时间预测',priority:'P3',rec:'Defer',time:'3–4 weeks of observation and validation',desc:'Optional, mainly student-facing forecast using real waiting-time observations.',tasks:['Record anonymous wait times at selected lesson transitions','Compute historical baselines and prediction error','Consider vendor read-only data only if approved'],support:'Observation approval; optional provider contact.',stop:'Drop if predictions are unreliable or benefits too small.'},
    {id:'M12',name:'Facilities & ICT Reporting',cn:'设施与信息技术报修',priority:'P2',rec:'Defer',time:'2–3 weeks after workflow clarification',desc:'Location-linked equipment records, avoiding duplicate staff reporting workflows.',tasks:['Map existing report/repair process','Prototype a room-linked equipment record','Integrate only if staff confirm it adds value'],support:'Facilities and ICT workflow review.',stop:'Drop if the school already has a better system or integration adds workload.'},
    {id:'M13',name:'Navigation & Room Search',cn:'房间搜索和三维导航',priority:'P1',rec:'Proceed',time:'1–2 weeks after room mapping',desc:'Low-cost reuse of the 3D model, with search and location highlighting.',tasks:['Map approved room codes to model objects','Highlight rooms in the viewer','Test wayfinding with new students or visitors'],support:'Verified room/entrance list.',stop:'Offer search/highlight first; defer full indoor routes if corridors are not mapped.'},
    {id:'M14',name:'Cross-System Analytics & AI',cn:'跨系统分析与机器学习',priority:'P3',rec:'Defer',time:'After sufficient validated historical data',desc:'Connect datasets only where location, time, accuracy and purpose align.',tasks:['Start with simple transparent comparisons','Check compatibility of measurements and time intervals','Compare future predictions with simple baselines'],support:'Approved shared data and a practical management question.',stop:'Do not train AI if there is insufficient data or no measurable benefit.'},
    {id:'M15',name:'Privacy, Security & Ownership',cn:'隐私、安全和长期维护',priority:'P0',rec:'Proceed',time:'Review begins with Phase 0; ongoing',desc:'Required governance gate before any school-wide deployment.',tasks:['Avoid personal identification and unnecessary data','Define role-based access, backup and maintenance owners','Require school approval before real data publication'],support:'School sponsor, ICT security reviewer and long-term ownership decision.',stop:'Without approval, retain a restricted simulation or supervised research prototype.'}
  ];
  const getStored = () => { try {return JSON.parse(localStorage.getItem('scie_feas_decisions_v1')||'{}')}catch{return {}}};
  const state = { page:'overview', scenario:'school',building:'A',floor:'2',zoom:1,environmentRoom:'A201',envOccupancy:26,energyBuilding:'A',energyPeriod:'day',energyAnomaly:true,roomFilter:'all',studySelected:'A203',elevatorBuilding:'A',elevatorPeriod:'break',navigatorFrom:'Main Gate',navigatorTo:'A201',tickets:[{id:'DEMO-1042',room:'A201',item:'Projector',issue:'HDMI signal occasionally missing',status:'In review'},{id:'DEMO-1039',room:'B201',item:'Speaker',issue:'Audio output intermittent',status:'Open'},{id:'DEMO-1036',room:'A203',item:'Air conditioner',issue:'Cooling performance inconsistent',status:'Resolved'}],moduleDecisions:getStored(),moduleFilter:'all',mapLayer:'structure',focusModule:'M09',mobileOpen:false,presentation:false };
  const savedDecision = (m)=>state.moduleDecisions[m.id]||m.rec;
  const scenarioNames={school:'Teaching day / 教学日',after:'After hours / 放学后',event:'Campus event / 活动日'};
  const statusInfo={available:['AVAILABLE','green'],occupied:['OCCUPIED','amber'],scheduled:['SCHEDULED','blue'],unknown:['UNKNOWN','']};

  function pageHeading(eyebrow,title,lead,cnText,action=''){
    return `<div class="heading-row"><div><div class="eyebrow">${eyebrow}</div><h1 class="page-title">${title}</h1><p class="page-lead">${lead}</p>${cnText?cn(cnText):''}</div>${action}</div>`;
  }
  const NAV_GROUPS = [
    {title:'PROJECT OVERVIEW',subtitle:'Start here',ids:['overview','digital-twin','campus','architecture']},
    {title:'FUNCTION DEMONSTRATIONS',subtitle:'Try each feature',ids:['energy','environment','study','elevator','maintenance','navigation']},
    {title:'IMPLEMENTATION & DECISIONS',subtitle:'Leadership resources',ids:['feasibility','roadmap','case-studies','leadership','about']}
  ];
  function navHTML(){
    return NAV_GROUPS.map((g,idx)=>{
      const active=g.ids.includes(state.page);
      const initiallyOpen=idx===0 || idx===1 || active;
      return `<details class="sidebar-group" ${initiallyOpen?'open':''}>
        <summary class="sidebar-group-title"><span>${g.title}<small>${g.subtitle}</small></span>${I('chevron-right',14)}</summary>
        <div class="sidebar-links">${g.ids.map(id=>{const p=pages.find(x=>x.id===id);return `<button type="button" class="nav-item ${state.page===id?'active':''}" data-page="${id}" aria-current="${state.page===id?'page':'false'}">${I(p.icon,16)} <span>${p.title}</span></button>`;}).join('')}</div>
      </details>`;
    }).join('');
  }
  function renderShell(){
    const current=pages.find(p=>p.id===state.page)||pages[0];
    document.getElementById('app').innerHTML=`<div class="app-shell">
      <aside class="sidebar ${state.mobileOpen?'open':''}" id="sideNav">
        <div class="brand"><div class="brand-mark">${I('boxes',22)}</div><div><div class="brand-title">SCIE <span style="color:#7de4d3">Digital Twin</span></div><div class="brand-sub">Sustainable campus</div></div></div>
        ${navHTML()}
        <div class="sidebar-bottom"><div class="sidebar-callout"><strong>${I('shield',15)} &nbsp;Honest demo</strong><p>All room statuses, meter readings and charts are simulated. No live school systems are connected.</p><a class="sidebar-url" href="${ORIGINAL_DEMO}" target="_blank" rel="noopener noreferrer">Original project demo ↗</a></div><div class="sidebar-foot">Global Citizenship · SCIE<br/>Project concept · 2026</div></div>
      </aside>
      <div class="main-area"><header class="topbar"><div class="breadcrumb"><button class="icon-button mobile-menu" data-action="menu" aria-label="Open navigation">${I('menu',16)}</button><span>Sustainable Campus</span><span style="color:#c7d4da">/</span><strong>${current.title}</strong></div><div class="top-actions"><span class="demo-mark">●&nbsp; SIMULATED DATA</span><select class="scenario-control ${['energy','environment','study','elevator'].includes(state.page)?'':'scenario-hidden'}" id="scenarioSelect" aria-label="Demo scenario"><option value="school" ${state.scenario==='school'?'selected':''}>School day</option><option value="after" ${state.scenario==='after'?'selected':''}>After hours</option><option value="event" ${state.scenario==='event'?'selected':''}>Campus event</option></select><button class="icon-button" data-action="presentation" title="Toggle presentation mode" aria-label="Presentation mode">${I('maximize',15)}</button></div></header>
      <main class="content" id="mainContent">${renderPage()}<div class="footer-disclaimer"><span>SCIE Sustainable Campus Digital Twin · Interactive leadership concept · <strong>Simulation only</strong></span><a href="${ORIGINAL_DEMO}" target="_blank" rel="noopener noreferrer">Existing SCIE demo ↗</a></div></main></div>
    </div>`;
    document.body.classList.toggle('presentation',state.presentation);
    if (window.SCIE3D) window.SCIE3D.mount(document.getElementById('scie-canvas'),{
      building:state.building, layer:state.mapLayer||'structure',zoom:state.zoom,
      onSelect:(zone)=>{state.building=zone;renderShell()}
    });
  }
  function renderPageCore(){switch(state.page){case'overview':return overviewPage();case'digital-twin':return digitalTwinPage();case'architecture':return architecturePage();case'campus':return campusPage();case'case-studies':return caseStudiesPage();case'leadership':return leadershipPage();case'energy':return energyPage();case'environment':return environmentPage();case'study':return studyPage();case'elevator':return elevatorPage();case'maintenance':return maintenancePage();case'navigation':return navigationPage();case'feasibility':return feasibilityPage();case'roadmap':return roadmapPage();case'about':return aboutPage();default:return overviewPage()}}
  const FEATURE_GUIDES={
    campus:{label:'3D Campus Model',cn:'三维校园建模',moduleIds:['M01','M02','M03'],benefit:'One consistent spatial model that future applications can reuse.',benefitCN:'让未来的不同模块复用同一个可靠的校园空间基础。',decision:'Confirm accurate drawings, room IDs and a web-ready model before attempting real navigation.'},
    energy:{label:'Energy & Sustainability',cn:'能源与可持续发展监测',moduleIds:['M09','M10'],benefit:'Measured electricity trends can help SCIE investigate inefficiencies and evaluate approved sustainability action.',benefitCN:'用真实电量数据支持设施调查，并评估学校实际节能措施，而不是仅展示图表。',decision:'First approve a meter-data feasibility audit. Proceed with live monitoring only if reliable approved records exist.'},
    environment:{label:'Environmental Monitoring',cn:'教室环境监测',moduleIds:['M05'],benefit:'Long-term CO₂ and thermal-condition records can help investigate ventilation-related issues without diagnosing health.',benefitCN:'持续记录 CO₂、温湿度，辅助调查教室通风和舒适度问题。',decision:'Select 2–3 pilot rooms and confirm safe low-voltage sensor installation and network rules.'},
    study:{label:'Study-space Availability',cn:'自习空间状态',moduleIds:['M06','M07','M08'],benefit:'Better use of shared study spaces, while respecting current school access rules.',benefitCN:'提高空间使用效率，但不改变学校教室使用制度，也不推出新订座规定。',decision:'Only enable real availability status after both anonymous occupancy and approved room schedules are validated.'},
    elevator:{label:'Elevator Waiting-time',cn:'电梯等待时间预测',moduleIds:['M11'],benefit:'Useful travel-time estimates may support student movement, but this is a lower-priority optional module.',benefitCN:'可作为校园生活便利的附加功能，但不是 GC 试点核心，不控制电梯。',decision:'Pilot only if leadership considers this useful enough to justify real waiting-time observations.'},
    maintenance:{label:'Facilities & ICT',cn:'设施与报修',moduleIds:['M12'],benefit:'Room-linked equipment histories may support existing repair workflows without duplicating them.',benefitCN:'让设备记录与具体位置关联，但不能增加 ICT 和 Facilities 的重复工作。',decision:'Ask school staff whether a location-based interface adds value to the existing reporting process.'},
    navigation:{label:'Campus Navigation',cn:'三维校园导航',moduleIds:['M13'],benefit:'Students and visitors can locate rooms using existing 3D geometry and verified location IDs.',benefitCN:'复用已完成的建模和房间编号，帮助访客或新生查找地点。',decision:'Begin with room search and highlighting; delay full route planning until corridor links are verified.'}
  };
  function implementationModuleCard(m){
    const x=MODULE_EXTRAS[m.id];
    const status=savedDecision(m);
    const steps=m.tasks.map((step,i)=>`<div class="build-step"><span class="build-step-count">${i+1}</span><span>${e(step)}</span></div>`).join('');
    return `<article class="build-package" aria-label="Implementation for ${e(m.name)}">
      <header class="build-package-head"><div><span class="module-eyebrow">${e(m.id)} · ${e(m.priority)} WORK PACKAGE</span><h3>${e(m.name)}</h3><p class="package-cn">${e(m.cn)}</p></div><span class="build-status ${status.toLowerCase()}">${e(status)}</span></header>
      <p class="build-desc">${e(m.desc)}</p>
      <div class="build-package-grid"><div class="build-primary"><h4>Technical steps <span>技术步骤</span></h4>${steps}</div>
        <div class="build-secondary"><div><b>${I('clock',14)} Estimated time / 时间</b><p>${e(m.time)}</p></div><div><b>${I('building',14)} Support needed / 学校支持</b><p>${e(m.support)}</p></div><div><b>${I('check',14)} Evidence of feasibility / 验收证据</b><p>${e(x.proof)}</p></div></div>
      </div>
      <details class="implementation-more"><summary>Read technical dependencies, decision gate & fallback ${I('chevron-right',14)}</summary><div class="impl-more-grid"><div><b>Inputs / 前提</b><p>${e(x.dependencies)}</p></div><div><b>Decision gate / 判断条件</b><p>${e(x.gate)}</p></div><div><b>Cost driver / 成本</b><p>${e(x.cost)}</p></div><div><b>Fallback / 替代方案</b><p>${e(m.stop)} ${e(x.fallback)}</p></div></div></details>
    </article>`;
  }
  function implementationGuide(id){
    const cfg=FEATURE_GUIDES[id];if(!cfg)return '';
    const packages=cfg.moduleIds.map(mid=>MODS.find(m=>m.id===mid)).filter(Boolean);
    return `<section class="implementation-guide" aria-label="Implementation guide for ${e(cfg.label)}">
      <div class="step-section-label"><span class="section-number">02</span><div><span>IMPLEMENTATION PLAN</span><h2>How we would build this</h2><p>Technical steps, realistic time estimates and the support needed from SCIE.</p><small>实施方案：技术步骤、时间预估、学校需提供的资源</small></div></div>
      <div class="build-package-list">${packages.map(implementationModuleCard).join('')}</div>
      <div class="implementation-bottom-grid"><div class="outcome-card"><div class="outcome-overline">EXPECTED VALUE / 项目意义</div><p>${e(cfg.benefit)}</p><small>${e(cfg.benefitCN)}</small></div>
      <div class="decision-card"><div class="outcome-overline">03 / LEADERSHIP DECISION</div><p>${e(cfg.decision)}</p><button class="primary-btn" data-action="focus-module" data-module="${e(packages.at(-1).id)}">Review feasibility ${I('arrow-right',13)}</button></div></div>
    </section>`;
  }
  function renderPage(){
    const core=renderPageCore();
    if(!FEATURE_GUIDES[state.page])return core;
    return `<div class="demo-page"><div class="demo-progress" aria-label="Page sections"><button type="button" class="demo-progress-active" data-action="jump-demo">01 · Try the demonstration</button><button type="button" data-action="jump-impl">02 · Implementation</button><button type="button" data-action="jump-decision">03 · Decision</button></div>${core}${implementationGuide(state.page)}</div>`;
  }


  function campusMap(height='normal'){
    return `<div class="map-stage ${height==='large'?'map-stage-large':''}"><div class="map-chip">${I('layers',11)} &nbsp; RECONSTRUCTED FROM BLENDER REFERENCE · APPROXIMATE</div><canvas id="scie-canvas" class="campus-canvas" role="img" aria-label="Interactive three dimensional approximate SCIE campus model with connected teaching wings and towers. Drag to rotate, scroll to zoom, select zones."></canvas><div class="map-tool-actions"><button class="secondary-btn" type="button" data-action="reset-camera" title="Reset 3D camera">${I('refresh',13)} Reset view</button></div><div class="map-bottom"><div class="map-legend"><span><i class="legend-dot"></i> Select zone:</span><button class="model-zone-btn" data-select-zone="A">A</button><button class="model-zone-btn" data-select-zone="B">B</button><button class="model-zone-btn" data-select-zone="D">Dorm</button><span><i class="legend-dot amber"></i> Model-inspired · not survey-grade</span></div><div class="map-zoom"><button data-action="zoom-out" aria-label="Zoom out">−</button><button data-action="zoom-in" aria-label="Zoom in">+</button></div></div></div>`;
  }
  function buildingInsight(){
    const b=buildingData[state.building];
    return `<div class="insight-panel"><div class="insight-label">SELECTED ZONE / 选中区域</div><div class="insight-large">${e(b.name)}</div><p class="insight-desc">${e(b.description)} Click a building on the approximate Blender-derived massing to inspect the linked concept modules.</p><div class="selection-meta">${label(`BLDG ${state.building}`,'teal')}${label(`${b.floors} FLOORS`)}${label('APPROXIMATE MODEL')}</div><div class="insight-divider"></div><div class="detail-kv"><span>Conceptual floors</span><span>${b.floors}</span></div><div class="detail-kv"><span>Sample power</span><span>${b.energy} kW <span style="font-size:10px;color:#8ba0a8">DEMO</span></span></div><div class="detail-kv"><span>Sample temperature</span><span>${b.temperature.toFixed(1)} °C <span style="font-size:10px;color:#8ba0a8">DEMO</span></span></div><div class="detail-kv"><span>Data connection</span><span style="color:#ad6d33">Simulation only</span></div></div><div class="insight-foot"><strong>${I('leaf',15)} &nbsp; Sustainability first</strong><p>Real deployment starts with verified room data and approved sensors, not with all seven applications at once.</p></div>`;
  }
  function stat(iconName,small,num,suffix,detail){return `<div class="card stat-card"><div class="stat-upper"><span>${e(small)}</span><span class="stat-icon">${I(iconName,16)}</span></div><div class="stat-number">${num}<span class="stat-suffix">${e(suffix||'')}</span></div><div class="stat-desc">${detail}</div></div>`;}
  function feature(title,desc,iconName,page,tag='MODULE'){
    return `<div class="card feature-item"><div class="feature-top"><span class="feature-icon">${I(iconName,18)}</span><div><h3>${title}</h3>${label(tag,'teal')}</div></div><p>${desc}</p><button data-page="${page}">Explore module ${I('arrow-right',12)}</button></div>`;
  }
  function overviewPage(){
    return pageHeading('CAMPUS INTELLIGENCE PLATFORM','A smarter, more sustainable SCIE.','An interactive concept showing how a connected 3D campus could make sustainability data and shared facilities easier to understand.','现阶段是交互式模拟网站，不代表已经接入学校实际设备。',`<a class="link-button" href="${ORIGINAL_DEMO}" target="_blank" rel="noopener noreferrer">${I('external-link',15)} Existing SCIE demo</a>`)+
    `<div class="top-grid"><div class="card"><div class="card-header"><div><div class="card-title">Campus Digital Twin</div><p class="card-sub">Select a building · Approximate SCIE massing based on the Blender demo</p></div>${label('INTERACTIVE DEMO','teal')}</div><div class="map-wrap">${campusMap()}</div></div><div class="card right-insight">${buildingInsight()}</div></div>
    <div class="stats-grid">${stat('building','Campus zones','03','','Approximate massing derived from the Blender demo')}${stat('book-open','Example study rooms','08','','Simulated status records')}${stat('activity','Connected live feeds','0','','No real school sensor or meter access')}${stat('clipboard-check','Independent modules','15','','Proceed, pilot, defer or drop')}</div>
    <div class="heading-row" style="margin-bottom:10px"><h2 class="section-title" style="margin:0">Explore the platform</h2>${label('CHOOSE ANY MODULE')}</div>
    <div class="three-cols">${feature('Energy & Sustainability','Explore electricity trends, anomalies and carbon estimates. All values are illustrative.','zap','energy','GC PRIORITY')}${feature('Environmental Monitoring','Explore classroom CO₂, temperature and humidity scenarios.','wind','environment','GC PRIORITY')}${feature('Study-space Availability','See how room timetables and anonymous presence sensing may combine.','book-open','study','CONDITIONAL')}${feature('Elevator Forecast','Compare historical waiting-time estimates at different school periods.','arrow-up-down','elevator','OPTIONAL')}${feature('Facilities & ICT','Demonstrate location-linked maintenance tickets without filing real reports.','wrench','maintenance','OPTIONAL')}${feature('Feasibility Decision Lab','Decide module by module what should proceed, be piloted or be postponed.','clipboard-check','feasibility','LEADERSHIP')}</div>
    <div class="module-preview"><div><h3>${I('check',15)} 3D modelling already in progress</h3><p>The website now uses an approximate campus massing derived from the user-provided Blender model, and the full progress screenshot remains available in Progress & Roadmap.</p></div><button class="secondary-btn" data-page="roadmap">View project progress ${I('arrow-right',14)}</button></div>`;
  }
  function campusPage(){
    const b=buildingData[state.building];
    return pageHeading('SPATIAL INFRASTRUCTURE','3D Campus Explorer','This approximate 3D scene is rebuilt from the current Blender screenshot so the website visually reflects the real SCIE modelling direction rather than a random placeholder campus. Room IDs will eventually connect approved datasets to physical locations.','当前场景已经改为依据你们现有 Blender 建模截图重做的近似模型，不再是随机占位图；真正高精度的 SCIE 几何建模仍在 Blender 进行，目标于 2026 年底完成。')+
      `<div class="top-grid"><div class="card"><div class="card-header"><div><h3 class="card-title">Campus model · Approximate Blender-derived view</h3><div class="card-sub">Click a building to select it</div></div>${label('BLENDER-DERIVED','blue')}</div><div class="map-wrap">${campusMap('large')}</div></div><div class="card right-insight">${buildingInsight()}</div></div>
      <h2 class="section-title">Location database preview</h2><div class="two-cols"><div class="card card-pad"><h3 class="card-title">Select floor & room</h3><div class="controls-row"><label for="floorSelect">Floor</label><select id="floorSelect" class="select">${['G','1','2','3','4','5','6','7'].map(f=>`<option value="${f}" ${state.floor===f?'selected':''}>Floor ${f}</option>`).join('')}</select><span class="hint-text">${e(b.name)}</span></div><div class="info-list">${roomRecords.filter(r=>r.building===state.building&&r.floor===state.floor).slice(0,5).map(r=>`<div class="info-item"><span class="num">${I('building',14)}</span><div><b>${r.id} &nbsp; ${label('ROOM RECORD')}</b><p>Example Location ID: ${r.building}-F${r.floor==='G'?'G':r.floor.padStart(2,'0')}-R${r.id.slice(1)} · Sample data only</p></div></div>`).join('')||`<div class="empty-state">No sample room records for this conceptual floor.</div>`}</div></div><div class="card hero-photo"><h3>Actual modelling progress / 真实建模进度</h3><img src="./assets/scie-blender-progress.webp" alt="User-provided screenshot showing SCIE campus 3D modelling work in Blender"/><p class="small-print">Real Blender screenshot supplied by the project team. Unlike the interactive schematic, this shows actual modelling work in progress. Core modelling target: end of 2026.</p><button class="secondary-btn" data-page="roadmap">Technical roadmap ${I('arrow-right',13)}</button></div></div>`;
  }
  function seededEnergy(){
    const hours=Array.from({length:24},(_,i)=>i);
    const b={A:1,B:.87,D:.63}[state.energyBuilding]||1;
    const vals=hours.map(h=>{
      let base=20+Math.max(0,Math.sin((h-5)/17*Math.PI))*99 + (Math.sin(h*2.3)+1)*6;
      if(h<7||h>20)base=24+(Math.sin(h*1.1)+1)*4;
      if(state.scenario==='after')base=19+(Math.sin(h*1.1)+1)*5;
      if(state.scenario==='event')base*=h>=17&&h<=22?1.65:1.02;
      if(state.energyAnomaly&&h===21&&state.scenario==='school')base+=59;
      return Math.round(base*b);
    });
    return vals;
  }
  function lineChart(series,baseSeries,opts={}){
    const w=800,h=280,L=49,R=20,T=26,B=35,sw=w-L-R,sh=h-T-B;
    const length=series.length;
    const all=[...series,...(baseSeries||[])],max=Math.max(10,Math.ceil(Math.max(...all)*1.12/20)*20),min=opts.min??0;
    const px=i=>L+(i/Math.max(1,length-1))*sw;
    const py=v=>T+sh-(v-min)/(max-min)*sh;
    const path=values=>values.map((v,i)=>`${i?'L':'M'}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(' ');
    const area=`${path(series)} L${px(length-1)},${T+sh} L${px(0)},${T+sh} Z`;
    const uid='g'+(opts.id||'main');
    const grid=Array.from({length:5},(_,i)=>{const yy=T+i*sh/4;return `<line x1="${L}" x2="${w-R}" y1="${yy}" y2="${yy}" stroke="#e8eff1" stroke-dasharray="3 5"/><text x="${L-10}" y="${yy+4}" text-anchor="end" font-size="10" fill="#90a5af">${Math.round(max-i*(max-min)/4)}</text>`}).join('');
    const ticks=[0,Math.floor((length-1)/4),Math.floor((length-1)/2),Math.floor(3*(length-1)/4),length-1].map(i=>`<text x="${px(i)}" y="${h-7}" text-anchor="middle" font-size="10" fill="#8ba3ad">${opts.labels?opts.labels[i]:i}</text>`).join('');
    return `<svg viewBox="0 0 ${w} ${h}" class="chart-svg" role="img" aria-label="Simulated ${opts.title||'line chart'}"><defs><linearGradient id="${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1ca996" stop-opacity=".18"/><stop offset="1" stop-color="#1ca996" stop-opacity=".015"/></linearGradient></defs>${grid}<path d="${area}" fill="url(#${uid})"/>${baseSeries?`<path d="${path(baseSeries)}" fill="none" stroke="#b3cbd3" stroke-width="2.3" stroke-dasharray="5 7"/>`:''}<path d="${path(series)}" fill="none" stroke="#13a18e" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round"/>${series.map((v,i)=>i%Math.max(1,Math.ceil(length/13))===0?`<circle cx="${px(i)}" cy="${py(v)}" r="2.6" fill="#11a18e" stroke="#fff" stroke-width="1.2"/>`:'').join('')}${ticks}</svg>`;
  }
  function energyPage(){
    const v=seededEnergy(),baseline=v.map((n,i)=>Math.round((22+Math.max(0,Math.sin((i-5)/17*Math.PI))*94+(Math.sin(i*.5)+1)*2)*({A:1,B:.87,D:.63}[state.energyBuilding])));
    const daily=v.reduce((a,b)=>a+b,0),peak=Math.max(...v);const excess=Math.max(0,v[21]-baseline[21]);
    const carbonFactor=.52; // fictional educational example factor, not an official emission factor
    const labels=Array.from({length:24},(_,i)=>`${String(i).padStart(2,'0')}:00`);
    return pageHeading('GC PRIORITY · RESOURCE STEWARDSHIP','Energy & Sustainability','Explore historical comparisons, simulated anomaly alerts and electricity-related carbon estimates. Real monitoring depends on approved school meter data.','这里的耗电量、CO₂e 和异常提醒全是模拟，实际电表数据能否取得仍需学校确认。')+
      `<div class="controls-row"><label for="energyBuilding">Building / 建筑</label><select id="energyBuilding" class="select">${Object.keys(buildingData).map(b=>`<option value="${b}" ${state.energyBuilding===b?'selected':''}>${e(buildingData[b].name)}</option>`).join('')}</select><span class="micro-tag amber">FICTIONAL EXAMPLE READINGS</span><label class="switch"><input type="checkbox" id="energyAnomaly" ${state.energyAnomaly?'checked':''}/> Include anomaly</label></div>
      <div class="stats-grid">${stat('zap','Daily electricity',daily.toLocaleString(),' kWh','Example: sum of hourly simulated loads')}${stat('activity','Peak power',peak,' kW','Maximum simulated hourly reading')}${stat('leaf','Estimated emissions',(daily*carbonFactor/1000).toFixed(2),' t','Illustrative factor: 0.52 kg CO₂e / kWh')}${stat('clock','Unexpected load',excess,' kW','Illustrative 21:00 spike vs baseline')}</div>
      <div class="two-cols"><div class="card chart-card"><div class="chart-head"><div><h3>Electricity usage trend</h3><div class="chart-caption">Simulated power (kW) · 24-hour comparison</div></div>${label('NOT LIVE','amber')}</div>${lineChart(v,baseline,{labels,id:'energy',title:'electricity power'})}<div class="chart-legend"><span>Simulated consumption</span><span class="line2">Illustrative baseline</span></div></div><div class="card card-pad"><h3 class="card-title">What can the school learn?</h3><div class="info-list"><div class="info-item"><span class="num">01</span><div><b>Monitor / 监测</b><p>Compare approved building-level readings across comparable days.</p></div></div><div class="info-item"><span class="num">02</span><div><b>Investigate / 调查</b><p>Flag unusual patterns for Facilities to review. An anomaly is not proof of waste.</p></div></div><div class="info-item"><span class="num">03</span><div><b>Evaluate / 评估</b><p>Measure results of actual school-approved energy interventions.</p></div></div></div><div class="spacer20"></div><div class="callout amber"><b>Reality check:</b> A digital dashboard does not save electricity on its own. Meter access and actual interventions determine real-world value.</div></div></div>
      <h2 class="section-title">From demo to real deployment</h2><div class="card card-pad"><div class="flow-card"><span class="flow-node">Meter data audit</span><span class="flow-arrow">→</span><span class="flow-node">Approved kWh records</span><span class="flow-arrow">→</span><span class="flow-node">Verified time + location</span><span class="flow-arrow">→</span><span class="flow-node">Real trend dashboard</span><span class="flow-arrow">→</span><span class="flow-node">Sustainability review</span></div><p class="small-print">Room-level readings cannot be inferred accurately from a single building meter. The interface must display only the actual meter's coverage.</p><button data-action="focus-module" data-module="M09" class="secondary-btn" style="margin-top:14px">Review energy feasibility ${I('arrow-right',13)}</button></div>`;
  }
  function environmentSeries(){
    const room=roomRecords.find(r=>r.id===state.environmentRoom)||roomRecords[0];
    const mul=state.scenario==='after'?.34:state.scenario==='event'?1.18:1;
    const occ=state.envOccupancy;
    return Array.from({length:18},(_,i)=>Math.round(450+(room.co2-480)*Math.min(1,i/12)*mul*(occ/26)+Math.sin(i*.8)*26));
  }
  function environmentPage(){
    const r=roomRecords.find(x=>x.id===state.environmentRoom)||roomRecords[0];
    const occ=state.envOccupancy;const series=environmentSeries();const co2=series.at(-1);const tone=co2>=1100?'rose':co2>=850?'amber':'teal';
    const offset=state.scenario==='after'?-.9:state.scenario==='event'?.5:0;
    return pageHeading('GC PRIORITY · INDOOR CONDITIONS','Environmental Monitoring','Explore CO₂, temperature, humidity and illuminance with a simulated classroom sensor node. Adjust occupancy to demonstrate the relationship with CO₂ trends.','CO₂ 是通风相关条件的参考指标，不代表完整空气质量，也不能对学生作健康诊断。')+
      `<div class="controls-row"><label for="envRoom">Example classroom</label><select id="envRoom" class="select">${roomRecords.map(r=>`<option value="${r.id}" ${state.environmentRoom===r.id?'selected':''}>Room ${r.id}</option>`).join('')}</select><label for="envOccupancy">Simulated occupants: <strong id="occupantNumber">${occ}</strong></label><input class="slider" id="envOccupancy" type="range" min="0" max="40" value="${occ}"/><span class="micro-tag amber">SIMULATION</span></div>
      <div class="card card-pad"><div class="meter-grid"><div class="meter"><h4>CO₂ CONCENTRATION</h4><strong>${co2}<em> ppm</em></strong><div class="progress"><div class="bar ${tone==='rose'?'rose':tone==='amber'?'amber':''}" style="width:${Math.min(100,co2/1600*100)}%"></div></div></div><div class="meter"><h4>TEMPERATURE</h4><strong>${(r.temp+offset).toFixed(1)}<em> °C</em></strong><div class="progress"><div class="bar" style="width:56%"></div></div></div><div class="meter"><h4>RELATIVE HUMIDITY</h4><strong>${r.rh}<em> %</em></strong><div class="progress"><div class="bar" style="width:${r.rh}%"></div></div></div><div class="meter"><h4>ILLUMINANCE</h4><strong>${r.lux}<em> lux</em></strong><div class="progress"><div class="bar" style="width:${r.lux/7}%"></div></div></div></div><div class="callout"><b>Interpretation:</b> CO₂ can rise in occupied spaces when outdoor-air ventilation is limited, even if split air conditioning maintains a comfortable temperature. This illustrative simulation cannot diagnose ventilation quality.</div></div>
      <div class="two-cols" style="margin-top:18px"><div class="card chart-card"><div class="chart-head"><div><h3>CO₂ concentration over time</h3><div class="chart-caption">Illustrative classroom values · parts per million</div></div>${label(tone==='rose'?'REVIEW PATTERN':tone==='amber'?'WATCH TREND':'ILLUSTRATIVE','teal')}</div>${lineChart(series,null,{labels:series.map((_,i)=>`${String(8+Math.floor(i/2)).padStart(2,'0')}:${i%2?'30':'00'}`),id:'co2',title:'CO2 concentration'})}</div><div class="card card-pad"><h3 class="card-title">Sensor → Data → Insight</h3><div class="info-list"><div class="info-item"><span class="num">01</span><div><b>Low-voltage sensor prototype</b><p>Candidate CO₂, temperature/humidity and light sensors in 2–3 approved rooms.</p></div></div><div class="info-item"><span class="num">02</span><div><b>Approved transmission</b><p>ESP32 or gateway sends room ID, timestamp and validated reading to a database.</p></div></div><div class="info-item"><span class="num">03</span><div><b>Staff review</b><p>Compare trends across lessons and check placement, sensor quality and relevance.</p></div></div></div><div style="margin-top:14px"><button data-action="focus-module" data-module="M05" class="secondary-btn">Sensor pilot feasibility ${I('arrow-right',13)}</button></div></div></div>`;
  }
  function roomStatus(r){
    if(state.scenario==='after')return r.id==='A306'?'unknown':'available';
    if(state.scenario==='event')return ['A203','B201','G105'].includes(r.id)?'occupied':r.base;
    return r.base;
  }
  function studyPage(){
    const filtered=roomRecords.filter(r=>state.roomFilter==='all'||roomStatus(r)===state.roomFilter);
    const selected=roomRecords.find(r=>r.id===state.studySelected)||roomRecords[0];
    const status=roomStatus(selected);
    return pageHeading('APPLICATION · SPACE UTILISATION','Smart Study Spaces','Combining room timetables with anonymous presence sensing could reveal whether selected rooms are actually suitable for study. The prototype does not create a booking system.','只有课表数据和占用检测都经过验证，才能把这个功能用于真实教室。')+
      `<div class="filter-row">${['all','available','occupied','scheduled','unknown'].map(f=>`<button type="button" class="filter-btn ${state.roomFilter===f?'active':''}" data-room-filter="${f}">${f==='all'?'All rooms':f[0].toUpperCase()+f.slice(1)}</button>`).join('')}</div>
      <div class="two-cols"><div class="card card-pad"><div class="room-grid">${filtered.map(r=>`<button type="button" class="room-card ${state.studySelected===r.id?'selected':''}" data-room="${r.id}"><div class="room-topline"><h3>${r.id}</h3>${label(statusInfo[roomStatus(r)][0],statusInfo[roomStatus(r)][1])}</div><p>Building ${r.building} · Floor ${r.floor}</p><div class="room-actions"><span>Next class: ${r.next}</span><span>${r.sensor?'Sensor demo':'Schedule demo'}</span></div></button>`).join('')||`<p class="empty-state">No rooms match this filter.</p>`}</div><div class="small-print">These classroom IDs and states are illustrative records for website behaviour testing. They are not verified SCIE room statuses.</div></div><div class="card card-pad"><div class="eyebrow">SELECTED ROOM</div><h2 style="font-size:27px;margin:6px 0 8px">${selected.id}</h2>${label(statusInfo[status][0],statusInfo[status][1])}<div class="insight-divider"></div><div class="detail-kv"><span>Scheduled next lesson</span><span>${selected.next}</span></div><div class="detail-kv"><span>Reported current status</span><span>SIMULATED</span></div><div class="detail-kv"><span>Occupancy sensing</span><span>${selected.sensor?'Concept enabled':'Not included'}</span></div><div class="detail-kv"><span>School policy</span><span>Must be confirmed</span></div><div class="spacer20"></div><div class="callout amber"><b>Important:</b> No room is officially declared available by this demo. An unoccupied room may still be unavailable under school rules.</div><button data-action="focus-module" data-module="M08" class="secondary-btn" style="margin-top:15px">View dependencies ${I('arrow-right',13)}</button></div></div>
      <h2 class="section-title">Decision logic</h2><div class="card card-pad"><div class="flow-card"><span class="flow-node">Approved room timetable</span><span class="flow-arrow">+</span><span class="flow-node">Validated anonymous presence</span><span class="flow-arrow">→</span><span class="flow-node">Status rule + uncertainty</span><span class="flow-arrow">→</span><span class="flow-node">Advisory room display</span></div>${cn('这项功能不是独立的硬件系统，它依赖课表（M07）和占用传感器（M06）两个模块都成立。')}</div>`;
  }
  function elevatorPage(){
    const waits={A:{break:[64,105,122,94,72,49,35],normal:[22,29,35,28,24,19,18],lunch:[78,118,137,98,72,54,42]},B:{break:[52,86,103,87,65,44,26],normal:[19,24,29,26,22,17,15],lunch:[65,98,122,87,70,46,32]}};
    const vals=waits[state.elevatorBuilding][state.elevatorPeriod];const med=vals[2];const max=Math.max(...vals);
    return pageHeading('OPTIONAL APPLICATION · LOW PRIORITY','Elevator Wait Estimator','A sample historical model demonstrates typical elevator waiting-time predictions. No live elevator status or control systems are connected.','这是低优先级功能：展示的是历史规律估计，不控制电梯，也不保证下一趟到达时间。')+
      `<div class="controls-row"><label for="elevatorBuilding">Building</label><select class="select" id="elevatorBuilding">${['A','B'].map(b=>`<option value="${b}" ${state.elevatorBuilding===b?'selected':''}>Building ${b}</option>`).join('')}</select><label for="elevatorPeriod">Time period</label><select class="select" id="elevatorPeriod"><option value="break" ${state.elevatorPeriod==='break'?'selected':''}>Lesson transition</option><option value="normal" ${state.elevatorPeriod==='normal'?'selected':''}>Normal lesson time</option><option value="lunch" ${state.elevatorPeriod==='lunch'?'selected':''}>Lunch break</option></select>${label('HISTORICAL MODEL · MOCK','amber')}</div>
      <div class="stats-grid">${stat('clock','Typical estimate',med,' sec','One example floor/time context')}${stat('activity','Example max',max,' sec','Simulated observation range')}${stat('building','Studied buildings','02','','Teaching A and B only, concept')}${stat('shield','Elevator control','NO','','Read-only concept; no commands')}</div>
      <div class="two-cols"><div class="card chart-card"><div class="chart-head"><div><h3>Illustrative wait time by floor</h3><div class="chart-caption">Seconds · demonstration of how historical patterns might vary</div></div></div>${lineChart(vals,null,{labels:['G','1','2','3','4','5','6'],id:'elevator',title:'elevator waiting estimate'})}</div><div class="card card-pad"><h3 class="card-title">Proposed validation</h3><div class="info-list"><div class="info-item"><span class="num">01</span><div><b>Collect observations</b><p>Record anonymous actual wait time at selected lesson transitions.</p></div></div><div class="info-item"><span class="num">02</span><div><b>Calculate a simple baseline</b><p>Use median waiting times, not a complex AI system.</p></div></div><div class="info-item"><span class="num">03</span><div><b>Check prediction error</b><p>If errors remain high or value is low, defer the module.</p></div></div></div><div class="spacer20"></div><button data-action="focus-module" data-module="M11" class="secondary-btn">Open go/no-go decision ${I('arrow-right',13)}</button></div></div>`;
  }
  function maintenancePage(){
    return pageHeading('OPTIONAL APPLICATION · PROCESS DEPENDENT','Facilities & ICT',"Explore how maintenance requests could be associated with physical rooms, but only if the school's existing repair workflow supports integration.",'此页面仅模拟提交维修工单，不会向任何学校部门发送真实请求。')+
      `<div class="two-cols"><div class="card card-pad"><div class="card-title">Demo maintenance requests</div><p class="card-sub">Sample tickets · created locally for interaction only</p><div style="margin-top:13px">${state.tickets.map(t=>`<div class="ticket"><div><div class="ticket-id">${e(t.id)} · ${e(t.room)}</div><h4>${e(t.item)} — ${e(t.issue)}</h4><p>Room-linked asset record · fictional</p></div>${label(t.status,t.status==='Resolved'?'teal':t.status==='In review'?'amber':'blue')}</div>`).join('')}</div></div><div class="card card-pad"><h3 class="card-title">Create a sample ticket</h3><p class="card-sub">Nothing is sent to ICT or Facilities</p><form class="ticket-form" id="ticketForm"><select name="room" required>${roomRecords.slice(0,6).map(r=>`<option value="${r.id}">${r.id}</option>`).join('')}</select><select name="item" required><option>Projector</option><option>Speaker</option><option>Air conditioner</option><option>Lighting</option><option>Other</option></select><textarea class="wide" name="issue" required maxlength="180" placeholder="Describe a fictional equipment issue…"></textarea><button class="primary-btn wide" type="submit">${I('plus',15)} Add sample ticket</button></form><div class="spacer20"></div><div class="callout amber"><b>Stop rule:</b> If a duplicate reporting workflow increases staff workload, this module should not be deployed.</div></div></div>`;
  }
  function navigationPage(){
    const destinations=['Main Gate','Building A','Building B','Student Residence','A201','A203','B201','B212','Library'];
    const route=state.navigatorFrom===state.navigatorTo?['You are already at the selected destination.']:['Begin at '+state.navigatorFrom,'Follow the signed main pedestrian route','Enter the relevant building through an approved entrance','Go to '+state.navigatorTo+' (schematic directions only)'];
    return pageHeading('EARLY ADD-ON · SHARED SPATIAL MODEL','Campus Navigator','A room-finding concept powered by the same location database as the Digital Twin. Accurate routes require verified SCIE floor plans and corridor connections.','最早可以实现“搜索教室并高亮”，不需要立即实现实时室内定位或导航。')+
      `<div class="two-cols"><div class="card card-pad"><h3 class="card-title">Try a demonstration route</h3><div class="controls-row"><label for="navFrom">From</label><select class="select" id="navFrom">${destinations.map(v=>`<option ${state.navigatorFrom===v?'selected':''}>${e(v)}</option>`).join('')}</select><label for="navTo">To</label><select class="select" id="navTo">${destinations.map(v=>`<option ${state.navigatorTo===v?'selected':''}>${e(v)}</option>`).join('')}</select></div><div class="info-list">${route.map((text,i)=>`<div class="info-item"><span class="num">${i+1}</span><div><b>${e(text)}</b><p>Illustrative route step; not validated against actual SCIE corridors</p></div></div>`).join('')}</div><div class="small-print">The route is explanatory placeholder text, not calculated shortest-path navigation. A future real route engine would use verified corridors, stairs and accessibility constraints.</div></div><div class="card card-pad"><h3 class="card-title">Real implementation logic</h3><div class="flow-card"><span class="flow-node">Verified floor map</span><span class="flow-arrow">→</span><span class="flow-node">Room IDs</span><span class="flow-arrow">→</span><span class="flow-node">Search & highlight</span></div><div class="callout"><b>Why feasible?</b> The room database and 3D model are shared infrastructure; search and highlight are relatively low-cost once mapping is correct.</div><div style="margin-top:15px"><button data-action="focus-module" data-module="M13" class="secondary-btn">Review navigation module ${I('arrow-right',13)}</button></div></div></div>`;
  }
  function moduleCard(m){
    const d=savedDecision(m);const tone=d==='Proceed'?'teal':d==='Pilot'?'blue':d==='Defer'?'amber':'rose';
    return `<div class="feas-card"><div class="feas-foot"><span class="micro-tag">${m.id} · ${m.priority}</span>${label(d.toUpperCase(),tone)}</div><h3 style="margin-top:11px">${e(m.name)}</h3><p>${e(m.desc)}</p><div class="feas-foot"><button class="secondary-btn" data-module-detail="${m.id}" style="padding:6px 9px;font-size:10.5px">Inspect ${I('chevron-right',11)}</button><select class="decision-select" aria-label="Decision for ${e(m.id)}" data-decision="${m.id}">${['Proceed','Pilot','Defer','Drop'].map(o=>`<option ${d===o?'selected':''}>${o}</option>`).join('')}</select></div></div>`;
  }
  function moduleDetails(){
    const m=MODS.find(x=>x.id===state.focusModule)||MODS[0];return `<div class="feas-details" id="moduleDetail"><div class="inline-group">${label(m.id+' · '+m.priority,'teal')}${label(savedDecision(m).toUpperCase())}</div><h3>${e(m.name)}</h3>${cn(m.cn)}<p class="page-lead" style="margin-top:6px">${e(m.desc)}</p><div class="detail-grid"><div class="detail-box"><strong>Technical implementation / 实施步骤</strong><div class="info-list">${m.tasks.map((x,i)=>`<div class="info-item"><span class="num">${String(i+1).padStart(2,'0')}</span><div><p style="color:#4d6a77;margin:2px 0">${e(x)}</p></div></div>`).join('')}</div></div><div><div class="detail-box" style="margin-bottom:12px"><strong>Time estimate / 时间预估</strong><p>${e(m.time)}</p></div><div class="detail-box" style="margin-bottom:12px"><strong>What the school needs to provide / 学校支持</strong><p>${e(m.support)}</p></div><div class="detail-box"><strong>Stop rule / 何时暂停</strong><p>${e(m.stop)}</p></div></div></div></div>`;
  }
  function feasibilityPage(){
    const types=['all','P0','P1','P2','P3'];
    const filtered=MODS.filter(m=>state.moduleFilter==='all'||m.priority===state.moduleFilter);
    const ct={Proceed:0,Pilot:0,Defer:0,Drop:0};MODS.forEach(m=>ct[savedDecision(m)]++);
    return pageHeading('LEADERSHIP · MODULAR FEASIBILITY','Decide what is actually feasible.','The entire concept is not an all-or-nothing project. Each work package has its own implementation steps, time estimate, required school support and stop rule.','这个界面适合开会直接讨论：每个 Part 可以独立决定推进、试点、暂缓或取消。')+
      `<div class="stats-grid">${stat('check','Proceed',ct.Proceed,' modules','Recommended to move forward')}${stat('activity','Pilot',ct.Pilot,' modules','Test before any permanent deployment')}${stat('clock','Defer',ct.Defer,' modules','Blocked or lower priority')}${stat('shield','Drop',ct.Drop,' modules','Remove from current scope')}</div><div class="controls-row" style="justify-content:space-between"><div class="filter-row" style="margin:0">${types.map(t=>`<button class="filter-btn ${state.moduleFilter===t?'active':''}" data-module-filter="${t}">${t==='all'?'All priorities':t}</button>`).join('')}</div><div class="wide-actions"><button class="secondary-btn" data-action="reset-decisions">${I('refresh',13)} Reset</button><button class="primary-btn" data-action="export-decisions">${I('download',13)} Export meeting decisions</button></div></div><div class="feasibility-grid">${filtered.map(moduleCard).join('')}</div>${moduleDetails()}<div class="spacer20"></div><div class="callout"><b>Decision discipline:</b> The default recommendations are provisional, not school approvals. Changing a selection updates this browser only. Export CSV to document the leadership discussion.</div>`;
  }
  function roadmapPage(){
    return pageHeading('CURRENT PROGRESS & ROADMAP','From a simulation to a pilot.','3D modelling is already underway in Blender and the team has an existing online project demo. Proposed implementation is staged by independent feasibility gates.','3D 建模预计 2026 年底完成；其他模块的时间均为讨论用预估，需先获批准。',`<a class="link-button" href="${ORIGINAL_DEMO}" target="_blank" rel="noopener noreferrer">${I('external-link',14)} View original demo</a>`)+
    `<div class="banner-hero"><div><h3>3D modelling milestone · December 2026</h3><p>Core building model completion is the team's stated target. A smaller web-ready pilot area can be used before the entire model is finished.</p></div>${label('MODELLING IN PROGRESS','teal')}</div>
      <div class="two-cols"><div class="card hero-photo"><h3>Blender modelling progress / Blender 建模进度</h3><img src="./assets/scie-blender-progress.webp" alt="Actual user-provided screenshot of ongoing SCIE campus modelling in Blender"/><p class="small-print">Photo: user-provided project progress screenshot. This is not generated geometry. The interactive campus geometry is approximately reconstructed from this screenshot, not an exact export of the Blender model.</p></div><div class="card card-pad"><h3 class="card-title">Suggested decision sequence</h3>${[
        ['Now','Audit floor plans and room IDs; review current demo source and existing meter availability.'],
        ['Next 2–4 weeks','Integrate one pilot floor into a stable 3D viewer and shared spatial database.'],
        ['After approval','Trial 2–3 environmental sensors; test occupancy separately, if permitted.'],
        ['When data exists','Pilot room schedules and/or building energy dashboard at the actual available granularity.'],
        ['By end of 2026','Target core 3D modelling completion. Expand only modules with verified value.']
      ].map(x=>`<div class="roadmap-item"><div class="roadmap-date">${x[0]}</div><div><div class="roadmap-title">${x[1]}</div><div class="roadmap-desc">Conditional plan · dependent on school permission and data quality</div></div></div>`).join('')}<div class="spacer20"></div><button data-page="feasibility" class="secondary-btn">Choose work packages ${I('arrow-right',14)}</button></div></div>
      <h2 class="section-title">What leadership support unlocks the next stage</h2><div class="three-cols">${[
        ['Verified floor plans','Room names, proportions and approved architectural references.','building'],
        ['Computing access','Suitable computers and approved project file storage for heavy Blender models.','server'],
        ['Small pilot approval','Selected sensor locations, supervised testing and approved networking.','shield'],
        ['Energy data feasibility','Facilities contact to clarify existing meter coverage and exports.','zap'],
        ['Operational ownership','ICT review of hosting, backup and long-term maintenance.','users'],
        ['Decision milestones','Clear agreement on which modules proceed, pilot, defer or drop.','clipboard-check']
      ].map(x=>featureInfoCard(x)).join('')}</div>`;
  }
  function featureInfoCard(x){return `<div class="card feature-item"><div class="feature-top"><span class="feature-icon">${I(x[2],19)}</span><h3>${x[0]}</h3></div><p style="min-height:0">${x[1]}</p></div>`;}
  function aboutPage(){
    return pageHeading('PROJECT NOTE · TRANSPARENCY','What this demo does — and does not do.','The design translates the SCIE Digital Twin proposal and modular feasibility handbook into an interactive, leadership-ready demonstration.', '此网站是新的独立交互演示，不会修改你之前已经部署在 Vercel 的原网站。')+
      `<div class="two-cols"><div class="card card-pad"><h3 class="card-title">Current project assets</h3><div class="report-row"><div><b>Original simulation website</b><p>Existing online prototype supplied by the student team</p></div><a class="secondary-btn" href="${ORIGINAL_DEMO}" target="_blank" rel="noopener noreferrer">Open ${I('external-link',12)}</a></div><div class="report-row"><div><b>Blender 3D model</b><p>Active SCIE building modelling; target completion by end-2026</p></div>${label('IN PROGRESS','teal')}</div><div class="report-row"><div><b>Live sensor streams</b><p>No authorised physical data connections in this package</p></div>${label('NOT CONNECTED','amber')}</div><div class="report-row"><div><b>Public student data</b><p>None stored or retrieved in this prototype</p></div>${label('NONE','teal')}</div><div class="spacer20"></div><h3 class="card-title">Why the project belongs in Global Citizenship</h3><p class="page-lead">The central mission is evidence-based sustainability, responsible shared-resource use and a durable learning infrastructure. Student conveniences remain optional secondary applications.</p>${cn('GC 主要负责可持续发展目标、公共资源责任和长期校园影响，而不是替代 Student Life 或学校 ICT。')}</div><div class="card card-pad"><h3 class="card-title">Recommended leadership decisions</h3><div class="info-list">${[
        ['Digital foundation','Continue 3D modelling, spatial IDs and website consolidation.'],
        ['Sensor proof','Approve limited environmental sensor trials only after placement and network review.'],
        ['Meter feasibility','Audit existing electricity data before promising an energy dashboard.'],
        ['Modular selection','Let each optional feature pass its own value, technical and privacy gates.'],
        ['Long-term ownership','Define who maintains any real deployed component after students graduate.']
      ].map((x,i)=>`<div class="info-item"><span class="num">${i+1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join('')}</div></div></div>
      <h2 class="section-title">Reference case studies</h2><div class="three-cols">${[
       ['Chiang Mai University','A 2025 campus digital twin paper linking building models, sensor data and energy information. Reported year-on-year energy changes are not proof of causal Digital Twin savings.','https://doi.org/10.3390/technologies13100439'],
       ['University of Birmingham','A large-scale smart campus and living lab partnership illustrating institutional strategy, building data and long-term research value.','https://www.birmingham.ac.uk/news-archive/2021/the-university-of-birmingham-partners-with-siemens-to-create-the-smartest-university-campus-in-the-world'],
       ['National University of Singapore','Sustainability monitoring and actual audit-led energy interventions demonstrate the importance of measuring results rather than only building dashboards.','https://uci.nus.edu.sg/campus-sustainability/decarbonise/']
      ].map(x=>`<div class="card feature-item"><h3>${x[0]}</h3><p style="min-height:95px">${x[1]}</p><a class="secondary-btn" target="_blank" rel="noopener noreferrer" href="${x[2]}">Reference ${I('external-link',12)}</a></div>`).join('')}</div><div class="callout dark" style="margin-top:20px"><b>Deployment honesty:</b> This is a static demonstration. It contains no login, no database, no connection to real classrooms or meters and no real maintenance ticket submission. Connecting production school data will require explicit approvals, server-side integration and ICT security review.</div>`;
  }

  function downloadCSV(rows, filename){
    const quote=(v)=>`"${String(v??'').replace(/"/g,'""')}"`;
    const csv='\ufeff'+rows.map(row=>row.map(quote).join(',')).join('\r\n');
    const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function toast(msg){document.querySelector('.toast')?.remove();const d=document.createElement('div');d.className='toast';d.textContent=msg;document.body.appendChild(d);setTimeout(()=>d.remove(),3400)}
  function setPage(next){state.page=next;state.mobileOpen=false;renderShell();window.scrollTo({top:0,behavior:'instant'});history.replaceState(null,'',`#${next}`)}
  function changeAndRender(changer){changer();renderShell()}
  /* Detailed leadership content comes from the uploaded modular-feasibility handbook;
     case study figures are clearly labelled as reported by the respective institutions. */
  const MODULE_EXTRAS={
    M01:{proof:'Pilot floor and all selected room labels verified against approved drawings.',gate:'Accuracy of geometry and room naming.',cn:'学校提供准确比例的楼层平面图和房间编号；核心建模计划于2026年底完成。',dependencies:'Official drawings, room list, suitable Blender workstations.',fallback:'Start with a validated pilot floor or a reliable 2D map.',cost:'Student modelling time, computing and storage.'},
    M02:{proof:'All pilot rooms resolve to unique IDs with no duplicates.',gate:'One consistent location naming standard.',cn:'统一的 Room ID 是所有传感器、网站、报修和能源数据之间的连接钥匙。',dependencies:'Verified room list and agreed naming convention.',fallback:'Begin with floor-level IDs and expand later.',cost:'Low hardware cost; careful database design.'},
    M03:{proof:'Room selection and data display work reliably on desktop and tablet; demo/live states are unambiguous.',gate:'Performance, access policy and clarity.',cn:'现有 Vercel 网站是起点，但要清楚标注哪些数值是模拟、哪些已经接入真实数据。',dependencies:'Model export, room IDs, hosting decision.',fallback:'2D-first dashboard if 3D performance is weak.',cost:'Frontend maintenance, hosting and browser QA.'},
    M04:{proof:'One verified approved dataset flows from source to dashboard; logging and recovery are tested.',gate:'Safe collection, storage and retrieval.',cn:'后端负责收数、存储、检查数据质量并给网页提供 API；不能把模拟数据误当实时。',dependencies:'Network guidance, data schema, access rules.',fallback:'Approved restricted sandbox or periodic safe CSV imports.',cost:'Server/storage, maintenance and backups.'},
    M05:{proof:'Stable multi-week environmental readings with known placement, timestamps and gaps.',gate:'Installation permission, sensor reliability and ventilation interpretation.',cn:'CO₂ 测量的是通风相关条件的参考指标；普通分体式空调不一定提供新鲜空气。',dependencies:'2–3 approved classrooms, low-voltage devices, network or offline logger.',fallback:'One-room offline logger and manual uploads.',cost:'CO₂ sensors and power, calibration, periodic checks.'},
    M06:{proof:'False-positive and false-negative rates measured for still occupants and corridor traffic.',gate:'Accuracy and privacy in real classrooms.',cn:'毫米波检测的是房间有无人，而不是学生身份；如果误报过高就不要公开展示 AVAILABLE。',dependencies:'Room approval, selected sensors and test observations.',fallback:'Test only or show UNKNOWN; no public occupancy state.',cost:'Sensors, mounting and validation time.'},
    M07:{proof:'Selected room schedules match official data over a defined test period.',gate:'Approved data export and refresh schedule.',cn:'课表接入可以先使用 CSV，而不必接学校的完整核心系统。',dependencies:'Room-level timetable without personal student data.',fallback:'Manually curated demonstration schedules only.',cost:'Data cleaning and maintenance, little hardware.'},
    M08:{proof:'Availability status is verified in the pilot and does not conflict with room-use policies.',gate:'M06 + M07 both sufficiently reliable.',cn:'空教室不一定允许学生使用；系统必须遵循既有规定，不能自动创造订座规则。',dependencies:'Reliable anonymous occupancy + timetable + room permissions.',fallback:'Timetable-only display or omit the feature.',cost:'Mainly software once prerequisites work.'},
    M09:{proof:'Verified electricity readings with meter IDs, time intervals, units and actual coverage.',gate:'Facilities approval and usable meter exports.',cn:'如果只有整栋楼电表，就只能分析整栋楼；不能编造某间教室的电量。',dependencies:'Facilities contact, historical kWh records, clear metering granularity.',fallback:'Monthly statements or defer real-data integration.',cost:'Potentially low when existing digital records exist; new meters are a separate professionally reviewed proposal.'},
    M10:{proof:'Dashboard accurately shows verified energy trends and one useful cautious comparison.',gate:'Reliable data from M09, permission to display it, and an actionable use case.',cn:'监测本身不会自动节电；它帮助学校识别可能问题、决定行动并评估结果。',dependencies:'M09 readings plus context such as weather and calendar.',fallback:'Basic monthly trends rather than simulated real-time claims.',cost:'Analytics, charting and school review time.'},
    M11:{proof:'Waiting-time baseline error measured on dates not used for training.',gate:'Sufficient observations and useful accuracy.',cn:'只读数据/历史观察，不控制电梯、不改学校电梯政策。',dependencies:'Approved anonymous queue observations; optional read-only elevator status.',fallback:'Defer or remove if predictions have little value.',cost:'Observation and model-development time.'},
    M12:{proof:'School staff confirm that the test process does not duplicate work.',gate:'Compatibility with current ICT/Facilities procedures.',cn:'不能再创造一套需要学校重复维护的报修平台。',dependencies:'Equipment lists, current ticketing workflow and staff feedback.',fallback:'Asset map only, without active reporting.',cost:'Integration, process review and maintenance.'},
    M13:{proof:'Students locate pilot rooms accurately through search and model highlighting.',gate:'Room mapping and access-route accuracy.',cn:'可以先做教室搜索与高亮，路径规划以后再说。',dependencies:'M01 + M02.',fallback:'Simple building/floor labels without turn-by-turn routing.',cost:'Low incremental software cost.'},
    M14:{proof:'One valid cross-system comparison is reproducible; later predictions beat a baseline on held-out data.',gate:'Compatible time/location granularity and enough observations.',cn:'先做可解释的数据对比；相关性不等于因果关系，AI 不是一开始就必须有。',dependencies:'At least two stable approved datasets.',fallback:'Descriptive trends only; omit AI entirely.',cost:'Data cleaning and research time.'},
    M15:{proof:'Permissions, access controls, backup procedure, incident escalation and ownership agreed for pilot.',gate:'Privacy, cybersecurity and handover approval.',cn:'学校要在任何真实部署前决定谁管理账号、数据与长期维护。学生不接触市电或电梯控制器。',dependencies:'School sponsor, ICT review, access policy, maintenance owner.',fallback:'Restricted offline or internal demonstration only.',cost:'Hosting, staff oversight, backup and ongoing operations.'}
  };
  const CASES=[
    {name:'Chiang Mai University',country:'THAILAND · 2025',tag:'Closest technical precedent',num:'25',unit:'buildings covered',detail:'Peer-reviewed study describes a Digital Twin combining 3D models, meter history, environmental sensors and multiscale dashboards.',result:'The paper reports approximately 9–12% lower annual electricity use in 2024 than 2023. This is an observed comparison, not proof that the Digital Twin itself caused the reduction.',cn:'技术路径最接近 SCIE：把建筑、环境和电力数据连接到一个界面。论文的用电降幅不能直接归因于数字孪生。',copy:'Start with existing building records; build an operationally useful pilot before claiming savings.',url:'https://doi.org/10.3390/technologies13100439'},
    {name:'University of Birmingham',country:'UNITED KINGDOM · SMART CAMPUS',tag:'Long-term living laboratory',num:'23,000',unit:'reported sensors',detail:'The Siemens smart-campus partnership combines building data, research opportunities and campus sustainability planning.',result:'Siemens has reported roughly 23,000 installed sensors and potential annual emissions reductions of up to 3,000 tonnes CO₂. Potential reduction is not a verified dashboard-only saving.',cn:'值得借鉴的是把校园当成学生长期参与的 Living Lab，而不是复制大学规模的传感器数量。',copy:'Design ownership and education/research opportunities from day one.',url:'https://www.birmingham.ac.uk/news-archive/2021/the-university-of-birmingham-partners-with-siemens-to-create-the-smartest-university-campus-in-the-world'},
    {name:'National University of Singapore',country:'SINGAPORE · SUSTAINABILITY',tag:'Quantifiable intervention',num:'1.9',unit:'GWh saved / year (MD6)',detail:'NUS describes audit-led energy efficiency work and evaluation of real building improvements.',result:'NUS reported around 1.9 GWh annual electricity savings at MD6 (approximately 10%), about S$412,000 and 780 tCO₂e. These arose from actual efficiency measures, not a Digital Twin alone.',cn:'重点是“监测→发现问题→采取节能措施→量化效果”，而不是只画一个漂亮的电力图表。',copy:'Evaluate actual school-approved changes using comparable before/after data.',url:'https://uci.nus.edu.sg/campus-sustainability/decarbonise/'}
  ];
  const SCHOOL_ASKS=[
    ['Accurate floor plans','Verified building/floor layouts and room names for model accuracy.','准确图纸、比例和房间编号。'],
    ['Computing & storage','Continued access to suitable computers for Blender and a stable project storage location.','用于 Blender 的高性能电脑及可靠文件存储。'],
    ['Pilot space permission','Authorise a limited number of rooms for approved low-voltage sensor trials.','获批在少数教室测试低压传感器。'],
    ['Data owner / ICT contact','Nominate relevant contacts to review room data, networking and hosting.','确定数据与网络审批对接人。'],
    ['Electricity data audit','Permission to investigate existing meters and approved historical exports.','授权核实电表系统与可输出的历史数据。'],
    ['Governance & long-term ownership','Agree who may see data and who maintains a successful pilot.','确认权限、隐私和长期维护责任。']
  ];
  const LEADERSHIP_QA=[
    ['Why is this a GC project instead of Student Life?','The core objective is sustainable resource stewardship and measurable environmental impact. Study-space, navigation and elevator tools are optional applications of the same infrastructure.','核心是可持续资源管理；学生便利性功能只是附加应用。'],
    ['Does a 3D website already count as a Digital Twin?','The current site proves the interface and concept. A limited operational Digital Twin requires validated location mapping and approved live or historical physical data.','目前是概念演示；接入并验证真实数据后才是运营中的数字孪生。'],
    ['Why not use a normal dashboard?','For some analysis, a dashboard is enough. The spatial model adds value when building location, floor/room relationships and multiple applications matter.','不要为了 3D 而 3D；空间位置有用时才发挥模型优势。'],
    ['Why measure classroom CO₂?','It is a useful indicator of ventilation-related conditions. Split air conditioners may cool recirculated air without providing outdoor fresh air. CO₂ alone is not a health diagnosis.','CO₂ 用来辅助判断通风，不是空气质量的全部，更不能直接诊断健康。'],
    ['Will these sensors save electricity?','No. Monitoring provides evidence. Actual savings require separately approved interventions and careful measurement of their effects.','安装传感器不等于节能，关键在于基于数据采取行动。'],
    ['What if energy data cannot be accessed?','Defer the real energy module. The 3D model, room database, web interface and approved environmental pilot can still proceed independently.','电表数据拿不到也不影响其他模块独立推进。'],
    ['Could this invade student privacy?','We propose anonymous room-level sensing, with no cameras, face recognition or individual movement tracking. A privacy review would precede any real pilot.','只测量匿名房间级状态，不识别或追踪学生。'],
    ['Can students install electrical meters?','No. Students will only handle approved low-voltage prototypes. Work involving mains power must be performed by authorised qualified professionals.','学生只做安全获批的低压原型，不触碰市电。'],
    ['How much will the project cost?','We propose a staged audit and a small pilot. Exact procurement should follow school approvals, equipment requirements and supplier quotations—not a hypothetical full-campus budget.','先审查现有设备与权限再询价，避免为了未确定功能花钱。'],
    ['What if a module fails?','Every module has a separate go/no-go test and fallback. One failure is not a failure of the full digital platform.','每个模块可推进、试点、暂缓或取消。'],
    ['Who will maintain it after graduation?','We need documentation, school-side ownership and an agreed handover process before any public long-term deployment.','正式上线前明确归属、备份与未来团队交接。'],
    ['What do you need from leadership now?','Permission to run a feasibility audit, access accurate architectural information, nominate a school contact and prepare a very small controlled pilot.','先要可行性审查、建筑资料、对接人和有限试点许可，不要求立即全校上线。']
  ];
  const GLOSSARY=[
    ['Digital Twin','A digital representation kept linked to real physical data.','数字孪生：持续关联真实系统数据的数字表示。'],
    ['Simulation','A model using example or synthetic values.','模拟：使用虚构或生成的数据演示行为。'],
    ['MVP','Minimum Viable Product: smallest working pilot.','最小可行产品：足以验证价值的最小版本。'],
    ['BIM / CAD','Building-information and computer-aided-design sources.','建筑信息模型 / 计算机辅助设计图纸。'],
    ['GLB','A compact file format for web 3D assets.','适用于网页加载的 3D 模型文件。'],
    ['API','Interface for software components to exchange data.','应用程序接口，让不同系统交换数据。'],
    ['Room / Location ID','Stable code connecting real rooms to model and data.','空间唯一编号，让房间、传感器与数据对齐。'],
    ['CO₂ / ppm','Carbon dioxide concentration measured in parts per million.','二氧化碳浓度 / 百万分比。'],
    ['kW vs kWh','Power at a moment vs energy over a period.','功率和电能，不能混为一谈。'],
    ['Baseline','Reference pattern against which new observations are compared.','历史基线：用于对比的典型参考水平。'],
    ['Anomaly Detection','Flags unusual readings for investigation, not automatic proof of a fault.','异常检测：提示调查，不代表已经证明浪费或故障。'],
    ['False Positive / Negative','Incorrect yes/no detection in a sensor model.','误报 / 漏报。'],
    ['Read-only Access','Can view operational status but cannot control equipment.','只读数据接入，不能发送控制命令。'],
    ['Data Granularity','Scope/detail of available data, such as building vs room.','数据粒度：例如楼宇级和教室级。'],
    ['Correlation vs Causation','Related variables are not necessarily cause and effect.','相关不等于因果。'],
    ['Living Lab','Real campus infrastructure used for education and research.','以真实校园作为教学和研究的实验环境。']
  ];
  function premiumTag(text,tone='teal'){return label(text,tone)}
  function sectionLine(no,txt){return `<div class="chapter-index">${no}<span></span>${txt}</div>`}
  function bulletList(rows){return rows.map((x,i)=>`<div class="fancy-bullet"><span class="num">${String(i+1).padStart(2,'0')}</span><p>${x}</p></div>`).join('')}
  function architecturePage(){
    return pageHeading('SYSTEM DESIGN · SHARED INFRASTRUCTURE','One campus. Connected information.','Seven possible applications rely on a smaller shared core: spatial data, verified inputs, a secured backend and a clear interface.','逻辑重点：不是做七套互不相关的系统，而是搭建一个可以逐渐扩展的共同基础平台。')+
    `<div class="arch-hero"><div class="arch-step"><span>01 / PHYSICAL CAMPUS</span><h3>School facilities</h3><p>Rooms, buildings, equipment, elevators and electricity infrastructure.</p></div><div class="arch-arrow">↓</div><div class="arch-row"><div class="arch-step"><span>02A / SENSORS</span><h3>Measured data</h3><p>CO₂ · temperature · humidity · light · optional occupancy</p></div><div class="arch-step"><span>02B / EXISTING RECORDS</span><h3>School information</h3><p>Approved room timetable · available meter records · assets</p></div></div><div class="arch-arrow">↓</div><div class="arch-step strong"><span>03 / CENTRAL DATA PLATFORM</span><h3>Location IDs + Database + APIs</h3><p>Validate data · timestamp · apply permissions · retrieve information</p></div><div class="arch-arrow">↓</div><div class="arch-step"><span>04 / APPLICATIONS</span><h3>Interactive 3D + dashboards</h3><p>Energy · environment · study spaces · elevator · maintenance · navigation</p></div><div class="arch-arrow">↓</div><div class="arch-step outcome"><span>05 / OUTCOME</span><h3>Evidence-based campus decisions</h3><p>Monitor → Understand → Investigate → Evaluate changes</p></div></div>
    <div class="two-cols" style="margin-top:22px"><div class="card card-pad"><div class="eyebrow">TECHNOLOGY OPTIONS</div><h3 class="card-title">Suggested development stack</h3><div class="compact-table"><div><b>3D asset creation</b><span>Blender → optimised GLB</span></div><div><b>Browser display</b><span>3D viewer + React / JavaScript</span></div><div><b>Backend</b><span>FastAPI or equivalent</span></div><div><b>Database</b><span>PostgreSQL or equivalent</span></div><div><b>Sensor devices</b><span>ESP32 + approved low-voltage sensors</span></div><div><b>Communication</b><span>Approved Wi-Fi / gateway / HTTP / MQTT</span></div><div><b>Analytics</b><span>Python + validated historical comparisons</span></div></div>${cn('这些是候选技术，不是已定采购清单，最终需要学校 ICT 审核。')}</div><div class="card card-pad"><div class="eyebrow">TRUTH IN DEMONSTRATION</div><h3 class="card-title">Maturity pathway</h3><div class="timeline-list"><div><span class="timeline-dot active"></span><strong>01 · Current simulation</strong><p>Interactive pages and illustrative readings (achieved).</p></div><div><span class="timeline-dot"></span><strong>02 · Connected pilot</strong><p>Approved physical records and validated sensors (next).</p></div><div><span class="timeline-dot"></span><strong>03 · Operational Digital Twin</strong><p>Stable location mapping, logging and permission controls.</p></div><div><span class="timeline-dot"></span><strong>04 · Predictive studies</strong><p>Historical baselines and optional evidence-backed predictions.</p></div></div>${cn('当前网站只是第一个阶段，不能因为页面很像真实系统就说已经运营部署。')}</div></div>`;
  }
  function digitalTwinPage(){
   return pageHeading('IDEA · FROM REPRESENTATION TO SYSTEM','What makes a Digital Twin?','A Digital Twin is a digital representation linked over time to the physical system it represents. A 3D picture alone is not enough.','Digital Twin 的核心不在于模型多逼真，而在于模型与现实的房间、设备和测量数据能可靠对应。')+
    `<div class="concept-hero"><div><div class="hero-kicker">THE IDEA</div><h2>From a <em>digital model</em><br>to a campus that can<br><em>explain itself.</em></h2><p>Geometry tells us where. Sensors and approved records tell us what is happening. Historical data helps us understand what changes over time.</p><button data-page="architecture" class="primary-btn">Explore system architecture ${I('arrow-right',14)}</button></div><div class="concept-stack"><div><span>01</span><b>Digital model</b><small>Buildings and space</small></div><div><span>02</span><b>Connected twin</b><small>Verified campus data</small></div><div><span>03</span><b>Operational learning</b><small>Historical trends</small></div><div><span>04</span><b>What-if simulation</b><small>Future optional research</small></div></div></div>
    <div class="three-cols" style="margin-top:22px"><div class="card card-pad"><div class="eyebrow">WHY A 3D MODEL?</div><h3 class="card-title">Spatial context</h3><p class="page-lead">The user can locate buildings, floors, rooms and relevant assets in a shared coordinate system.</p>${cn('空间信息让不同功能能围绕同一间教室被组织。')}</div><div class="card card-pad"><div class="eyebrow">WHY NOT ONLY 3D?</div><h3 class="card-title">Operational evidence</h3><p class="page-lead">Verified readings and school records explain resource use and environmental patterns.</p>${cn('学校更在乎这些数字最终能做什么决策，而不是界面多漂亮。')}</div><div class="card card-pad"><div class="eyebrow">WHY GC?</div><h3 class="card-title">Responsible stewardship</h3><p class="page-lead">The platform enables sustainability monitoring, campus research and measurable long-term actions.</p>${cn('GC 主导的是可持续性目标和环境绩效评估，学生便利功能属于附加应用。')}</div></div>
    <h2 class="section-title">Long-term expansion, without promising it now</h2><div class="four-cols">${[['01','Sustainability','Energy, emissions and environment'],['02','Shared spaces','Utilisation without tracking people'],['03','Facilities','Equipment histories and investigation'],['04','Living laboratory','Student research with approved data']].map(a=>`<div class="mini-vision"><span>${a[0]}</span><h3>${a[1]}</h3><p>${a[2]}</p></div>`).join('')}</div>`;
  }
  function caseStudiesPage(){
   return pageHeading('EVIDENCE · THREE UNIVERSITY EXAMPLES','Learn from projects that exist.','Three references illustrate technical integration, long-term campus strategy and measurable sustainability results. The outcomes must not be attributed to a Digital Twin alone without evidence.','三所大学分别借鉴不同的方面：技术系统、学校长期战略、环保成效的量化。不能把所有节能效果都直接归因于数字孪生。')+
    `<div class="case-grid">${CASES.map((c,i)=>`<article class="case-card"><div class="case-top"><span class="case-number">0${i+1}</span><span class="case-country">${c.country}</span></div><h2>${c.name}</h2><span class="case-label">${c.tag}</span><div class="case-stat"><b>${c.num}</b><span>${c.unit}</span></div><h3>What they implemented</h3><p>${c.detail}</p><h3>Results and limitations</h3><p>${c.result}</p><div class="case-insight"><b>What SCIE should learn</b><p>${c.copy}</p><small>${c.cn}</small></div><a href="${c.url}" target="_blank" rel="noopener noreferrer" class="secondary-btn">Read original source ${I('external-link',13)}</a></article>`).join('')}</div>
    <div class="callout dark"><b>Evidence standard / 证据标准:</b> Observed lower energy consumption, potential savings, and verified savings from physical efficiency actions are different claims. The SCIE pilot should report the actual data source and avoid unearned causal conclusions.</div>`;
  }
  function leadershipPage(){
   return pageHeading('LEADERSHIP DISCUSSION · DECISION BRIEF','What should we actually approve?','The goal is a limited, measurable pilot—not permission to implement every screen in the simulation.','会议最终要确定的不是“全都做”，而是哪些模块值得调查、需要什么授权、何时回来汇报结果。')+
   `<div class="lead-promo"><div><div class="eyebrow">RECOMMENDED ASK</div><h2>Approve the feasibility study.<br><em>Not the entire system.</em></h2><p>The modular structure ensures the school only invests in components that pass their own tests for data, technical feasibility, actual value, safety and ownership.</p></div><button data-page="feasibility" class="primary-btn">Open decision lab ${I('arrow-right',14)}</button></div>
   <h2 class="section-title">Six specific requests / 六项学校支持</h2><div class="three-cols">${SCHOOL_ASKS.map((x,i)=>`<div class="card ask-card"><div class="ask-number">0${i+1}</div><h3>${x[0]}</h3><p>${x[1]}</p><small>${x[2]}</small></div>`).join('')}</div>
   <div class="two-cols" style="margin-top:23px"><div class="card card-pad"><div class="eyebrow">PILOT OPTIONS</div><h3 class="card-title">Choose one level first</h3><div class="info-list">${[
    ['A · Foundation','Accurate small 3D area + room IDs + functional website. No sensor dependencies.'],
    ['B · Environment pilot','Package A plus 2–3 approved low-voltage sensor nodes, uptime and data quality checks.'],
    ['C · Energy pilot','Package A plus verified approved existing meter readings, if available.']
   ].map((x,i)=>`<div class="info-item"><span class="num">${i+1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></div>`).join('')}</div></div><div class="card card-pad"><div class="eyebrow">BUDGET APPROACH</div><h3 class="card-title">Spend only after each gate</h3><div class="compact-table">${[
    ['First','Audit existing floor plans / data systems'],['Then','Approved low-voltage pilot bill of materials'],['Only if needed','Hosting and approved school integration'],['After validation','Expansion, calibration and long-term support']
   ].map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div>${cn('准确预算需要先看学校已有的设备、网络、可用电表数据和报价。')}</div></div>
   <h2 class="section-title">Principal & vice-principal Q&A</h2><div class="qa-list">${LEADERSHIP_QA.map((q,i)=>`<details ${i===0?'open':''}><summary><span class="qa-index">${String(i+1).padStart(2,'0')}</span><b>${q[0]}</b><span class="qa-chevron">${I('chevron-right',15)}</span></summary><div class="qa-answer"><p>${q[1]}</p><small>${q[2]}</small></div></details>`).join('')}</div>
   <h2 class="section-title">Keywords / 会议术语</h2><div class="glossary-grid">${GLOSSARY.map(g=>`<div class="gloss-item"><strong>${g[0]}</strong><p>${g[1]}</p><small>${g[2]}</small></div>`).join('')}</div>
   <h2 class="section-title">Global Citizenship alignment</h2><div class="sdg-row">${[['SDG 4','Quality Education','Real campus as a student learning environment'],['SDG 7','Affordable and Clean Energy','Energy use transparency and evidence'],['SDG 9','Industry, Innovation and Infrastructure','Reusable digital infrastructure'],['SDG 11','Sustainable Cities and Communities','Responsible campus space management'],['SDG 12','Responsible Consumption and Production','Shared resource efficiency'],['SDG 13','Climate Action','Measure the effects of sustainability interventions'],['SDG 16','Peace, Justice and Strong Institutions','Responsible data governance'],['SDG 17','Partnerships for the Goals','Cross-school collaboration and continuity']].map(s=>`<div><b>${s[0]}</b><span>${s[1]}</span><small>${s[2]}</small></div>`).join('')}</div>
   <h2 class="section-title">How to measure pilot success / 如何证明有效</h2><div class="four-cols">${[['Location accuracy','All pilot room labels checked against approved drawings.'],['Data quality','Report sensor uptime, missing values and plausible ranges.'],['Real usefulness','Structured feedback from student and authorised staff testers.'],['Safe handover','Named reviewer, backup plan and maintenance documentation.']].map((x,i)=>`<div class="mini-vision"><span>SUCCESS CRITERION 0${i+1}</span><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div><p class="cn-note" style="margin-top:10px">这些是建议验收维度，不是已经达到的项目成果；各模块在试点前需要单独约定具体阈值。</p>
   <h2 class="section-title">40-minute leadership discussion / 建议会议议程</h2><div class="card card-pad"><div class="compact-table">${[['0–5 min','Digital Twin idea and why GC leads it'],['5–12 min','Which independent modules should proceed?'],['12–22 min','Technical feasibility, data access and school permissions'],['22–28 min','Case studies and pilot package choices'],['28–40 min','Leadership questions, owners and next review milestone']].map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div><div class="callout" style="margin-top:14px"><b>Meeting outcome:</b> Agree an initial shortlist, assign a school contact, approve only the necessary feasibility investigation and schedule a module-by-module review. <span style="display:block;margin-top:4px">会后留下明确的“哪些做、谁负责、需要什么、何时复盘”。</span></div><button class="secondary-btn" data-page="feasibility" style="margin-top:15px">Open the exportable decision register ${I('clipboard-check',13)}</button></div>`;
  }
  function moduleDetails(){
    const m=MODS.find(x=>x.id===state.focusModule)||MODS[0],x=MODULE_EXTRAS[m.id];
    const deps=x.dependencies.split(';');
    return `<div class="feas-details detail-premium" id="moduleDetail"><div class="inline-group">${label(m.id+' · '+m.priority,'teal')}${label(savedDecision(m).toUpperCase())}</div><h3>${e(m.name)}</h3><p class="page-lead">${e(m.desc)}</p><div class="cn-explain">${x.cn}</div>
    <div class="detail-grid"><div class="detail-box"><strong>Technical implementation / 技术实现</strong><div class="info-list">${m.tasks.map((item,i)=>`<div class="info-item"><span class="num">${String(i+1).padStart(2,'0')}</span><div><b>${e(item)}</b></div></div>`).join('')}</div><h4 class="detail-subtitle">Input & dependencies / 数据和前提</h4><p>${x.dependencies}</p><h4 class="detail-subtitle">Feasibility gate / 可行性门槛</h4><p>${x.gate}</p></div>
    <div><div class="detail-box"><strong>Estimated duration / 时间预估</strong><p>${e(m.time)}</p></div><div class="detail-box"><strong>Support needed from school / 学校支持</strong><p>${e(m.support)}</p></div><div class="detail-box"><strong>Evidence required / 必须验证</strong><p>${x.proof}</p></div><div class="detail-box"><strong>Stop rule & fallback / 失败替代方案</strong><p>${e(m.stop)} ${x.fallback}</p></div><div class="detail-box"><strong>Cost driver / 主要成本</strong><p>${x.cost}</p></div></div></div>
    <div class="detail-decision-footer"><strong>Leadership decision:</strong> <span>${savedDecision(m)} · Provisional only, not official school approval.</span><button data-action="export-decisions" class="secondary-btn">Export decision register ${I('download',13)}</button></div></div>`;
  }
  function overviewPage(){
    const demos=[
      ['01','Energy & Sustainability','Monitor electricity patterns and evaluate sustainability initiatives.','能源与可持续性','energy','zap','GC FOCUS'],
      ['02','Environmental Monitoring','Explore CO₂, temperature, humidity and classroom conditions.','环境监测','environment','wind','GC FOCUS'],
      ['03','Study-space Availability','Combine anonymous room presence and timetables, if validated.','自习教室','study','book-open','CONDITIONAL'],
      ['04','Elevator Waiting-time','Demonstrate advisory estimates from historical observations.','电梯预测','elevator','arrow-up-down','OPTIONAL'],
      ['05','Facilities & ICT','Explore location-linked equipment records and repair reports.','设施报修','maintenance','wrench','OPTIONAL'],
      ['06','3D Navigation','Find rooms and see how a spatial model supports directions.','校园导航','navigation','route','MODEL-DEPENDENT']
    ];
    return `<section class="new-hero"><div class="new-hero-copy"><div class="hero-overline"><span class="hero-indicator"></span> GLOBAL CITIZENSHIP · SCIE</div><h1>One campus.<br><em>One connected future.</em></h1><p>Explore an interactive vision of a sustainable, data-informed campus. Each application is a separate option—not a commitment to build every function.</p><div class="new-hero-actions"><button class="primary-btn" data-page="campus">Explore the 3D campus ${I('arrow-right',15)}</button><button class="secondary-btn" data-page="feasibility">Feasibility decisions ${I('clipboard-check',14)}</button></div></div>
      <div class="hero-right-summary"><span>PROJECT STATUS</span><strong>Working simulation</strong><p>Interactive website · Blender model in progress</p><div class="hero-divider"></div><span>CORE 3D MILESTONE</span><strong>December 2026</strong><div class="hero-divider"></div><span>REAL CAMPUS DATA</span><strong>Not connected yet</strong><p>Every dashboard value below is illustrative</p></div></section>
      <div class="overview-section-heading"><div><div class="section-kicker">01 / SPATIAL FOUNDATION</div><h2>Explore the campus model</h2><p>A Blender-inspired approximation of SCIE. Select a building to preview linked information.</p></div><button class="text-action" data-page="campus">Open full 3D explorer ${I('arrow-right',15)}</button></div>
      <div class="top-grid tidy-3d-row"><div class="card"><div class="card-header"><div><h3 class="card-title">Interactive campus massing</h3><p class="card-sub">Drag to rotate · zoom · select a building</p></div>${premiumTag('MODEL-INSPIRED','teal')}</div><div class="map-wrap">${campusMap()}</div></div><div class="card right-insight">${buildingInsight()}</div></div>
      <div class="overview-section-heading" id="functions-overview"><div><div class="section-kicker">02 / EXPLORE FUNCTIONS</div><h2>One function at a time.</h2><p>Open a working demo, then scroll down for the technical plan, timing and required school support.</p></div>${premiumTag('6 FUNCTION DEMOS','blue')}</div>
      <div class="function-directory">${demos.map(item=>`<button type="button" class="function-directory-row" data-page="${item[4]}"><span class="directory-num">${item[0]}</span><span class="directory-icon">${I(item[5],21)}</span><span class="directory-text"><strong>${item[1]}</strong><small>${item[2]}</small><em>${item[3]}</em></span><span class="directory-label">${item[6]}</span><span class="directory-next">${I('arrow-right',19)}</span></button>`).join('')}</div>
      <div class="overview-section-heading"><div><div class="section-kicker">03 / WHAT COMES NEXT</div><h2>From simulation to a real pilot</h2><p>Use a modular decision process so that only feasible, valuable components move forward.</p></div></div>
      <div class="next-steps-grid"><button class="next-step" data-page="digital-twin"><span>01 · UNDERSTAND</span><strong>What is a Digital Twin?</strong><small>3D geometry + approved real-world data</small>${I('arrow-right',17)}</button><button class="next-step" data-page="architecture"><span>02 · DESIGN</span><strong>How the platform connects</strong><small>Sensors, school records, database and dashboards</small>${I('arrow-right',17)}</button><button class="next-step" data-page="roadmap"><span>03 · DELIVER</span><strong>Project progress & roadmap</strong><small>Blender target, pilot sequence, permissions</small>${I('arrow-right',17)}</button><button class="next-step" data-page="leadership"><span>04 · DECIDE</span><strong>Leadership questions</strong><small>School support, risks, ownership and scope</small>${I('arrow-right',17)}</button></div>
      <div class="honesty-note">${I('info',19)}<p><strong>Demonstration data, not live monitoring.</strong> The 3D massing is reconstructed from the team’s Blender screenshot; the original model is still being developed. Real deployment requires validated locations, sensor testing and school approval. <span>模拟演示不等于真实部署。</span></p><a href="${ORIGINAL_DEMO}" target="_blank" rel="noopener noreferrer">Existing project site ${I('external-link',13)}</a></div>`;
  }
  function campusPage(){
    const b=buildingData[state.building];
    const layerLabels=[['structure','Architecture'],['energy','Energy concept'],['environment','Environment'],['space','Space use']];
    return pageHeading('3D SPATIAL INFRASTRUCTURE · BLENDER-INSPIRED','SCIE Campus Explorer','A genuinely rotatable, zoomable approximate 3D massing rebuilt from the team’s Blender progress screenshot. The connected long teaching wings, low courtyard structures and a taller tower follow the screenshot’s broad geometry.','这是根据你提供的 Blender 截图重新推测的体量比例，不是随机校园，也不是从 .blend 中直接导出的准确模型。',`<button data-page="roadmap" class="secondary-btn">View source screenshot ${I('external-link',13)}</button>`)+
    `<div class="model-layer-controls controls-row"><span style="font-size:11px;font-weight:800;color:#51747d;margin-right:4px">Visualisation layer</span>${layerLabels.map(x=>`<button class="model-layer-btn ${state.mapLayer===x[0]?'active':''}" data-model-layer="${x[0]}">${x[1]}</button>`).join('')}</div>
    <div class="top-grid"><div class="card"><div class="card-header"><div><h3 class="card-title">Blender-inspired campus massing</h3><div class="card-sub">Drag · orbit · scroll · select building</div></div>${premiumTag('APPROXIMATE 3D','blue')}</div><div class="map-wrap">${campusMap('large')}</div></div><div class="card right-insight">${buildingInsight()}</div></div>
    <div class="two-cols" style="margin-top:21px"><div class="card card-pad"><h3 class="card-title">Example spatial IDs</h3><p class="page-lead">The real 3D object needs a stable ID, not just a painted facade.</p><div class="controls-row"><label for="floorSelect">Example floor</label><select id="floorSelect" class="select">${['G','1','2','3','4','5','6','7'].map(f=>`<option value="${f}" ${state.floor===f?'selected':''}>Floor ${f}</option>`).join('')}</select></div><div class="info-list">${roomRecords.filter(r=>r.building===state.building&&r.floor===state.floor).slice(0,5).map(r=>`<div class="info-item"><span class="num">${I('building',14)}</span><div><b>${r.id} ${label('DEMO RECORD')}</b><p>Example ID: ${r.building}-F${r.floor==='G'?'G':r.floor.padStart(2,'0')}-R${r.id.slice(1)}</p></div></div>`).join('')||'<p class="small-print">No sample room records on this floor.</p>'}</div><button data-page="architecture" class="secondary-btn" style="margin-top:16px">How data connects ${I('arrow-right',13)}</button></div><div class="card hero-photo"><h3>Actual Blender project progress</h3><img src="./assets/scie-blender-progress.webp" alt="User-provided SCIE Blender model screenshot"/><p class="small-print">Reference image from the modelling team. The interactive scene is an approximation based on its visible building massing; exact geometry requires the exported source 3D model.</p></div></div>
    <div class="callout" style="margin-top:21px"><b>Next technical milestone:</b> Obtain the approved real floor plan and/or exported <code>.glb</code> model, replace approximate masses with exact room-linked assets and validate locations before any real navigation or sensor positioning. <span style="display:block;color:#6f8f89;margin-top:5px">下一步是导出真实模型并核对房间结构，不要把当前近似模型当成工程图纸。</span></div>`;
  }

  const app=document.getElementById('app');
  app.addEventListener('click',(ev)=>{
    const pg=ev.target.closest('[data-page]');if(pg){setPage(pg.dataset.page);return}
    const zon=ev.target.closest('[data-select-zone]');if(zon){state.building=zon.dataset.selectZone;renderShell();return}
    const ml=ev.target.closest('[data-model-layer]');if(ml){state.mapLayer=ml.dataset.modelLayer;renderShell();return}
    const b=ev.target.closest('[data-building]');if(b){changeAndRender(()=>{state.building=b.dataset.building});return}
    const rf=ev.target.closest('[data-room-filter]');if(rf){changeAndRender(()=>{state.roomFilter=rf.dataset.roomFilter});return}
    const r=ev.target.closest('[data-room]');if(r){changeAndRender(()=>{state.studySelected=r.dataset.room});return}
    const mf=ev.target.closest('[data-module-filter]');if(mf){changeAndRender(()=>state.moduleFilter=mf.dataset.moduleFilter);return}
    const detail=ev.target.closest('[data-module-detail]');if(detail){state.focusModule=detail.dataset.moduleDetail;renderShell();document.getElementById('moduleDetail')?.scrollIntoView({behavior:'smooth',block:'start'});return}
    const act=ev.target.closest('[data-action]');if(!act)return;
    switch(act.dataset.action){
      case 'menu':state.mobileOpen=!state.mobileOpen;renderShell();break;
      case 'jump-demo':document.querySelector('.demo-page .heading-row')?.scrollIntoView({behavior:'smooth',block:'start'});break;
      case 'jump-impl':document.querySelector('.implementation-guide')?.scrollIntoView({behavior:'smooth',block:'start'});break;
      case 'jump-decision':document.querySelector('.implementation-bottom-grid')?.scrollIntoView({behavior:'smooth',block:'center'});break;
      case 'presentation':state.presentation=!state.presentation;renderShell();break;
      case 'reset-camera':state.zoom=1;window.SCIE3D?.reset();renderShell();break;
      case 'zoom-in':changeAndRender(()=>state.zoom=Math.min(1.65,state.zoom+.1));break;
      case 'zoom-out':changeAndRender(()=>state.zoom=Math.max(.65,state.zoom-.1));break;
      case 'focus-module':state.focusModule=act.dataset.module;setPage('feasibility');document.getElementById('moduleDetail')?.scrollIntoView({behavior:'smooth'});break;
      case 'reset-decisions':state.moduleDecisions={};try{localStorage.removeItem('scie_feas_decisions_v1')}catch{}renderShell();toast('Draft decisions reset to suggested defaults.');break;
      case 'export-decisions':downloadCSV([['Module ID','Module','Priority','Meeting Decision','Suggested Decision','Time Estimate','Required Support','Stop Rule'],...MODS.map(m=>[m.id,m.name,m.priority,savedDecision(m),m.rec,m.time,m.support,m.stop])],'SCIE_modular_leadership_decisions.csv');toast('Meeting decision CSV exported.');break;
    }
  });
  app.addEventListener('keydown',(ev)=>{
    const b=ev.target.closest('[data-building]');if(b&&(ev.key==='Enter'||ev.key===' ')){ev.preventDefault();state.building=b.dataset.building;renderShell()}
  });
  app.addEventListener('change',(ev)=>{
    const t=ev.target;
    if(t.matches('#scenarioSelect')){changeAndRender(()=>state.scenario=t.value)}
    else if(t.matches('#floorSelect')){changeAndRender(()=>state.floor=t.value)}
    else if(t.matches('#energyBuilding')){changeAndRender(()=>state.energyBuilding=t.value)}
    else if(t.matches('#energyAnomaly')){changeAndRender(()=>state.energyAnomaly=t.checked)}
    else if(t.matches('#envRoom')){changeAndRender(()=>state.environmentRoom=t.value)}
    else if(t.matches('#envOccupancy')){changeAndRender(()=>state.envOccupancy=Number(t.value))}
    else if(t.matches('#elevatorBuilding')){changeAndRender(()=>state.elevatorBuilding=t.value)}
    else if(t.matches('#elevatorPeriod')){changeAndRender(()=>state.elevatorPeriod=t.value)}
    else if(t.matches('#navFrom')){changeAndRender(()=>state.navigatorFrom=t.value)}
    else if(t.matches('#navTo')){changeAndRender(()=>state.navigatorTo=t.value)}
    else if(t.matches('[data-decision]')){state.moduleDecisions[t.dataset.decision]=t.value;try{localStorage.setItem('scie_feas_decisions_v1',JSON.stringify(state.moduleDecisions))}catch{}renderShell();toast(`${t.dataset.decision} set to ${t.value}. Saved in this browser.`)}
  });
  app.addEventListener('input',(ev)=>{if(ev.target.matches('#envOccupancy'))document.getElementById('occupantNumber').textContent=ev.target.value});
  app.addEventListener('submit',(ev)=>{
    if(!ev.target.matches('#ticketForm'))return;ev.preventDefault();const f=new FormData(ev.target);
    state.tickets.unshift({id:'DEMO-'+(1043+state.tickets.length),room:String(f.get('room')),item:String(f.get('item')),issue:String(f.get('issue')).slice(0,180),status:'Open'});
    renderShell();toast('Sample ticket created locally — not submitted to the school.');
  });
  window.addEventListener('hashchange',()=>{const target=location.hash.replace(/^#/,'');if(pages.some(p=>p.id===target)){state.page=target;renderShell()}});
  const initial=location.hash.slice(1);if(pages.some(p=>p.id===initial))state.page=initial;
  renderShell();
})();

