export default function ParseEvent(event) {
  let parsedEvent = [];
  console.log('event', event);
  event.map(cell => {
    switch (cell['data_type']) {
      case 'end_process': // End Process
        parsedEvent.push({
          id: cell['content_id'],
          color: cell['color'],
          is_obligatory: cell['is_obligatory'],
          key: cell['content_id'],
          savedValue: cell['content'],
          status: 'loading',
          type: cell['data_type'],
          eventId: cell['event_id'],
          eventStatus: cell['event_status']
        });
        break;
      default:
        //dar de alta los campos en administrador de la columna
        parsedEvent.push({
          id: cell['content_id'],
          color: cell['color'],
          is_obligatory: cell['is_obligatory'],
          key: cell['content_id'],
          savedValue: cell['content'],
          status: 'loading',
          type: cell['data_type'],
          value: cell['content'],
          eventStatus: cell['event_status']
        });
        break;
    }
  });
  return parsedEvent;
}
