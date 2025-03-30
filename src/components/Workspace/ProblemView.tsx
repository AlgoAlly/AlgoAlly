import React from 'react';
import { Problem } from '../../types';

import RectangleSkeleton from '../Skeletons/RectangleSkeleton';
import { BsCheck2Circle } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for yous

interface ProblemViewProps {
  // Define your props here
  problem: Problem;
  _solved: boolean;
  loading: boolean;
}

const ProblemView: React.FC<ProblemViewProps> = ({
  problem,
  _solved,
  loading,
}) => {
  const difficultyStyles = {
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400',
  };

  return (
    <div className="bg-dark-layer-1">
      {/* TAB */}
      <div className="bg-dark-layer-2 flex h-11 w-full items-center overflow-x-hidden pt-2 text-white">
        <div
          className={
            'bg-dark-layer-1 cursor-pointer rounded-t-[5px] px-5 py-[10px] text-xs'
          }
        >
          Description
        </div>
      </div>

      <div className="flex h-[calc(100vh-94px)] overflow-y-auto px-0 py-4">
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="mr-2 flex-1 text-lg font-medium text-white">
                {problem?.title}
              </div>
            </div>
            {!loading && problem && (
              <div className="mt-3 flex items-center">
                <div
                  className={`${difficultyStyles[problem.difficulty]} bg-opacity-[.15] inline-block rounded-[21px] px-2.5 py-1 text-xs font-medium capitalize`}
                >
                  {problem.difficulty}
                </div>
                {_solved && (
                  <div className="text-green-s text-dark-green-s ml-4 rounded p-[3px] text-lg transition-colors duration-200">
                    <BsCheck2Circle />
                  </div>
                )}
              </div>
            )}

            {loading && (
              <div className="mt-3 flex space-x-2">
                <RectangleSkeleton />
              </div>
            )}

            {/* Problem Statement(paragraphs) */}
            <div className="mt-3 text-sm text-white">
              <div dangerouslySetInnerHTML={{ __html: problem.description }} />
            </div>
            {/* The problem data (in markdown) */}
            <div className="mt-4 text-sm text-white">
              <ReactMarkdown
                rehypePlugins={[rehypeKatex]}
                remarkPlugins={[remarkMath, remarkBreaks]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    return (
                      <pre
                        className={className}
                        {...(props as React.HTMLAttributes<HTMLPreElement>)}
                      >
                        <code>{String(children).replace(/\\n/g, '\n\n')}</code>
                      </pre>
                    );
                  },
                }}
              >
                {problem.markdown}
              </ReactMarkdown>
            </div>
            {/* Examples */}
            <div className="mt-4">
              {problem.testcases.map((testcase, index) => (
                <div key={index}>
                  <p className="font-medium text-white">
                    Example {index + 1}:{' '}
                  </p>
                  <div className="example-card">
                    <pre>
                      <strong className="text-white">Input: </strong>{' '}
                      {testcase.input}
                      <br />
                      <strong>Output:</strong>
                      {testcase.expectedOutput} <br />
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="my-8 pb-4">
              <div className="text-sm font-medium text-white">Constraints:</div>
              <ul className="ml-5 list-disc text-white">
                {/* <div dangerouslySetInnerHTML={{ __html: problem.constraints }} /> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemView;
