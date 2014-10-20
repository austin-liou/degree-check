Front-end Conventions
=====================
HTML/CSS
=======
1. Use classes, only use IDs for JS hooks
2. Classes must be delimited by '-'
For example:

<div class="custom-container"></div>

3. Always wrap a partial with a div with class suffix '-partial'
For Example:

<div class="footer-partial"></div>
4. Nest all CSS declarations within that external class
For example:
.my-partial {
	.custom-container {}
	.other-element {}
}

5. Only go as far as three levels deep for SCSS Nesting
6. Be semantic

JS
=======
1. Use snake case for variables e.g. var myObj = {};
2. Use single quotes for strings e.g. var myString = 'string';


Backend Conventions
=====================
