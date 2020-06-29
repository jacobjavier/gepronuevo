SELECT
  proc.*
FROM proceso AS proc
INNER JOIN responsable AS res ON res.fk_proceso = proc.id
INNER JOIN responsable_usuario AS resp_usr ON resp_usr.fk_responsable = res.id
WHERE
  resp_usr.fk_usuario = ?
GROUP BY
  proc.id