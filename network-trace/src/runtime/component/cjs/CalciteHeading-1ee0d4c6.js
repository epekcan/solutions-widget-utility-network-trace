'use strict';

const index = require('./index-adeb0063.js');

function ConstrainHeadingLevel(level) {
  return Math.min(Math.max(Math.ceil(level), 1), 6);
}
const CalciteHeading = (props, children) => {
  const HeadingTag = `h${props.level}`;
  delete props.level;
  return index.h(HeadingTag, Object.assign({}, props), children);
};

exports.CalciteHeading = CalciteHeading;
exports.ConstrainHeadingLevel = ConstrainHeadingLevel;
