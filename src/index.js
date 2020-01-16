"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var ReactDOM = __importStar(require("react-dom"));
var antd_1 = require("antd");
var zh_CN_1 = __importDefault(require("antd/es/locale-provider/zh_CN"));
require("@babel/polyfill");
var utils_1 = require("./common/utils");
var react_router_dom_1 = require("react-router-dom");
var history_1 = __importDefault(require("./common/history"));
var mobx_react_1 = require("mobx-react");
var global_store_1 = __importDefault(require("./store/global-store"));
var stores = { globalStore: global_store_1.default };
require("antd/dist/antd.less");
require("./common/flexbox.css");
require("./common/common.styl");
var frame_1 = __importDefault(require("./frame"));
var login_1 = __importDefault(require("./pages/login/login"));
var home_1 = __importDefault(require("./pages/home/home"));
var about_1 = __importDefault(require("./pages/about/about"));
var plugin_1 = __importDefault(require("./pages/plugin/plugin"));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        console.log('config', utils_1.config);
        return (React.createElement(react_router_dom_1.Router, { history: history_1.default },
            React.createElement(react_router_dom_1.Switch, null,
                React.createElement(react_router_dom_1.Route, { path: utils_1.config.pathPrefix + "/login", component: login_1.default }),
                React.createElement(frame_1.default, null,
                    React.createElement(react_router_dom_1.Switch, null,
                        React.createElement(react_router_dom_1.Route, { path: utils_1.config.pathPrefix + "/home", component: home_1.default }),
                        React.createElement(react_router_dom_1.Route, { path: utils_1.config.pathPrefix + "/about", component: about_1.default }),
                        React.createElement(react_router_dom_1.Route, { path: utils_1.config.pathPrefix + "/plugin", component: plugin_1.default }),
                        React.createElement(react_router_dom_1.Route, { path: utils_1.config.pathPrefix + "/404", render: function () { return React.createElement("div", { style: { fontSize: 100 } }, "404"); } }),
                        React.createElement(react_router_dom_1.Redirect, { from: "/", to: utils_1.config.pathPrefix + "/home" }))))));
    };
    return App;
}(React.Component));
ReactDOM.render(React.createElement(antd_1.ConfigProvider, { locale: zh_CN_1.default },
    React.createElement(mobx_react_1.Provider, __assign({}, stores),
        React.createElement(App, null))), document.getElementById('root'));
