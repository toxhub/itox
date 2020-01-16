import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {UnControlled as CodeMirror} from 'react-codemirror2'

@observer
class CodeBoxRead extends Component {

  render() {
    return (
      <CodeMirror
        value={JSON.stringify(this.props.value, null, 4)}
        className={this.props.className}
        options={{
          mode: 'groovy',
          theme: 'idea light',
          mode: {name: 'javascript', json: true},
          lineNumbers: true,
          readOnly: true,
        }}
        // 这个必须加上，否则在一些情况下，第二次打开就会有问题
        onBeforeChange={(editor, data, value) => {
          console.log('onBeforeChange')
        }}
        onChange={(editor, data, value) => {
          console.log('onChange')
        }}
        /* HERE: pick out only the value. and might as well get name. */
      />
    )
  }
}

export default CodeBoxRead
