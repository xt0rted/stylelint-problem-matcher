import { readFile } from "fs";
import { join } from "path";
import { promisify } from "util";

import { getInput, setFailed } from "@actions/core";
import { issueCommand } from "@actions/core/lib/command"

import { ProblemMatcherDocument } from "github-actions-problem-matcher-typings";

const readFileAsync = promisify(readFile);

export async function run(): Promise<void> {
  try {
    const action = getInput("action");

    const matcherFile = join(__dirname, "..", ".github", "problem-matcher.json");

    switch (action) {
      case "add":
        issueCommand(
          "add-matcher",
          {},
          matcherFile,
        );
        break;

      case "remove":
        const fileContents = await readFileAsync(matcherFile, { encoding: "utf8" });
        const problemMatcherDocument: ProblemMatcherDocument = JSON.parse(fileContents);
        const problemMatcher = problemMatcherDocument.problemMatcher[0];

        issueCommand(
          "remove-matcher",
          {
            owner: problemMatcher.owner,
          },
          "",
        );
        break;

      default:
        throw Error(`Unsupported action "${action}"`);
    }
  } catch (error) {
    setFailed(error.message);
    throw error;
  }
}

run();
