import { matchResults } from "../__helpers__/utils";
import { problemMatcher as problemMatcherJson } from "../.github/problem-matcher.json";

import type { ProblemMatcher, ProblemPattern } from "github-actions-problem-matcher-typings";

const problemMatcher: ProblemMatcher = problemMatcherJson[0];

describe("problemMatcher", () => {
  it("has the correct owner", () => {
    expect(problemMatcher.owner).toEqual("stylelint");
  });

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

  describe.each([
    "✖",
    "×",
  ])("violation pattern using '%s'", (icon) => {
    let pattern: ProblemPattern;
    let regexp: RegExp;

    beforeEach(() => {
      pattern = problemMatcher.pattern[1];
      regexp = new RegExp(pattern.regexp);
    });

    describe("without color output", () => {
      it("matches violations", () => {
        const reportOutput = [
          "scss/_test.scss",
          ` 11:16  ${icon}  Unexpected unit          length-zero-no-unit`,
          ` 11:28  ${icon}  Unexpected unit          length-zero-no-unit`,
        ];

        const results = matchResults(reportOutput, regexp);

        expect(results.length).toEqual(2);
      });

      it("matches violations without line numbers", () => {
        const reportOutput = [
          "scss/_test.scss",
          `        ${icon}  Unexpected Unicode BOM   unicode-bom`,
          ` 11:16  ${icon}  Unexpected unit          length-zero-no-unit`,
          ` 11:28  ${icon}  Unexpected unit          length-zero-no-unit`,
        ];

        const results = matchResults(reportOutput, regexp);

        expect(results.length).toEqual(3);
      });

      it("matches violation details", () => {
        const reportOutput = [
          "scss/_test.scss",
          ` 11:16  ${icon}  Unexpected unit          length-zero-no-unit`,
        ];

        const results = matchResults(reportOutput, regexp);

        expect(results.length).toEqual(1);
        expect(results[0][pattern.line!]).toEqual("11");
        expect(results[0][pattern.column!]).toEqual("16");
        expect(results[0][pattern.message!]).toEqual("Unexpected unit        ");
        expect(results[0][pattern.code!]).toEqual("length-zero-no-unit");
      });
    });

    describe("with color output", () => {
      it("matches violations", () => {
        const reportOutput = [
          "scss/_test.scss",
          ` \u001B[2m11:16\u001B[22m  \u001B[31m\u001B[31m${icon}\u001B[39m  Unexpected unit          \u001B[2mlength-zero-no-unit\u001B[22m`,
          ` \u001B[2m11:28\u001B[22m  \u001B[31m\u001B[31m${icon}\u001B[39m  Unexpected unit          \u001B[2mlength-zero-no-unit\u001B[22m`,
        ];

        const results = matchResults(reportOutput, regexp);

        expect(results.length).toEqual(2);
      });

      it("matches violations without line numbers", () => {
        const reportOutput = [
          "scss/_test.scss",
          `        \u001B[31m\u001B[31m${icon}\u001B[39m  Unexpected Unicode BOM   \u001B[2municode-bom\u001B[22m`,
          ` \u001B[2m11:16\u001B[22m  \u001B[31m\u001B[31m${icon}\u001B[39m  Unexpected unit          \u001B[2mlength-zero-no-unit\u001B[22m`,
          ` \u001B[2m11:28\u001B[22m  \u001B[31m\u001B[31m${icon}\u001B[39m  Unexpected unit          \u001B[2mlength-zero-no-unit\u001B[22m`,
        ];

        const results = matchResults(reportOutput, regexp);

        expect(results.length).toEqual(3);
      });

      it("matches violation details", () => {
        const reportOutput = [
          "scss/_test.scss",
          ` \u001B[2m11:16\u001B[22m  \u001B[31m\u001B[31m${icon}\u001B[39m  Unexpected unit          \u001B[2mlength-zero-no-unit\u001B[22m`,
        ];

        const results = matchResults(reportOutput, regexp);

        expect(results.length).toEqual(1);
        expect(results[0][pattern.line!]).toEqual("11");
        expect(results[0][pattern.column!]).toEqual("16");
        expect(results[0][pattern.message!]).toEqual("Unexpected unit        ");
        expect(results[0][pattern.code!]).toEqual("length-zero-no-unit");
      });
    });
  });
});
