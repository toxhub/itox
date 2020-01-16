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
var prop_types_1 = __importDefault(require("prop-types"));
var react_syntax_highlighter_1 = require("react-syntax-highlighter");
// 设置高亮样式
var prism_1 = require("react-syntax-highlighter/dist/esm/styles/prism");
// 设置高亮的语言
var prism_2 = require("react-syntax-highlighter/dist/esm/languages/prism");
var CodeBlock = /** @class */ (function (_super) {
    __extends(CodeBlock, _super);
    function CodeBlock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CodeBlock.prototype.componentWillMount = function () {
        // 注册要高亮的语法，
        // 注意：如果不设置打包后供第三方使用是不起作用的
        react_syntax_highlighter_1.PrismLight.registerLanguage("jsx", prism_2.jsx);
        react_syntax_highlighter_1.PrismLight.registerLanguage("javascript", prism_2.javascript);
        react_syntax_highlighter_1.PrismLight.registerLanguage("js", prism_2.javascript);
    };
    CodeBlock.prototype.render = function () {
        var _a = this.props, language = _a.language, value = _a.value;
        return (react_1.default.createElement("figure", { className: "highlight" },
            react_1.default.createElement(react_syntax_highlighter_1.PrismLight, { language: language, style: prism_1.xonokai }, value)));
    };
    CodeBlock.propTypes = {
        value: prop_types_1.default.string.isRequired,
        language: prop_types_1.default.string
    };
    CodeBlock.defaultProps = {
        language: null
    };
    return CodeBlock;
}(react_1.PureComponent));
exports.default = CodeBlock;
