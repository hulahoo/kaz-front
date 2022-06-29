package kz.uco.kzm.web.screens.positionoverlappingrequest;

import com.haulmont.addon.bproc.web.processform.Outcome;
import com.haulmont.addon.bproc.web.processform.ProcessForm;
import com.haulmont.cuba.gui.components.Button;
import com.haulmont.cuba.gui.components.Form;
import com.haulmont.cuba.gui.model.InstanceContainer;
import com.haulmont.cuba.gui.screen.*;
import com.haulmont.cuba.security.global.UserSession;
import kz.uco.kzm.entity.PositionOverlappingRequest;
import kz.uco.tsadv.entity.bproc.AbstractBprocRequest;
import kz.uco.tsadv.global.common.CommonUtils;
import kz.uco.tsadv.modules.personal.model.AssignmentExt;
import kz.uco.tsadv.service.CommonReportsService;
import kz.uco.tsadv.service.EmployeeService;
import kz.uco.tsadv.web.abstraction.bproc.AbstractBprocEditor;

import javax.inject.Inject;

@UiController("kzm$PositionOverlappingRequest.edit")
@UiDescriptor("position-overlapping-request-edit.xml")
@EditedEntityContainer("positionOverlappingRequestDc")
@LoadDataBeforeShow
@ProcessForm(
        outcomes = {
                @Outcome(id = AbstractBprocRequest.OUTCOME_REVISION),
                @Outcome(id = AbstractBprocRequest.OUTCOME_APPROVE),
                @Outcome(id = AbstractBprocRequest.OUTCOME_REJECT),
                @Outcome(id = AbstractBprocRequest.OUTCOME_CANCEL)
        }
)
public class PositionOverlappingRequestEdit extends AbstractBprocEditor<PositionOverlappingRequest> {

        @Inject
        protected InstanceContainer<AssignmentExt> assignmentDc;
        @Inject
        protected EmployeeService employeeService;
        @Inject
        protected UserSession userSession;
        @Inject
        protected Form form;
        @Inject
        protected Button getReferenceBtn;
        @Inject
        protected CommonReportsService commonReportsService;

        @Override
        protected void initVariables() {
                super.initVariables();
           //     initAssignment();
        }

        protected void initAssignment() {
                AssignmentExt assignmentExt = employeeService
                        .getAssignmentExt(getEditedEntity().getPersonGroup().getId(), CommonUtils.getSystemDate(), "assignment.view");
                assignmentDc.setItem(assignmentExt);
        }

        @Override
        protected void initEditableFields() {
                super.initEditableFields();
                form.setEditable(isDraft());
        }

        @Subscribe("getReferenceBtn")
        protected void onGetReferenceBtnClick(Button.ClickEvent event) {
                closeWithCommit();
        }

}
