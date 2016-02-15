# angular-08724

## Overview

The AngularJS website is a great resource to obtain information about
AngularJS: [https://angularjs.org/](https://angularjs.org/).

* [Tutorial](https://docs.angularjs.org/tutorial)
* [Developer Guide](https://docs.angularjs.org/guide)
* [API Reference](https://docs.angularjs.org/api)

The demo files in this repository reference documentation on the
AngularJS website extensively.

## Getting Started

To get you started you can simply clone the angular-08724 repository and install the dependencies:

### Prerequisites

You need git to clone the angular-08724 repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

You must have node.js and its package manager (npm) installed.
You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone angular-08724

Clone the angular-08724 repository using [git](http://git-scm.com/):

```
git clone https://github.com/jmussitsch/angular-08724.git
cd angular-08724
```

### Install Dependencies

```
npm install
```

You should find that you have two new folders in your project.

* `node_modules` - contains the npm packages for tools we need
* `app/bower_components` - contains the angular framework files and a few other things

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-08724 changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

The project is preconfigured with a simple development web server.  To start
this server:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

### Developer Tools

There are some Angular-specific developer extensions for Chrome:

* [ng-inspector](http://ng-inspector.org/)
* [Batarang](https://chrome.google.com/webstore/detail/ighdmehidhipcmcojjgiloacoafjmpfk)