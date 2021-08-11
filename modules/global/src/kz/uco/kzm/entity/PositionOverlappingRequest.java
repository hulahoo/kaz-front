package kz.uco.kzm.entity;


import com.haulmont.chile.core.annotations.NamePattern;
import com.haulmont.cuba.core.entity.FileDescriptor;
import com.haulmont.cuba.core.entity.annotation.Lookup;
import com.haulmont.cuba.core.entity.annotation.LookupType;
import kz.uco.base.entity.shared.OrganizationGroup;
import kz.uco.base.entity.shared.PersonGroup;
import kz.uco.base.entity.shared.PositionGroup;
import kz.uco.tsadv.entity.bproc.AbstractBprocRequest;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Table(name = "KZM_POSITION_OVERLAPPING_REQUEST")
@Entity(name = "kzm$PositionOverlappingRequest")
@NamePattern("%s|requestNumber")
public class PositionOverlappingRequest extends AbstractBprocRequest {
    private static final long serialVersionUID = -4680709725704873203L;

    @Lookup(type = LookupType.SCREEN, actions = "lookup")
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "PERSON_GROUP_ID")
    private PersonGroup personGroup;

    @Column(name = "WORK_COMPLETION_DATE")
    private Date workCompletionDate;

    @Column(name = "JUSTIFICATION", length = 2500)
    private String justification;

    @Lookup(type = LookupType.SCREEN, actions = "lookup")
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "POSITION_ID")
    private PositionGroup positionGroup;

    @Lookup(type = LookupType.SCREEN, actions = "lookup")
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "DEPARTMENT_ID")
    private OrganizationGroup department;

    @Lookup(type = LookupType.DROPDOWN, actions = "lookup")
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "TYPE_ID")
    private DicPositionsOverlappingType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ATTACHMENT_ID")
    private FileDescriptor attachment;

    public String getJustification() {
        return justification;
    }

    public void setJustification(String justification) {
        this.justification = justification;
    }

    public Date getWorkCompletionDate() {
        return workCompletionDate;
    }

    public void setWorkCompletionDate(Date workCompletionDate) {
        this.workCompletionDate = workCompletionDate;
    }

    public PositionGroup getPositionGroup() {
        return positionGroup;
    }

    public void setPositionGroup(PositionGroup positionGroup) {
        this.positionGroup = positionGroup;
    }

    public OrganizationGroup getDepartment() {
        return department;
    }

    public void setDepartment(OrganizationGroup department) {
        this.department = department;
    }

    public PersonGroup getPersonGroup() {
        return personGroup;
    }

    public void setPersonGroup(PersonGroup personGroup) {
        this.personGroup = personGroup;
    }

    public DicPositionsOverlappingType getType() {
        return type;
    }

    public void setType(DicPositionsOverlappingType type) {
        this.type = type;
    }

    public FileDescriptor getAttachment() {
        return attachment;
    }

    public void setAttachment(FileDescriptor attachment) {
        this.attachment = attachment;
    }

    @Override
    public String getProcessDefinitionKey() {
        return "positionOverlappingRequest";
    }
}