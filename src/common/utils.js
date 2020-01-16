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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var history_1 = __importDefault(require("./history"));
var react_1 = __importStar(require("react"));
var moment_1 = __importDefault(require("moment"));
var conf_json_1 = __importDefault(require("../../config/conf.json"));
// 和`webpack chunk`配合使用的异步加载模块
function asyncComponent(importComponent) {
    var AsyncComponent = /** @class */ (function (_super) {
        __extends(AsyncComponent, _super);
        function AsyncComponent(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                component: {},
            };
            return _this;
        }
        AsyncComponent.prototype.UNSAFE_componentWillMount = function () {
            return __awaiter(this, void 0, void 0, function () {
                var C, component;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            C = this.state.component;
                            if (!!C) return [3 /*break*/, 2];
                            return [4 /*yield*/, importComponent()];
                        case 1:
                            component = (_a.sent()).default;
                            this.setState({ component: component });
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        AsyncComponent.prototype.render = function () {
            var C = this.state.component;
            return C ? react_1.default.createElement(C, __assign({}, this.props)) : null;
        };
        return AsyncComponent;
    }(react_1.Component));
    return AsyncComponent;
}
exports.asyncComponent = asyncComponent;
// ajax 请求的统一封装
function request(option) {
    if (option === void 0) { option = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var paramsArray_1, options, retData, res, data, _a, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    option = Object.assign({
                        url: '',
                        method: 'GET',
                        showError: false,
                        action: function (data) {
                            if (data.success === false && data.code === 'ERROR_NEED_LOGIN') {
                                // TODO 这里可能统一跳转到 也可以是弹窗点击跳转
                                history_1.default.push("/login?redirect=" + window.location.pathname + window.location.search);
                            }
                        },
                        headers: {},
                        options: {},
                    }, option);
                    if (option.params) {
                        Object.keys(option.params).forEach(function (key) {
                            option.url = option.url.replace(":" + key, encodeURIComponent(option.params[key]));
                        });
                    }
                    if (option.query) {
                        paramsArray_1 = [];
                        Object.keys(option.query).forEach(function (key) { return paramsArray_1.push(key + "=" + encodeURIComponent(option.query[key])); });
                        if (option.url.search(/\?/) === -1) {
                            option.url += "?" + paramsArray_1.join('&');
                        }
                        else {
                            option.url += "&" + paramsArray_1.join('&');
                        }
                    }
                    options = {
                        method: option.method,
                        credentials: 'include',
                        headers: Object.assign({
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        }, option.headers),
                    };
                    options = Object.assign(options, option.options);
                    if (option.body) {
                        if (typeof option.body === 'object')
                            option.body = JSON.stringify(option.body);
                        options.body = option.body;
                    }
                    retData = { success: true };
                    if (!option.mock) return [3 /*break*/, 1];
                    retData = option.mock;
                    return [3 /*break*/, 8];
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, fetch(option.url, options)];
                case 2:
                    res = _b.sent();
                    if (!res.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _b.sent();
                    retData.success = data.success;
                    retData.content = data.content;
                    retData.message = data.message;
                    retData.code = data.code;
                    return [3 /*break*/, 6];
                case 4:
                    retData.success = false;
                    retData.status = res.status;
                    _a = retData;
                    return [4 /*yield*/, res.text()];
                case 5:
                    _a.content = _b.sent();
                    retData.message = "\u8BF7\u6C42\u975E\u6B63\u5E38\u8FD4\u56DE: \u72B6\u6001\u7801 " + retData.status + " " + retData.data;
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_1 = _b.sent();
                    retData.success = false;
                    retData.message = err_1.message;
                    return [3 /*break*/, 8];
                case 8:
                    if (option.showError && !retData.success) {
                        antd_1.message.error(retData.message);
                    }
                    if (option.action) {
                        option.action(retData);
                    }
                    return [2 /*return*/, retData];
            }
        });
    });
}
exports.request = request;
// 统一成功提示
function successTip(content) {
    antd_1.message.success(content);
}
exports.successTip = successTip;
// 统一失败提示
function errorTip(title, content) {
    var l = arguments.length;
    if (l === 0) {
        title = '系统异常';
    }
    else if (l === 1) {
        content = title;
        title = '';
    }
    antd_1.Modal.error({
        title: title,
        content: content,
    });
}
exports.errorTip = errorTip;
// 统一信息提示
function infoTip(content) {
    antd_1.message.info(content);
}
exports.infoTip = infoTip;
// 统一警告提示
function warningTip(content) {
    antd_1.message.warning(content);
}
exports.warningTip = warningTip;
// 时间戳转化时间显示
function getFormatTime(time, format) {
    if (format === void 0) { format = 'YYYY-MM-DD'; }
    return time ? moment_1.default(time).format(format) : '';
}
exports.getFormatTime = getFormatTime;
exports.config = Object.assign(conf_json_1.default, window.conf);
// 获取日志配置
function log() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    if (exports.config.debug) {
        console.log.apply(console, arg);
    }
}
exports.log = log;
