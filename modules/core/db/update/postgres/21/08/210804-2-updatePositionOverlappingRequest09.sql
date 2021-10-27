alter table KZM_POSITION_OVERLAPPING_REQUEST rename column work_completion_date to work_completion_date__u85033 ;
-- alter table KZM_POSITION_OVERLAPPING_REQUEST add column DEPARTMENT_ID uuid ^
-- update KZM_POSITION_OVERLAPPING_REQUEST set DEPARTMENT_ID = <default_value> ;
-- alter table KZM_POSITION_OVERLAPPING_REQUEST alter column DEPARTMENT_ID set not null ;
alter table KZM_POSITION_OVERLAPPING_REQUEST add column DEPARTMENT_ID uuid not null ;
alter table KZM_POSITION_OVERLAPPING_REQUEST add column WORK_COMPLETION_DATE timestamp ;
