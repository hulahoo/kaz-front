alter table KZM_POSITION_OVERLAPPING_REQUEST rename column position_id to position_id__u54158 ;
alter table KZM_POSITION_OVERLAPPING_REQUEST alter column position_id__u54158 drop not null ;
alter table KZM_POSITION_OVERLAPPING_REQUEST drop constraint FK_KZM_POSITION_OVERLAPPING_REQUEST_ON_POSITION ;
drop index IDX_KZM_POSITION_OVERLAPPING_REQUEST_ON_POSITION ;
-- alter table KZM_POSITION_OVERLAPPING_REQUEST add column TYPE_ID uuid ^
-- update KZM_POSITION_OVERLAPPING_REQUEST set TYPE_ID = <default_value> ;
-- alter table KZM_POSITION_OVERLAPPING_REQUEST alter column TYPE_ID set not null ;
alter table KZM_POSITION_OVERLAPPING_REQUEST add column TYPE_ID uuid not null ;
alter table KZM_POSITION_OVERLAPPING_REQUEST add column FILE_ID uuid ;
-- alter table KZM_POSITION_OVERLAPPING_REQUEST add column PERSON_GROUP_ID uuid ^
-- update KZM_POSITION_OVERLAPPING_REQUEST set PERSON_GROUP_ID = <default_value> ;
-- alter table KZM_POSITION_OVERLAPPING_REQUEST alter column PERSON_GROUP_ID set not null ;
alter table KZM_POSITION_OVERLAPPING_REQUEST add column PERSON_GROUP_ID uuid not null ;
