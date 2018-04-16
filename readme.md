# react-n-depth-checker [![Build Status](https://travis-ci.org/brianchung808/react-n-depth-checker.svg?branch=master)](https://travis-ci.org/brianchung808/react-n-depth-checker) [![codecov](https://codecov.io/gh/brianchung808/react-n-depth-checker/badge.svg?branch=master)](https://codecov.io/gh/brianchung808/react-n-depth-checker?branch=master)

> React Component that checks n-levels deep for `shouldComponentUpdate`

A React component that implements comparison in `shouldComponentUpdate` with a depth setting.

This is useful for components that:
1. Have some props that are complex types (object/array).
2. You want `React.PureComponent`-ish shallow checking for primitive props + checking some depth for other props without completely reimplementing `shouldComponentUpdate`.

If you're doing `depth=0` (shallow comparison), just use `React.PureComponent`.


## Install

```
$ npm install react-n-depth-checker
```


## Usage

```js
const createChecker = require('react-n-depth-checker');

const DepthOneCheckerComponent = createChecker(1);

const MyComponent extends DepthOneCheckerComponent {
	// Will go one level further than `PureComponent`'s shallow comparison.
	// At depth=1, will iterate through any prop that is an array/object and then do a shallow compare.
	propTypes: {
		anArray: PropTypes.array
	}
}
```
