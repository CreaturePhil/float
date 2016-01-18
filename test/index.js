'use strict';

const assert = require('assert');
const Float = require('../src');

describe('Rendering known html elements', () => {
  it('should be empty tag', () => {
    assert.deepEqual(Float.renderElement('<h1></h1>'), '<h1></h1>');
  });

  it('should be tag with text', () => {
    assert.deepEqual(Float.renderElement('<h1>Hello World!</h1>'), '<h1>Hello World!</h1>');
  });

  it('should be multiple tags', () => {
    assert.deepEqual(Float.renderElement('<h1>Hello World!</h1><h2></h2><h3>Yo</h3>'), '<h1>Hello World!</h1><h2></h2><h3>Yo</h3>');
  });

  it('should be nested tags', () => {
    assert.deepEqual(Float.renderElement('<div><h1><b>Hello World!</b></h1></div>'), '<div><h1><b>Hello World!</b></h1></div>');
  });

  it('should be tags with attributes', () => {
    assert.deepEqual(Float.renderElement('<div style="margin: 10px"><h1><b style="color: red">Hello World!</b></h1></div>'), '<div style="margin: 10px"><h1><b style="color: red">Hello World!</b></h1></div>');
  });
});

describe('Creating custom elements', () => {
  it('should create custom button element', () => {
    Float.createElement('AwesomeButton', {
      render: function() {
        return `<button name='${this.props.name}'>${this.children}</button>`;
      }
    });
    assert.deepEqual(Float.getElements().hasOwnProperty('AwesomeButton'), true);
  });

  it('should create custom heading element', () => {
    Float.createElement('CoolHeader', {
      getDefaultProps: function() {
        return {color: 'red'};
      },

      render: function() {
        return `<h1 style='color: ${this.props.color}'>${this.children}</h1>`;
      }
    });
    assert.deepEqual(Float.getElements().hasOwnProperty('CoolHeader'), true);
  });
});

describe('Rendering custom elements', () => {
  it('should render empty custom button element', () => {
    assert.deepEqual(Float.renderElement('<AwesomeButton></AwesomeButton>'), '<button name=\'undefined\'></button>');
  });

  it('should render custom button element', () => {
    assert.deepEqual(Float.renderElement('<AwesomeButton name="clicker">Click me!</AwesomeButton>'), '<button name=\'clicker\'>Click me!</button>');
  });

  it('should render empty custom heading element', () => {
    assert.deepEqual(Float.renderElement('<CoolHeader></CoolHeader>'), '<h1 style=\'color: red\'></h1>');
  });

  it('should render custom heading element', () => {
    assert.deepEqual(Float.renderElement('<CoolHeader color="blue">Welcome!</CoolHeader>'), '<h1 style=\'color: blue\'>Welcome!</h1>');
  });

  it('should render multiple custom elements', () => {
    assert.deepEqual(
      Float.renderElement('<AwesomeButton name="clicker">Click me!</AwesomeButton><CoolHeader color="blue">Welcome!</CoolHeader>'),
      '<button name=\'clicker\'>Click me!</button><h1 style=\'color: blue\'>Welcome!</h1>'
    );
  });

  it('should render nested elements', () => {
    assert.deepEqual(
      Float.renderElement('<AwesomeButton name="clicker">Click me!<CoolHeader color="blue">Welcome!</CoolHeader></AwesomeButton>'),
      '<button name=\'clicker\'>Click me!<h1 style=\'color: blue\'>Welcome!</h1></button>'
    );
    assert.deepEqual(
      Float.renderElement('<AwesomeButton name="clicker"><h1>Click me!</h1><CoolHeader color="blue">Welcome!</CoolHeader></AwesomeButton>'),
      '<button name=\'clicker\'><h1>Click me!</h1><h1 style=\'color: blue\'>Welcome!</h1></button>'
    );
  });
});

describe('Rendering custom elements within custom elements', () => {
  it('should create custom button element inside heading element', () => {
    Float.createElement('SuperHeader', {
      getDefaultProps: function() {
        return {color: 'red'};
      },

      render: function() {
        return `<h1 style='color: ${this.props.color}'>${this.children}<AwesomeButton name="hi">Hi</AwesomeButton></h1>`;
      }
    });
    assert.deepEqual(Float.getElements().hasOwnProperty('SuperHeader'), true);
  });

  it('should render custom button element inside heading element', () => {
    assert.deepEqual(
      Float.renderElement('<SuperHeader color="green">My name is something.</SuperHeader>'),
      '<h1 style=\'color: green\'>My name is something.<button name=\'hi\'>Hi</button></h1>'
    );
  });
});
