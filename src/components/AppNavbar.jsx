import React, { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  // حالت باز/بسته بودن منو
  const [expanded, setExpanded] = useState(false);

  // helper برای بستن منو وقتی کاربر روی یک لینک کلیک کرد (موبایل)
  const handleClose = () => setExpanded(false);

  return (
    // expanded و onToggle برای کنترل وضعیت منو
    <Navbar
      expand="md"
      className="shadow-sm navbar-tenex"
      expanded={expanded}
      onToggle={(next) => setExpanded(next)}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/home"
          className="fw-bold text-purple"
          onClick={handleClose}
        >
          <i className="bi bi-lightning-charge-fill me-2 text-blue"></i>
          TENEX
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-nav"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? (
            <span aria-hidden="true" style={{ fontSize: 20 }}>
              <i className="bi bi-x-lg"></i>
            </span>
          ) : (
            <span aria-hidden="true" style={{ fontSize: 20 }}>
              <i className="bi bi-list"></i>
            </span>
          )}
        </Navbar.Toggle>

        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/user"
              className="fw-semibold text-purple"
              onClick={handleClose}
            >
              Dashboard
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/mint"
              className="fw-semibold text-purple"
              onClick={handleClose}
            >
              Mint
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center">
            <Button
              size="sm"
              className="btn-outline-blue me-2"
            >
              <i className="bi bi-wallet2 me-1"></i> Connect Wallet
            </Button>

            <Button
              size="sm"
              className="shining-button d-none d-md-inline-flex align-items-center"
            >
              <i className="bi bi-person-circle me-1"></i> Claim
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
