import CodeBoxR from './code-box-read'
import CodeBoxE from './code-box-edit'
import 'codemirror/lib/codemirror.css';

// 主题风格
import 'codemirror/theme/idea.css';

// 代码模式，clike是包含java,c++等模式的
import 'codemirror/mode/javascript/javascript';

import './code-box.styl';

export var CodeBoxRead = CodeBoxR

export var CodeBoxEdit = CodeBoxE
