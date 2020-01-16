import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {UnControlled as CodeMirror} from 'react-codemirror2'

@observer
class CodeBoxEdit extends Component {

  render() {
    return (
      <CodeMirror
        value={JSON.stringify(this.props.value, null, 4)}
        className={this.props.className}
        options={{
          theme: 'idea light',
          mode: {name: 'javascript', json: true},
          lineNumbers: true,
        }}
        onChange={(editor, data, value) => {
          this.props.onChange(value)
        }}
      />
    )
  }
}
export default CodeBoxEdit
