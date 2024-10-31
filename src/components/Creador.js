import "./Controles.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { FaCircleDot } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { FaFileLines } from "react-icons/fa6";
import { registerLocale } from  "react-datepicker";
import { es } from 'date-fns/locale/es';
registerLocale('es', es)


export const TaskCreator = ({ createNewTask }) => {
  
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const handleSubmit = async (e) => {
    if (newTaskName.trim() === "") {
      alert("Por favor ingrese el nombre de la tarea");
      return;
    }

    if (newTaskDescription.trim() === "") {
      alert("Por favor ingrese la descripción de la tarea");
      return;
    }

    if (startDate === null) {
      alert("Por favor ingrese la fecha de vencimiento de la tarea");
      return;
    }

    e.preventDefault();
    createNewTask(newTaskName, newTaskDescription, startDate.getFullYear() + "-"+ parseInt(startDate.getMonth()+1) +"-"+ startDate.getDate());
    setNewTaskName("");
    setNewTaskDescription("");
    setStartDate(new Date());
  };

  return (
    <div className="card border-0 shadow mb-4 bg-white rounded-3">
      <form onSubmit={handleSubmit}>
        <div className="card-header input-group p-0 ps-1 border-bottom bg-white">
          <span className="input-group-text icono-personalizado pt-2" id="basic-addon1">
            <FaCircleDot />
          </span>
          <input
            type="text"
            className="input-personalizado form-control border-none p-3 ps-1 shadow-none"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Ingrese una nueva tarea..."
            autoFocus
          />
        </div>
        <div className="card-body d-flex flex-wrap pt-0">
          <div className="input-group">
            <span className="input-group-text icono-personalizado ps-0">
              <FaFileLines />
            </span>
            <input
              type="text"
              className="input-personalizado form-control border-none p-3 ps-1 shadow-none"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Ingrese la descripción..."
            />
          </div>
          <div className="w-100 mt-1 d-flex flex-wrap justify-content-start">
            <span className="icono-personalizado w-auto">
              <FaCalendarDays />
            </span>
            <DatePicker
              value={startDate}
              locale="es" 
              selected={startDate} 
              onChange={(date) => setStartDate(date)} 
              minDate={new Date()}
              placeholderText="Solo se pueden seleccionar dias futuros"
              className="w-auto ms-2 w-100"
            />
            <button className="btn btn-outline-primary btn-sm ms-lg-auto ms-md-0 ms-auto mt-md-3 mt-lg-0 mt-0" type="submit">
              Agregar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
