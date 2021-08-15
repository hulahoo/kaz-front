package kz.uco.kzm.entity;

import kz.uco.base.entity.abstraction.AbstractDictionary;

import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "KZM_DIC_POSITIONS_OVERLAPPING_TYPE")
@Entity(name = "kzm$DicPositionsOverlappingType")
public class DicPositionsOverlappingType extends AbstractDictionary {
    private static final long serialVersionUID = -3823753137891590281L;
}