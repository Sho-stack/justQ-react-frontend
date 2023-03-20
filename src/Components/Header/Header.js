import { Navbar, Container, Nav,  Button} from 'react-bootstrap';
import { BsMoon, BsSun } from 'react-icons/bs';

function Header( {theme, toggleTheme} ) {



  return (
    <Navbar bg={theme} variant={theme} expand="lg">
      <Container>
        <Navbar.Brand href="#home">JustQ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Explore Qs</Nav.Link>
            <Nav.Link href="#link">Ask a Q</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Button bg={theme} variant={theme} onClick={toggleTheme}>  
              {theme === "light" ? <BsMoon /> : <BsSun />}
            </Button>
            <Nav.Link href="#login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
}

export default Header;
