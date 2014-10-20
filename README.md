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
