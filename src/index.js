import App from "./App";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

const container = document.getElementById("AdminTask");
const root = createRoot(container);

root.render(<App />);