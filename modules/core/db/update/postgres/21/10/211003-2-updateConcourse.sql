alter table KZM_CONCOURSE rename column status to status__u91055 ;
alter table KZM_CONCOURSE alter column status__u91055 drop not null ;
alter table KZM_CONCOURSE rename column category to category__u25385 ;
alter table KZM_CONCOURSE alter column category__u25385 drop not null ;
