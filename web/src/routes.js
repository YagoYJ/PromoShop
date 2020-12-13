import { BrowserRouter, Switch, Route } from "react-router-dom";

import PageSearch from "./pages/Search";
import PageForm from "./pages/Form";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={PageSearch} />
        <Route path="/create" component={PageForm} />
        <Route path="/edit/:id" component={PageForm} />
      </Switch>
    </BrowserRouter>
  );
}
