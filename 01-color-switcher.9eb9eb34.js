!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body"),o=null;t.addEventListener("click",(function(){o=setInterval((function(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3),t.setAttribute("disabled","")})),e.addEventListener("click",(function(){clearInterval(o),t.removeAttribute("disabled","")}))}();
//# sourceMappingURL=01-color-switcher.9eb9eb34.js.map
