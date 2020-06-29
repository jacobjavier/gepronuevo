export default function ParserServerColumn(data) {
  return {
    description: data.descripcion,
    isObligatory: data.es_obligatorio,
    fkStatus: data.fk_estatus,
    idProcess: data.fk_proceso,
    idResponsible: data.fk_responsable,
    idType: data.fk_tipo,
    id: data.id,
    name: data.nombre,
    order: data.orden ? data.orden : '?',
    nameType: data.tipo_dat__nombre
  };
}
