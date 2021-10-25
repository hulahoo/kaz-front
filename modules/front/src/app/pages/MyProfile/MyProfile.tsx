import * as React from "react";
import { inject, observer } from "mobx-react";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import { Card, List, Tabs } from "antd";
import {
  getCubaREST,
  injectMainStore,
  MainStoreInjected,
  withLocalizedForm
} from "@cuba-platform/react";
import { observable } from "mobx";
import { FormComponentProps } from "antd/lib/form";
import { RootStoreProp } from "../../store";
import { Menu, PersonProfile } from "../MyTeam/MyTeamCard";
import { restServices } from "../../../cuba/services";
import Notification from "../../util/Notification/Notification";
import PersonalData from "./PersonalData";
import { PersonalDataRequest } from "../../../cuba/entities/base/tsadv$PersonalDataRequest";
import { PersonDocumentRequest } from "../../../cuba/entities/base/tsadv_PersonDocumentRequest";
import { AddressRequest } from "../../../cuba/entities/base/tsadv$AddressRequest";
import AddressRequestList from "../AddressRequest/AddressRequestList";
import PersonalDataRequestList from "../PersonalDataRequest/PersonalDataRequestList";
import PersonDocumentRequestList from "../PersonDocumentRequest/PersonDocumentRequestList";

const { TabPane } = Tabs;

export type MyProfileProps = {
  personGroupId: string;
};

@inject("rootStore")
@injectMainStore
@observer
class MyProfile extends React.Component<
  MyProfileProps &
    WrappedComponentProps &
    RootStoreProp &
    FormComponentProps &
    MainStoreInjected
> {
  @observable person?: PersonProfile;
  @observable urlImg?: string;

  @observable selectedTab: string = "personalData";
  @observable selectedLeftMenu: string = "myProfile.mainData";

  // callSetSelectedTabOrLeftMenu = () => {
  //   if (this.props.setSelectedTabOrLeftMenu)
  //     this.props.setSelectedTabOrLeftMenu(this.selectedTab, this.selectedLeftMenu);
  // }

  @observable
  mainStore = this.props.mainStore;

  getTabs = (): Menu[] => {
    return [
      {
        id: "personalData"
      } /* {
      id: 'timeManagement'
    },*/
    ];
  };

  getLeftMenu = (): Menu[] => {
    const messages = this.mainStore!.messages!;
    switch (this.selectedTab) {
      case "personalData":
        return [
          {
            id: "myProfile.mainData",
            caption: "myProfile.mainData"
          },
          {
            id: "personalDataRequest",
            caption: messages[PersonalDataRequest.NAME]
          },
          {
            id: "personDocumentRequest",
            caption: messages[PersonDocumentRequest.NAME]
          },
          {
            id: "addressRequest",
            caption: messages[AddressRequest.NAME]
          }
        ];
      case "timeManagement":
        return [
          {
            id: "absence"
          },
          {
            id: "absenceRequest"
          },
          {
            id: "workOnWeekend"
          },
          {
            id: "workOnWeekendRequest"
          },
          {
            id: "scheduleStandard"
          },
          {
            id: "scheduleOffsetRequest"
          }
        ];
    }
    return [
      {
        id: "personalData"
      }
    ];
  };

  render() {
    const hasEmail = this.person && this.person.email;
    const hasPhone = this.person && this.person.phone;

    return (
      <div style={{ height: "100%", display: "flex" }}>
        <div
          style={{
            float: "left",
            width: 330
          }}
        >
          <Card
            className="narrow-layout large-section section-container"
            bodyStyle={{ textAlign: "center" }}
          >
            <img
              alt={this.person ? this.person.fullName || "" : ""}
              src={
                this.urlImg
                  ? this.urlImg
                  : require("../../../resources/img/default-avatar.svg")
              }
              style={{ height: 200, width: 200, borderRadius: "50%" }}
            />
            <h3>{this.person ? this.person.fullName || "" : ""}</h3>
            <p className="title">
              {this.person ? this.person.positionName || "" : ""}
            </p>
            <p>{this.person ? this.person.organizationName || "" : ""}</p>
          </Card>

          <Card
            className="narrow-layout large-section section-container"
            style={hasEmail || hasPhone ? {} : { display: "none" }}
          >
            <h1 style={{ fontWeight: "bold" }}>
              <FormattedMessage id={"myProfile.contactInformation"} />
            </h1>
            <div style={hasPhone ? {} : { display: "none" }}>
              <img
                alt={""}
                width={15}
                src={require("../../../resources/icons/contact/phone-alt-solid.svg")}
              />
              <span style={{ paddingLeft: 10 }}>
                {this.person ? this.person.phone || "" : ""}
              </span>
            </div>
            <div style={hasEmail ? {} : { display: "none" }}>
              <img
                alt={""}
                width={15}
                src={require("../../../resources/icons/contact/envelope-solid.svg")}
              />
              {this.person && this.person.email ? (
                <a
                  href={"mailto:" + this.person.email}
                  style={{ paddingLeft: 10 }}
                >
                  {this.person.email}
                </a>
              ) : (
                <></>
              )}
            </div>
          </Card>

          <Card
            className="narrow-layout large-section section-container"
            style={this.getLeftMenu().length > 0 ? {} : { display: "none" }}
          >
            <List>
              {this.getLeftMenu().map((menu: Menu) => (
                <List.Item
                  style={
                    this.selectedLeftMenu === menu.id
                      ? {
                          backgroundColor: "#bae7ff",
                          marginTop: "10px",
                          padding: "10px",
                          cursor: "pointer"
                        }
                      : {
                          marginTop: "10px",
                          padding: "10px",
                          cursor: "pointer"
                        }
                  }
                  key={menu.id}
                  onClick={() => {
                    this.selectedLeftMenu = menu.id;
                  }}
                >
                  <FormattedMessage id={menu.caption || menu.id} />
                </List.Item>
              ))}
            </List>
          </Card>
        </div>

        <div
          style={{
            float: "right",
            display: "block",
            height: "100%",
            width: "100%",
            overflow: "auto"
          }}
        >
          <div style={{ overflowY: "auto", height: "100%" }}>
            <Card className="narrow-layout large-section section-container">
              <Tabs
                defaultActiveKey={this.selectedTab}
                onChange={activeKey => {
                  this.selectedTab = activeKey;
                  this.selectedLeftMenu = this.getLeftMenu()[0].id;
                  // this.callSetSelectedTabOrLeftMenu();
                }}
              >
                {this.getTabs().map(tabInfo => (
                  <TabPane
                    tab={<FormattedMessage id={tabInfo.id} />}
                    key={tabInfo.id}
                  ></TabPane>
                ))}
              </Tabs>
              {this.renderContent()}
            </Card>
          </div>
        </div>
      </div>
    );
  }

  renderContent = () => {
    if (!this.person) return <></>;
    switch (this.selectedLeftMenu) {
      case "myProfile.mainData":
        return <PersonalData person={this.person} />;
      case "personalDataRequest":
        return (
          <PersonalDataRequestList personGroupId={this.props.personGroupId} />
        );
      case "personDocumentRequest":
        return (
          <PersonDocumentRequestList personGroupId={this.props.personGroupId} />
        );
      case "addressRequest":
        return <AddressRequestList personGroupId={this.props.personGroupId} />;
    }
    return <div>This is {this.selectedLeftMenu}</div>;
  };

  componentDidMount() {
    restServices.employeeService
      .personProfile(this.props.personGroupId)
      .then(value => {
        this.person = value;
        if (this.person && this.person.imageId)
          getCubaREST()!
            .getFile(this.person.imageId)
            .then((value: Blob) => (this.urlImg = URL.createObjectURL(value)));
      })
      .catch(() => {
        Notification.error({
          message: this.props.intl.formatMessage({
            id: "management.editor.error"
          })
        });
      });
  }
}

export default injectIntl(
  withLocalizedForm({
    onValuesChange: (props: any, changedValues: any) => {
      // Reset server-side errors when field is edited
      Object.keys(changedValues).forEach((fieldName: string) => {
        props.form.setFields({
          [fieldName]: {
            value: changedValues[fieldName]
          }
        });
      });
    }
  })(MyProfile)
);
