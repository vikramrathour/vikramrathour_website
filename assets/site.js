/* Vikram Rathour · shared site behaviour (no dependencies) */
(function(){
  document.documentElement.classList.remove('no-js');

  /* mobile nav toggle */
  var nav=document.querySelector('.nav');
  var toggle=document.querySelector('.nav-toggle');
  if(nav&&toggle){
    toggle.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded',open?'true':'false');
    });
    nav.querySelectorAll('.nav-links a').forEach(function(a){
      a.addEventListener('click',function(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')});
    });
  }

  /* scroll reveal: .r gets .s once visible */
  var rs=document.querySelectorAll('.r');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('s');io.unobserve(e.target)}});
    },{rootMargin:'0px 0px -8% 0px',threshold:.08});
    rs.forEach(function(el){io.observe(el)});
  }else{
    rs.forEach(function(el){el.classList.add('s')});
  }

  /* active section highlight for in-page nav links */
  var links=[].slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  /* the home page book sets its own active link, so skip scroll-based highlighting there */
  if(links.length&&'IntersectionObserver' in window&&!document.querySelector('[data-book]')){
    var map={};
    links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
    var so=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting&&map[e.target.id]){
          links.forEach(function(a){a.classList.remove('on')});
          map[e.target.id].classList.add('on');
        }
      });
    },{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(map).forEach(function(id){var s=document.getElementById(id);if(s)so.observe(s)});
  }

  /* 3D floating cards: tilt toward the cursor as it approaches, glare follows it.
     .tilt3d anywhere, plus blog cards and blueprint deep-dive cards. Orbs with data-par drift in parallax. */
  var fine=window.matchMedia('(pointer: fine)').matches;
  var calm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(fine&&!calm){
    var cards=[].slice.call(document.querySelectorAll('.tilt3d, .pcard, .dive'));
    var orbs=[].slice.call(document.querySelectorAll('[data-par]'));
    var mx=-1e4,my=-1e4,raf=0;
    cards.forEach(function(c){
      var big=c.classList.contains('realm')||c.classList.contains('sprint')||c.classList.contains('idcard');
      c._max=big?11:6; c._z=big?22:10; c._reach=big?360:0;
      c.addEventListener('mouseleave',function(){c.style.transform='';c._on=false});
    });
    function frame(){
      raf=0;
      var w=window.innerWidth,h=window.innerHeight;
      orbs.forEach(function(o){
        var k=parseFloat(o.dataset.par)||30;
        o.style.transform='translate3d('+((mx/w-.5)*k)+'px,'+((my/h-.5)*k)+'px,0)';
      });
      cards.forEach(function(c){
        var r=c.getBoundingClientRect();
        if(r.bottom<0||r.top>h||r.width===0) return;
        var cx=r.left+r.width/2, cy=r.top+r.height/2, dx=mx-cx, dy=my-cy;
        var inside=mx>=r.left&&mx<=r.right&&my>=r.top&&my<=r.bottom;
        var near=c._reach&&Math.hypot(dx,dy)<c._reach;
        if(inside||near){
          var ry=Math.max(-1,Math.min(1,dx/(r.width/2)))*c._max;
          var rx=-Math.max(-1,Math.min(1,dy/(r.height/2)))*c._max;
          var z=inside?c._z:c._z*.4;
          c.style.transform='perspective(1000px) rotateX('+rx.toFixed(2)+'deg) rotateY('+ry.toFixed(2)+'deg) translateZ('+z+'px)';
          c.style.setProperty('--gx',((mx-r.left)/r.width*100)+'%');
          c.style.setProperty('--gy',((my-r.top)/r.height*100)+'%');
          c._on=true;
        }else if(c._on){c.style.transform='';c._on=false}
      });
    }
    document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;if(!raf)raf=requestAnimationFrame(frame)},{passive:true});
    document.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(frame)},{passive:true,capture:true});
  }

  /* chip tabs: <div role="tablist" data-tabs> <button class="chip" data-tab="x"> ... #tab-x */
  document.querySelectorAll('[data-tabs]').forEach(function(list){
    var btns=[].slice.call(list.querySelectorAll('[data-tab]'));
    function show(b){
      btns.forEach(function(x){
        var on=x===b;
        x.setAttribute('aria-selected',on?'true':'false');
        x.tabIndex=on?0:-1;
        var p=document.getElementById('tab-'+x.dataset.tab);
        if(p){p.hidden=!on;if(on)p.querySelectorAll('.r').forEach(function(el){el.classList.add('s')})}
      });
    }
    btns.forEach(function(b,i){
      b.addEventListener('click',function(){show(b)});
      b.addEventListener('keydown',function(e){
        var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;
        if(d){e.preventDefault();var n=btns[(i+d+btns.length)%btns.length];n.focus();show(n)}
      });
    });
  });
})();
