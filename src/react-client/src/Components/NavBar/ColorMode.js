const COLOR_ATTRIBUTE = "data-bs-theme";

export const COLOR_LIGHT = "light";
export const COLOR_DARK = "dark";

/**
 * @returns {COLOR_LIGHT | COLOR_DARK}
 */
export const getMode = () => {
  // default is light
  return document.body.getAttribute(COLOR_ATTRIBUTE) ?? COLOR_LIGHT;
};

/**
 * @param {COLOR_LIGHT | COLOR_DARK} mode
 */
export const setMode = (mode) => {
  document.body.setAttribute(COLOR_ATTRIBUTE, mode);
};

/**
 * @param {COLOR_LIGHT | COLOR_DARK} mode
 * @returns {COLOR_LIGHT | COLOR_DARK}
 */
export const getOppositeMode = (mode) =>
  mode === COLOR_LIGHT ? COLOR_DARK : COLOR_LIGHT;

/**
 * Set color mode to the opposite of the current color mode
 * @returns {COLOR_LIGHT | COLOR_DARK} The new color mode
 */
export const toggleMode = () => {
  const newMode = getOppositeMode(getMode());
  setMode(newMode);
  return newMode;
};
