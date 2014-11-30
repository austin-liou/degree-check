# Degree Check

## Installation

Install the Node packages from the `package.json` file. These will be placed in `node_modules/`.

    sudo npm install

Install all Bower packages from the `bower.json` file. These will be placed in `client/bower_components/`.

    bower install

If you don't have MongoDB, [install](http://docs.mongodb.org/manual/installation/) it first. Then start up your database in a separate tab.

    mongod

To run the development server, run

    grunt serve

To run the deployment server, run

    grunt serve:dist

## Deployment

First, use grunt to execute a build.

    grunt build

Commit and push the resulting build.

    grunt buildcontrol:heroku

To open the app, run

    cd dist && heroku open

## Testing

Run all backend mocha tests

    grunt mochaTest

Open up `coverage/code_coverage.html` to view code coverage information.


## Conventions

### HTML/CSS

Use classes, only use IDs for JS hooks. Classes must be delimited by '-'.

    <div class="custom-container"></div>

Always wrap a partialwith class suffix '-partial'.

    <div class="footer-partial"></div>


Nest all CSS declarations within that external class.

```
.my-partial {
  .custom-container {}
  .other-element {}
}
```

Only go as far as three levels deep for SCSS Nesting. Be semantic.

### JavaScript

Use snake case for variables.

    var myObj = {};

Use single quotes for strings.

    var myString = 'string';
