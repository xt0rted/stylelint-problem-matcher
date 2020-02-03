import { matchResults } from "../__helpers__/utils";
import { stylelintMatcher, ProblemMatcherPattern } from "../__data__/stylelintMatcher";

describe("problemMatcher", () => {
  it("has two patterns", () => {
    expect(stylelintMatcher.pattern.length).toEqual(2);
  });

  describe("file pattern", () => {
    let pattern: ProblemMatcherPattern;
    let regexp: RegExp;

    beforeEach(() => {
      pattern = stylelintMatcher.pattern[0];
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
    let pattern: ProblemMatcherPattern;
    let regexp: RegExp;

    beforeEach(() => {
      pattern = stylelintMatcher.pattern[1];
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
  });
});
