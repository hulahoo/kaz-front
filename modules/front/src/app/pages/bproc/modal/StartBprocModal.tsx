import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {inject, observer} from "mobx-react";
import React from "react";
import {NotPersisitBprocActors} from "../../../../cuba/entities/base/tsadv_NotPersisitBprocActors";
import {observable} from "mobx";
import {Modal, Table} from "antd";
import Column from "antd/lib/table/Column";
import LoadingPage from "../../LoadingPage";
import {restServices} from "../../../../cuba/services";
import {RootStoreProp} from "../../../store";
import {BpmRolesDefiner} from "../../../../cuba/entities/base/tsadv$BpmRolesDefiner";
import {Candidate} from "../component/Candidate";
import {UserExt} from "../../../../cuba/entities/base/tsadv$UserExt";
import Button, {ButtonType} from "../../../components/Button/Button";
import {DataInstanceStore} from "@cuba-platform/react/dist/data/Instance";
import {AbstractBprocRequest} from "../../../../cuba/entities/base/AbstractBprocRequest";

type StartBproc = {
  processDefinitionKey: string;
  employee: UserExt | null;
  validate(): void;
  update(): void;
  isValidatedSuccess: boolean;
  dataInstance: DataInstanceStore<AbstractBprocRequest>;
}

@inject("rootStore")
@injectMainStore
@observer
export class StartBprocModal extends React.Component<StartBproc & MainStoreInjected & RootStoreProp> {

  state = {modalVisible: false};

  @observable
  mainStore = this.props.mainStore!;

  showModal = () => {

    this.props.validate();

    if (this.props.isValidatedSuccess) {

      // if (this.props.children.updated === true)
      this.setState({
        modalVisible: true,
      });
    }
  };

  handleOk = (e: any) => {

    this.props.update();

    restServices.startBprocService.saveBprocActors({
      entityId: this.props.dataInstance.item!.id,
      notPersisitBprocActors: this.items
    })
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = (e: any) => {
    this.setState({
      modalVisible: false,
    });
  };

  @observable
  items: NotPersisitBprocActors[];

  @observable
  bprocRolesDefiner: BpmRolesDefiner | null;

  render() {
    if (!this.bprocRolesDefiner || !this.items) return <LoadingPage/>;
    return (
      <Button buttonType={ButtonType.FOLLOW}
              onClickCapture={this.showModal}
              key="start">
        Start
        <Modal
          title="Start bproc"
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <Table dataSource={Array.from(this.items)}
                 pagination={false}
                 rowKey={record => record.id}>
            <Column key='role' render={(text, record) => (record as NotPersisitBprocActors).hrRole!.langValue1}/>
            <Column key='candidates' render={(text, record) => (
              <Candidate candidates={((record as NotPersisitBprocActors).users as UserExt[] | null)}/>)}/>
          </Table>
        </Modal>
      </Button>
    )
  }

  componentDidMount() {
    restServices.startBprocService.getBpmRolesDefiner({
      processDefinitionKey: this.props.processDefinitionKey,
      initiatorPersonGroupId: this.props.rootStore!.userInfo.personGroupId!
    })
      .then(value => {
        this.bprocRolesDefiner = value;
        restServices.startBprocService.getNotPersisitBprocActors({
          employee: this.props.employee,
          initiatorPersonGroupId: this.props.rootStore!.userInfo.personGroupId!,
          bpmRolesDefiner: value
        })
          .then(notPersisitBprocActors => {
            this.items = notPersisitBprocActors;
          })
      })
  }
}