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


createElement('AwesomeButton', {
  render: function() {
    return "<button name='" + this.props.name + "'>" + this.children + "</button>";
  }
});

function renderBaseElement(dom, children) {
  if (!elements.hasOwnProperty(dom.name)) return renderUnknownElement(children, dom);
  const element = elements[dom.name];
  return element.render.call({
    children: children,
    props: dom.attribs || (element.getDefaultProps && element.getDefaultProps()) || {}
  });
}

function renderUnknownElement(children, dom) {
  if (dom.type === 'tag' && ['h1', 'h2', 'h3'].indexOf(dom.name) >= 0) {
    return '<' + dom.data + '>' + children + '</' + dom.name + '>';
  }
  return children;
}

function renderElement(html) {
  parser.parseComplete(html);
//  console.log(require('util').inspect(handler.dom, false, null));
  return handler.dom.map(d => renderElements(d)).join('');
}

function renderElements(dom) {
  console.log('\n@', require('util').inspect(dom, false, null));
  if (dom.type === 'text') return renderBaseElement(dom, dom.data);
  if (!dom.children) return renderBaseElement(dom, '');
  if (dom.raw === 'fuck') console.log('@', require('util').inspect(dom, false, null));
  const children = dom.children.filter(e => e.type === 'tag');
  if (!children.length) {
//    console.log('!!!!', dom.children);
    return renderBaseElement(dom, dom.children[0].data);
  }
  const childrens = dom.children.map(e => renderElements(e)).join('');
  return renderBaseElement(dom, childrens);
}

const d = handler.dom[0];
//console.log(renderElement("<h1><AwesomeButton name='yo'><h1>hi</h1><h1>hi</h1></AwesomeButton><AwesomeButton name='yo'><h1>hi</h1><h1>hi</h1></AwesomeButton></h1>"));
console.log(renderElement("<h1>fuck<h1>hi</h1></h1>"));
//console.log(renderElement("<AwesomeButton></AwesomeButton>"));
//console.log(renderBaseElement(d.name, d.attribs, d.children[0].data));
