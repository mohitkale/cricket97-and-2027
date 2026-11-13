// End-of-delivery signals, driven by the adjudicated event and simulation time.
export function signalOutcome(umpire, delivery, elapsed) {
  const [right,left]=umpire.userData.arms;
  const lift=Math.min(1,elapsed/.24);
  if(delivery.boundaryOutcome===6){
    right.rotation.z=lift*2.95;
    left.rotation.z=-lift*2.95;
  }else if(delivery.boundaryOutcome===4){
    right.rotation.x=-lift*1.45;
    right.rotation.y=lift*Math.sin(elapsed*7)*.85;
  }else if(delivery.dismissal){
    right.rotation.z=lift*2.85;
  }
}
