function notEmpty(value) {
    return value !== null && value !== undefined;
}
export function matchResults(report, regexp) {
    return report
        .map(line => regexp.exec(line))
        .filter(notEmpty);
}
