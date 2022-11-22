import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";
const ADMIN = "ADMIN";
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logUserOut = (history) => {
  localStorage.removeItem(TOKEN);
  history?.replace();
  window.location.reload();
};

export const darkModeVar = makeVar(
  Boolean(localStorage.getItem(DARK_MODE) === "enabled")
);

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE, "enabled");
  darkModeVar(false);
};
export const adminVar = makeVar(Boolean(localStorage.getItem(ADMIN)));

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
