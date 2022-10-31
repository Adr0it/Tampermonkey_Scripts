// ==UserScript==
// @name         Chess.com Game Preview Styling
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Applies custom styling to Chess.com home page.
// @author       Adr0it
// @match        https://www.chess.com/home
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chess.com
// @grant        none
// @license      MIT
// ==/UserScript==

const imgs = new Map([
    /* White Pieces */
    ["wp", ""],
    ["wn", ""],
    ["wb", ""],
    ["wr", ""],
    ["wq", ""],
    ["wk", ""],
  
    /* Black Pieces */
    ["bp", ""],
    ["bn", ""],
    ["bb", ""],
    ["br", ""],
    ["bq", ""],
    ["bk", ""],
  ]);
  
  /* Background */
  const background = "";
  
  function waitForElement(querySelector, timeout){
    return new Promise((resolve, reject)=>{
      var timer = false;
      if(document.querySelectorAll(querySelector).length) return resolve();
      const observer = new MutationObserver(()=>{
        if(document.querySelectorAll(querySelector).length){
          observer.disconnect();
          if(timer !== false) clearTimeout(timer);
          return resolve();
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      if(timeout) timer = setTimeout(()=>{
        observer.disconnect();
        reject();
      }, timeout);
    });
  }
  
  waitForElement("div.game-preview-component.promo-preview", 300).then(function(){
      let components = document.querySelectorAll("div.game-preview-component.promo-preview");
      if (components) {
          for (let i = 0; i < components.length; i++) {
              if (background != "")
                  components[i].style.backgroundImage = "url(" + background + ")";
  
              let pieces = components[i].children;
              for (let j = 0; j < pieces.length; j++) {
                  let curPiece = pieces[j];
                  let key = curPiece.src[curPiece.src.indexOf(".png") - 2] + curPiece.src[curPiece.src.indexOf(".png") - 1];
                  if (imgs.get(key) != "")
                      curPiece.src = imgs.get(key);
              }
          }
      }
  }).catch(()=>{
     console.log("failed");
  });