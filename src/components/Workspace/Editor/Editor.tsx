import 'react';
import React from 'react';
import Split from 'react-split';
import ReactCodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { atomone } from '@uiw/codemirror-theme-atomone';
import { Problem } from '../../../types';
import EditorFooter from './EditorFooter';

type EditorProps = {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

const Editor: React.FC<EditorProps> = ({ problem, setSuccess, setSolved }) => {
  const [activeTestCase, setActiveTestCase] = React.useState(0);

  // edit the atomone theme to match ours
  // @ts-expect-error this is a hack to set our custom theme
  atomone[0][1].value.rules[0] =
    '.ͼ16 .cm-gutters {background-color: var(--color-bg-primary); color: var(--color-text-primary); border-right-color: transparent;}';
  // @ts-expect-error this is a hack to set our custom theme
  atomone[0][1].value.rules[1] =
    '.ͼ16 {background-color: var(--color-bg-primary); color: var(--color-text-primary);}';

  return (
    <div className="relative flex flex-col overflow-x-hidden">
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
        expandToMin={false}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        cursor="row-resize"
        gutterStyle={(dimension, gutterSize, number) => {
          // set the gutter to be the same color as the background
          return {
            backgroundColor: 'var(--color-border-primary)',
            height: '6px',
            cursor: 'row-resize',
            // set the hover style
            ':hover': { cursor: 'row-resize' },
          };
        }}
      >
        <div className="w-full overflow-auto">
          <ReactCodeMirror
            value={`print("hello world")`}
            theme={atomone}
            extensions={[python()]}
          />
        </div>
        <div className="w-full overflow-auto px-5">
          {/* testcase heading */}
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full cursor-pointer flex-col justify-center">
              <div className="text-sm leading-5 font-medium text-white">
                Testcases
              </div>
              <hr className="bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          <div className="flex">
            {problem.testcases.map((testcase, index) => (
              <div
                className="mt-2 mr-2 items-start"
                key={index}
                onClick={() => setActiveTestCase(index)}
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`bg-dark-fill-3 hover:bg-dark-fill-2 relative inline-flex cursor-pointer items-center rounded-lg px-4 py-1 font-medium whitespace-nowrap transition-all focus:outline-none ${activeTestCase === index ? 'text-text-primary' : 'text-text-muted'} `}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="my-4 font-semibold">
            <p className="mt-4 text-sm font-medium text-white">Input:</p>
            <div className="bg-dark-fill-3 mt-2 w-full cursor-text rounded-lg border border-transparent px-3 py-[10px] text-white">
              {problem.testcases[activeTestCase].input}
            </div>
            <p className="mt-4 text-sm font-medium text-white">Output:</p>
            <div className="bg-dark-fill-3 mt-2 w-full cursor-text rounded-lg border border-transparent px-3 py-[10px] text-white">
              {problem.testcases[activeTestCase].output}
            </div>
          </div>
        </div>
      </Split>
      {/* TODO */}
      <EditorFooter handleSubmit={() => {}} />
    </div>
  );
};

export default Editor;
