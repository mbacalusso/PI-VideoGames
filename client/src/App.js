import { BrowserRouter, Route } from "react-router-dom";
import { LandingPage } from "./Components/LandingPage/LandingPage";
import { Home } from "./Components/Home/Home";
import { GamesDetails } from "./Components/GamesDetails/GamesDetails";
import { CreateGame } from "./Components/CreateGame/CreateGame";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/detail/:id" component={GamesDetails} />
        <Route exact path="/create" component={CreateGame} />
      </div>
    </BrowserRouter>
  );
}
export default App;
