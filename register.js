
WARNING: We noticed you're using the `useBuiltIns` option without declaring a core-js version. Currently, we assume version 2.x when no version is passed. Since this default version will likely change in future versions of Babel, we recommend explicitly setting the core-js version you are using via the `corejs` option.

You should also be sure that the version you pass to the `corejs` option matches the version specified in your `package.json`'s `dependencies` section. If it doesn't, you need to run one of the following commands:

  npm install --save core-js@2    npm install --save core-js@3
  yarn add core-js@2              yarn add core-js@3

"use strict";

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireDefault(require("react"));

var _coreEvents = require("@storybook/core-events");

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _vulcanLib = require("meteor/vulcan:lib");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ADDON_ID = 'vulcan';
var PARAM_KEY = 'vulcan';
var PANEL_ID = "".concat(ADDON_ID, "/panel");

var VulcanWrapper =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VulcanWrapper, _React$Component);

  function VulcanWrapper() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, VulcanWrapper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(VulcanWrapper)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "initComponents", function () {
      // we need registered fragments to be initialized because populateComponentsApp will run
      // hocs, like withUpdate, that rely on fragments
      (0, _vulcanLib.initializeFragments)(); // actually fills the Components object

      (0, _vulcanLib.populateComponentsApp)();
    });

    _defineProperty(_assertThisInitialized(_this), "onStoryChange", function (id) {
      _this.initComponents();
    });

    return _this;
  }

  _createClass(VulcanWrapper, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.initComponents();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var api = this.props.api;
      api.on(_coreEvents.STORY_CHANGED, this.onStoryChange);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var api = this.props.api;
      api.off(_coreEvents.STORY_CHANGED, this.onStoryChange);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, "Hello");
    }
  }]);

  return VulcanWrapper;
}(_react["default"].Component);

_addons["default"].register(ADDON_ID, function (api) {
  var render = function render(_ref) {
    var active = _ref.active;
    return _react["default"].createElement(VulcanWrapper, {
      api: api,
      active: active
    });
  };

  var title = 'Vulcan';

  _addons["default"].add(ADDON_ID, {
    //type: types.TOOL,
    tupe: _addons.types.PANEL,
    title: title,
    //match: ({ viewMode }) => viewMode === 'story',
    render: render
  });
});

