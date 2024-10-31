import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewMonthAgenda,
  createViewMonthGrid,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'
import "./Controles.css";

export function BigCalendar({ tasks, toggleTask, showCompleted = false }) {
  const plugins = [createEventsServicePlugin()];
  let data = "[";

  for(let i = 0; i < tasks.length; i++){
    if(!tasks[i].done){
      data += '{ "id": "' + tasks[i].idTask + '", "title": "' + tasks[i].name + '", "start": "' + tasks[i].dateTask + '", "end": "' + tasks[i].dateTask + '" },'
    }
  }

  if(data.length >1)
    data = data.substring(0, data.length - 1);
  
  data += "]";
  let resultados = JSON.parse(data);

  const calendar = useCalendarApp({
    views: [createViewMonthGrid(), createViewMonthAgenda()],
    locale: 'es-ES',
    isResponsive: true,
    events: [],
  }, plugins);

  const ElementosActivos = calendar.eventsService.getAll();

  if(ElementosActivos !== null || ElementosActivos !== 'undefined'){
    for(let i = 0; i < ElementosActivos.length; i++){
      calendar.eventsService.remove(ElementosActivos[i].id);
    }
  }

  if(data.length >2){
    for(let i = 0; i < resultados.length; i++){
      if(!calendar.eventsService.get(resultados[i].id)){
        calendar.eventsService.add(resultados[i]);
      }
    }    
  }
 
  return (
    <div className='h-100'>
        <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
