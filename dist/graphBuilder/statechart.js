'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = undefined;

var _utils = require('./utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var R = require('ramda');
var build = exports.build = function build(states, initial) {
  var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  var currentState = arguments[3];
  var initialSet = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  return R.flatten(R.reduce(function (acc, stateKey) {
    var state = states[stateKey];
    var childNodes = R.has("states", state) ? build(state.states, state.initial, stateKey, currentState, false) : [];
    var edges = R.map(function (edgeKey) {
      return (0, _utils.createEdge)({
        id: (0, _utils.createId)(stateKey, edgeKey),
        key: edgeKey,
        parent: parent,
        source: state.relativeId,
        target: (0, _utils.createId)(parent, state.on[edgeKey])
      });
    }, R.keysIn(state.on));
    var node = (0, _utils.createNode)({
      key: stateKey,
      id: state.relativeId,
      parent: parent,
      selected: state.relativeId === currentState ? true : false,
      hasChildren: childNodes.length ? true : false
    });
    if (!initialSet) {
      var initialNode = (0, _utils.createNode)({
        id: (0, _utils.createId)(parent, "initial"),
        isInitial: true,
        parent: parent
      });
      var initialEdge = (0, _utils.createEdge)({
        id: (0, _utils.createId)(parent, "initial.edge"),
        source: initialNode.data.id,
        target: (0, _utils.createId)(parent, initial),
        isInitial: true,
        parent: parent
      });
      initialSet = true;
      acc = [initialNode, initialEdge].concat(_toConsumableArray(acc));
    }
    acc = [node].concat(_toConsumableArray(edges), _toConsumableArray(childNodes), _toConsumableArray(acc));
    return acc;
  }, [], R.keysIn(states)));
};