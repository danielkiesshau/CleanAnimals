export function getLabelConstrated(hexBaseColor: string) {
  const noSharpHEX = hexBaseColor.split('#')[1];
  const rgb = hexToRgb(noSharpHEX);
  if (rgb?.r * 0.299 + rgb?.g * 0.587 + rgb?.b * 0.114 > 186) {
    return '#000000';
  }
  return '#ffffff';
}

function hexToRgb(hex: string): any | null {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
