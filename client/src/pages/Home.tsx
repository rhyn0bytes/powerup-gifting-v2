import { Container } from "react-bootstrap";
import useAuthentication from "../hooks/useAuthentication";
import WishesByUser from "components/WishesByUser";

function Home(): JSX.Element {
  
  const { authenticated } = useAuthentication();
  
  return (
    <Container className="mt-4">
      {authenticated ? <WishesByUser /> : <div>Home Page Baby!</div>}

    </Container>
  );
}

export default Home;
