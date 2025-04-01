import React, { useEffect, useState } from 'react';
import Editor from '../components/Workspace/Editor/Editor';
import ProblemView from '../components/Workspace/ProblemView';
import EditorFooter from '../components/Workspace/Editor/EditorFooter';
import Navbar from '../components/Navbar';
import Split from 'react-split';
import InGameChatroom from '../components/InGameChatroom';

const Workspace: React.FC = () => {
  const problem = {
    id: 1,
    title: 'Example Problem',
    description: 'This is an example problem description.',
    testcases: [
      { id: 1, input: 'example input 1', output: 'example output 1' },
      { id: 2, input: 'example input 2', output: 'example output 2' },
    ],
  };

  return (
    <div className="relative flex w-full flex-col">
      <Navbar />
      <Split
        className="flex flex-row"
        direction="horizontal"
        sizes={[30, 70]}
        gutterAlign="center"
        gutterStyle={(dimension, gutterSize, number) => {
          // set the gutter to be the same color as the background
          return {
            backgroundColor: 'var(--color-border-primary)',
            width: '6px',
            cursor: 'col-resize',
            // set the hover style
            ':hover': { cursor: 'col-resize' },
          };
        }}
      >
        <div>
          <ProblemView problem={problem} _solved={false} />
        </div>
        <div>
          <Editor
            problem={problem}
            //   TODO
            setSolved={() => {}}
            setSuccess={() => {}}
          />
        </div>
        <div>
        <div className="fixed right-70 bottom-0 z-50">
          <InGameChatroom 
            chatroomId={localStorage.getItem("chatroomid") ?? ""} 
          />
      </div>
        </div>
      </Split>
    </div>
  );
};

export default Workspace;
