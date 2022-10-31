// ==UserScript==
// @name         Chess.com Game Preview Styling
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Applies custom styling to Chess.com home page.
// @author       Adr0it
// @match        https://www.chess.com/home
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chess.com
// @grant        none
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
  
  /* Game Preview Code */
  var t = setInterval(() => {
      let components = document.querySelectorAll("div.game-preview-component.promo-preview");
      if (components) {
          for (let i = 0; i < components.length; i++) {
              components[i].style.backgroundImage = "url(" + background + ")";
  
              let pieces = components[i].children;
              for (let j = 0; j < pieces.length; j++) {
                  let curPiece = pieces[j];
                  let key = curPiece.src[curPiece.src.indexOf(".png") - 2] + curPiece.src[curPiece.src.indexOf(".png") - 1];
                  curPiece.src = imgs.get(key);
              }
          }
          clearInterval(t);
      }
  }, 500);