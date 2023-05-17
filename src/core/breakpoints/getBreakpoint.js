import { getWindow } from 'ssr-window';
import processValue from './processValue.js';

export default function getBreakpoint(breakpoints, base = 'window', containerEl) {
  if (!breakpoints || (base === 'container' && !containerEl)) return undefined;
  let breakpoint = false;

  const window = getWindow();
  const currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;
  const unitRegExp = /^(\d*(?:\.\d+)?)([a-z%]*)$/;

  const points = Object.keys(breakpoints).map((breakpoint) => {
    let value;
    let unit;

    if (typeof breakpoint === 'string' && breakpoint.indexOf('@') === 0) {
      const minRatio = parseFloat(point.substring(1));
      value = currentHeight * minRatio;
      unit = 'px';
    }

    if (unitRegExp.test(breakpoint)) {
      const [ , _value, _unit ] = breakpoint.match(unitRegExp);
      value = Number(_value);
      unit = _unit || 'px';
    }

    return { point: breakpoint, value, unit };
  });

  points.sort((a, b) => a.value - b.value);
  for (const { point, value, unit } of points) {
    if (base === 'window') {
      if (window.matchMedia(`(min-width: ${value + unit})`).matches) {
        breakpoint = point;
      }
    } else if (unit === 'px' && value <= containerEl.clientWidth) {
      breakpoint = point;
    } else {
      const baseWidth = containerEl.clientWidth;
      const valueToCompare = processValue(containerEl, baseWidth, value, unit);
      if (valueToCompare <= baseWidth) {
        breakpoint = point;
      }
    }
  }
  return breakpoint || 'max';
}
