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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var mobx_react_1 = require("mobx-react");
var react_router_dom_1 = require("react-router-dom");
var utils_1 = require("../common/utils");
var Header = antd_1.Layout.Header, Sider = antd_1.Layout.Sider, Content = antd_1.Layout.Content, Footer = antd_1.Layout.Footer;
var logo_svg_1 = __importDefault(require("../assets/svg/logo.svg"));
require("../icon");
var Frame = /** @class */ (function (_super) {
    __extends(Frame, _super);
    function Frame(props) {
        var _this = _super.call(this, props) || this;
        _this.logout = function () {
            _this.props.globalStore.logout();
        };
        _this.toggle = function () {
            _this.setState({
                collapsed: !_this.state.collapsed,
            });
        };
        _this.state = {
            collapsed: false,
            selectedKeys: ['home']
        };
        return _this;
    }
    Frame.prototype.UNSAFE_componentWillMount = function () {
        utils_1.log('Frame componentWillMount');
        this.props.globalStore.loginInfo();
        utils_1.log('Frame props', this.props);
        var location = this.props.location;
        var nameArray = location.pathname.split("/");
        this.setState({
            selectedKeys: [nameArray[nameArray.length - 1]],
        });
    };
    Frame.prototype.render = function () {
        var userInfo = this.props.globalStore.userInfo;
        var children = this.props.children;
        if (userInfo) {
            return (react_1.default.createElement(antd_1.Layout, { className: "frame" },
                react_1.default.createElement(Header, { className: "FBH FBAC", style: { background: '#fff', padding: 0 } },
                    react_1.default.createElement("div", { className: "frame-logo p10" },
                        react_1.default.createElement("img", { src: logo_svg_1.default, className: "w100 h100" })),
                    react_1.default.createElement("div", { className: "FB1 FBH FBAC FBJB" },
                        react_1.default.createElement("div", { className: "fs26 fw500" }, "\u524D\u7AEF\u6E32\u67D3\u670D\u52A1\u7BA1\u7406"),
                        react_1.default.createElement(antd_1.Menu, { mode: "horizontal", defaultSelectedKeys: this.state.selectedKeys, style: { lineHeight: '64px' }, className: "FB1 ml10" },
                            react_1.default.createElement(antd_1.Menu.Item, { key: "home" },
                                react_1.default.createElement(react_router_dom_1.Link, { to: utils_1.config.pathPrefix + "/home" }, "\u9996\u9875")),
                            react_1.default.createElement(antd_1.Menu.Item, { key: "about" },
                                react_1.default.createElement(react_router_dom_1.Link, { to: utils_1.config.pathPrefix + "/about" }, "\u8BF4\u660E")),
                            react_1.default.createElement(antd_1.Menu.Item, { key: "plugin" },
                                react_1.default.createElement(react_router_dom_1.Link, { to: utils_1.config.pathPrefix + "/plugin" }, "\u63D2\u4EF6")))),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(antd_1.Dropdown, { overlay: react_1.default.createElement(antd_1.Menu, null,
                                react_1.default.createElement(antd_1.Menu.Item, { className: "mt0 mb0 pt4 pb4", onClick: this.logout }, "\u9000\u51FA\u767B\u5F55")), trigger: ['click'] },
                            react_1.default.createElement("div", { className: "FBH FBAC FBJE pr20 hand" },
                                react_1.default.createElement("div", { className: "ml8" },
                                    userInfo.nickname,
                                    " ",
                                    react_1.default.createElement(antd_1.Icon, { type: "down" })))))),
                react_1.default.createElement(Content, { className: "p10" }, children),
                react_1.default.createElement(Footer, { style: { textAlign: 'center' } },
                    react_1.default.createElement("div", null, "Copyright 2016-2020 Trends Online CO,LTD. All Rights Reserved."),
                    react_1.default.createElement("div", null, "\u676D\u5DDE\u6570\u6F9C\u79D1\u6280\u6709\u9650\u516C\u53F8"))));
        }
        return (react_1.default.createElement("div", { style: { textAlign: 'center' } },
            " ",
            react_1.default.createElement(antd_1.Spin, null)));
    };
    Frame = __decorate([
        mobx_react_1.inject("globalStore"),
        mobx_react_1.observer
    ], Frame);
    return Frame;
}(react_1.Component));
exports.default = react_router_dom_1.withRouter(Frame);
