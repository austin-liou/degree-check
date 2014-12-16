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

Change directories to the `dist/` folder.

    cd dist

If you have not deployed before, you must add the Heroku remote.

    git remote add heroku git@heroku.com:degree-checker.git

Now commit your changes and push the build to Heroku.

```
git add -A
git commit
git push heroku master
```

If you were not the last person to deploy, you will receive a conflict when you try to push to Heroku. Therefore, you should instead run

    git push heroku master --force

Make sure to be careful with this. Make sure your app is up to date with the latest version (pull from GitHub).

## Testing

Run all backend mocha tests

    grunt mochaTest

Open up `coverage/code_coverage.html` to view code coverage information.

## Environment Variables

To have grunt launch your app with specific environment variables, add them to the git ignored environment config file `server/config/local.env.js`. A sample version of this file is provided at `server/config/local.env.sample.js`.

    cp server/config/local.env.sample.js server/config/local.env.js

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
