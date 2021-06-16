import React, {createElement, Fragment} from 'react';
import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {observer} from "mobx-react";

type Props = MainStoreInjected & {
  entityName: string;
  propertyName?: string;
};

const MsgEntity = ({entityName, propertyName, mainStore}: Props) => {
  if (mainStore == null || mainStore.messages == null) {
    return createElement(Fragment, null, "propertyName");
  }
  const {messages} = mainStore;
  const message = messages[entityName + (propertyName ? '.' + propertyName : "")];
  return message != null
    ? createElement(Fragment, null, message)
    : createElement(Fragment, null, propertyName);
};

export default injectMainStore(observer(MsgEntity));
