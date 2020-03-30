import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PokemonsList from './components/PokemonsList';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={PokemonsList} />
      </Switch>
    </BrowserRouter>
  );
}
