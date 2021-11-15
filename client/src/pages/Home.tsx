import { Button, Container, Col, Row } from "react-bootstrap";
import useAuthentication from "../hooks/useAuthentication";
import WishesByUser from "components/WishesByUser";
import { Link } from "react-router-dom";

function Home(): JSX.Element {

  const { authenticated } = useAuthentication();
  
  return (
    <>
      {authenticated ? 
        <Container className="mt-4">
          <WishesByUser /> 
        </Container>
      : 
      <Container className="col-xl-10 col-xxl-8 px-4 py-5">
          <Row className="align-items-center g-lg-5 py-5">
            <Col className="col-lg-7 text-center text-lg-start">
              <h1 className="display-4 fw-bold lh-1 mb-3">Welcome to Gifting v2</h1>
              <p className="col-lg-10 fs-4">
                <b>Don't worry!</b> We aren't trying to re-invent the wheel. This app is just a useful way to practice working with 
                new technologies while allowing for friends and family to share what they are hoping for during this upcoming 
                holiday season. Brought to you by Ryan and Matt during a few long weekend evenings.
              </p>
            </Col>
            <Col className="col-md-10 mx-auto col-lg-5">
              <div className="d-grid">
                <Link to="/login" style={{ textDecoration: 'none !important' }} className="btn btn-primary text-uppercase fw-bold mb-3">
                  Log in
                </Link>
                <Link to="/signup" style={{ textDecoration: 'none !important' }} className="btn btn-secondary text-uppercase fw-bold mb-3">
                  Register
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      }
    </>
  );
}

export default Home;
