Installation Instructions
=====================
- 'sudo npm install' on root project directory
- 'bower install' on root project directory
- 'mongod' on a separate tab
- 'grunt serve' to run dev. version
- 'grunt serve:dist' to run deployment version

Deployment Instructions
=====================
- 'grunt build' on root project directory
- 'grunt buildcontrol:heroku' on root project directory
- 'cd dist && heroku open'

Front-end Conventions
=====================
HTML/CSS
---------------------
- Use classes, only use IDs for JS hooks
- Classes must be delimited by '-'
```
<div class="custom-container"></div>
```

- Always wrap a partial with a div with class suffix '-partial'
```
<div class="footer-partial"></div>
```
- Nest all CSS declarations within that external class
```
.my-partial {
	.custom-container {}
	.other-element {}
}
```

- Only go as far as three levels deep for SCSS Nesting
- Be semantic

JS
---------------------
- Use snake case for variables
```
var myObj = {};
```
- Use single quotes for strings
```
var myString = 'string';
```


Backend Conventions
=====================
