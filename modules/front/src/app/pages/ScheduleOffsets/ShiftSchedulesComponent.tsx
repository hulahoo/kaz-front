import * as React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import { observable } from "mobx";

import { Modal, Button, Tabs } from "antd";

import {
    collection,
    injectMainStore,
    MainStoreInjected,
    DataTable
} from "@cuba-platform/react";

import { ScheduleOffsetsRequest } from "../../../cuba/entities/base/tsadv_ScheduleOffsetsRequest";
import { SerializedEntity } from "@cuba-platform/rest";
import { ScheduleOffsetsRequestManagement } from "./ScheduleOffsetsRequestManagement";
import {
    FormattedMessage,
    injectIntl,
    WrappedComponentProps
} from "react-intl";
import Page from "../../hoc/PageContentHoc";
import { AssignmentSchedule } from "../../../cuba/entities/base/tsadv$AssignmentSchedule";



type ObvserverProps = {
    personGroupId: string;
};



@injectMainStore
@observer
class ShiftSchedulesComponent extends React.Component<MainStoreInjected & WrappedComponentProps & ObvserverProps> {

    requestsDataCollection = collection<ScheduleOffsetsRequest>(
        ScheduleOffsetsRequest.NAME,
        this.props.personGroupId === undefined ? {
            view: "scheduleOffsetsRequest-for-my-team",
            sort: "-updateTs",
        } : {
            view: "scheduleOffsetsRequest-for-my-team",
            sort: "-updateTs",
            filter: {
                conditions: [
                    {
                        property: "personGroup.id",
                        operator: "=",
                        value: this.props.personGroupId!
                    }
                ]
            }
        }
    );


    assignmentsDataCollection = collection<AssignmentSchedule>(
        AssignmentSchedule.NAME,
        {
            view: "assignmentSchedule-for-my-team",
            sort: "-updateTs",
            // filter:{
            //     conditions:[

            //     ]
            // }
        }
    );

    requestFields = [
        "requestNumber",
        "status",
        "requestDate",
        "comment",
        "purpose",
        "purposeText",
        "currentSchedule",
        "newSchedule",
        "dateOfNewSchedule",
        "dateOfStartNewSchedule",
        "detailsOfActualWork",
        "agree",
        "acquainted",
    ];

    assignmentFields = [
        "schedule",
        "startDate",
        "endDate",
    ];

    @observable activeTabKey = "1";


    componentDidMount() {
        this.requestsDataCollection.load();
    }

    render() {
        const { TabPane } = Tabs;

        return (
            <Tabs activeKey={this.activeTabKey} onChange={(c) => { this.activeTabKey = c; }}>
                <TabPane key="1" tab={"Текущий график"} >
                    <Page>
                        <DataTable
                            dataCollection={this.assignmentsDataCollection}
                            fields={this.assignmentFields}
                            hideSelectionColumn={true}
                        />
                    </Page>
                </TabPane>
                <TabPane key="2" tab={"Заявки на смещение графика"}>
                    <Page>
                        <DataTable
                            dataCollection={this.requestsDataCollection}
                            fields={this.requestFields}
                            hideSelectionColumn={true}
                        />
                    </Page>
                </TabPane>
            </Tabs>
        );
    }


}

const ShiftSchedulesList = injectIntl(ShiftSchedulesComponent);

export default ShiftSchedulesList;
