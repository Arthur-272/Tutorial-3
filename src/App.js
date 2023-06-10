import './App.css';
import ProfilePage from "./ProfilePage";
import RegistrationPage from "./Registration";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import {Switch} from "@material-ui/core";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RegistrationPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
