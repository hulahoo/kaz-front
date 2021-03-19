package kz.uco.kzm.listener;


import kz.uco.mobile.service.FirebasePushNotificationService;
import kz.uco.tsadv.listener.ExtActivityListener;
import kz.uco.uactivity.entity.Activity;
import kz.uco.uactivity.entity.ActivityType;
import kz.uco.uactivity.entity.WindowProperty;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class ExtActivityListenerKzm extends ExtActivityListener {
    @Autowired
    protected FirebasePushNotificationService firebasePushNotificationService;

    @Override
    public void onAfterInsert(Activity entity, Connection connection) {
        Map<String, String> data = new HashMap<String, String>() {
            {
                put("click_action", "FLUTTER_NOTIFICATION_CLICK");
                put("entityName", entity.getName());
                put("entityId", String.valueOf(entity.getId()));
                put("referenceId", String.valueOf(entity.getReferenceId()));
                put("windowPropertyName", Optional.ofNullable(entity.getType()).map(ActivityType::getWindowProperty).map(WindowProperty::getEntityName).orElse(null));
            }
        };

        firebasePushNotificationService.sendNotificationWithDataToUser(entity.getNotificationHeader(), "", data, entity.getAssignedUser());
        super.onAfterInsert(entity, connection);
    }
}
