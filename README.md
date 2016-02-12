# Mockboard [![Build Status](https://travis-ci.org/kevinkucharczyk/mockboard.svg?branch=master)](https://travis-ci.org/kevinkucharczyk/mockboard)

Mockboard is a widget-driven dashboard written in Ember.js and Node.js. It is very much a work in progress.

The aim is to create an easily customizable dashboard with the ability to add and edit many types of widgets.

## Prerequisites

You will need the following things properly installed on your computer:

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Gulp](http://gulpjs.com/) (npm install -g gulp-cli)
* [PhantomJS](http://phantomjs.org/) (npm install -g phantomjs)

## Installation

Once you have all the prerequisites, you can proceed with installing the dependencies.

1. `git clone https://github.com/kevinkucharczyk/mockboard.git` this repository
2. change into the new directory
3. Install node dependencies: `npm install`
4. Run `gulp init` to install all client-side dependencies.

## Running / Development

* Run `gulp dev` to start both a watched build of the client and server.
* Mockboard will be available under [http://localhost:3141](http://localhost:3141).

### Running Tests

* `gulp validate` to run linters and tests

### Building

* `gulp client:build` to build the client

### Deploying

TODO

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

