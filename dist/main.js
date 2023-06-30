/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.css */ "./src/styles/style.css");
/* harmony import */ var _modules_battleground__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/battleground */ "./src/modules/battleground.js");


const initialize = () => {
  const info = document.createElement("div");
  const turn = document.createElement("h2");
  const infoBoth = document.createElement("div");
  const playerInfo = document.createElement("div");
  const enemyInfo = document.createElement("div");
  const playerInfoText = document.createElement("p");
  const enemyInfoText = document.createElement("p");
  const playerShipsRemaining = document.createElement("h3");
  const enemyShipsRemaining = document.createElement("h3");
  const main = document.createElement("div");
  turn.id = "turn";
  turn.setAttribute("data-index", "1");
  // if id is 1, it's the player's turn else it's enemy's turn
  turn.textContent = "Your turn";
  turn.textContent = "Your Turn";
  playerInfoText.textContent = "Ships remaining: ";
  enemyInfoText.textContent = "Enemy ships remaining: ";
  playerShipsRemaining.textContent = "10";
  enemyShipsRemaining.textContent = "10";
  playerInfo.classList.add("player-info");
  enemyInfo.classList.add("enemy-info");
  playerInfo.appendChild(playerInfoText);
  playerInfo.appendChild(playerShipsRemaining);
  enemyInfo.appendChild(enemyInfoText);
  enemyInfo.appendChild(enemyShipsRemaining);
  infoBoth.appendChild(playerInfo);
  infoBoth.appendChild(enemyInfo);
  info.classList.add("info");
  info.appendChild(turn);
  info.appendChild(infoBoth);
  main.classList.add("main");
  main.appendChild(player.grid);
  main.appendChild(enemy.grid);
  document.body.appendChild(info);
  document.body.appendChild(main);
};
const player = new _modules_battleground__WEBPACK_IMPORTED_MODULE_1__["default"]();
const enemy = new _modules_battleground__WEBPACK_IMPORTED_MODULE_1__["default"](true);
initialize();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);

/***/ }),

/***/ "./src/modules/battleground.js":
/*!*************************************!*\
  !*** ./src/modules/battleground.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _battleship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./battleship */ "./src/modules/battleship.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "./src/index.js");


const defaultShips = {
  4: 1,
  3: 2,
  2: 3,
  1: 4
};
class Battleground {
  constructor() {
    let isEnemy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    let row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    let col = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
    let ships = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultShips;
    this.shipCoordinates = new Set();
    this.markedCoordinates = new Set();
    this.battleships = [];
    this.isEnemy = isEnemy;
    this.idSuffix = isEnemy ? "e" : "";
    this.battleshipsLeft = 10;
    this.grid = this.generateGrid(row, col, ships);
  }
  generateGrid(row, col, ships) {
    const grid = document.createElement("div");
    grid.classList.add("grid");
    for (let r = 0; r < row; r++) {
      for (let c = 0; c < col; c++) {
        const element = document.createElement("div");
        element.id = `${r}${c}${this.idSuffix}`;
        element.classList.add("cell" + this.idSuffix);
        element.onclick = e => {
          this.handleClick(e);
        };
        grid.appendChild(element);
      }
    }
    this.populateGrid(ships); // place battleships on empty grid
    return grid;
  }
  populateGrid(ships) {
    // generate coordinates for ships and store them 
    for (let [length, count] of Object.entries(ships)) {
      while (count) {
        const {
          x,
          y,
          isVertical
        } = this.getRandomCoordinates(length);
        const battleship = new _battleship__WEBPACK_IMPORTED_MODULE_0__["default"](x, y, length, isVertical);
        this.battleships.push(battleship); // all battleships
        this.updateShipCoordinates(battleship); // all coordinates where there is a ship
        count -= 1;
      }
    }
  }
  getRandomCoordinates(length) {
    // try random coordinates until valid coordinates are found
    while (true) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const isVertical = Math.floor(Math.random() * 2);
      if (this.coordinateIsValid(x, y, length, isVertical)) {
        return {
          x,
          y,
          isVertical
        };
      }
    }
  }
  coordinateIsValid(x, y, length, isVertical) {
    for (let i = 0; i < length; i++) {
      const r = isVertical ? x + i : x;
      const c = isVertical ? y : y + i;
      if (r >= 10 || c >= 10 || this.shipCoordinates.has(`${r}${c}${this.idSuffix}`)) {
        return false;
      }
    }
    return true;
  }
  updateShipCoordinates(battleship) {
    for (const coordinate of battleship.coordinates) {
      this.shipCoordinates.add(coordinate);
    }
  }
  handleClick(e) {
    if (!this.isEnemy) return;
    const cell = e.target;
    const coordinates = cell.id.slice(0, 2);
    const enemyShipsRemaining = document.querySelector(".enemy-info > h3");
    if (this.markedCoordinates.has(coordinates)) {
      console.log("Already marked");
      return;
    }
    this.markedCoordinates.add(coordinates);
    cell.classList.add("marked");
    if (this.shipCoordinates.has(coordinates)) {
      cell.classList.add("ship");
      const shipIndex = this.getShipFromCoordinates(coordinates);
      const destroyed = this.battleships[shipIndex].hit();
      if (destroyed) {
        this.battleships[shipIndex] = "Destroyed";
        this.battleshipsLeft -= 1;
        enemyShipsRemaining.textContent = this.battleshipsLeft;
        if (this.battleshipsLeft == 0) {
          alert("Game is finished");
        }
      }
    }
    if (this.isEnemy) {
      this.handleEnemyMove();
    }
  }
  getShipFromCoordinates(coordinates) {
    for (let i = 0; i < this.battleships.length; i++) {
      if (this.battleships[i] != "Destroyed" && this.battleships[i].coordinates.has(coordinates)) {
        return i;
      }
    }
  }
  handleEnemyMove = () => {
    let x = 0;
    let y = 0;
    while (___WEBPACK_IMPORTED_MODULE_1__["default"].markedCoordinates.has(`${x}${y}`)) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
    const coordinates = `${x}${y}`;
    const playerShipsRemaining = document.querySelector(".player-info > h3");
    const cell = document.getElementById(`${x}${y}`);
    console.log(cell);
    ___WEBPACK_IMPORTED_MODULE_1__["default"].markedCoordinates.add(coordinates);
    cell.classList.add("marked");
    if (___WEBPACK_IMPORTED_MODULE_1__["default"].shipCoordinates.has(coordinates)) {
      cell.classList.add("ship");
      const shipIndex = ___WEBPACK_IMPORTED_MODULE_1__["default"].getShipFromCoordinates(coordinates);
      const destroyed = ___WEBPACK_IMPORTED_MODULE_1__["default"].battleships[shipIndex].hit();
      if (destroyed) {
        ___WEBPACK_IMPORTED_MODULE_1__["default"].battleships[shipIndex] = "Destroyed";
        ___WEBPACK_IMPORTED_MODULE_1__["default"].battleshipsLeft -= 1;
        playerShipsRemaining.textContent = ___WEBPACK_IMPORTED_MODULE_1__["default"].battleshipsLeft;
        if (___WEBPACK_IMPORTED_MODULE_1__["default"].battleshipsLeft == 0) {
          alert("Game is finished");
        }
      }
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Battleground);

/***/ }),

/***/ "./src/modules/battleship.js":
/*!***********************************!*\
  !*** ./src/modules/battleship.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Battleship {
  constructor(x, y, length) {
    let isVertical = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    this.hp = +length;
    this.coordinates = this.getCoordinates(x, y, +length, isVertical);
  }
  getCoordinates(x, y, length, isVertical) {
    const coordinates = new Set();
    for (let i = 0; i < length; i++) {
      const cur = isVertical ? `${x + i}${y}` : `${x}${y + i}`;
      coordinates.add(cur);
    }
    return coordinates;
  }
  hit() {
    // return 1 if ship is destroyed else 0
    this.hp -= 1;
    return this.hp === 0 ? 1 : 0;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Battleship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/style.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `body {
    background-color: greenyellow;
}

.grid {
    display: grid;
    grid-template-rows: repeat(10, 1fr);
    grid-template-columns: repeat(10, 1fr);
    width: 500px;
    height: 500px;
    border: 2px solid rgb(236, 115, 135);
}

.cell, .celle {
    border: 1px solid black;
    cursor: not-allowed;
}

.celle {
    cursor: crosshair;
}


.marked {
    background-color: yellow;
}

.ship {
    background-color: brown;
}

.info {
    display: flex;
    padding: 10px 50px;
    flex-direction: column;
    align-items: center;
}

.info > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.main {
    display: flex;
    padding: 20px 50px;
    justify-content: center;
    align-items: center;
    gap: 300px;
}`, "",{"version":3,"sources":["webpack://./src/styles/style.css"],"names":[],"mappings":"AAAA;IACI,6BAA6B;AACjC;;AAEA;IACI,aAAa;IACb,mCAAmC;IACnC,sCAAsC;IACtC,YAAY;IACZ,aAAa;IACb,oCAAoC;AACxC;;AAEA;IACI,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;AACrB;;;AAGA;IACI,wBAAwB;AAC5B;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,aAAa;IACb,kBAAkB;IAClB,sBAAsB;IACtB,mBAAmB;AACvB;;AAEA;IACI,WAAW;IACX,aAAa;IACb,8BAA8B;AAClC;;AAEA;IACI,aAAa;IACb,kBAAkB;IAClB,uBAAuB;IACvB,mBAAmB;IACnB,UAAU;AACd","sourcesContent":["body {\n    background-color: greenyellow;\n}\n\n.grid {\n    display: grid;\n    grid-template-rows: repeat(10, 1fr);\n    grid-template-columns: repeat(10, 1fr);\n    width: 500px;\n    height: 500px;\n    border: 2px solid rgb(236, 115, 135);\n}\n\n.cell, .celle {\n    border: 1px solid black;\n    cursor: not-allowed;\n}\n\n.celle {\n    cursor: crosshair;\n}\n\n\n.marked {\n    background-color: yellow;\n}\n\n.ship {\n    background-color: brown;\n}\n\n.info {\n    display: flex;\n    padding: 10px 50px;\n    flex-direction: column;\n    align-items: center;\n}\n\n.info > div {\n    width: 100%;\n    display: flex;\n    justify-content: space-between;\n}\n\n.main {\n    display: flex;\n    padding: 20px 50px;\n    justify-content: center;\n    align-items: center;\n    gap: 300px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/style.css":
/*!******************************!*\
  !*** ./src/styles/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9iYXR0bGVncm91bmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2JhdHRsZXNoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3M/ZmY5NCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL3N0eWxlcy9zdHlsZS5jc3NcIlxuaW1wb3J0IEJhdHRsZWdyb3VuZCBmcm9tIFwiLi9tb2R1bGVzL2JhdHRsZWdyb3VuZFwiO1xuXG5jb25zdCBpbml0aWFsaXplID0gKCkgPT4ge1xuICAgIGNvbnN0IGluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHR1cm4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgY29uc3QgaW5mb0JvdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHBsYXllckluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGVuZW15SW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgcGxheWVySW5mb1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBjb25zdCBlbmVteUluZm9UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgY29uc3QgcGxheWVyU2hpcHNSZW1haW5pbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgY29uc3QgZW5lbXlTaGlwc1JlbWFpbmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIHR1cm4uaWQgPSBcInR1cm5cIjsgICAgIFxuICAgIHR1cm4uc2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiLCBcIjFcIik7XG4gICAgLy8gaWYgaWQgaXMgMSwgaXQncyB0aGUgcGxheWVyJ3MgdHVybiBlbHNlIGl0J3MgZW5lbXkncyB0dXJuXG4gICAgdHVybi50ZXh0Q29udGVudCA9IFwiWW91ciB0dXJuXCJcblxuICAgIHR1cm4udGV4dENvbnRlbnQgPSBcIllvdXIgVHVyblwiO1xuICAgIHBsYXllckluZm9UZXh0LnRleHRDb250ZW50ID0gXCJTaGlwcyByZW1haW5pbmc6IFwiO1xuICAgIGVuZW15SW5mb1RleHQudGV4dENvbnRlbnQgPSBcIkVuZW15IHNoaXBzIHJlbWFpbmluZzogXCI7XG4gICAgcGxheWVyU2hpcHNSZW1haW5pbmcudGV4dENvbnRlbnQgPSBcIjEwXCI7XG4gICAgZW5lbXlTaGlwc1JlbWFpbmluZy50ZXh0Q29udGVudCA9IFwiMTBcIjtcblxuICAgIHBsYXllckluZm8uY2xhc3NMaXN0LmFkZChcInBsYXllci1pbmZvXCIpO1xuICAgIGVuZW15SW5mby5jbGFzc0xpc3QuYWRkKFwiZW5lbXktaW5mb1wiKTtcblxuICAgIHBsYXllckluZm8uYXBwZW5kQ2hpbGQocGxheWVySW5mb1RleHQpO1xuICAgIHBsYXllckluZm8uYXBwZW5kQ2hpbGQocGxheWVyU2hpcHNSZW1haW5pbmcpO1xuXG4gICAgZW5lbXlJbmZvLmFwcGVuZENoaWxkKGVuZW15SW5mb1RleHQpO1xuICAgIGVuZW15SW5mby5hcHBlbmRDaGlsZChlbmVteVNoaXBzUmVtYWluaW5nKTtcblxuICAgIGluZm9Cb3RoLmFwcGVuZENoaWxkKHBsYXllckluZm8pO1xuICAgIGluZm9Cb3RoLmFwcGVuZENoaWxkKGVuZW15SW5mbyk7XG5cbiAgICBpbmZvLmNsYXNzTGlzdC5hZGQoXCJpbmZvXCIpO1xuICAgIGluZm8uYXBwZW5kQ2hpbGQodHVybilcbiAgICBpbmZvLmFwcGVuZENoaWxkKGluZm9Cb3RoKTtcblxuICAgIG1haW4uY2xhc3NMaXN0LmFkZChcIm1haW5cIik7XG5cbiAgICBtYWluLmFwcGVuZENoaWxkKHBsYXllci5ncmlkKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGVuZW15LmdyaWQpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbmZvKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1haW4pO1xufVxuXG5cbmNvbnN0IHBsYXllciA9IG5ldyBCYXR0bGVncm91bmQoKTtcbmNvbnN0IGVuZW15ID0gbmV3IEJhdHRsZWdyb3VuZCh0cnVlKTtcbmluaXRpYWxpemUoKTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsImltcG9ydCBCYXR0bGVzaGlwIGZyb20gXCIuL2JhdHRsZXNoaXBcIjtcbmltcG9ydCBwbGF5ZXIgZnJvbSBcIi4uXCI7XG5cbmNvbnN0IGRlZmF1bHRTaGlwcyA9IHtcbiAgICA0OiAxLFxuICAgIDM6IDIsXG4gICAgMjogMyxcbiAgICAxOiA0LFxufVxuXG5jbGFzcyBCYXR0bGVncm91bmQge1xuICAgIGNvbnN0cnVjdG9yKGlzRW5lbXk9ZmFsc2UsIHJvdz0xMCwgY29sPTEwLCBzaGlwcz1kZWZhdWx0U2hpcHMpe1xuICAgICAgICB0aGlzLnNoaXBDb29yZGluYXRlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5tYXJrZWRDb29yZGluYXRlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5iYXR0bGVzaGlwcyA9IFtdO1xuICAgICAgICB0aGlzLmlzRW5lbXkgPSBpc0VuZW15O1xuICAgICAgICB0aGlzLmlkU3VmZml4ID0gaXNFbmVteSA/IFwiZVwiIDogXCJcIjtcbiAgICAgICAgdGhpcy5iYXR0bGVzaGlwc0xlZnQgPSAxMDtcbiAgICAgICAgdGhpcy5ncmlkID0gdGhpcy5nZW5lcmF0ZUdyaWQocm93LCBjb2wsIHNoaXBzKTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUdyaWQocm93LCBjb2wsIHNoaXBzKXtcbiAgICAgICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZChcImdyaWRcIik7XG4gICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgcm93OyByICsrKXtcbiAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgY29sOyBjICsrKXtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlkID0gYCR7cn0ke2N9JHt0aGlzLmlkU3VmZml4fWA7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiICsgdGhpcy5pZFN1ZmZpeCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5vbmNsaWNrID0gKGUpID0+IHt0aGlzLmhhbmRsZUNsaWNrKGUpfTtcbiAgICAgICAgICAgICAgICBncmlkLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9wdWxhdGVHcmlkKHNoaXBzKTsgICAgLy8gcGxhY2UgYmF0dGxlc2hpcHMgb24gZW1wdHkgZ3JpZFxuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZUdyaWQoc2hpcHMpe1xuICAgICAgICAvLyBnZW5lcmF0ZSBjb29yZGluYXRlcyBmb3Igc2hpcHMgYW5kIHN0b3JlIHRoZW0gXG4gICAgICAgIGZvciAobGV0IFtsZW5ndGgsIGNvdW50XSBvZiBPYmplY3QuZW50cmllcyhzaGlwcykpe1xuICAgICAgICAgICAgd2hpbGUgKGNvdW50KXtcbiAgICAgICAgICAgICAgICBjb25zdCB7eCwgeSwgaXNWZXJ0aWNhbH0gPSB0aGlzLmdldFJhbmRvbUNvb3JkaW5hdGVzKGxlbmd0aCk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBCYXR0bGVzaGlwKHgsIHksIGxlbmd0aCwgaXNWZXJ0aWNhbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5iYXR0bGVzaGlwcy5wdXNoKGJhdHRsZXNoaXApOyAgICAgICAvLyBhbGwgYmF0dGxlc2hpcHNcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNoaXBDb29yZGluYXRlcyhiYXR0bGVzaGlwKTsgIC8vIGFsbCBjb29yZGluYXRlcyB3aGVyZSB0aGVyZSBpcyBhIHNoaXBcbiAgICAgICAgICAgICAgICBjb3VudCAtPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRSYW5kb21Db29yZGluYXRlcyhsZW5ndGgpe1xuICAgICAgICAvLyB0cnkgcmFuZG9tIGNvb3JkaW5hdGVzIHVudGlsIHZhbGlkIGNvb3JkaW5hdGVzIGFyZSBmb3VuZFxuICAgICAgICB3aGlsZSAodHJ1ZSl7XG4gICAgICAgICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGlzVmVydGljYWwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvb3JkaW5hdGVJc1ZhbGlkKHgsIHksIGxlbmd0aCwgaXNWZXJ0aWNhbCkpe1xuICAgICAgICAgICAgICAgIHJldHVybiB7eCwgeSwgaXNWZXJ0aWNhbH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb29yZGluYXRlSXNWYWxpZCh4LCB5LCBsZW5ndGgsIGlzVmVydGljYWwpe1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICBjb25zdCByID0gaXNWZXJ0aWNhbCA/IHggKyBpIDogeDtcbiAgICAgICAgICAgIGNvbnN0IGMgPSBpc1ZlcnRpY2FsID8geSA6IHkgKyBpO1xuICAgICAgICAgICAgaWYgKHIgPj0gMTAgfHwgYyA+PSAxMCB8fCB0aGlzLnNoaXBDb29yZGluYXRlcy5oYXMoYCR7cn0ke2N9JHt0aGlzLmlkU3VmZml4fWApKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB1cGRhdGVTaGlwQ29vcmRpbmF0ZXMoYmF0dGxlc2hpcCl7XG4gICAgICAgIGZvciAoY29uc3QgY29vcmRpbmF0ZSBvZiBiYXR0bGVzaGlwLmNvb3JkaW5hdGVzKXtcbiAgICAgICAgICAgIHRoaXMuc2hpcENvb3JkaW5hdGVzLmFkZChjb29yZGluYXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRW5lbXkpIHJldHVyblxuICAgICAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gY2VsbC5pZC5zbGljZSgwLCAyKTtcbiAgICAgICAgY29uc3QgZW5lbXlTaGlwc1JlbWFpbmluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW5lbXktaW5mbyA+IGgzXCIpO1xuICAgICAgICBpZiAodGhpcy5tYXJrZWRDb29yZGluYXRlcy5oYXMoY29vcmRpbmF0ZXMpKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWxyZWFkeSBtYXJrZWRcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXJrZWRDb29yZGluYXRlcy5hZGQoY29vcmRpbmF0ZXMpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJtYXJrZWRcIik7XG4gICAgICAgIGlmICh0aGlzLnNoaXBDb29yZGluYXRlcy5oYXMoY29vcmRpbmF0ZXMpKXtcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgICAgICBjb25zdCBzaGlwSW5kZXggPSB0aGlzLmdldFNoaXBGcm9tQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgY29uc3QgZGVzdHJveWVkID0gdGhpcy5iYXR0bGVzaGlwc1tzaGlwSW5kZXhdLmhpdCgpO1xuICAgICAgICAgICAgaWYgKGRlc3Ryb3llZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5iYXR0bGVzaGlwc1tzaGlwSW5kZXhdID0gXCJEZXN0cm95ZWRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmJhdHRsZXNoaXBzTGVmdCAtPSAxO1xuICAgICAgICAgICAgICAgIGVuZW15U2hpcHNSZW1haW5pbmcudGV4dENvbnRlbnQgPSB0aGlzLmJhdHRsZXNoaXBzTGVmdDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iYXR0bGVzaGlwc0xlZnQgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiR2FtZSBpcyBmaW5pc2hlZFwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0VuZW15KSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVuZW15TW92ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2hpcEZyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyl7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5iYXR0bGVzaGlwcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZiAodGhpcy5iYXR0bGVzaGlwc1tpXSAhPSBcIkRlc3Ryb3llZFwiICYmXG4gICAgICAgICAgICAgICAgdGhpcy5iYXR0bGVzaGlwc1tpXS5jb29yZGluYXRlcy5oYXMoY29vcmRpbmF0ZXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUVuZW15TW92ZSA9ICgpID0+IHtcbiAgICAgICAgbGV0IHggPSAwO1xuICAgICAgICBsZXQgeSA9IDBcbiAgICAgICAgd2hpbGUgKHBsYXllci5tYXJrZWRDb29yZGluYXRlcy5oYXMoYCR7eH0ke3l9YCkpe1xuICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBgJHt4fSR7eX1gO1xuICAgICAgICBjb25zdCBwbGF5ZXJTaGlwc1JlbWFpbmluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWluZm8gPiBoM1wiKTtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3h9JHt5fWApO1xuICAgICAgICBjb25zb2xlLmxvZyhjZWxsKVxuICAgICAgICBwbGF5ZXIubWFya2VkQ29vcmRpbmF0ZXMuYWRkKGNvb3JkaW5hdGVzKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwibWFya2VkXCIpO1xuICAgICAgICBpZiAocGxheWVyLnNoaXBDb29yZGluYXRlcy5oYXMoY29vcmRpbmF0ZXMpKXtcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgICAgICBjb25zdCBzaGlwSW5kZXggPSBwbGF5ZXIuZ2V0U2hpcEZyb21Db29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgICAgICAgICBjb25zdCBkZXN0cm95ZWQgPSBwbGF5ZXIuYmF0dGxlc2hpcHNbc2hpcEluZGV4XS5oaXQoKTtcbiAgICAgICAgICAgIGlmIChkZXN0cm95ZWQpe1xuICAgICAgICAgICAgICAgIHBsYXllci5iYXR0bGVzaGlwc1tzaGlwSW5kZXhdID0gXCJEZXN0cm95ZWRcIjtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuYmF0dGxlc2hpcHNMZWZ0IC09IDE7XG4gICAgICAgICAgICAgICAgcGxheWVyU2hpcHNSZW1haW5pbmcudGV4dENvbnRlbnQgPSBwbGF5ZXIuYmF0dGxlc2hpcHNMZWZ0O1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuYmF0dGxlc2hpcHNMZWZ0ID09IDApe1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcIkdhbWUgaXMgZmluaXNoZWRcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhdHRsZWdyb3VuZDsiLCJjbGFzcyBCYXR0bGVzaGlwIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBsZW5ndGgsIGlzVmVydGljYWw9ZmFsc2Upe1xuICAgICAgICB0aGlzLmhwID0gK2xlbmd0aDtcbiAgICAgICAgdGhpcy5jb29yZGluYXRlcyA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXMoeCwgeSwgK2xlbmd0aCwgaXNWZXJ0aWNhbCk7XG4gICAgfVxuXG4gICAgZ2V0Q29vcmRpbmF0ZXMoeCwgeSwgbGVuZ3RoLCBpc1ZlcnRpY2FsKXtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSAgbmV3IFNldCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGNvbnN0IGN1ciA9IGlzVmVydGljYWwgPyBgJHt4K2l9JHt5fWAgOiBgJHt4fSR7eStpfWA7XG4gICAgICAgICAgICBjb29yZGluYXRlcy5hZGQoY3VyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gICAgfVxuXG4gICAgaGl0KCl7XG4gICAgICAgIC8vIHJldHVybiAxIGlmIHNoaXAgaXMgZGVzdHJveWVkIGVsc2UgMFxuICAgICAgICB0aGlzLmhwIC09IDE7XG4gICAgICAgIHJldHVybiB0aGlzLmhwID09PSAwID8gMSA6IDA7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXR0bGVzaGlwOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBib2R5IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbnllbGxvdztcbn1cblxuLmdyaWQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XG4gICAgd2lkdGg6IDUwMHB4O1xuICAgIGhlaWdodDogNTAwcHg7XG4gICAgYm9yZGVyOiAycHggc29saWQgcmdiKDIzNiwgMTE1LCAxMzUpO1xufVxuXG4uY2VsbCwgLmNlbGxlIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4uY2VsbGUge1xuICAgIGN1cnNvcjogY3Jvc3NoYWlyO1xufVxuXG5cbi5tYXJrZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcbn1cblxuLnNoaXAge1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJyb3duO1xufVxuXG4uaW5mbyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBwYWRkaW5nOiAxMHB4IDUwcHg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uaW5mbyA+IGRpdiB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5tYWluIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHBhZGRpbmc6IDIwcHggNTBweDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogMzAwcHg7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLDZCQUE2QjtBQUNqQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQ0FBbUM7SUFDbkMsc0NBQXNDO0lBQ3RDLFlBQVk7SUFDWixhQUFhO0lBQ2Isb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGlCQUFpQjtBQUNyQjs7O0FBR0E7SUFDSSx3QkFBd0I7QUFDNUI7O0FBRUE7SUFDSSx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLHNCQUFzQjtJQUN0QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsYUFBYTtJQUNiLDhCQUE4QjtBQUNsQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixVQUFVO0FBQ2RcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVueWVsbG93O1xcbn1cXG5cXG4uZ3JpZCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgd2lkdGg6IDUwMHB4O1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCByZ2IoMjM2LCAxMTUsIDEzNSk7XFxufVxcblxcbi5jZWxsLCAuY2VsbGUge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuXFxuLmNlbGxlIHtcXG4gICAgY3Vyc29yOiBjcm9zc2hhaXI7XFxufVxcblxcblxcbi5tYXJrZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XFxufVxcblxcbi5zaGlwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYnJvd247XFxufVxcblxcbi5pbmZvIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgcGFkZGluZzogMTBweCA1MHB4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uaW5mbyA+IGRpdiB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbi5tYWluIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgcGFkZGluZzogMjBweCA1MHB4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAzMDBweDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbIkJhdHRsZWdyb3VuZCIsImluaXRpYWxpemUiLCJpbmZvIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidHVybiIsImluZm9Cb3RoIiwicGxheWVySW5mbyIsImVuZW15SW5mbyIsInBsYXllckluZm9UZXh0IiwiZW5lbXlJbmZvVGV4dCIsInBsYXllclNoaXBzUmVtYWluaW5nIiwiZW5lbXlTaGlwc1JlbWFpbmluZyIsIm1haW4iLCJpZCIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJwbGF5ZXIiLCJncmlkIiwiZW5lbXkiLCJib2R5IiwiQmF0dGxlc2hpcCIsImRlZmF1bHRTaGlwcyIsImNvbnN0cnVjdG9yIiwiaXNFbmVteSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsInJvdyIsImNvbCIsInNoaXBzIiwic2hpcENvb3JkaW5hdGVzIiwiU2V0IiwibWFya2VkQ29vcmRpbmF0ZXMiLCJiYXR0bGVzaGlwcyIsImlkU3VmZml4IiwiYmF0dGxlc2hpcHNMZWZ0IiwiZ2VuZXJhdGVHcmlkIiwiciIsImMiLCJlbGVtZW50Iiwib25jbGljayIsImUiLCJoYW5kbGVDbGljayIsInBvcHVsYXRlR3JpZCIsImNvdW50IiwiT2JqZWN0IiwiZW50cmllcyIsIngiLCJ5IiwiaXNWZXJ0aWNhbCIsImdldFJhbmRvbUNvb3JkaW5hdGVzIiwiYmF0dGxlc2hpcCIsInB1c2giLCJ1cGRhdGVTaGlwQ29vcmRpbmF0ZXMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb29yZGluYXRlSXNWYWxpZCIsImkiLCJoYXMiLCJjb29yZGluYXRlIiwiY29vcmRpbmF0ZXMiLCJjZWxsIiwidGFyZ2V0Iiwic2xpY2UiLCJxdWVyeVNlbGVjdG9yIiwiY29uc29sZSIsImxvZyIsInNoaXBJbmRleCIsImdldFNoaXBGcm9tQ29vcmRpbmF0ZXMiLCJkZXN0cm95ZWQiLCJoaXQiLCJhbGVydCIsImhhbmRsZUVuZW15TW92ZSIsImdldEVsZW1lbnRCeUlkIiwiaHAiLCJnZXRDb29yZGluYXRlcyIsImN1ciJdLCJzb3VyY2VSb290IjoiIn0=