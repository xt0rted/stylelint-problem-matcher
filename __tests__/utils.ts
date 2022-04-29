function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function matchResults(report: string[], regexp: RegExp): RegExpExecArray[] {
  return report
    .map(line => regexp.exec(line))
    .filter(notEmpty);
}
