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
          <Button bg={props.theme} variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'}  size="sm" onClick={() => {}} className="nav-button">
            Explore Qs
          </Button>
          <Button bg={props.theme} variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'}  size="sm" onClick={props.openAskModal} className="nav-button">
            Ask a Q
          </Button>
          </Nav>
          <Nav className="ml-auto">
            <Button bg={props.theme} variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'}  size="sm" onClick={props.openLoginModal} className="nav-button">
              Login
            </ Button>&nbsp;
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
