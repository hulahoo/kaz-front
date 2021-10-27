create table KZM_POSITION_OVERLAPPING_REQUEST (
    ID uuid,
    VERSION integer not null,
    CREATE_TS timestamp,
    CREATED_BY varchar(50),
    UPDATE_TS timestamp,
    UPDATED_BY varchar(50),
    DELETE_TS timestamp,
    DELETED_BY varchar(50),
    LEGACY_ID varchar(255),
    ORGANIZATION_BIN varchar(255),
    INTEGRATION_USER_LOGIN varchar(255),
    REQUEST_NUMBER bigint not null,
    STATUS_ID uuid not null,
    REQUEST_DATE date not null,
    COMMENT_ varchar(3000),
    --
    position_id uuid not null,
    department_id uuid not null,
    --
    primary key (ID)
);