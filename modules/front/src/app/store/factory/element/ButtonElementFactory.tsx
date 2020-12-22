import React from 'react';
import ElementFactory from "../ElementFactory";
import ButtonStore from "../../ButtonStore";
import Button from "../../../components/Button/Button";

export default class ButtonElementFactory implements ElementFactory {

  buttonStore: ButtonStore;

  constructor(buttonStore: ButtonStore) {
    this.buttonStore = buttonStore;
  }

  parse(): JSX.Element {
    return <Button {...this.buttonStore.props}/>;
  }
}