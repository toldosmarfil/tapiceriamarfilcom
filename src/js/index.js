import 'regenerator-runtime/runtime';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

//init zone
gsap.registerPlugin(ScrollTrigger);

document.body.onscroll = function() {
  if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
};




