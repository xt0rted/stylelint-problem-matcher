import { join } from "path";

import { getInput, setFailed } from "@actions/core";

export function run() {
  try {
    const action = getInput("action");

    switch (action) {
      case "add":
        const matchersPath = join(__dirname, "..", ".github");
        console.log(`::add-matcher::${join(matchersPath, "stylelint-problem-matcher.json")}`);
        break;

      case "remove":
        console.log("::remove-matcher owner=stylelint::");
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
