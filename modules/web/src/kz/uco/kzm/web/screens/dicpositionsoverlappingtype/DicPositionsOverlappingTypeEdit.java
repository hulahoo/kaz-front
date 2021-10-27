package kz.uco.kzm.web.screens.dicpositionsoverlappingtype;

import com.haulmont.cuba.gui.screen.*;
import kz.uco.kzm.entity.DicPositionsOverlappingType;

@UiController("kzm$DicPositionsOverlappingType.edit")
@UiDescriptor("dic-positions-overlapping-type-edit.xml")
@EditedEntityContainer("dicPositionsOverlappingTypeDc")
@LoadDataBeforeShow
public class DicPositionsOverlappingTypeEdit extends StandardEditor<DicPositionsOverlappingType> {
}