'use strict';

const htmlparser = require('htmlparser');
const handler = new htmlparser.DefaultHandler((err) => {
  if (err) throw new Error(err);
});

const parser = new htmlparser.Parser(handler);

let elements = {};

function createElement(name, element) {
  elements[name] = element;
}

function getElements() {
  return elements;
}

createElement('h1', {
  render: function() {
    return "<h1>" + this.children + "</h1>";
  }
});

createElement('AwesomeButton', {
  render: function() {
    return "<button name='" + this.props.name + "'>" + this.children + "</button>";
  }
});

function renderBaseElement(name, props, children) {
  if (!elements.hasOwnProperty(name)) return children;
  return elements[name].render.call({
    children: children,
    props: props
  });
}

function renderElement(html) {
  parser.parseComplete(html);
  return handler.dom.map(d => renderElements(d)).join('');
}

function renderElements(dom) {
  if (!dom.children) return renderBaseElement(dom);
  const children = dom.children.filter(e => e.type === 'tag');
  if (!children.length) {
    return renderBaseElement(dom.name, dom.attribs, dom.children[0].data);
  }
  const childrens = dom.children.map(e => renderElements(e)).join('');
  return renderBaseElement(dom.name, dom.attribs, childrens);
}

const d = handler.dom[0];
console.log(renderElement("<AwesomeButton name='yo'><h1>hi</h1><h1>hi</h1></AwesomeButton><AwesomeButton name='yo'><h1>hi</h1><h1>hi</h1></AwesomeButton>"));
//console.log(renderBaseElement(d.name, d.attribs, d.children[0].data));
