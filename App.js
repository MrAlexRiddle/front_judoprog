import React from "react";
import './styles/main.sass';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Persons from "./pages/Persons.jsx";
import About from "./pages/About.jsx";
import Main from "./pages/Main";
import Competitions from "./pages/Competitions";
import CompetitionFocused from "./pages/CompetitionFocused";

function App() {

    const routes = [{path: '/', element: <Main/>},
        {path: '/about', element: <About/>},
        {path: '/persons', element: <Persons/>},
        {path: '/competitions', element: <Competitions/>},
        {path: '/competitions/:id', element: <CompetitionFocused/>}]

    const router = createBrowserRouter(routes)

    return (<RouterProvider router={router}/>);
}

export default App;
