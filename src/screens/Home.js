import { Link, useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";
import routes from "../routes";

function Home() {
  const history = useHistory();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logUserOut(history)}>Log out</button>
      <Link to={routes.admin}>admin</Link>
    </div>
  );
}

export default Home;
