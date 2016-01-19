# float [![Build Status](https://travis-ci.org/CreaturePhil/float.svg?branch=master)](https://travis-ci.org/CreaturePhil/float) [![Dependency Status](https://david-dm.org/creaturephil/float.svg)](https://david-dm.org/creaturephil/float) [![devDependency Status](https://david-dm.org/creaturephil/float/dev-status.svg)](https://david-dm.org/creaturephil/float#info=devDependencies)

A library for creating user interfaces.

## Installation

```bash
$ npm install react-ui --save
```

## Example

```js
const Float = require('float-ui');

Float.createElement('HelloButton', {
  render: function() {
    return '<button>Hello ' + this.props.name + '</button>';
  }
});

console.log(Float.renderElement('<HelloButton name="Phil" />'));
// => <button>Hello Phil</button>
```

## API Documentation

### createElement(name, element)

Create a new element.

Parameters:

- ``name``: _String__
- ``element``: _Object_
  - ``getDefaultProps``: _Function_ (Returns _Object_)
  - ``render``: _Function_ (Returns _String_)
    - _this_ context:
      - ``props``: _Object_
      - ``children``: _String_

Returns: _undefined_

Example:

```js
Float.createElement('AwesomeButton', {
  getDefaultProps: function() {
    return {type: 'primary'};
  },

  render: function() {
    return '<button class="btn btn-' + this.props.type + '">' + this.children + "</button>";
  }
});
```

# LICENSE

[MIT](LICENSE)
