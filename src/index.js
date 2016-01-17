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

function renderBaseElement(name, props, children) {
  if (!elements.hasOwnProperty(name)) return children;
  const elment = elements[name];
  return element.render.call({
    children: children,
    props: props || (element.getDefaultProps && element.getDefaultProps())
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

module.exports = { createElement, getElements, renderElement };
