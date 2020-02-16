import * as React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Search from "./containers/Search";
import PokemonDetails from "./containers/PokemonDetails";
import PokemonList from "./containers/PokemonList";
import * as routes from "./routeManager";
import "typeface-open-sans";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>PokeApi v2 (work in progress)</h1>
      <Search />
      <Switch>
        <Route path={routes.pokemonRoute.path} component={PokemonDetails} />
        <Route path={routes.listRoute.path} component={PokemonList} />
        <Redirect exact from="/" to={routes.listRoute.path} />
      </Switch>
    </div>
  );
}
