import {injectMainStore, instance, MainStoreInjected, MultilineText} from "@cuba-platform/react";
import {inject, observer} from "mobx-react";
import React from "react";
import {IReactionDisposer, observable, toJS} from "mobx";
import {Alert, Form, Input, message, Modal, Select} from "antd";
import {RootStoreProp} from "../../store";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {OrgStructureRequest} from "../../../cuba/entities/base/tsadv_OrgStructureRequest";
import {OrgStructureRequestDetail} from "../../../cuba/entities/base/tsadv_OrgStructureRequestDetail";
import {FormComponentProps} from "antd/lib/form";
import {OrgRequestRow} from "./OrgStructureRequestEdit";
import {restServices} from "../../../cuba/services";
import Notification from "../../util/Notification/Notification";

export class OrganizationSaveModel {
  rId: string;
  rdId: string | null;
  nameRu: string;
  nameEn: string;
  organizationGroupId: string | null;
  parentOrganizationGroupId: string | null;
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
class OrganizationEditor extends React.Component<Props & MainStoreInjected & RootStoreProp & WrappedComponentProps & RouteComponentProps> {

  dataInstance = instance<OrgStructureRequest>(OrgStructureRequestDetail.NAME, {
    view: "_base",
    loadImmediately: false
  });

  @observable
  globalErrors: string[] = [];

  organizations: any[] = [];

  @observable
  mainStore = this.props.mainStore!;

  reactionDisposer: IReactionDisposer;

  fields = ["id", "rId", "parentId", "nameRu", "nameEn"];

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

      let orgSaveModel = new OrganizationSaveModel();
      orgSaveModel.rId = formData.rId;
      orgSaveModel.rdId = formData.id;
      orgSaveModel.nameRu = formData.nameRu;
      orgSaveModel.nameEn = formData.nameEn;
      orgSaveModel.organizationGroupId = formData.organizationGroupId;

      let pId = formData.parentId;
      if (pId !== undefined && pId !== null) {
        let foundOrg = this.organizations.find(o => o.id === pId);
        console.log('foundOrg: ', foundOrg)

        if (foundOrg !== undefined) {
          orgSaveModel.parentOrganizationGroupId = foundOrg.orgGroupId;
          orgSaveModel.parentRdId = foundOrg.rdId;
        }
      }

      console.log('orgSaveModel: ', orgSaveModel)

      restServices.orgStructureService.saveOrganization({
        organizationRequestSaveModel: orgSaveModel
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

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <Modal
        title="Редактирование организации"
        visible={true}
        onOk={this.save}
        onCancel={this.close}>
        <Form>
          {getFieldDecorator('id')(<Input type="hidden"/>)}
          {getFieldDecorator('organizationGroupId')(<Input type="hidden"/>)}
          {getFieldDecorator('rId')(<Input type="hidden"/>)}

          {!this.props.row!.root ?
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
            </Form.Item> : null}

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

    console.log('organizations: ', this.organizations)

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
        model['organizationGroupId'] = row.orgGroupId;
        model['parentOrganizationGroupId'] = row.pOrgGroupId;
      }
    }
    this.props.form.setFieldsValue(model);
  }
}

export default withRouter(injectIntl(OrganizationEditor));