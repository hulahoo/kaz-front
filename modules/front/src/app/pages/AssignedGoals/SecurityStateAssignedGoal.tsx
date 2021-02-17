import React, {Component} from 'react';
import {action, observable} from "mobx";
import EntitySecurityState from "../../util/EntitySecurityState";
import {AssignedGoal} from "../../../cuba/entities/base/tsadv$AssignedGoal";

type Props = {
  entityId: string
}

abstract class SecurityStateAssignedGoal<T> extends Component<Props & T> {

  @observable
  entitySecurityState: EntitySecurityState = new EntitySecurityState(AssignedGoal.NAME, this.props.entityId);

  @observable
  readonly: boolean = false;

  @action
  setReadOnly = (): void => {
    this.entitySecurityState.afterLoad = () => {
      // this.readonly = this.entitySecurityState.securityState.hiddenAttributes
      //   && (this.entitySecurityState.securityState.hiddenAttributes.find(a => a === "performancePlan") != undefined);
    };
    this.entitySecurityState.loadSecurityState()
  };

  componentDidMount(): void {
    this.setReadOnly();
  }
}

export default SecurityStateAssignedGoal;