import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu";
import MenuCreator from "./components/MenuCreator";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route path="/create" component={MenuCreator} />
          <Route path="/" component={Menu} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
