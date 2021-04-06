import { h } from './index-cbdbef9d.js';

function ConstrainHeadingLevel(level) {
  return Math.min(Math.max(Math.ceil(level), 1), 6);
}
const CalciteHeading = (props, children) => {
  const HeadingTag = `h${props.level}`;
  delete props.level;
  return h(HeadingTag, Object.assign({}, props), children);
};

export { CalciteHeading as C, ConstrainHeadingLevel as a };
