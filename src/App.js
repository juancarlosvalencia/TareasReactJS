import { useState, useEffect } from "react";
import { TaskCreator } from "./components/Creador";
import { VisibilityControl } from "./components/Control";
import { TaskTable } from "./components/Tabla";
import { BigCalendar } from "./components/BigCalendar";

function App() {
  const [taskItems, setTaskItems] = useState([]);
  const [showCompleted, setshowCompleted] = useState(false);

  function TasksIds(){
    let data = JSON.parse(localStorage.getItem("tasks"));
    let cadena = "https://api.restful-api.dev/objects?";

    if(data !== null){
      for (let i = 0; i < data.length; i++) {
        if(i===0)
          cadena += "id=" + data[i].idTask;
        else
          cadena += "&id=" + data[i].idTask;
      }
    }
    
    return cadena;
  }

  useEffect(() => {
    async function cargarDatos(){
      let data = "[";
      const cadena = TasksIds();

      if(cadena === "https://api.restful-api.dev/objects?")
        return;

      //Se listan las tareas y se carga en el localStorage
      const TaskArray = await fetch(cadena, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }).then(response => response.json())
        .then(data1 => {return data1;})
        .catch(error => {
          alert("No es posible obtener la lista de tareas, " + error)
          return;
      });
  
      if(TaskArray === "")
        return
  
      for (let i = 0; i < TaskArray.length; i++) {
        data += '{ "idTask": "' + TaskArray[i].id + '", "name": "' + TaskArray[i].name + '", "description": "' + TaskArray[i].data.Descripcion + '", "dateTask": "' + TaskArray[i].data.Vencimiento + '", "done": ' + TaskArray[i].data.finalizado + ' },'
      }

      if(data.length>1)
        data = data.substring(0, data.length - 1);

      data += "]";
  
      if (data) {
        setTaskItems(JSON.parse(data));
      }
    }

    cargarDatos();
    
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTask = async (taskName, taskDescription, startDate) => {
      if (!taskItems.find((t) => t.name === taskName)){
        let errorApi = false;

        //Se guarda la tarea creada en la api rest
        const idTask = await fetch('https://api.restful-api.dev/objects', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: taskName,
            data: {
              Vencimiento: startDate,
              finalizado: false,
              Descripcion: taskDescription,
            },
          })
        }).then(response => response.json())
        .then(data1 => {return data1.id;})
        .catch(error => {
          alert("No es posible guardar este elemento, " + error);
          errorApi=true;
          return "";
      });

      if(errorApi)
        return

      if(idTask === 'undefined'){
        alert("No es posible guardar este elemento");
        return;
      }
        

      console.log(idTask);

      setTaskItems([...taskItems, { idTask: idTask, name: taskName, description: taskDescription, dateTask: startDate, done: false }]);
    }

    else
      alert("El titulo de la tarea ya existe, por favor indique otro titulo");
  };

  const toggleTask = async (task) =>{
    //Se actualiza la tarea en la api
    await fetch('https://api.restful-api.dev/objects/' + task.idTask, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: task.name,
        data: {
          Vencimiento: task.dateTask,
          finalizado: !task.done,
          Descripcion: task.description
        },
      })
    }).then(response => response.json())
    .catch(error => {
      alert("No es posible actualizar el estado de este elemento, " + error)
    });

    setTaskItems(
      taskItems.map((t) => (t.idTask === task.idTask ? { ...t, done: !t.done } : t))
    );
  }
    

  const cleanTasks = async() => {
    let data = JSON.parse(localStorage.getItem("tasks"));
    let cadena = "https://api.restful-api.dev/objects/";

    for (let i = 0; i < data.length; i++) {
      if(data[i].done){
        //Se borran las tareas completas
        await fetch(cadena + data[i].idTask, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }).then(response => response.json())
          .catch(error => {
          alert("No es posible eliminar uno o más elementos, " + error)
          return;
        });
      }
    }

    setTaskItems(taskItems.filter((task) => !task.done));
    setshowCompleted(false);
  };

  return (
    <div className="row">
      <div id="tareas" className="col-md-5 col-12">
          <TaskCreator createNewTask={createNewTask} />
          <TaskTable tasks={taskItems} toggleTask={toggleTask} />
          <VisibilityControl
            description="Tareas Completas"
            isChecked={showCompleted}
            callback={(checked) => setshowCompleted(checked)}
            cleanTasks={cleanTasks}
          />
          {showCompleted && (
            <TaskTable
              tasks={taskItems}
              toggleTask={toggleTask}
              showCompleted={showCompleted}
            />
          )}
      </div>
      <div className="col-md-7 col-12">
        <BigCalendar tasks={taskItems} toggleTask={toggleTask} />
      </div>
    </div>
  );
}

export default App;
