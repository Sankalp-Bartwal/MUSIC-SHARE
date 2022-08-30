import './App.css';
import CreateAccount from './components/createAccount';
import { Routes, Route} from "react-router-dom";
import Login from "./components/login"
import HomeFeed from "./components/homefeed"
const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/homefeed/explore" element={<HomeFeed/>}/>
          <Route path="/homefeed/recommended" element={<HomeFeed />}/>
        </Routes>
      </div>
    );
  }

export default App;
