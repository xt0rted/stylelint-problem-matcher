export function matchResults(report: string[], regexp: RegExp): RegExpExecArray[] {
  return report.map(line => regexp.exec(line))
    .filter(match => match);
}
