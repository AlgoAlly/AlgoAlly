export type ProblemDifficulty = 'easy' | 'medium' | 'hard';

export type Problem = {
  id: string;
  title: string;
  description: string;
  markdown: string;
  difficulty: ProblemDifficulty;
  tags: string[];
  testcases: Array<{
    input: string;
    expectedOutput: string;
  }>;
};

export type ProblemAPIResponse = {
  id: string;
  title: string;
  description: string;
  markdown: string;
  difficulty: string;
  tags: string[];
};

export type ProblemAPITestcaseResponse = [
  { input: string; expectedOutput: string },
];
