import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { getInput, setFailed, } from "@actions/core";
import { issueCommand } from "@actions/core/lib/command";
export async function run() {
    try {
        const action = getInput("action");
        const matcherFile = fileURLToPath(new URL("problem-matcher.json", import.meta.url));
        switch (action) {
            case "add":
                issueCommand("add-matcher", {}, matcherFile);
                break;
            case "remove":
                const fileContents = await readFile(matcherFile, { encoding: "utf8" });
                const problemMatcherDocument = JSON.parse(fileContents);
                const problemMatcher = problemMatcherDocument.problemMatcher[0];
                issueCommand("remove-matcher", {
                    owner: problemMatcher.owner,
                }, "");
                break;
            default:
                throw Error(`Unsupported action "${action}"`);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            setFailed(error.message);
        }
        else {
            throw error;
        }
    }
}
run();
