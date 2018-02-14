"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var style = [{
  selector: 'node',
  style: {
    padding: "20px",
    "text-valign": function textValign(ele) {
      return ele.data("hasChildren") ? "top" : "center";
    },
    "text-halign": "center",
    "background-color": "white",
    "border-color": function borderColor(ele) {
      return ele.data("selected") ? "red" : ele.data("isInitial") ? "white" : "black";
    },
    "border-width": 1,
    shape: function shape(ele) {
      return ele.data("isInitial") ? "ellipse" : "roundrectangle";
    },
    label: "data(key)"
  }
}, {
  selector: 'edge',
  style: {
    width: 1,
    "line-color": "black",
    "text-background-opacity": 1,
    "text-background-color": "#ffffff",
    "target-arrow-color": "black",
    "target-arrow-shape": "triangle",
    "source-arrow-color": "black",
    "source-arrow-shape": function sourceArrowShape(ele) {
      return ele.data("isInitial") ? "circle" : "none";
    },
    "curve-style": function curveStyle(ele) {
      return ele.data("isInitial") ? "unbundled-bezier" : "bezier";
    },

    label: 'data(key)'
  }
}];

exports.default = style;