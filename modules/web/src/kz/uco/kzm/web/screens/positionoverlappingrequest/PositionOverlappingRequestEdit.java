package kz.uco.kzm.web.screens.positionoverlappingrequest;

import com.haulmont.addon.bproc.web.processform.Outcome;
import com.haulmont.addon.bproc.web.processform.ProcessForm;
import com.haulmont.cuba.gui.components.Button;
import com.haulmont.cuba.gui.screen.*;
import kz.uco.kzm.entity.PositionOverlappingRequest;
import kz.uco.tsadv.entity.bproc.AbstractBprocRequest;
import kz.uco.tsadv.modules.personal.dictionary.DicReceivingType;
import kz.uco.tsadv.modules.personal.model.CertificateRequest;
import kz.uco.tsadv.modules.personal.model.PersonalDataRequest;
import kz.uco.tsadv.web.abstraction.bproc.AbstractBprocEditor;
import kz.uco.tsadv.web.addressrequest.AddressRequestEdit;
import kz.uco.tsadv.web.screens.certificaterequest.CertificateRequestEdit;
import kz.uco.tsadv.web.screens.personaldatarequest.PersonalDataRequestEdit;

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


}