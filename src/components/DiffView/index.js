import React from 'react';
import CodeMirror from 'codemirror';

import DiffMatchPatch, {
  DIFF_INSERT,
  DIFF_EQUAL,
  DIFF_DELETE,
} from 'diff-match-patch/index';

import 'codemirror/addon/merge/merge';
import 'codemirror/addon/merge/merge.css';

import { DiffViewWrapper } from './styled';

// because codemirror merge view use diff_match_path library from window
window.diff_match_patch = DiffMatchPatch;
window.DIFF_INSERT = DIFF_INSERT;
window.DIFF_EQUAL = DIFF_EQUAL;
window.DIFF_DELETE = DIFF_DELETE;

class DiffView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };

    this.diffView = React.createRef();
  }

  componentDidMount() {
    const { originalValue, onChange } = this.props;
    const { value } = this.state;

    this.diffViewEditor = CodeMirror.MergeView(this.diffView.current, {
      value,
      orig: originalValue,
      lineNumbers: true,
      highlightDifferences: true,
      mode: 'gfm',
      connect: 'align',
      showDifferences: true,
    });

    this.diffViewEditor.edit.on('change', () => {
      onChange(this.diffViewEditor.edit.getValue());
    });
  }

  render() {
    return <DiffViewWrapper ref={this.diffView} />;
  }
}

export default DiffView;
