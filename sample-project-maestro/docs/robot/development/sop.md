
# Standard Development Procedures

## Development Process
 - All features will be developed on a feature branch from main
 - Ensure that your dev environment is up to date by running `npm install`
 - Adhere to the [Coding Standards](./coding-standards.md)
 - Ensure that your code will pass CI:
    - Run all the unit tests on your local device
    - Ensure you have removed any `@only` annotations from your tests
    - Run the linter `npm run lint` and `npm run tslint`
    - Run the automated tests locally, to verify you have not caused any regressions:
      - in terminal `npm run build-automated-test-client`
      - in vscode launch the `Automated tests` launch target.

## Branches, and commits
- All individual ticket branches should be created off of main
- The branch name should be of the form `feat`|`chore`|`fix`|`doc`/github-username/ticketNumber-description` e.g. `chore/georgejecook/r1-add-documentation`
- All commit messages should be created with the form `prefix(area)` where prefix is one of:
    - feat: a new feature
    - fix: a bug fix
    - docs: Documentation only changes
    - style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    - refactor: A code change that neither fixes a bug or adds a feature
    - perf: A code change that improves performance
    - test: Adding missing tests
    - chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
  - and area is the area of code affected (e.g. `core`, `login`, `player`)
- example: `feat(player): Adds raf support`

## Pull requests
- All changes need to be merged through a pull request
- All pull requests should be created with the form of a commit message
- Each pull request requires an approval, and passing the appropriate tasks (linting, compiling, etc)
- Upon merge, commits should be squashed
