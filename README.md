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

# LICENSE

[MIT](LICENSE)
