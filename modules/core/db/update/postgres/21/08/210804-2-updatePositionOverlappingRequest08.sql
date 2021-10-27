alter table KZM_POSITION_OVERLAPPING_REQUEST rename column work_completion_date to work_completion_date__u30965 ;
alter table KZM_POSITION_OVERLAPPING_REQUEST rename column department_id to department_id__u63366 ;
alter table KZM_POSITION_OVERLAPPING_REQUEST alter column department_id__u63366 drop not null ;
alter table KZM_POSITION_OVERLAPPING_REQUEST drop constraint FK_KZM_POSITION_OVERLAPPING_REQUEST_ON_DEPARTMENT ;
drop index IDX_KZM_POSITION_OVERLAPPING_REQUEST_ON_DEPARTMENT ;
alter table KZM_POSITION_OVERLAPPING_REQUEST add column WORK_COMPLETION_DATE date ;
