function enableScrolling(){
    window.onscroll=function(){};
    window.removeEventListener("scroll", disableScrolling);
    document.body.style.overflow = "unset";
}
function disableScrolling() {
    window.scrollTo(0, 0);
  }
  
export  {disableScrolling, enableScrolling}