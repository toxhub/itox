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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var mobx_react_1 = require("mobx-react");
var utils_1 = require("../../common/utils");
require("./login.css");
var FormItem = antd_1.Form.Item;
var NormalLoginForm = /** @class */ (function (_super) {
    __extends(NormalLoginForm, _super);
    function NormalLoginForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSubmit = function (e) {
            e.preventDefault();
            _this.props.form.validateFields(function (err, values) { return __awaiter(_this, void 0, void 0, function () {
                var success;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!err) return [3 /*break*/, 2];
                            utils_1.log('Received values of form: ', values);
                            utils_1.log('this.props', this.props);
                            return [4 /*yield*/, this.props.globalStore.login(values.account, values.password)];
                        case 1:
                            success = _a.sent();
                            if (success) {
                                this.props.history.push(utils_1.config.pathPrefix + "/home");
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            utils_1.log(err);
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        };
        return _this;
    }
    NormalLoginForm.prototype.render = function () {
        var getFieldDecorator = this.props.form.getFieldDecorator;
        return (react_1.default.createElement("div", { className: "page-login" },
            react_1.default.createElement("div", { className: "container" },
                react_1.default.createElement("div", { className: "login-main" },
                    react_1.default.createElement("div", { style: { textAlign: "center", fontSize: '16px', marginBottom: '20px' } }, "\u524D\u7AEF\u6E32\u67D3\u670D\u52A1\u7BA1\u7406\u5E73\u53F0"),
                    react_1.default.createElement(antd_1.Form, { onSubmit: this.handleSubmit },
                        react_1.default.createElement(FormItem, null, getFieldDecorator('account', {
                            rules: [{ required: true, message: '请输入账号' }],
                        })(react_1.default.createElement(antd_1.Input, { prefix: react_1.default.createElement(antd_1.Icon, { type: "user", style: { color: 'rgba(0,0,0,.25)' } }), placeholder: "\u8D26\u53F7" }))),
                        react_1.default.createElement(FormItem, null, getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(react_1.default.createElement(antd_1.Input, { prefix: react_1.default.createElement(antd_1.Icon, { type: "lock", style: { color: 'rgba(0,0,0,.25)' } }), type: "password", placeholder: "\u5BC6\u7801" }))),
                        react_1.default.createElement(FormItem, null,
                            react_1.default.createElement(antd_1.Button, { type: "primary", className: "btn", htmlType: "submit" }, "\u767B\u5F55")))))));
    };
    NormalLoginForm = __decorate([
        mobx_react_1.inject("globalStore"),
        mobx_react_1.observer
    ], NormalLoginForm);
    return NormalLoginForm;
}(react_1.Component));
var LoginForm = antd_1.Form.create()(NormalLoginForm);
exports.default = LoginForm;
