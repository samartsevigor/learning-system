import React, { PureComponent } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

class CodeBlock extends PureComponent {
  render() {
    const { value } = this.props
    return (
      <SyntaxHighlighter language="javascript" style={vs}>
        {value}
      </SyntaxHighlighter>
    )
  }
}

export default CodeBlock
