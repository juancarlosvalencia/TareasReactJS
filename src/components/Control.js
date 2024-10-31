export const VisibilityControl = ({
  isChecked,
  callback,
  description,
  cleanTasks,
}) => {
  const handleDelete = () => {
    if (window.confirm(`Realmente desea eliminar todas las ${description}?`)) {
      cleanTasks();
    }
  };

  return (
    <div className="d-flex justify-content-between text-center p-2 border-secondary my-3">
      <div className="form-check form-switch mt-1">
        <input
          type="checkbox"
          className="form-check-input"
          checked={isChecked}
          onChange={(e) => callback(e.target.checked)}
        />
        <label htmlFor="form-check-label">Mostrar tareas completas</label>
      </div>
      <button className="btn btn-outline-danger" onClick={handleDelete}>
        Borrar tareas completas
      </button>
    </div>
  );
};
