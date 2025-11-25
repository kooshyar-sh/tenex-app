import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar
      expand="lg"
      className="mb-4 shadow-sm"
      style={{ backgroundColor: "#f5f1ff" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/home" className="fw-bold text-purple">
          <i className="bi bi-lightning-charge-fill me-2 text-blue"></i>
          TENEX
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/user"
              className="fw-semibold text-purple"
            >
              Dashboard
            </Nav.Link>
          
            <Nav.Link as={Link} to="/mint" className="fw-semibold text-purple">
              Mint
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center">
            <Button size="sm" className="btn-outline-blue me-2">
              <i className="bi bi-wallet2 me-1"></i> Connect Wallet
            </Button>
            <Button size="sm" className="shining-button">
              <i className="bi bi-person-circle me-1"></i> Claim
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
