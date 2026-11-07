// Evaluate consecutive active-play frames. Hysteresis avoids oscillating the
// drawing buffer between sizes when a device is close to its frame budget.
export class RenderQuality {
  constructor(maxRatio){
    this.max=maxRatio;
    this.ratio=maxRatio;
    this.samples=0;
    this.slow=0;
    this.fast=0;
    this.fastWindows=0;
  }
  observe(ms){
    this.samples++;
    if(ms>40)this.slow++;
    if(ms<21)this.fast++;
    if(this.samples<90)return null;
    let next=this.ratio;
    if(this.slow>=18){
      next=Math.max(Math.min(.8,this.max),Math.round((this.ratio-.2)*100)/100);
      this.fastWindows=0;
    }else{
      this.fastWindows=this.fast>=85?this.fastWindows+1:0;
      if(this.fastWindows>=5){next=Math.min(this.max,Math.round((this.ratio+.1)*100)/100);this.fastWindows=0;}
    }
    this.samples=this.fast=this.slow=0;
    if(Math.abs(next-this.ratio)<.001)return null;
    this.ratio=next;return next;
  }
}
