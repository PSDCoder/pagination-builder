# pagination-builder

[![Travis](https://img.shields.io/travis/PSDCoder/pagination-builder.svg?style=flat-square)](https://travis-ci.org/PSDCoder/pagination-builder)
[![npm version](https://img.shields.io/npm/v/pagination-builder.svg?style=flat-square)](https://www.npmjs.com/package/pagination-builder)
[![npm downloads](https://img.shields.io/npm/dm/pagination-builder.svg?style=flat-square)](https://www.npmjs.com/package/pagination-builder)

Pagination builder is the simple function that generates pagination array by passed current page and total pages.
It performs all the logic for you and you just have to draw the result.

## Installation

For install stable version:

```
npm install --save pagination-builder
```

This assumes you are using [npm](https://www.npmjs.com/) as your package manager.  
You can use this function as [CommonJS](http://webpack.github.io/docs/commonjs.html) module. This module is what you get when you import `paginationBuilder` in a [Webpack](http://webpack.github.io), [Browserify](http://browserify.org/), or a Node environment.

If you don’t use a module bundler, it’s also fine. The `paginationBuilder` npm package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the `dist` folder. They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. For example, you can drop a UMD build as a `<script>path to /dist/pagination-builder.js</script>` on the page. The UMD build make `paginationBuilder` available as a `window.paginationBuilder.default` global variable.

The source code is written in ES2015 but we precompile both CommonJS and UMD builds to ES5 so they work in [any modern browser](http://caniuse.com/#feat=es5). You don’t need to use Babel or a module bundler.


## Example of usage

```javascript
import paginationBuilder from 'pagination-builder';

const paginationStructure = paginationBuilder(5, 10);
const listItems = paginationStructure.map(item => {
    let className = 'pagination__item';

    if (item.isActive) {
        className += ' pagination__item_active';
    }

    if (item.isDisabled) {
        className += ' pagination__item_disabled';
    }

    const innerElement = item.isDisabled
        ? `<span class="pagination__element">${item.text}</span>`
        : `<a class="pagination__link" href="?page${item.page}">${item.text}</a>`;

    return `<li class="${className}">${innerElement}</li>`;
});

console.log(['<ul class="pagination">', ...listItems, '</ul>'].join(''));
```

Will print to console:
```
<ul class="pagination">
    <li class="pagination__item"><a class="pagination__link" href="?page4">Prev</a></li>
    <li class="pagination__item"><a class="pagination__link" href="?page1">1</a></li>
    <li class="pagination__item"><a class="pagination__link" href="?page2">2</a></li>
    <li class="pagination__item"><a class="pagination__link" href="?page3">3</a></li>
    <li class="pagination__item"><a class="pagination__link" href="?page4">4</a></li>
    <li class="pagination__item pagination__item_active"><a class="pagination__link" href="?page5">5</a></li>
    <li class="pagination__item"><a class="pagination__link" href="?page6">6</a></li>
    <li class="pagination__item"><a class="pagination__link" href="?page7">7</a></li>
    <li class="pagination__item pagination__item_disabled"><span class="pagination__element">...</span></li>
    <li class="pagination__item"><a class="pagination__link" href="?page10">10</a></li>
    <li class="pagination__item"><a class="pagination__link" href="?page6">Next</a></li>
</ul>
```

## API

Module has one default exported function: **paginationBuilder(currentPage, totalPages[, options={Object}])**

### Options object params

|Param|Default value|Description|
|-----|-------------|-----------|
|prevNextLinks|`true`|Generate items with *prev* and *next* text|
|dots|`'...'`|Generate dots between items, if `false` it won't generated|
|prevText|`'Prev'`|Text that will be used for previous item, if *prevNextLinks* is `true`|
|nextText|`'Next'`|Text that will be used for next item, if *prevNextLinks* is `true`|
|afterFirst|`2`|Count of items that will be returned after first page, before dots|
|beforeLast|`2`|Count of items that will be returned before last page, after dots|
|beforeCurrent|`2`|Count of items that will be returned before current page, after dots|
|afterCurrent|`2`|Count of items that will be returned after current page, before dots|

### Example

```
Result of call: paginationBuilder(10, 22, { afterCurrent: 3 }).map(item => item.text).join(' ');

Prev 1 2 3 ... 8 9 10 11 12 13 ... 20 21 22 Next
 ^    |---|   |---|  |--------|   |-----|     ^
 |      ^       ^        ^           ^        |
 |      |       |        |           |        |
 |      |       |   afterCurrent     |        |
 |      | beforeCurrent         beforeLast    |
 | afterFirst                                 |
 prevText                                 nextText
```
