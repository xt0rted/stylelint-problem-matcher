export function matchResults(report: string[], regexp: RegExp): (RegExpExecArray | null)[] {
  return report.map(line => regexp.exec(line))
    .filter(match => match);
}
