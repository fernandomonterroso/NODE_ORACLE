SELECT
    sab_gene_mend_favs.mend_id,
    sab_gene_mend.mend_ico,
    sab_gene_mend.mend_enlace,
    sab_gene_mend.mend_nombre,
    sab_gene_mend_favs.favs_user
FROM
         sab.sab_gene_mend
    INNER JOIN sab.sab_gene_mend_favs ON sab_gene_mend.mend_id = sab_gene_mend_favs.mend_id
    where FAVS_USER=:userbd