"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var index_1 = __importDefault(require("../io/index"));
var history_1 = __importDefault(require("../common/history"));
var utils_1 = require("../common/utils");
var md5_1 = __importDefault(require("md5"));
var GlobalStore = /** @class */ (function () {
    function GlobalStore() {
        this.userInfo = null;
        this.appConfigList = [];
        this.filterWord = '';
        this.about = '';
        this.plugin = '';
    }
    Object.defineProperty(GlobalStore.prototype, "configList", {
        get: function () {
            var _this = this;
            if (this.filterWord) {
                return this.appConfigList.filter(function (item) {
                    return JSON.stringify(item).indexOf(_this.filterWord) >= 0;
                });
            }
            return this.appConfigList;
        },
        enumerable: true,
        configurable: true
    });
    GlobalStore.prototype.setFilterWord = function (filterWord) {
        this.filterWord = filterWord;
    };
    // 获取当前的登录信息
    GlobalStore.prototype.loginInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, success, content;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.userInfo)
                            return [2 /*return*/];
                        return [4 /*yield*/, index_1.default.auth.loginInfo({ showError: false })];
                    case 1:
                        _a = _b.sent(), success = _a.success, content = _a.content;
                        if (success) {
                            mobx_1.runInAction(function () {
                                _this.userInfo = content;
                            });
                        }
                        else {
                            history_1.default.push(utils_1.config.pathPrefix + "/login");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // 登录操作
    GlobalStore.prototype.login = function (account, password) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, success, content;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, index_1.default.auth.login({
                            body: {
                                name: account,
                                password: md5_1.default(password)
                            },
                        })];
                    case 1:
                        _a = _b.sent(), success = _a.success, content = _a.content;
                        if (success) {
                            mobx_1.runInAction(function () {
                                _this.userInfo = content;
                                history_1.default.push(utils_1.config.pathPrefix + "/home");
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // 登出操作
    GlobalStore.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.default.auth.logout()];
                    case 1:
                        _a.sent();
                        history_1.default.push(utils_1.config.pathPrefix + "/login");
                        mobx_1.runInAction(function () {
                            _this.userInfo = null;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    // 获取配置列表
    GlobalStore.prototype.getList = function (refresh) {
        if (refresh === void 0) { refresh = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, success, content;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.appConfigList.length > 0 && !refresh)
                            return [2 /*return*/];
                        return [4 /*yield*/, index_1.default.render.list()];
                    case 1:
                        _a = _b.sent(), success = _a.success, content = _a.content;
                        if (!success)
                            return [2 /*return*/];
                        mobx_1.runInAction(function () {
                            _this.appConfigList = content;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    // 获取配置列表
    GlobalStore.prototype.markdown = function (type) {
        if (type === void 0) { type = 'about'; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, success, content, message;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if ((type === 'about' && this.about) || (type === 'plugin' && this.plugin))
                            return [2 /*return*/];
                        return [4 /*yield*/, index_1.default.render.markdown({ query: { type: type } })];
                    case 1:
                        _a = _b.sent(), success = _a.success, content = _a.content, message = _a.message;
                        if (!success)
                            return [2 /*return*/];
                        mobx_1.runInAction(function () {
                            if (type === 'about') {
                                _this.about = content;
                            }
                            else {
                                _this.plugin = content;
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    // 编辑配置
    GlobalStore.prototype.edit = function (key, config) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, success, message;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        utils_1.log('edit key', key);
                        return [4 /*yield*/, index_1.default.render.edit({ body: { key: key, config: config } })];
                    case 1:
                        _a = _b.sent(), success = _a.success, message = _a.message;
                        if (success) {
                            utils_1.successTip('编辑成功');
                        }
                        else {
                            utils_1.errorTip('编辑失败', message);
                        }
                        setTimeout(function () { return _this.getList(true); }, 500);
                        return [2 /*return*/];
                }
            });
        });
    };
    // 添加配置
    GlobalStore.prototype.add = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, success, message;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, index_1.default.render.add({ body: config })];
                    case 1:
                        _a = _b.sent(), success = _a.success, message = _a.message;
                        if (success) {
                            utils_1.successTip('新建成功');
                        }
                        else {
                            utils_1.errorTip('新建失败', message);
                        }
                        setTimeout(function () { return _this.getList(true); }, 500);
                        return [2 /*return*/];
                }
            });
        });
    };
    GlobalStore.prototype.delete = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, success, message;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        utils_1.log('delete key', key);
                        return [4 /*yield*/, index_1.default.render.delete({ body: { key: key } })];
                    case 1:
                        _a = _b.sent(), success = _a.success, message = _a.message;
                        if (success) {
                            utils_1.successTip('删除成功');
                        }
                        else {
                            utils_1.errorTip('删除', message);
                        }
                        setTimeout(function () { return _this.getList(true); }, 500);
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        mobx_1.observable
    ], GlobalStore.prototype, "userInfo", void 0);
    __decorate([
        mobx_1.observable
    ], GlobalStore.prototype, "appConfigList", void 0);
    __decorate([
        mobx_1.observable
    ], GlobalStore.prototype, "filterWord", void 0);
    __decorate([
        mobx_1.observable
    ], GlobalStore.prototype, "about", void 0);
    __decorate([
        mobx_1.observable
    ], GlobalStore.prototype, "plugin", void 0);
    __decorate([
        mobx_1.computed
    ], GlobalStore.prototype, "configList", null);
    __decorate([
        mobx_1.action
    ], GlobalStore.prototype, "setFilterWord", null);
    __decorate([
        mobx_1.action.bound
    ], GlobalStore.prototype, "loginInfo", null);
    __decorate([
        mobx_1.action.bound
    ], GlobalStore.prototype, "login", null);
    __decorate([
        mobx_1.action.bound
    ], GlobalStore.prototype, "logout", null);
    __decorate([
        mobx_1.action.bound
    ], GlobalStore.prototype, "getList", null);
    __decorate([
        mobx_1.action.bound
    ], GlobalStore.prototype, "markdown", null);
    __decorate([
        mobx_1.action.bound
    ], GlobalStore.prototype, "edit", null);
    __decorate([
        mobx_1.action.bound
    ], GlobalStore.prototype, "add", null);
    __decorate([
        mobx_1.action.bound
    ], GlobalStore.prototype, "delete", null);
    return GlobalStore;
}());
exports.GlobalStore = GlobalStore;
exports.default = new GlobalStore();
