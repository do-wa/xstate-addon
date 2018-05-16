'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = undefined;

var _graph = require('xstate/lib/graph');

var _utils = require('xstate/lib/utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getEdges = function getEdges(node) {
  var edges = [];
  if (node.states) {
    Object.keys(node.states).forEach(function (stateKey) {
      edges.push.apply(edges, _toConsumableArray(getEdges(node.states[stateKey])));
    });
  }

  Object.keys(node.on || {}).forEach(function (event) {
    edges.push.apply(edges, _toConsumableArray(getEventNodes(node, event)));
  });
  return edges;
};

var getEventNodes = function getEventNodes(node, event) {
  var transitions = node.on[event] || [];

  return transitions.map(function (transition) {
    return {
      group: 'edges',
      data: {
        id: '' + node.key + event,
        source: node.key,
        target: transition.target,
        key: event,

        actions: transition.actions ? (0, _utils.getActionType)(transition.actions.map(_utils.getActionType)) : []
      }
    };
  });
};

var createInitialNodes = function createInitialNodes(node) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var newNodes = [];
  if (node.initial) {
    newNodes.push({
      group: 'nodes',
      data: {
        id: node.key + '.initial',
        parent: parent,
        isInitial: true
      }
    });
    newNodes.push({
      group: 'edges',
      data: {
        isInitial: true,
        id: node.key + '.initial.edge',
        source: node.key + '.initial',
        target: '' + node.initial,
        parent: parent
      }
    });
  }
  return newNodes;
};

var build = exports.build = function build(machine, currentState) {
  var nodes = (0, _graph.getNodes)(machine);
  var graphNodes = nodes.reduce(function (acc, node, idx) {
    var path = node.path,
        key = node.key;

    var parent = path.length > 1 ? path[path.length - 2] : '';
    acc.push.apply(acc, _toConsumableArray(createInitialNodes(node, node.key)));
    acc.push.apply(acc, _toConsumableArray(getEdges(node)));
    acc.push({
      group: 'nodes',
      data: {
        path: path,
        id: key,
        key: key,
        parent: parent,
        hasChildren: Object.keys(node.states).length
      }
    });
    return acc;
  }, []);
  graphNodes.push.apply(graphNodes, _toConsumableArray(createInitialNodes({ initial: machine.initial, key: '' })));
  return graphNodes;
};