SELECT
    turno_id,
    turno_cantidad,
    turno_desc,
    turno_inicio,
    turno_fin,
    comid,
    turno_dayini,
    turno_dayfin
FROM
    sab.sab_gene_frm_vistu_turno
    where turno_id=:turno_id