// Full-page edition changes can keep the old document in browser history.
// Release its GPU allocation even when that document is cached. Returning
// through history starts a fresh renderer rather than reusing a disposed one.
export function manageRendererLifetime(renderer,host=window){
  let released=false,reloading=false;
  host.addEventListener('pagehide',()=>{
    if(released)return;
    released=true;
    renderer.dispose();
    renderer.forceContextLoss();
  });
  host.addEventListener('pageshow',event=>{
    if(!event.persisted||!released||reloading)return;
    reloading=true;
    host.location.reload();
  });
  return ()=>released;
}
