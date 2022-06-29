package kz.uco.kzm.web.screens.dicpositionsoverlappingtype;

import com.haulmont.cuba.gui.screen.*;
import kz.uco.kzm.entity.DicPositionsOverlappingType;

@UiController("kzm$DicPositionsOverlappingType.browse")
@UiDescriptor("dic-positions-overlapping-type-browse.xml")
@LookupComponent("dicPositionsOverlappingTypesTable")
@LoadDataBeforeShow
public class DicPositionsOverlappingTypeBrowse extends StandardLookup<DicPositionsOverlappingType> {
}