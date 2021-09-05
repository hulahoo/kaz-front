package kz.uco.kzm.listener;


import com.haulmont.cuba.core.global.DataManager;
import com.haulmont.cuba.core.global.PersistenceHelper;
import com.haulmont.cuba.core.global.View;
import kz.uco.mobile.service.FirebasePushNotificationService;
import kz.uco.tsadv.listener.ExtActivityListener;
import kz.uco.uactivity.entity.Activity;
import kz.uco.uactivity.entity.ActivityType;
import kz.uco.uactivity.entity.WindowProperty;

import javax.inject.Inject;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class ExtActivityListenerKzm extends ExtActivityListener {
    @Inject
    protected FirebasePushNotificationService firebasePushNotificationService;
    @Inject
    protected DataManager dataManager;

    @Override
    public void onAfterInsert(Activity entity, Connection connection) {
        Map<String, String> data = new HashMap<String, String>() {
            {
                put("click_action", "FLUTTER_NOTIFICATION_CLICK");
                put("entityName", entity.getName());
                put("entityId", String.valueOf(entity.getId()));
                put("referenceId", String.valueOf(entity.getReferenceId()));
                ActivityType type = entity.getType();
                if (type != null
                        && (!PersistenceHelper.isLoaded(type, "windowProperty")
                        || type.getWindowProperty() != null
                        && !PersistenceHelper.isLoaded(type.getWindowProperty(), "entityName"))) {
                    type = dataManager.reload(type, new View(ActivityType.class)
                            .addProperty("windowProperty", new View(WindowProperty.class).addProperty("entityName")));
                }
                put("windowPropertyName", Optional.ofNullable(type)
                        .map(ActivityType::getWindowProperty)
                        .map(WindowProperty::getEntityName).orElse(null));
            }
        };

        firebasePushNotificationService.sendNotificationWithDataToUser(entity.getNotificationHeader(), "", data, entity.getAssignedUser());
        super.onAfterInsert(entity, connection);
    }
}
