import { Container, Card, Button } from "react-bootstrap";

export default function Mint() {
  return (
    <Container>
      <div className="main-card text-center">
        <h4 className="text-purple mb-3">
          <i className="bi bi-coin me-2 text-blue"></i> Mint 10X Tokens
        </h4>
        <p className="text-muted mb-4">
          Simulated minting process (smart contract connection coming soon).
        </p>
        <Button className="shining-button">
          <i className="bi bi-lightning-charge-fill me-2"></i> Mint (Fake)
        </Button>
      </div>
    </Container>
  );
}
