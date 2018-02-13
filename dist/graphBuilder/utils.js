'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var createNode = exports.createNode = function createNode(data) {
  return {
    group: 'nodes',
    data: _extends({}, data)
  };
};
var createEdge = exports.createEdge = function createEdge(data) {
  return {
    group: 'edges',
    data: _extends({}, data)
  };
};
var createId = exports.createId = function createId(parent, id) {
  return '' + (parent ? parent + '.' : '') + id;
};