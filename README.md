# Stylelint Problem Matcher

[![CI Workflow Status](https://github.com/xt0rted/stylelint-problem-matcher/workflows/CI/badge.svg)](https://github.com/xt0rted/stylelint-problem-matcher/actions?query=workflow%3ACI)

Adds a problem matcher that will detect errors from [Stylelint](https://stylelint.io/) and create annotations for them.

## Usage

```yml
on: push
jobs:
  build:
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: "12.x"
    - uses: xt0rted/stylelint-problem-matcher@v1
    - run: npm ci
    - run: npm test
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
