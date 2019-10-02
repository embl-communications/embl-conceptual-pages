# EMBL.org conceptual pages

These pages demonstrate conceptual IA and navigation for EMBL.org. It does not
reflect look or even necessarily content.

## What does this do?

1. Templating: Uses `vf-eleventy`
1. CI deploys to https://index--embl-conceptual-pages.netlify.com

## Branch structure

- `master` latest version
- `v1`, `v2` tagged incremental releases
- `index` directory page of versions

## How to do deployments

1. Deploys are done with Netlify
  - https://app.netlify.com/sites/embl-conceptual-pages/deploys
1. All branches are deployed with a pattern of:
  - https://{{branchname}}--embl-conceptual-pages.netlify.com

## Local development

You'll need to [install npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and then:

1. If you don't have `yarn`, install it
   - https://yarnpkg.com/lang/en/docs/install/
2. Install all the things
   - `yarn install`
3. Generate the site in `/build`
   - `gulp dev` renders and serves
   - `gulp build` build static assets

## Adding Visual Framework components

To add a component you can use npm/Yarn or install it manually.

### By package

- installation: `yarn add @visual-framework/vf-logo`
- updating components: `yarn upgrade-interactive --latest`
  - alias: `npm run update-components`

### Manual installation for customisation

1. Download a pattern
2. Copy it to `./src/components/vf-component-name`

In either case you'll need to re-run `npm run-script dev` to access the pattern.

## Footnotes

- Why `yarn` and not `npm`?
  For the particular structure of the Visual Framework components, Yarn is considerably
  faster at installing and does so more efficiently (about half the total file size). You'll
  also be able to use `yarn upgrade-interactive --latest`, which makes it easier to update
  VF components.
