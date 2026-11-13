'use strict';
// Shared tracking state is retained for event/rotation compatibility; measurement is manual only.
let trackSeed=null,trackEnd=null,trackCandidate=null,trackRunning=false,trackGeneration=0,trackRunKey='',trackMessage='各コマで液滴中心をクリックしてください。';
const trackingPanel=document.createElement('div');trackingPanel.className='manual-tracking-panel';
trackingPanel.innerHTML='<b>液滴中心の手動トラッキング</b><p>各コマで液滴中心をクリックすると次のコマへ進みます（チェックで切替可能）。前後ボタンで戻って修正できます。矢印キーで1 pxずつ微調整できます。中心指定中は円弧・接線・軌道・校正などの補助線を隠します。輪郭解析へ戻ると再表示します。</p><p id="trackStatus" role="status"></p>';
const trackingHeading=[...document.querySelectorAll('aside h2')].find(el=>el.textContent.startsWith('4 '));trackingHeading.after(trackingPanel);
const trackPick=document.createElement('button');trackPick.id='guidedTrackManual';trackPick.textContent='手動トラッキングを開始';trackPick.onclick=()=>setMode('track');trackingPanel.prepend(trackPick);
function trackKey(){return JSON.stringify([frames.map(f=>f.url),[...tracks]]);}
function renderTracking(){$('trackStatus').textContent=trackMessage;}
function clearTracking(message){trackGeneration++;trackRunning=false;trackSeed=trackEnd=trackCandidate=null;trackMessage=message;renderTracking();}
const beforeManualStateReset=reset;reset=function(){clearTracking('各コマで液滴中心をクリックしてください。');beforeManualStateReset();};
const beforeShapeRange=$('shape').onclick;$('shape').onclick=()=>{beforeShapeRange();if(frame()&&shape===frame().n){setMode('roi');$('autoStatus').textContent='形状画像を指定しました。画像上でベル右側の抽出範囲をドラッグしてください。';}};
renderTracking();
