SELECT
  cont.id AS content_id,
  cont.contenido AS content,
  eve.id AS event_id,
  eve.fk_estatus AS event_status,
  col.id AS col_id,
  col.es_obligatorio AS is_obligatory,
  col.fk_proceso AS procedure_id,
  resp.color AS color,
  IF(
    (
      (
        SELECT
          COUNT(*)
        FROM responsable_usuario AS resp_usr2
        WHERE
          (
            resp_usr2.fk_responsable = resp.id
            AND resp_usr2.fk_usuario = ?
          )
          OR tipo.id = 5
      ) > 0
    ),
    tipo.nombre,
    'nonEditable'
  ) AS data_type,
  resp.*
FROM contenido_proceso AS cont
INNER JOIN eventos AS eve ON eve.id = cont.fk_evento
INNER JOIN columnas AS col ON col.id = cont.fk_columna
INNER JOIN responsable AS resp ON resp.id = col.fk_responsable
INNER JOIN catalogo_tipo_dato AS tipo ON tipo.id = col.fk_tipo
WHERE
  col.fk_proceso = ?
ORDER BY
  eve.id DESC,
  col.orden ASC;