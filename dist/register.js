'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _style = require('./cyto/style');

var _style2 = _interopRequireDefault(_style);

var _cyto = require('./cyto');

var _statechart = require('./graphBuilder/statechart');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  cy: {
    height: '100%',
    width: '100%'
  }
};

var XStateGraph = function (_React$Component) {
  _inherits(XStateGraph, _React$Component);

  function XStateGraph() {
    var _ref;

    _classCallCheck(this, XStateGraph);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = XStateGraph.__proto__ || Object.getPrototypeOf(XStateGraph)).call.apply(_ref, [this].concat(args)));

    _this.buildGraph = _this.buildGraph.bind(_this);
    _this.resizeGraph = _this.resizeGraph.bind(_this);
    _this.curMachine = '';
    return _this;
  }

  _createClass(XStateGraph, [{
    key: 'resizeGraph',
    value: function resizeGraph() {
      if (this.graph) this.graph.resize();
    }
  }, {
    key: 'buildGraph',
    value: function buildGraph(_ref2) {
      var _this2 = this;

      var machine = _ref2.machine,
          currentState = _ref2.currentState;

      if (machine && currentState) {
        if (this.curMachine !== machine.id) {
          this.curMachine = machine.id;
          this.graph = (0, _cyto.render)(this.cNode, (0, _statechart.build)(machine, currentState), function (event) {
            var channel = _this2.props.channel;

            channel.emit('xstate/transition', event);
          });
        }
        this.graph.setState(currentState);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.resizeGraph();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          channel = _props.channel,
          api = _props.api;

      channel.on('xstate/buildGraph', this.buildGraph);
      channel.on('xstate/resize', this.resizeGraph);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmounted = true;
      var _props2 = this.props,
          channel = _props2.channel,
          api = _props2.api;

      channel.removeListener('xstate/buildGraph', this.buildGraph);
      channel.removeListener('xstate/resize', this.resizeGraph);
      this.graph.remove();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('div', { style: styles.cy, id: 'cy', ref: function ref(el) {
          return _this3.cNode = el;
        } });
    }
  }]);

  return XStateGraph;
}(_react2.default.Component);

_addons2.default.register('xstate/machine', function (api) {
  _addons2.default.addPanel('xstate/machine/graph', {
    title: 'xstate',
    render: function render() {
      return _react2.default.createElement(XStateGraph, { channel: _addons2.default.getChannel(), api: api });
    }
  });
});