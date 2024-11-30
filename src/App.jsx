import Route from "./components/utils/Route.jsx";
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx";
import useNavigation from "./hooks/useNavigation.js";
import { useEffect } from "react";

const App = () => {
  const userId = window.localStorage.getItem("biscut");
  const { navigate, currentPath } = useNavigation();
 
  let isDashboard = currentPath.includes("/dashboard")
  useEffect(() => {
    
    if(!isDashboard)
    {
      if (!userId) {
        navigate("/login");
      } else {
        navigate("/dashboard");
      }
    }

  }, []);

  return (
    <div className="bg-[#09090b] w-screen h-screen flex flex-col justify-center items-center">
      <Route path='/login'><Login /></Route>
      {isDashboard && <Dashboard />}
    </div>
  );
}

export default App;