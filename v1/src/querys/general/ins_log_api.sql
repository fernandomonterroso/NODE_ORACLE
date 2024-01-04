INSERT INTO sab.sab_apis_log (
    sys_id,
    ENDPOINT,
    user_system,
    user_bd,
    success,
    http_status,
    time,
    method,
    ip,
    REQUEST_SIZE,
    RESPONSE_SIZE,
    status_code
) VALUES (
    :sysId,
    :endpoint,
    :userSystem,
    :userBD,
    :success,
    :httpStatus,
    :time,
    :method,
    :ip,
    :requestSize,
    :responseSize,
    :status_code
)