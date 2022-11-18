import { isLoggedInVar } from "../apollo";

function Home({ setIsLoggedIn }) {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => isLoggedInVar(false)}>Log out</button>
    </div>
  );
}

export default Home;
