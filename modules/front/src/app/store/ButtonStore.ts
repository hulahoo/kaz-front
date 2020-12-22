import {action, observable} from "mobx";
import React from "react";
import RootStore from "./RootStore";
import ParseFactory from "./factory/ParseFactory";
import ElementFactory from "./factory/ElementFactory";
import ButtonElementFactory from "./factory/element/ButtonElementFactory";
import {ButtonProps} from "antd/lib/button/button";

export default class ButtonStore implements ParseFactory{
  root: RootStore;
  @observable props?: ButtonProps

  constructor(root: RootStore) {
    this.root = root;
  }

  // @action
  // onClick = async () => {
  // }

  @action
  setProps(value: ButtonProps) {
    this.props = value;
  }

  getElementFactory(): ElementFactory {
    return new ButtonElementFactory(this);
  }
}