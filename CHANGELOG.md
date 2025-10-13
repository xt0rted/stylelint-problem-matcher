# Changelog

## Unreleased

- Bumped `@actions/core` from 1.7.0 to 1.10.0
- Updated to run on Node 16
- Converted to es modules
- Updated problem matcher to support errors and warnings
  - The problem matcher owner changed from `stylelint` to `stylelint-error` and the new one is `stylelint-warning`

## [1.3.0](https://github.com/xt0rted/stylelint-problem-matcher/compare/v1.2.0...v1.3.0) - 2022-04-28

- Bumped `@actions/core` from 1.2.2 to 1.7.0

## [1.2.0](https://github.com/xt0rted/stylelint-problem-matcher/compare/v1.1.0...v1.2.0) - 2020-02-18

- Pulling owner name from problem matcher file when removing it

## [1.1.0](https://github.com/xt0rted/stylelint-problem-matcher/compare/v1.0.0...v1.1.0) - 2020-02-04

- Updated problem matcher regex to handle rules without line numbers such as [`unicode-bom`](https://stylelint.io/user-guide/rules/unicode-bom) ([#2](https://github.com/xt0rted/stylelint-problem-matcher/pull/2))

## [1.0.0](https://github.com/xt0rted/stylelint-problem-matcher/releases/tag/v1.0.0) - 2020-02-03

- Initial release
