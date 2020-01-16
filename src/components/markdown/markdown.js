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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_markdown_1 = __importDefault(require("react-markdown"));
var antd_1 = require("antd");
var markdown_navbar_1 = __importDefault(require("markdown-navbar"));
require("markdown-navbar/dist/navbar.css");
var code_block_1 = __importDefault(require("./code-block"));
var mobx_react_1 = require("mobx-react");
require("./markdown.styl");
var Markdown = /** @class */ (function (_super) {
    __extends(Markdown, _super);
    function Markdown() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Markdown.prototype.render = function () {
        var props = this.props;
        return (react_1.default.createElement("div", { className: "markdown" },
            react_1.default.createElement(antd_1.Row, null,
                react_1.default.createElement(antd_1.Col, { xs: 24, sm: 24, md: 24, lg: 18, xl: 19 },
                    react_1.default.createElement("div", { className: "md-content" },
                        react_1.default.createElement(react_markdown_1.default, { source: props.source, renderers: {
                                code: code_block_1.default
                            }, escapeHtml: false }, " "))),
                react_1.default.createElement(antd_1.Col, { xs: 0, sm: 0, md: 0, lg: 6, xl: 5 },
                    react_1.default.createElement(antd_1.Anchor, { className: "md-guide" },
                        react_1.default.createElement("div", { className: "title" }, "\u76EE\u5F55:"),
                        react_1.default.createElement(markdown_navbar_1.default, { source: props.source }))))));
    };
    Markdown = __decorate([
        mobx_react_1.observer
    ], Markdown);
    return Markdown;
}(react_1.default.Component));
exports.default = Markdown;
