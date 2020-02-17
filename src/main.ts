import { join } from "path";

import { getInput, setFailed } from "@actions/core";
import { issueCommand } from "@actions/core/lib/command"

export function run() {
  try {
    const action = getInput("action");

    switch (action) {
      case "add":
        issueCommand(
          "add-matcher",
          {},
          join(__dirname, "..", ".github", "stylelint-problem-matcher.json"),
        );
        break;

      case "remove":
        issueCommand(
          "remove-matcher",
          {
            owner: "stylelint",
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
