import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "../src/routes/appRoutes"
import './App.css';

function AppRoutes() {
  return useRoutes(routes);
}
export default function App() {

  return (
    <Router>
      <AppRoutes/>
    </Router>
  )
}
