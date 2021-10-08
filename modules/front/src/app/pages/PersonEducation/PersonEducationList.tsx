import * as React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

import { observable } from "mobx";

import {
  collection,
  DataTable,
  injectMainStore,
  MainStoreInjected
} from "@cuba-platform/react";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import Button, { ButtonType } from "../../components/Button/Button";
import { RootStoreProp } from "../../store";
import { PersonEducationManagement } from "./PersonEducationManagement";
import { PersonEducation } from "../../../cuba/entities/base/tsadv$PersonEducation";
import DataTableFormat from "../../components/DataTable/intex";

@injectMainStore
@inject("rootStore")
@observer
class PersonEducationListComponent extends React.Component<
  MainStoreInjected & WrappedComponentProps & RootStoreProp
> {
  dataCollection = collection<PersonEducation>(PersonEducation.NAME, {
    view: "portal.my-profile",
    sort: "-updateTs",
    filter: {
      conditions: [
        {
          property: "personGroup.id",
          operator: "=",
          value: this.props.rootStore!.userInfo.personGroupId!
        }
      ]
    }
  });

  fields = [
    "school",

    "location",

    "educationType",

    "specialization",

    "diplomaNumber"
  ];

  @observable selectedRowKey: string | undefined;

  render() {
    const buttons = [
      <Link
        to={
          PersonEducationManagement.PATH +
          "/" +
          PersonEducationManagement.NEW_SUBPATH
        }
        key="create"
      >
        <Button
          buttonType={ButtonType.PRIMARY}
          style={{ margin: "0 12px 12px 0" }}
        >
          <span>
            <FormattedMessage id="management.browser.create" />
          </span>
        </Button>
      </Link>,
      <Link
        to={PersonEducationManagement.PATH + "/" + this.selectedRowKey}
        key="edit"
      >
        <Button
          buttonType={ButtonType.FOLLOW}
          style={{ margin: "0 12px 12px 0" }}
          disabled={!this.selectedRowKey}
        >
          <FormattedMessage id="management.browser.edit" />
        </Button>
      </Link>
    ];

    return (
      <DataTableFormat
        dataCollection={this.dataCollection}
        fields={this.fields}
        onRowSelectionChange={this.handleRowSelectionChange}
        hideSelectionColumn={true}
        buttons={buttons}
      />
    );
  }

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };
}

const PersonEducationList = injectIntl(PersonEducationListComponent);

export default PersonEducationList;
