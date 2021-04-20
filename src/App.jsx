import React from 'react';
import {ChakraProvider} from "@chakra-ui/react"
import {Switch, Route, NavLink, Redirect} from "react-router-dom";
import PokemonList from "./containers/PokemonList";
import Pokemon from "./containers/Pokemon";
import './App.css';

const App = () => {
    return (
        <ChakraProvider>
            <div className="App">
                <nav>
                    <NavLink to={"/"}>На начальную</NavLink>
                </nav>
                <Switch>
                    <Route path={"/"} exact component={PokemonList}/>
                    <Route path={"/pokemon/:pokemon"} exact component={Pokemon}/>
                    <Redirect to={"/"}/>
                </Switch>
            </div>
        </ChakraProvider>
    );
}

export default App;
