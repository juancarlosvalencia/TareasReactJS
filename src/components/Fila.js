import "./Controles.css";

export const TaskRow = ({ task, toggleTask }) => (
  <tr key={task.idTask}>
    <td className="d-flex justify-content-between border-0 px-4">
      <div className="w-100 me-3">
        <div className="d-flex justify-content-left flex-wrap">
          <p className="mb-0 me-auto">{task.name}</p>
          <small className="text-muted text-xs my-auto">{task.dateTask}</small>
        </div>
        
        <small className="text-muted text-xs">{task.description}</small>
      </div>
      

      <input
        type="checkbox"
        checked={task.done}
        onChange={() => toggleTask(task)}
        className="form-check-input"
      />
    </td>
  </tr>
);
