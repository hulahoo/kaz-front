import * as React from "react";
import { observer } from "mobx-react";

import { observable } from "mobx";

import {  Tabs } from "antd";

import {
    collection,
    injectMainStore,
    MainStoreInjected,
    DataTable
} from "@cuba-platform/react";

import { ScheduleOffsetsRequest } from "../../../cuba/entities/base/tsadv_ScheduleOffsetsRequest";
import {
    injectIntl,
    WrappedComponentProps
} from "react-intl";
import Page from "../../hoc/PageContentHoc";
import { AssignmentSchedule } from "../../../cuba/entities/base/tsadv$AssignmentSchedule";
import { formatDefaultDateFromString } from "../../util/Date/Date";

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

    columnIndex = 0;
    currentRowIndex = 0;


    reqColumnIndex = 0;
    reqCurrentRowIndex = 0;
    

    renderAssignTable = (text: string, record: AssignmentSchedule, index: number) => {
        if (this.currentRowIndex != index) {
            this.currentRowIndex = index;
            this.columnIndex = 0;
        }
        this.columnIndex++
        if (this.columnIndex === 2 || this.columnIndex === 3) {
            return formatDefaultDateFromString(text);
        } 
        return text;
    }

    renderRequestTable = (text: string, record: AssignmentSchedule, index: number) => {
        if (this.reqCurrentRowIndex != index) {
            this.reqCurrentRowIndex = index;
            this.reqColumnIndex = 0;
        }
        this.reqColumnIndex++
        if (this.reqColumnIndex === 3 || this.reqColumnIndex === 9 || this.reqColumnIndex === 10 ) {
            return formatDefaultDateFromString(text);
        }
        return text;
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
                            columnProps={
                                {
                                    render: this.renderAssignTable
                                }
                            }
                        />
                    </Page>
                </TabPane>
                <TabPane key="2" tab={"Заявки на смещение графика"}>
                    <Page>
                        <DataTable
                            dataCollection={this.requestsDataCollection}
                            fields={this.requestFields}
                            hideSelectionColumn={true}
                            columnProps={
                                {
                                    render: this.renderRequestTable
                                }
                            }
                        />
                    </Page>
                </TabPane>
            </Tabs>
        );
    }

}

const ShiftSchedulesList = injectIntl(ShiftSchedulesComponent);

export default ShiftSchedulesList;
