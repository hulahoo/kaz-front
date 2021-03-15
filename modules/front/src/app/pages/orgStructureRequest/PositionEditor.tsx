import {injectMainStore, MainStoreInjected, MultilineText} from "@cuba-platform/react";
import {inject, observer} from "mobx-react";
import React from "react";
import {IReactionDisposer, observable, toJS} from "mobx";
import {Alert, Form, Input, InputNumber, message, Modal, Select} from "antd";
import {RootStoreProp} from "../../store";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {FormComponentProps} from "antd/lib/form";
import {OrgRequestGrade, OrgRequestRow} from "./OrgStructureRequestEdit";
import {restServices} from "../../../cuba/services";
import Notification from "../../util/Notification/Notification";

export class PositionSaveModel {
  rId: string;
  rdId: string | null;
  nameRu: string;
  nameEn: string;
  positionGroupId: string | null;
  parentOrganizationGroupId: string | null;
  gradeGroupId: string | null;
  headCount: number | 0;
  parentRdId: string | null
}

export interface EditorProps {
  row: OrgRequestRow | null,
  treeData: OrgRequestRow[],
  isNew: boolean,
  closeModal: () => void,
  onSave: (rdId: string) => void
}

type Props = FormComponentProps & EditorProps;

@inject("rootStore")
@injectMainStore
@observer
class PositionEditor extends React.Component<Props & MainStoreInjected & RootStoreProp & WrappedComponentProps & RouteComponentProps> {

  @observable
  globalErrors: string[] = [];

  organizations: any[] = [];

  @observable
  grades: OrgRequestGrade[] = [];

  @observable
  mainStore = this.props.mainStore!;

  reactionDisposer: IReactionDisposer;

  fields = ["id", "rId", "gradeGroupId", "positionGroupId", "parentId", "nameRu", "nameEn", "headCount"];

  save = (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(
          this.props.intl.formatMessage({
            id: "management.editor.validationError"
          })
        );
        return;
      }

      let formData = this.props.form.getFieldsValue(this.fields);
      console.log(formData);

      let posSaveModel = new PositionSaveModel();
      posSaveModel.rId = formData.rId;
      posSaveModel.rdId = formData.id;
      posSaveModel.nameRu = formData.nameRu;
      posSaveModel.nameEn = formData.nameEn;
      posSaveModel.positionGroupId = formData.positionGroupId;
      posSaveModel.gradeGroupId = formData.gradeGroupId;
      posSaveModel.headCount = formData.headCount;

      let pId = formData.parentId;
      if (pId !== undefined && pId !== null) {
        let foundOrg = this.organizations.find(o => o.id === pId);
        console.log('foundOrg: ', foundOrg)

        if (foundOrg !== undefined) {
          posSaveModel.parentOrganizationGroupId = foundOrg.orgGroupId;
          posSaveModel.parentRdId = foundOrg.rdId;
        }
      }

      console.log('posSaveModel: ', posSaveModel)

      restServices.orgStructureService.savePosition({
        positionRequestSaveModel: posSaveModel
      }).then(rdId => {
        this.props.onSave(rdId);
      }).catch(async (response: any) => {
        const reader = response.response.body.getReader();
        let receivedLength = 0;
        let chunks = [];
        while (true) {
          const {done, value} = await reader.read();
          if (done) break;
          chunks.push(value);
          receivedLength += value.length;
        }

        let chunksAll = new Uint8Array(receivedLength);
        let position = 0;
        for (let chunk of chunks) {
          chunksAll.set(chunk, position);
          position += chunk.length;
        }

        let result = new TextDecoder("utf-8").decode(chunksAll);
        const parse = JSON.parse(result);
        Notification.error({message: parse.message});
      });
    });
  }

  close = (e: React.MouseEvent) => {
    this.props.closeModal();
  }

  fillOrganizations = (tree: OrgRequestRow[]) => {
    tree.forEach(v => {
      if (v.elementType == 1) {
        this.organizations.push({
          id: v.rdId || v.orgGroupId,
          rdId: v.rdId,
          orgGroupId: v.orgGroupId,
          name: v.nameRu[0]
        });
        if (v.children && v.children.length > 0) {
          this.fillOrganizations(v.children);
        }
      }
    });
  }

  fillGrades = () => {
    restServices.orgStructureService.getGrades().then(grades => {
      this.grades = grades;
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Modal
        title="Редактирование позиции"
        visible={true}
        onOk={this.save}
        onCancel={this.close}>
        <Form>
          {getFieldDecorator('id')(<Input type="hidden"/>)}
          {getFieldDecorator('rId')(<Input type="hidden"/>)}
          {getFieldDecorator('positionGroupId')(<Input type="hidden"/>)}

          <Form.Item label="Родительская организация" key="parentId">
            {getFieldDecorator('parentId', {
              rules: [{
                required: true,
                message: "Заполните поле \"Родительская организация\""
              }]
            })(
              <Select style={{width: '100%'}}>
                {this.organizations && this.organizations.length > 0 ? this.organizations.map((o: any) =>
                    <Select.Option key={o.id}>{o.name}</Select.Option>)
                  : <Select.Option key="empty"/>
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Наименование на рус." key="nameRu">
            {getFieldDecorator('nameRu', {
              rules: [{
                required: true,
                message: "Заполните поле \"Наименование на рус.\""
              }]
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="Наименование на англ." key="nameEn">
            {getFieldDecorator('nameEn', {
              rules: [{
                required: true,
                message: "Заполните поле \"Наименование на англ.\""
              }]
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="Грейд" key="gradeGroupId">
            {getFieldDecorator('gradeGroupId', {
              rules: [{
                required: true,
                message: "Заполните поле \"Грейд\""
              }]
            })(
              <Select style={{width: '100%'}}>
                {this.grades && this.grades.length > 0 ? this.grades.map((o: any) =>
                    <Select.Option key={o.groupId}>{o.name}</Select.Option>)
                  : <Select.Option key="empty"/>
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Численность" key="headCount">
            {getFieldDecorator('headCount', {
              rules: [{
                required: true,
                message: "Заполните поле \"Численность\""
              }]
            })(
              <InputNumber/>
            )}
          </Form.Item>

          {this.globalErrors.length > 0 && (
            <Alert
              message={<MultilineText lines={toJS(this.globalErrors)}/>}
              type="error"
              style={{marginBottom: "24px"}}
            />
          )}
        </Form>
      </Modal>
    )
  }

  componentDidMount() {
    console.log('componentDidMount:', this.props.row);

    let row = this.props.row;
    this.fillOrganizations(this.props.treeData)
    this.fillGrades();

    console.log('organizations: ', this.organizations)
    console.log('grades: ', this.grades)

    let model = {}, isNew = this.props.isNew;

    if (row !== undefined && row !== null) {
      model['rId'] = row.rId;

      if (isNew) {
        model['parentId'] = row.rdId || row.orgGroupId;
      } else {
        model['id'] = row.rdId;
        model['nameRu'] = row.nameRu[1];
        model['nameEn'] = row.nameEn[1];

        model['parentId'] = row.pRdId || row.pOrgGroupId;

        model['positionGroupId'] = row.posGroupId;
        model['parentOrganizationGroupId'] = row.pOrgGroupId;
        model['gradeGroupId'] = row.gradeGroupId;
        model['headCount'] = row.headCount[1];
      }
    }
    this.props.form.setFieldsValue(model);
  }
}

export default withRouter(injectIntl(PositionEditor));