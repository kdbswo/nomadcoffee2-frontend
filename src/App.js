import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { adminVar, client, darkModeVar, isLoggedInVar } from "./apollo";
import routes from "./routes";
import Admin from "./screens/Admin";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/SignUp";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  const admin = useReactiveVar(adminVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.Home} exact>
                {isLoggedIn ? <Home /> : <Login />}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}
              {!admin ? (
                <Route path={routes.admin}>
                  <Admin />
                </Route>
              ) : null}
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
