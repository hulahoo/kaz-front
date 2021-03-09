export const getBlueMenuIcon = (menuId: string) => {
  return require(`./${menuId}.svg`)
};