export type Problem = {
  id: number;
  title: string;
  description: string;
  testcases: Array<{
    input: string;
    output: string;
    img?: string;
    explanation?: string;
  }>;
};
