# BasicBoilerplate

A trivial starting point for front end stuff.

## Requirements

The repo assumes the use of Yarn (https://yarnpkg.com), and requires the installation of gulp-cli.

`npm install yarn gulp-cli browser-sync -g`

## Get Started

`> yarn`

`> gulp watch`

## What's currently supported

* SCSS - Transpiling piped through PostCSS for autoprefixing.
* JS & JSX - Transpiling with support for JSX, es2015, es2016 and es2017 with [Babel](https://babeljs.io/), and tree shaking and optimization implemented with [RollupJS](http://rollupjs.org). JSX, Angular and VueJS suppport can be easily added. Output is piped through [UglifyJS](https://github.com/mishoo/UglifyJS2), resulting in very small files that execute very quickly in comparison to the output of Webpack and Browserify: [https://nolanlawson.com/2016/08/15/the-cost-of-small-modules/] [https://github.com/nolanlawson/rollup-comparison]
* Browser Sync - Watch your changes appear before your very eyes!
* ESLint - Catch your syntax errors quickly!

## TODO

* Add testing support. I've used [Cypress.io](https://www.cypress.io/) before, and was rather pleased: natural sugar around karma/mocha/chai. While I'm decided, I'd like to support it out of the box.
