export const getMenuIcon = (menuId: string) => {
  try {
    const iconPath = require(`./${menuId}.svg`);
    return iconPath;
  } catch (e) {
    return undefined;
  }
};