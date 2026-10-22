# Template: Vanilla HTML/CSS/JS

A simple, no-nonsense template for web applications.

## Run

```bash
# Starts the webpack dev server
npm run serve
```

## Tooling

### Webpack

Bundler and dev server. Using experimental(-ish) HTML/CSS support only. The [babel.config.json](./babel.config.json) file is for compatibility with older browsers.

### ESLint

Linter. Default configuration.

### Prettier

Formatter. Default configuration.

### eslint-config-prettier

Makes ESLint and Prettier get along.

### lint-staged

Pre-commit hook to run ESLint, Prettier, and Jest.

Jest is passed `--findRelatedTests` to tell Jest to look for tests related to those staged, `--bail` to bail early if tests fail, and `--passWithNoTests` so that commits with no relevant tests are allowed to go through.

### Jest

Configured with Babel to support ESM->CJS. ESLint configured to get along with Jest globals.

## CSS Reset

Uses Josh W. Comeau's [CSS reset](https://www.joshwcomeau.com/css/custom-css-reset/). ESLint ignore comments added to certain non-baseline CSS values.

## Deployment

> [!NOTE]
> First time only:  
> Make the gh-pages branch:
>
> ```bash
> git branch gh-pages
> ```

Ensure the `gh-pages` branch is up to date with `main`

```bash
git checkout gh-pages && git merge main --no-edit
```

Run the build command:

```bash
npm run build
```

Commit and push to `gh-pages`:

```bash
git add dist -f && git commit -m "Deployment commit"
git subtree push --prefix dist origin gh-pages
git checkout main
```

> [!NOTE]
> First time only:  
> Ensure `gh-pages` is set as the source branch in repository settings.

> [!TIP]
> Now, for every subsequent deployment, use `npm run deploy`.  
> This runs the deployment sequence, pushing changes to the `gh-pages` branch.
