import { problemMatcher } from "../.github/stylelint-problem-matcher.json";

export interface ProblemMatcher {
  owner: string;
  pattern: ProblemMatcherPattern[];
};

export interface ProblemMatcherPattern {
  regexp: string;
  file?: number;
  line?: number;
  column?: number;
  message?: number;
  code?: number;
  loop?: boolean;
}

export const stylelintMatcher: ProblemMatcher = problemMatcher[0];
