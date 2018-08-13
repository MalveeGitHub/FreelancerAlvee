const divWhat = document.querySelector("body");
const nava = document.querySelector("nav");

divWhat.addEventListener("mousewheel",function(){
  if(scrollY > 699){
    // nav.className = "nava";
    nava.style.position = "fixed";
    nava.style.top = '0';
    nava.style.left = '0';
    nava.style.right = '0';
  }else{
    nava.style.position = "static";
  }
});

const a = nava.querySelector("a.home");

a.addEventListener('click',function(){
  nava.style.position = "static";
});

