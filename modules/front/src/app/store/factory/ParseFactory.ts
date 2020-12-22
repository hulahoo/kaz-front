import ElementFactory from "./ElementFactory";

export default interface ParseFactory {
  getElementFactory(): ElementFactory;
}