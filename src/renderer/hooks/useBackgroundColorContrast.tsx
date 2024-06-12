// @ts-ignore
import ColorThief from 'color-thief-browser';
import tinycolor from 'tinycolor2';

export function useBackgroundColorContrast() {
  const colorThief = new ColorThief();
  const dominantColor = colorThief.getColor(document.getElementById('back'));
  const dominantColorHex = tinycolor({
    r: dominantColor[0],
    g: dominantColor[1],
    b: dominantColor[2],
  }).toHexString();

  const color = tinycolor(dominantColorHex);

  const textColorClass = color.isDark() ? '#fff' : '#000';

  return { textColorClass };
}
