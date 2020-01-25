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
var React = __importStar(require("react"));
var antd_1 = require("antd");
var mobx_react_1 = require("mobx-react");
var mobx_1 = require("mobx");
var classnames_1 = __importDefault(require("classnames"));
var utils_1 = require("../../common/utils");
var Search = antd_1.Input.Search;
var component_code_box_1 = require("../../components/component-code-box");
require("./home.styl");
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            readVisible: false,
            editVisible: false,
            appConfig: {
                config: {},
                key: ''
            },
            value: '',
            title: '',
            add: false
        };
        _this.actionView = function (key) {
            var appConfigList = _this.props.globalStore.appConfigList;
            var appConfig = appConfigList.find(function (config) {
                return key == config.key;
            });
            if (!appConfig)
                return utils_1.warningTip('配置未找到');
            _this.setState({
                readVisible: true,
                appConfig: appConfig
            });
        };
        _this.actionDelete = function (key) {
            utils_1.log('actionDelete key', key);
            var appConfigList = _this.props.globalStore.appConfigList;
            var appConfig = appConfigList.find(function (config) {
                return key == config.key;
            });
            if (!appConfig)
                return utils_1.warningTip('配置未找到');
            if (!(appConfig.permission & 8))
                return;
            antd_1.Modal.confirm({
                title: "\u5220\u9664\u914D\u7F6E (" + key + ")",
                content: "\u786E\u8BA4\u5220\u9664\u8BE5\u914D\u7F6E: " + appConfig.config.name,
                okText: '确认',
                cancelText: '取消',
                onOk: function () {
                    _this.props.globalStore.delete(appConfig.key);
                }
            });
        };
        /**
         *  // 复制 cope编辑 edit 新建 add
         * @param {string} type
         * @param key
         */
        _this.actionChange = function (type, key) {
            if (type === void 0) { type = 'edit'; }
            var userInfo = _this.props.globalStore.userInfo;
            if ((type != 'edit' && !(userInfo.permission & 2)))
                return;
            var appConfigList = _this.props.globalStore.appConfigList;
            var title = '新建';
            var appConfig = { config: {} };
            if (type !== 'add') {
                appConfig = appConfigList.find(function (config) {
                    return key == config.key;
                });
                if (!appConfig)
                    return utils_1.warningTip('配置未找到');
                if (type == 'edit' && !(appConfig.permission & 4))
                    return;
            }
            var add = true;
            if (type == 'edit') {
                title = "\u7F16\u8F91--" + appConfig.config.name + " (" + key + ")";
                add = false;
            }
            _this.setState({
                editVisible: true,
                appConfig: appConfig,
                title: title,
                value: JSON.stringify(mobx_1.toJS(appConfig.config)),
                add: add
            });
        };
        _this.handleSave = function (e) {
            try {
                utils_1.log('home this.state.value', _this.state.value);
                var value = JSON.parse(_this.state.value);
                utils_1.log('home value', value);
                if (!value.name || !value.description) {
                    return utils_1.warningTip('配置填写不规范');
                }
                if (_this.state.add) {
                    _this.props.globalStore.add(value);
                }
                else {
                    _this.props.globalStore.edit(_this.state.appConfig.key, value);
                }
                _this.setState({
                    editVisible: false,
                });
            }
            catch (e) {
                utils_1.warningTip('配置填写不规范' + e.message);
            }
        };
        _this.handleCancel = function (e) {
            _this.setState({
                readVisible: false,
                editVisible: false
            });
        };
        _this.handleGetAppConfig = function (value) {
            if (value) {
                _this.setState({
                    value: value
                });
            }
        };
        _this.handleFiliter = function (e) {
            _this.props.globalStore.setFilterWord(e.target.value);
        };
        return _this;
    }
    Home.prototype.UNSAFE_componentWillMount = function () {
        this.props.globalStore.getList();
    };
    Home.prototype.render = function () {
        var _this = this;
        utils_1.log('xxx', mobx_1.toJS(this.state.appConfig.config));
        var userInfo = this.props.globalStore.userInfo;
        var appConfigList = this.props.globalStore.configList;
        return (React.createElement("div", { className: 'home' },
            React.createElement("div", { style: { height: 32, marginBottom: 8 } },
                React.createElement(Search, { placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57", style: { width: 200 }, className: "fr", onChange: this.handleFiliter }),
                React.createElement(antd_1.Button, { type: "primary", className: "fr mr10", onClick: function () { _this.actionChange('add', ''); } }, "\u65B0\u5EFA"),
                React.createElement(antd_1.Button, { type: "primary", className: "fr mr10", onClick: function () { _this.props.globalStore.getList(true); } }, "\u5237\u65B0")),
            React.createElement(antd_1.List, { grid: {
                    gutter: 16,
                    xs: 2,
                    md: 4,
                    xxl: 4,
                }, dataSource: appConfigList, renderItem: function (item) { return (React.createElement(antd_1.List.Item, null,
                    React.createElement(antd_1.Card, { title: item.config.name + " ", actions: [
                            React.createElement("a", { onClick: function () { return _this.actionView(item.key); } }, "\u67E5\u770B"),
                            React.createElement("a", { onClick: function () { return _this.actionChange('cope', item.key); }, className: classnames_1.default({ actionDisable: !(userInfo.permission & 2) }) }, "\u590D\u5236"),
                            React.createElement("a", { onClick: function () { return _this.actionChange('edit', item.key); }, className: classnames_1.default({ actionDisable: !(item.permission & 4) }) }, "\u7F16\u8F91"),
                            React.createElement("a", { onClick: function () { return _this.actionDelete(item.key); }, className: classnames_1.default({ actionDisable: !(item.permission & 8) }) }, "\u5220\u9664")
                        ] },
                        React.createElement("p", null,
                            "\u914D\u7F6E\u6807\u8BC6: ",
                            item.key),
                        React.createElement("p", null, item.config.description)))); } }),
            React.createElement(antd_1.Modal, { visible: this.state.readVisible, onCancel: this.handleCancel, onOk: this.handleCancel, width: 700 }, this.state.readVisible ? React.createElement(component_code_box_1.CodeBoxRead, { value: mobx_1.toJS(this.state.appConfig.config) }) : ''),
            React.createElement(antd_1.Modal, { title: this.state.title, visible: this.state.editVisible, onOk: this.handleSave, onCancel: this.handleCancel, maskClosable: false, width: 700 }, this.state.editVisible ? React.createElement(component_code_box_1.CodeBoxEdit, { value: mobx_1.toJS(this.state.appConfig.config), onChange: this.handleGetAppConfig }) : '')));
    };
    Home = __decorate([
        mobx_react_1.inject("globalStore"),
        mobx_react_1.observer
    ], Home);
    return Home;
}(React.Component));
exports.default = Home;
