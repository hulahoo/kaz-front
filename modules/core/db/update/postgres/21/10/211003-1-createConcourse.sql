create table KZM_CONCOURSE (
    ID uuid,
    VERSION integer not null,
    CREATE_TS timestamp,
    CREATED_BY varchar(50),
    UPDATE_TS timestamp,
    UPDATED_BY varchar(50),
    DELETE_TS timestamp,
    DELETED_BY varchar(50),
    --
    NAME_RU varchar(50) not null,
    START_VOTING timestamp not null,
    END_VOTING timestamp not null,
    YEAR_ varchar(255) not null,
    BANNER_ID uuid not null,
    REQUEST_TEMPLATE_ID uuid not null,
    JUDGE_INSTRUCTION text not null,
    CATEGORY varchar(50) not null,
    STATUS varchar(50) not null,
    NAME_EN varchar(50) not null,
    DESCRIPTION text not null,
    --
    primary key (ID)
);