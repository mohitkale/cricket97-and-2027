// Node 22+. Run against Vite and an isolated Chrome with remote debugging enabled.
import {setTimeout as wait} from 'node:timers/promises';

const game=new URL(process.argv[2] || 'http://127.0.0.1:5173');
const browser=new URL(process.argv[3] || 'http://127.0.0.1:9222');
game.searchParams.set('era','2027');
game.searchParams.set('benchmark','');
const created=await fetch(new URL('/json/new?about:blank',browser),{method:'PUT'});
if(!created.ok)throw Error(`Cannot open benchmark tab: HTTP ${created.status}`);
const tab=await created.json();
const socket=new WebSocket(tab.webSocketDebuggerUrl);
const pending=new Map();
let sequence=0, browserError;
function fail(error){
  browserError=error;
  for(const job of pending.values())job.reject(error);
  pending.clear();
}
socket.onclose=()=>fail(Error('Benchmark tab disconnected'));
socket.onmessage=({data})=>{
  const message=JSON.parse(data);
  if(message.method==='Runtime.exceptionThrown'){
    const detail=message.params.exceptionDetails;
    fail(Error(detail.exception?.description || detail.text));
    return;
  }
  const job=pending.get(message.id);
  if(!job)return;
  pending.delete(message.id);
  if(message.error)job.reject(Error(message.error.message));
  else job.resolve(message.result);
};
async function command(method,params={}){
  if(browserError)throw browserError;
  const id=++sequence;
  return new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>{
      pending.delete(id);
      reject(Error(`Timed out waiting for Chrome: ${method}`));
    },20000);
    pending.set(id,{
      resolve(value){clearTimeout(timer);resolve(value);},
      reject(error){clearTimeout(timer);reject(error);}
    });
    socket.send(JSON.stringify({id,method,params}));
  });
}
async function evaluate(expression){
  const response=await command('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
  if(response.exceptionDetails)throw Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text);
  return response.result.value;
}
try{
  await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=()=>reject(Error('Cannot connect to benchmark tab'));});
  await command('Page.enable');
  await command('Runtime.enable');
  await command('Page.navigate',{url:game.href});
  const ready=()=>evaluate("typeof window.cricketBenchmark==='function' && !!document.querySelector('#stage-setup')");
  const setupDeadline=Date.now()+30000;
  while(!await ready()){
    if(Date.now()>setupDeadline)throw Error('Benchmark setup unavailable. Start the Vite development server.');
    await wait(100);
  }
  await evaluate(`(()=>{
    document.querySelector('#stage-setup').click();
    document.querySelector('#toss-call').value='heads';
    document.querySelector('#toss-decision').value='bat';
    Math.random=()=>.25;
    document.querySelector('#start').click();
    let pressed=false;
    function play(){
      const cue=document.querySelector('#play-status')?.textContent.includes('HIT NOW');
      if(cue&&!pressed)document.querySelector('#controls [data-choice="Defend"]')?.click();
      pressed=!!cue;
      requestAnimationFrame(play);
    }
    play();
  })()`);
  const matchDeadline=Date.now()+240000;
  for(;;){
    await wait(1000);
    const report=await evaluate('window.cricketBenchmark()');
    if(report.deliveries.filter(delivery=>delivery.legal).length===6){
      console.log(JSON.stringify(report,null,2));
      break;
    }
    if(Date.now()>matchDeadline)throw Error('Six legal deliveries did not finish within four minutes');
  }
}finally{
  socket.close();
  await fetch(new URL('/json/close/'+tab.id,browser));
}
