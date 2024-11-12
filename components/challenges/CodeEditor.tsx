import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { setLanguage, setFontSize } from '../../lib/features/workspace.ts/editorSettingsSlice'; 

const CodeEditor = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.editorSettings.language);
  const fontSize = useSelector((state) => state.editorSettings.fontSize);

  const extensions = language === 'javascript' ? [javascript()] : [python()];

  return (
    <div className="space-y-4">
      <div>
        <label>Language:</label>
        <select
          value={language}
          onChange={(e) => dispatch(setLanguage(e.target.value))}
          className="ml-2"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </div>

      <div>
        <label>Font Size:</label>
        <input
          type="number"
          min="10"
          max="30"
          value={fontSize}
          onChange={(e) => dispatch(setFontSize(parseInt(e.target.value, 10)))}
          className="ml-2 w-16"
        />
      </div>

      <CodeMirror
        value="// Start coding here..."
        height="400px"
        extensions={extensions}
        style={{ fontSize: `${fontSize}px` }}
      />
    </div>
  );
};

export default CodeEditor;
