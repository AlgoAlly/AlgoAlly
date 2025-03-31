import 'react';
import React from 'react';
import Split from 'react-split';
import ReactCodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { atomone } from '@uiw/codemirror-theme-atomone';
import { Problem } from '../../../types';
import EditorFooter from './EditorFooter';
import axios from 'axios';

type EditorProps = {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
  gameId: string;
};

const pythonStarterCode = `# Write your code here
# parse inputs from stdin:
import sys
input = []
for line in sys.stdin:
    line = line.strip()
    input.append(line)
  
# set up your variables ie.
# nums = input[0]`;

const Editor: React.FC<EditorProps> = ({
  problem,
  setSuccess,
  setSolved,
  gameId,
}) => {
  const [activeTestCase, setActiveTestCase] = React.useState(0);
  const [code, setCode] = React.useState(pythonStarterCode);

  // edit the atomone theme to match ours
  // @ts-expect-error this is a hack to set our custom theme
  atomone[0][1].value.rules[0] =
    '.ͼ16 .cm-gutters {background-color: var(--color-bg-primary); color: var(--color-text-primary); border-right-color: transparent;}';
  // @ts-expect-error this is a hack to set our custom theme
  atomone[0][1].value.rules[1] =
    '.ͼ16 {background-color: var(--color-bg-primary); color: var(--color-text-primary);}';

  const submitProblem = async () => {
    // submit the code to the API
    const host = import.meta.env.VITE_JUDGE0_API_HOST || 'http://localhost';
    const port = import.meta.env.VITE_JUDGE0_API_PORT || '8081';

    if (!localStorage.getItem('userId')) {
      // TODO handle this error (toast)
      console.error('Game ID or User ID not found in local storage');
      return;
    }

    const data = {
      sourceCode: code,
      language: 'Python',
      ID: problem.id,
      gameid: gameId,
      userid: parseInt(localStorage.getItem('userId')!),
    };

    const response = await axios.post<{ token: string }>(
      `${host}:${port}/submit`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        validateStatus: () => {
          return true;
        },
      }
    );

    // check if the response is successful
    if (response.status !== 200 || !response.data.token) {
      // TODO handle this error (toast)
      console.error('Error submitting code: ' + response.data);
      return;
    }

    // get the token from the response
    const token = response.data.token;

    while (true) {
      const statusResponse = await axios.get<{
        status: number;
        errors?: string[];
      }>(`${host}:${port}/status/${token}`, {
        validateStatus: () => {
          return true;
        },
      });

      if (statusResponse.status !== 200) {
        // TODO handle this error (toast)
        console.error('Error getting status: ' + statusResponse.data);
        return;
      }

      // check the status of the submission
      if (statusResponse.data.status === 0) {
        // wait for 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      } else if (statusResponse.data.status === 2) {
        // if the status is 2 then the submission is correct
        setSuccess(true);
        setSolved(true);
        console.log('Submission successful');

        return;
      } else if (statusResponse.data.status === 1) {
        // the submission failed
        const errors = statusResponse.data.errors;
        console.log('Submission failed: ' + errors);
        // this should display this somewhere
      }
    }
  };

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
            value={code}
            theme={atomone}
            extensions={[python()]}
            onChange={(value) => setCode(value)}
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
              {problem.testcases[activeTestCase].expectedOutput}
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter handleSubmit={() => submitProblem()} />
    </div>
  );
};

export default Editor;
