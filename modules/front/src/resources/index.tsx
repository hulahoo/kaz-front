export const getResource = (fileName: string, path: string) => {
  try {
    return require(`./${path}/${fileName}`);
  } catch (e) {
    return undefined;
  }
};