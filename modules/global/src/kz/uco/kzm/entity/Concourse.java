package kz.uco.kzm.entity;

import com.haulmont.chile.core.annotations.NamePattern;
import com.haulmont.cuba.core.entity.StandardEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Table(name = "KZM_CONCOURSE")
@Entity(name = "kzm_Concourse")
@NamePattern("%s|description")
public class Concourse extends StandardEntity {
    private static final long serialVersionUID = -1543102145338544138L;

    @NotNull
    @Column(name = "NAME_RU", nullable = false, length = 50)
    private String nameRu;

    @NotNull
    @Column(name = "NAME_EN", nullable = false, length = 50)
    private String nameEn;

    @NotNull
    @Lob
    @Column(name = "DESCRIPTION", nullable = false)
    private String description;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNameEn() {
        return nameEn;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public String getNameRu() {
        return nameRu;
    }

    public void setNameRu(String nameRu) {
        this.nameRu = nameRu;
    }
}