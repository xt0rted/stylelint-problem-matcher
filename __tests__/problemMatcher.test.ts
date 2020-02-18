import { matchResults } from "../__helpers__/utils";
import { problemMatcher as problemMatcherJson } from "../.github/stylelint-problem-matcher.json";
import { ProblemMatcher, ProblemPattern } from "github-actions-problem-matcher-typings";

const problemMatcher: ProblemMatcher = problemMatcherJson[0];

describe("problemMatcher", () => {
  it("has two patterns", () => {
    expect(problemMatcher.pattern.length).toEqual(2);
  });

  describe("file pattern", () => {
    let pattern: ProblemPattern;
    let regexp: RegExp;

    beforeEach(() => {
      pattern = problemMatcher.pattern[0];
      regexp = new RegExp(pattern.regexp);
    });

    it("matches file path", () => {
      const reportOutput = [
        "scss/_test.scss",
        " 11:16  ×  Unexpected unit          length-zero-no-unit",
        " 11:28  ×  Unexpected unit          length-zero-no-unit",
      ];

      const results = matchResults(reportOutput, regexp);

      expect(results.length).toEqual(1);
      expect(results[0][pattern.file]).toEqual("scss/_test.scss");
    });
  });

  describe("violation pattern", () => {
    let pattern: ProblemPattern;
    let regexp: RegExp;

    beforeEach(() => {
      pattern = problemMatcher.pattern[1];
      regexp = new RegExp(pattern.regexp);
    });

    it("matches violations", () => {
      const reportOutput = [
        "scss/_test.scss",
        " 11:16  ×  Unexpected unit          length-zero-no-unit",
        " 11:28  ×  Unexpected unit          length-zero-no-unit",
      ];

      const results = matchResults(reportOutput, regexp);

      expect(results.length).toEqual(2);
    });

    it("matches violations without line numbers", () => {
      const reportOutput = [
        "scss/_test.scss",
        "        ×  Unexpected Unicode BOM   unicode-bom",
        " 11:16  ×  Unexpected unit          length-zero-no-unit",
        " 11:28  ×  Unexpected unit          length-zero-no-unit",
      ];

      const results = matchResults(reportOutput, regexp);

      expect(results.length).toEqual(3);
    });

    it("matches violation details", () => {
      const reportOutput = [
        "scss/_test.scss",
        " 11:16  ×  Unexpected unit          length-zero-no-unit",
      ];

      const results = matchResults(reportOutput, regexp);

      expect(results.length).toEqual(1);
      expect(results[0][pattern.line]).toEqual("11");
      expect(results[0][pattern.column]).toEqual("16");
      expect(results[0][pattern.message]).toEqual("Unexpected unit       ");
      expect(results[0][pattern.code]).toEqual("length-zero-no-unit");
    });
  });
});
