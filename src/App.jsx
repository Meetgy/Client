import Route from "./components/utils/Route.jsx";
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx";
import useNavigation from "./hooks/useNavigation.js";

const App = () => {
  const userId = window.localStorage.getItem("biscut");
  const { navigate, currentPath } = useNavigation();
  
  let checker = currentPath.includes("/dashboard")
  
  if(!checker)
  {
    if (!userId) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <div className="bg-[#09090b] w-screen h-screen flex flex-col justify-center items-center">
      <Route path='/login'><Login /></Route>
      {checker && <Dashboard />}
    </div>
  );
}

export default App;