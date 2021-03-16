package kz.uco.kzm.listener;


import com.haulmont.cuba.core.global.AppBeans;
import com.haulmont.cuba.core.global.Events;
import kz.uco.base.events.NotificationRefreshEvent;
import kz.uco.mobile.service.FirebasePushNotificationService;
import kz.uco.tsadv.listener.ExtActivityListener;
import kz.uco.uactivity.entity.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.support.TransactionSynchronizationAdapter;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.sql.Connection;

public class ExtActivityListenerKzm extends ExtActivityListener {
    @Autowired
    FirebasePushNotificationService firebasePushNotificationService;

    @Override
    public void onAfterDelete(Activity entity, Connection connection) {
        publishNotificationRefreshEvent(entity);
    }

    @Override
    public void onAfterInsert(Activity entity, Connection connection) {
        firebasePushNotificationService.sendNotificationToUser("Новые уведомление", "123", entity.getAssignedUser());
        publishNotificationRefreshEvent(entity);
    }

    @Override
    public void onAfterUpdate(Activity entity, Connection connection) {
        publishNotificationRefreshEvent(entity);
    }

    protected void publishNotificationRefreshEvent(Activity activity) {
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronizationAdapter() {
            @Override
            public void afterCommit() {
                ((Events) AppBeans.get("cuba_Events")).publish(new NotificationRefreshEvent(activity.getAssignedUser().getId()));
            }
        });
    }
}
