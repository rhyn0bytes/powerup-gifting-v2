import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navigation from "./components/Navigation";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { Home, Wishes, NotFound, Login, Signup } from "./pages";
import { Provider } from "react-redux";
import { store } from "./state/store";
import PrivateRoute from "./components/PrivateRoute";
// const fetchTestDatas = function() {
//   fetch('api/v1/tests')
//     .then(res => res.json())
//     .then((response) => { console.log("Test datas response", response); })
//     .catch((error) => { console.log("Error while fetching test datas", error); })
// }

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/wishes" component={Wishes} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}



export default App;
