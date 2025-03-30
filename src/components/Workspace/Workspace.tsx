import Split from 'react-split';
import ProblemView from './ProblemView';
import Editor from './Editor/Editor';
import React, { useState, useEffect } from 'react';
import {
  Problem,
  ProblemAPIResponse,
  ProblemAPITestcaseResponse,
  ProblemDifficulty,
} from '../../types';
import axios from 'axios';
import InGameChatroom from '../InGameChatroom';

type WorkspaceProps = {
  problemId: string;
  gameId: string;
  chatroomId: string;
};

const Workspace: React.FC<WorkspaceProps> = ({
  problemId,
  gameId,
  chatroomId,
}) => {
  // fetch the problem
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // make request to the problem service
    const fetchProblem: () => Promise<void> = async () => {
      const host = import.meta.env.VITE_PROBLEMS_API_HOST || 'http://localhost';
      const port = import.meta.env.VITE_PROBLEMS_API_PORT || '8080';
      // GET /problems/problemId

      const problemResponse = await axios.get<ProblemAPIResponse>(
        `${host}:${port}/problems/${problemId}`,
        {
          headers: {
            Accept: 'application/json',
          },
          validateStatus: () => {
            return true;
          },
        }
      );

      if (problemResponse.status !== 200) {
        // throw the error
        // TODO handle errors
        console.log('Error fetching problem: ' + problemResponse.data);
      }

      const rawProblem = problemResponse.data;

      // fetch the testcases for this problem
      const testcaseResponse = await axios.get<ProblemAPITestcaseResponse>(
        `${host}:${port}/solutions/cases/${problemId}/samples`,
        {
          headers: {
            Accept: 'application/json',
          },
          validateStatus: () => {
            return true;
          },
        }
      );

      if (testcaseResponse.status !== 200) {
        // throw the error
        // TODO handle errors
        console.log('Error fetching testcases: ' + testcaseResponse.data);
      }

      const rawTestcases = testcaseResponse.data;

      setProblem({
        id: rawProblem.id,
        description: rawProblem.description,
        title: rawProblem.title,
        markdown: rawProblem.markdown,
        difficulty: rawProblem.difficulty.toLowerCase() as ProblemDifficulty,
        tags: rawProblem.tags,
        testcases: rawTestcases,
      } as Problem);
      setLoading(false);
    };

    fetchProblem();
  }, [problemId]);

  return (
    <>
      {problem && (
        <Split
          className="flex w-full flex-row"
          direction="horizontal"
          sizes={[30, 70]}
          gutterAlign="center"
          gutterStyle={() => {
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
            <ProblemView problem={problem} _solved={false} loading={loading} />
          </div>
          <div>
            <Editor
              problem={problem}
              setSolved={() => {}}
              setSuccess={() => {}}
              gameId={gameId}
            />
          </div>
          <div className="fixed right-70 bottom-0 z-50">
            <InGameChatroom chatroomId={chatroomId} />
          </div>
        </Split>
      )}
    </>
  );
};

export default Workspace;
