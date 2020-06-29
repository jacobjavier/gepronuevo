SELECT
  col.id,
  col.nombre,
  col.fk_tipo,
  col.orden,
  col.fk_responsable,
  col.fk_estatus,
  col.es_obligatorio,
  col.descripcion,
  col.fk_estatus,
  col.fk_proceso,
  data_type.nombre as tipo_dat_nombre,
  data_type.id as tipo_dat__id
FROM columnas AS col
INNER JOIN catalogo_tipo_dato AS data_type ON data_type.id = col.fk_tipo
WHERE
  col.fk_proceso = ?
ORDER BY
  col.fk_proceso,
  col.orden