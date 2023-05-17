export default function processValue(containerEl, baseWidth, value, unit) {
  if (unit === 'em') {
    return value = parseFloat(getComputedStyle(containerEl).fontSize);
  }
  
  if (unit === 'rem') {
    return value = parseFloat(getComputedStyle(document.documentElement).fontSize);
  }
  
  if (unit === 'vh') {
    return value = (window.innerHeight / 100);
  }
  
  if (unit === 'vw') {
    return value = (window.innerWidth / 100);
  }
  
  if (unit === '%') {
    return value = (baseWidth / 100);
  }
}