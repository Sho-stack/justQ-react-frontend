import { Navbar, Container, Nav,  Button} from 'react-bootstrap';
import { BsMoon, BsSun } from 'react-icons/bs';

function Header(props) {

  return (
    <Navbar bg={props.theme} variant={props.theme} expand="lg">
      <Container>
        <Navbar.Brand href="#home">JustQ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Explore Qs</Nav.Link>
            <Nav.Link onClick={props.openAskModal}>Ask a Q</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="#login">Login</Nav.Link>
            <Button bg={props.theme} variant={props.theme} onClick={props.toggleTheme}>  
              {props.theme === "light" ? <BsMoon /> : <BsSun />}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
}

export default Header;
