export const getMenuIcon = (menuId: string) => {
  return require(`./${menuId}.svg`)
};