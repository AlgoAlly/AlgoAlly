import React from 'react';
import { Problem } from '../../types';

import CircleSkeleton from '../Skeletons/CircleSkeleton';
import RectangleSkeleton from '../Skeletons/RectangleSkeleton';
import { useEffect, useState } from 'react';
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';

interface ProblemViewProps {
  // Define your props here
  problem: Problem;
  _solved: boolean;
}

const problem = {
  id: 1,
  title: 'Example Problem',
  description: 'This is an example problem description.',
  difficulty: 'easy',
  testcases: [
    { id: 1, input: 'example input 1', output: 'example output 1' },
    { id: 2, input: 'example input 2', output: 'example output 2' },
  ],
};

const useGetCurrentProblem = (problemId: number) => {
  return {
    currentProblem: problem,
    loading: false,
    problemDifficultyClass: '',
    setCurrentProblem: () => {},
  };
};

const useGetUsersDataOnProblem = (problemId: number) => {
  return {
    liked: false,
    disliked: false,
    solved: false,
    setData: () => {},
    starred: false,
  };
};

const ProblemView: React.FC<ProblemViewProps> = ({ problem, _solved }) => {
  const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } =
    useGetCurrentProblem(problem.id);
  const { liked, disliked, solved, setData, starred } =
    useGetUsersDataOnProblem(problem.id);
  const [updating, setUpdating] = useState(false);

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
            {!loading && currentProblem && (
              <div className="mt-3 flex items-center">
                <div
                  className={`${problemDifficultyClass} bg-opacity-[.15] inline-block rounded-[21px] px-2.5 py-1 text-xs font-medium capitalize`}
                >
                  {currentProblem.difficulty}
                </div>
                {(solved || _solved) && (
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

            {/* Examples */}
            <div className="mt-4">
              {problem.testcases.map((testcase, index) => (
                <div key={index}>
                  <p className="font-medium text-white">
                    Example {index + 1}:{' '}
                  </p>
                  {testcase.img && (
                    <img src={testcase.img} alt="" className="mt-3" />
                  )}
                  <div className="example-card">
                    <pre>
                      <strong className="text-white">Input: </strong>{' '}
                      {testcase.input}
                      <br />
                      <strong>Output:</strong>
                      {testcase.output} <br />
                      {testcase.explanation && (
                        <>
                          <strong>Explanation:</strong> {testcase.explanation}
                        </>
                      )}
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
