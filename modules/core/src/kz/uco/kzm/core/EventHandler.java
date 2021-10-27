package kz.uco.kzm.core;

import com.haulmont.cuba.core.EntityManager;
import com.haulmont.cuba.core.Persistence;
import com.haulmont.cuba.core.TypedQuery;
import com.haulmont.cuba.core.global.Metadata;
import com.haulmont.cuba.security.app.Authenticated;
import kz.uco.base.ApplicationStartEvent;
import kz.uco.uactivity.entity.ActivityType;
import kz.uco.uactivity.entity.WindowProperty;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import javax.inject.Inject;

@Component(EventHandler.NAME)
public class EventHandler {
    public static final String NAME = "kzm_EventHandler";


    @Inject
    protected Metadata metadata;

    @Inject
    protected Persistence persistence;

    @SuppressWarnings("NullableProblems")
    @Authenticated
    @EventListener(ApplicationStartEvent.class)
    public void onApplicationStart() {
        persistence.callInTransaction(this::fillActivityType);
    }

    public Object fillActivityType(EntityManager em) {
        if (getCount(em, "POSITION_OVERLAPPING_REQUEST_APPROVE") == 0) {
            ActivityType activityType = metadata.create(ActivityType.class);
            activityType.setCode("POSITION_OVERLAPPING_REQUEST_APPROVE");
            activityType.setScreen("kzm$PositionOverlappingRequest.edit");
            activityType.setLangValue1("Утверждение / отклонение заявление на совмещении позиции");
            activityType.setLangValue2("Бекіту / қабылдамау позицияны біріктіруге өтініш");
            activityType.setLangValue3("Approval / rejection of an application for position overlapping request");
            WindowProperty windowProperty = metadata.create(WindowProperty.class);
            windowProperty.setEntityName("kzm$PositionOverlappingRequest");
            windowProperty.setScreenName("kzm$PositionOverlappingRequest.edit");
            windowProperty.setViewName("positionOverlappingRequest-view");
            activityType.setWindowProperty(windowProperty);
            em.persist(windowProperty);
            em.persist(activityType);
        }
        return em;
    }

    protected Long getCount(EntityManager em, String code) {
        TypedQuery<Long> query = em.createQuery("select count(e) from uactivity$ActivityType e" +
                " where e.code = :code", Long.class);
        query.setParameter("code", code);
        return query.getSingleResult();
    }
}