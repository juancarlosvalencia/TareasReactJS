import { TaskRow } from "./Fila";

export function TaskTable({ tasks, toggleTask, showCompleted = false }) {
  const taskTableRows = (doneValue) =>
    tasks
      .filter((task) => task.done === doneValue)
      .map((task) => (
        <TaskRow key={task.name} task={task} toggleTask={toggleTask} />
      ));

  return (
    <div className="card border-0 shadow bg-white rounded-3 mb-4">
      <table className="table mt-2">
        <thead className="mb-1">
          <tr>
            <th className="pb-3 px-3">Tareas</th>
          </tr>
        </thead>
        <tbody>{taskTableRows(showCompleted)}</tbody>
      </table>
    </div>
  );
}
