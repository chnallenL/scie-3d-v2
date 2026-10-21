/* SCIE Campus Massing Viewer — geometry is an approximate reconstruction of the student-supplied Blender screenshot.
   Pure canvas orthographic 3D; offline compatible, no external dependencies. */
(function(){
 'use strict';
 const $=n=>document.querySelector(n);
 const vec=(x,y,z)=>({x,y,z});
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const palette={A:'#98b6bc',B:'#8eaeb6',D:'#bcc8c3'};
 let yaw=.69, elevation=.72, zoom=1.0, host=null, canvas=null,ctx=null, selected='A', hover='', layer='structure', onSelect=()=>{}, oldObserver=null;
 const masses=[
  // Long connected classroom wing and open courtyard follows screenshot's overall roof profile.
  {x:-190,y:-114,w:248,d:48,h:101,zone:'A',style:'wing'},
  {x:-182,y:-52,w:198,d:43,h:85,zone:'A',style:'wing'},
  {x:-111,y:3,w:114,d:47,h:63,zone:'A',style:'low'},
  {x:-108,y:57,w:100,d:37,h:34,zone:'A',style:'low'},
  {x:10,y:-55,w:72,d:79,h:66,zone:'A',style:'connector'},
  {x:7,y:40,w:88,d:46,h:35,zone:'A',style:'low'},
  {x:78,y:-96,w:61,d:70,h:58,zone:'B',style:'wing'},
  {x:145,y:-105,w:76,d:96,h:157,zone:'B',style:'tower'},
  {x:141,y:0,w:78,d:62,h:112,zone:'B',style:'tower'},
  {x:85,y:76,w:138,d:35,h:51,zone:'B',style:'low'},
  {x:-202,y:98,w:74,d:54,h:132,zone:'D',style:'dorm'},
  {x:-123,y:104,w:76,d:54,h:84,zone:'D',style:'dorm'}
 ];
 const backdrop=[
  {x:-220,y:-181,w:467,d:367,z:-3,color:'#dae8e5'},
  {x:-207,y:-158,w:420,d:290,z:-1,color:'#e5eeeb'},
  {x:-209,y:67,w:415,d:17,z:0,color:'#f9faf5'},
  {x:40,y:-157,w:17,d:285,z:0,color:'#f4f8f4'},
  {x:-196,y:166,w:430,d:16,z:0,color:'#e7f0ed'},
  {x:-12,y:99,w:78,d:66,z:1,color:'#c1dbd3'},
  {x:24,y:89,w:35,d:77,z:2,color:'#a3cfc5'},
  {x:107,y:119,w:70,d:36,z:2,color:'#bed9c8'}
 ];
 const shrubs=[[-216,-134],[-214,-72],[-201,34],[-156,175],[-100,173],[-23,172],[48,168],[181,132],[238,57],[244,-69],[68,-151],[-44,-154],[40,148],[-18,131]];
 let drawnFaces=[];
 function rgba(hex,alpha){const h=hex.replace('#','');return `rgba(${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)},${alpha})`}
 function colorMix(a,b,t){
  const n=i=>parseInt(i,16), cc=(s,p)=>n(s.slice(p,p+2));
  const aa=a.replace('#',''),bb=b.replace('#','');
  return '#'+[0,2,4].map(k=>Math.round(cc(aa,k)*(1-t)+cc(bb,k)*t).toString(16).padStart(2,'0')).join('');
 }
 function projection(p,W,H){
  const wFactor=Math.min(W/870,H/510)*1.32*zoom;
  const xx=p.x*Math.cos(yaw)-p.y*Math.sin(yaw);
  const dd=p.x*Math.sin(yaw)+p.y*Math.cos(yaw);
  return {x:W/2+xx*wFactor,y:H*.61+(dd*Math.sin(elevation)-p.z*Math.cos(elevation))*wFactor};
 }
 function distance(p){return (p.x*Math.sin(yaw)+p.y*Math.cos(yaw))*Math.cos(elevation)+p.z*Math.sin(elevation)}
 function normalFacing(n){return n.x*Math.sin(yaw)*Math.cos(elevation)+n.y*Math.cos(yaw)*Math.cos(elevation)+n.z*Math.sin(elevation)>0.01}
 function addFace(pts,fill,opts={}){
  const n=opts.normal;
  if(n&&!normalFacing(n)) return;
  const center=pts.reduce((a,p)=>({x:a.x+p.x/pts.length,y:a.y+p.y/pts.length,z:a.z+p.z/pts.length}),{x:0,y:0,z:0});
  drawnFaces.push({pts,fill,depth:distance(center)+(opts.eps||0),stroke:opts.stroke,zone:opts.zone,type:opts.type});
 }
 function rect(x,y,w,d,z,color){addFace([vec(x,y,z),vec(x+w,y,z),vec(x+w,y+d,z),vec(x,y+d,z)],color,{normal:vec(0,0,1),type:'ground'});}
 function facadeColors(m){
   const selectedZone = selected===m.zone;
   const base=palette[m.zone];
   const muted=selectedZone?0:.2;
   const tint=(layer==='energy' && (m.zone==='A'||m.zone==='B'))?'#b99b78':
              (layer==='environment' && m.zone==='A')?'#60b6aa':
              (layer==='space' && m.zone==='A')?'#6d9bd4':base;
   return {east:colorMix(tint,'#1b3f50',.18+muted),west:colorMix(tint,'#f5f9f7',.28+muted),north:colorMix(tint,'#1e4855',.09+muted),south:colorMix(tint,'#e7f2f0',.08+muted),roof:colorMix(tint,'#f3f6f3',.56)};
 }
 function addMassing(m){
  const {x,y,w,d,h,zone}=m;
  const c=facadeColors(m),x1=x+w,y1=y+d;
  const roofZ=h;
  // facade faces with normals
  addFace([vec(x,y,0),vec(x,y1,0),vec(x,y1,h),vec(x,y,h)],c.west,{normal:vec(-1,0,0),zone,type:'wall',stroke:'#a6c0c6'});
  addFace([vec(x1,y1,0),vec(x1,y,0),vec(x1,y,h),vec(x1,y1,h)],c.east,{normal:vec(1,0,0),zone,type:'wall',stroke:'#92b1b9'});
  addFace([vec(x1,y,0),vec(x,y,0),vec(x,y,h),vec(x1,y,h)],c.north,{normal:vec(0,-1,0),zone,type:'wall',stroke:'#b6cbd1'});
  addFace([vec(x,y1,0),vec(x1,y1,0),vec(x1,y1,h),vec(x,y1,h)],c.south,{normal:vec(0,1,0),zone,type:'wall',stroke:'#9bb8be'});
  addFace([vec(x,y,h),vec(x1,y,h),vec(x1,y1,h),vec(x,y1,h)],c.roof,{normal:vec(0,0,1),zone,type:'roof',stroke:'#beced2'});
  const fl=16.4,rows=Math.floor((h-8)/fl),spacing=13.6;
  // long repetitive dark glazing / narrow mullions based on Blender reference
  for(let floor=0;floor<rows;floor++){
    const z0=6+floor*fl,z1=z0+8.9;
    for(let a=7;a<w-11;a+=spacing){
      const ww=Math.min(8.7,w-a-7);if(ww<3)continue;
      addFace([vec(x+a,y-.16,z0),vec(x+a+ww,y-.16,z0),vec(x+a+ww,y-.16,z1),vec(x+a,y-.16,z1)],'#284d5c',{normal:vec(0,-1,0),zone,type:'glass',eps:.03});
      addFace([vec(x+a,y1+.16,z0),vec(x+a+ww,y1+.16,z0),vec(x+a+ww,y1+.16,z1),vec(x+a,y1+.16,z1)],'#325967',{normal:vec(0,1,0),zone,type:'glass',eps:.03});
      // reflected glass stripe
      addFace([vec(x+a+1,y1+.19,z0+1),vec(x+a+2.2,y1+.19,z0+1),vec(x+a+2.2,y1+.19,z1-1),vec(x+a+1,y1+.19,z1-1)],'#577987',{normal:vec(0,1,0),zone,type:'shine',eps:.04});
    }
    for(let a=7;a<d-10;a+=spacing){
      const ww=Math.min(8.4,d-a-6); if(ww<3) continue;
      addFace([vec(x-.18,y+a,z0),vec(x-.18,y+a+ww,z0),vec(x-.18,y+a+ww,z1),vec(x-.18,y+a,z1)],'#325765',{normal:vec(-1,0,0),zone,type:'glass',eps:.03});
      addFace([vec(x1+.18,y+a,z0),vec(x1+.18,y+a+ww,z0),vec(x1+.18,y+a+ww,z1),vec(x1+.18,y+a,z1)],'#234a59',{normal:vec(1,0,0),zone,type:'glass',eps:.03});
    }
  }
  // rooftop line: raised parapets, planter/device masses and vents, not invented room-level geometry
  const rim='#dfe9e8';
  for(const edge of [[x,y,x+w,y],[x+w,y,x+w,y+d],[x+w,y+d,x,y+d],[x,y+d,x,y]]){
    const [xa,ya,xb,yb]=edge;
    addFace([vec(xa,ya,roofZ+.8),vec(xb,yb,roofZ+.8),vec(xb,yb,roofZ+3.6),vec(xa,ya,roofZ+3.6)],rim,{type:'parapet',zone,eps:1});
  }
  if(m.style==='wing'||m.style==='tower'){
    const shaftW=Math.min(35,w*.23),shaftX=x+w*.49;
    addFace([vec(shaftX,y+d*.27,h+.7),vec(shaftX+shaftW,y+d*.27,h+.7),vec(shaftX+shaftW,y+d*.73,h+.7),vec(shaftX,y+d*.73,h+.7)],'#9fb8ba',{normal:vec(0,0,1),zone,type:'roofunit',eps:1.3});
    for(let i=0;i<Math.min(6,Math.floor(w/28));i++){
      const ox=x+9+i*21;
      addFace([vec(ox,y+d*.16,h+1),vec(ox+14,y+d*.16,h+1),vec(ox+14,y+d*.36,h+1),vec(ox,y+d*.36,h+1)],'#829fa6',{normal:vec(0,0,1),zone,type:'roofunit',eps:1.4});
    }
  }
 }
 function drawFace(f,W,H){
  const pts=f.pts.map(p=>projection(p,W,H));
  ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i].x,pts[i].y);ctx.closePath();
  ctx.fillStyle=f.fill;ctx.fill();
  if(f.stroke){ctx.lineWidth=f.type==='roof'?1.08:.75;ctx.strokeStyle=f.stroke;ctx.stroke()}
  if((f.zone===selected || f.zone===hover) && (f.type==='wall'||f.type==='roof')){
     ctx.lineWidth=f.zone===hover?1.8:1.2;ctx.strokeStyle=f.zone===hover?'#12cbb8':'rgba(23,158,148,.55)';ctx.stroke();
  }
  if(f.zone&&(f.type==='wall'||f.type==='roof')) hitRegions.push({zone:f.zone,pts,depth:f.depth});
 }
 let hitRegions=[];
 function tree(cx,cy,W,H){
  const anchor=projection(vec(cx,cy,0),W,H),top=projection(vec(cx,cy,16),W,H),size=Math.max(4,Math.min(W/110,8.3))*zoom;
  ctx.strokeStyle='#78958a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(anchor.x,anchor.y);ctx.lineTo(top.x,top.y);ctx.stroke();
  const rad=ctx.createRadialGradient(top.x-size*.2,top.y-size*.3,2,top.x,top.y,size);
  rad.addColorStop(0,'#acd3bc');rad.addColorStop(1,'#6ca292');ctx.fillStyle=rad;
  ctx.beginPath();ctx.ellipse(top.x,top.y-size*.12,size,size*.72,-.2,0,Math.PI*2);ctx.fill();
 }
 function label(cx,cy,z,txt,active,W,H){
   const p=projection(vec(cx,cy,z),W,H);
   ctx.font='700 12px system-ui, sans-serif';const wid=ctx.measureText(txt).width+27;
   ctx.fillStyle=active?'#0a6e68':'rgba(255,255,255,.96)';
   ctx.strokeStyle=active?'#56dbbe':'#c5d9d7'; ctx.lineWidth=active?2:1;
   roundedRect(ctx,p.x-wid/2,p.y-18,wid,28,9);ctx.fill();ctx.stroke();
   ctx.fillStyle=active?'white':'#2d5664';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(txt,p.x,p.y-4);ctx.textBaseline='alphabetic';
   const zone=txt==='DORM'?'D':txt;
   hitRegions.push({zone,depth:Infinity,pts:[{x:p.x-wid/2,y:p.y-18},{x:p.x+wid/2,y:p.y-18},{x:p.x+wid/2,y:p.y+10},{x:p.x-wid/2,y:p.y+10}]});
 }
 function roundedRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r)}
 function hoverFromPoint(x,y){
   for(let i=hitRegions.length-1;i>=0;i--){const f=hitRegions[i];if(contain(f.pts,x,y))return f.zone;}return '';
 }
 function contain(pts,x,y){let c=false;for(let i=0,j=pts.length-1;i<pts.length;j=i++){const a=pts[i],b=pts[j];if((a.y>y)!==(b.y>y) && x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)c=!c;}return c}
 function render(){
  if(!canvas||!canvas.isConnected)return;
  const rect=canvas.getBoundingClientRect();const W=rect.width,H=rect.height;
  if(!W||!H)return;
  const dpr=Math.min(window.devicePixelRatio||1,2);
  if(canvas.width!==Math.round(W*dpr)||canvas.height!==Math.round(H*dpr)){canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr)}
  ctx=canvas.getContext('2d',{alpha:false});ctx.setTransform(dpr,0,0,dpr,0,0);
  const grad=ctx.createLinearGradient(0,0,W,H);grad.addColorStop(0,'#e3f2f2');grad.addColorStop(.58,'#f1f7f4');grad.addColorStop(1,'#dfefec');ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(15,71,73,.025)';for(let i=20;i<W;i+=32)for(let j=20;j<H;j+=32){ctx.beginPath();ctx.arc(i,j,.8,0,Math.PI*2);ctx.fill()}
  drawnFaces=[];hitRegions=[];
  for(const r of backdrop){rectFace(r);}
  // understated base platform and its bevel
  for(const m of masses){
     addFace([vec(m.x+9,m.y+11,-3),vec(m.x+m.w+13,m.y+11,-3),vec(m.x+m.w+13,m.y+m.d+11,-3),vec(m.x+9,m.y+m.d+11,-3)],'rgba(30,76,74,.095)',{normal:vec(0,0,1),type:'shadow'});
     addMassing(m);
  }
  drawnFaces.sort((a,b)=>a.depth-b.depth);
  for(const f of drawnFaces)drawFace(f,W,H);
  for(const t of shrubs)tree(t[0],t[1],W,H);
  label(-38,-91,154,'A',selected==='A',W,H);
  label(183,-45,182,'B',selected==='B',W,H);
  label(-164,126,155,'DORM',selected==='D',W,H);
  // static compass and readout
  ctx.fillStyle='rgba(25,70,75,.54)';ctx.font='600 10px system-ui, sans-serif';ctx.textAlign='left';ctx.fillText('DRAG TO ORBIT  ·  SCROLL TO ZOOM',18,H-18);
 }
 function rectFace(r){rect(r.x,r.y,r.w,r.d,r.z,r.color)}
 function mount(el,params={}){
   if(oldObserver){oldObserver.disconnect();oldObserver=null}
   if(!el){canvas=null;return}
   canvas=el;host=el.parentElement;selected=params.building||'A';layer=params.layer||'structure';onSelect=params.onSelect||(()=>{});
   el.style.touchAction='none';let down=null;
   el.addEventListener('pointerdown',ev=>{down={x:ev.clientX,y:ev.clientY,yaw,elevation,moved:false};el.setPointerCapture(ev.pointerId)});
   el.addEventListener('pointermove',ev=>{
      const b=el.getBoundingClientRect(),x=ev.clientX-b.left,y=ev.clientY-b.top;
      if(down){const dx=ev.clientX-down.x,dy=ev.clientY-down.y; if(Math.abs(dx)+Math.abs(dy)>5)down.moved=true;
         if(down.moved){yaw=down.yaw+dx*.006;elevation=clamp(down.elevation+dy*.004,.33,1.13);render()}}
      else{const found=hoverFromPoint(x,y);if(hover!==found){hover=found;render()}el.style.cursor=found?'pointer':'grab';}
   });
   el.addEventListener('pointerup',ev=>{if(!down)return;const b=el.getBoundingClientRect();const moved=down.moved;down=null;
      if(!moved){const which=hoverFromPoint(ev.clientX-b.left,ev.clientY-b.top);if(which){selected=which;onSelect(which);render()}}
   });
   el.addEventListener('pointercancel',()=>{down=null});
   el.addEventListener('wheel',ev=>{ev.preventDefault();zoom=clamp(zoom*(ev.deltaY>0?.9:1.1),.65,1.65);render()},{passive:false});
   oldObserver=new ResizeObserver(()=>render());oldObserver.observe(el);render();
 }
 function change(p={}){if('building'in p)selected=p.building;if('layer'in p)layer=p.layer;if('zoom'in p)zoom=clamp(p.zoom,.65,1.65);render()}
 function reset(){yaw=.69;elevation=.72;zoom=1;hover='';render()}
 window.SCIE3D={mount,change,reset};
})();
