// ==UserScript==
// @name         Chess.com Game Preview Styling
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Applies custom styling to Chess.com board components.
// @author       Adr0it
// @match        https://www.chess.com/*
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

/*========= ↑ STYLE / CODE ↓ =========*/

var observer = new MutationObserver((mutations) => {
  let components = document.querySelectorAll(".game-preview-component");
  if (components) {
      for (let i = 0; i < components.length; i++) {
          if (background != "")
              components[i].style.backgroundImage = "url(" + background + ")";
 
          let pieces = components[i].getElementsByTagName("img");
          for (let j = 0; j < pieces.length; j++) {
              let curPiece = pieces[j];
              let key = curPiece.src[curPiece.src.indexOf(".png") - 2] + curPiece.src[curPiece.src.indexOf(".png") - 1];
              if (imgs.get(key) == undefined) break;
              if (imgs.get(key) != "") curPiece.src = imgs.get(key);
          }
      }
  }
});
 
if (!window.location.href.includes("play")) {
  observer.observe(document, {
      childList: true,
      subtree: true
  });
}