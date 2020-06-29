SELECT
  proc.*
FROM proceso AS proc
LEFT JOIN responsable AS resp ON proc.id = resp.fk_proceso
LEFT JOIN responsable_usuario AS resp_usr ON resp_usr.fk_responsable = resp.id
WHERE
  proc.fk_estatus = '1'
  AND (
    (
      resp.fk_tipo = 2
      AND resp_usr.fk_usuario = ?
      )
    OR proc.fk_creador = ?
  )
GROUP BY
  proc.id
ORDER BY
  proc.id DESC