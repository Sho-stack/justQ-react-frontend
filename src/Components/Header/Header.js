import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';
import { BsMoon, BsSun } from 'react-icons/bs';
import { BASE_URL } from '../../config';
import { MdAccountCircle } from 'react-icons/md';
function Header(props) {

  const handleLogout = () => {
    fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include' 
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to log out');
      }
      props.setUser(null);
      props.setSuccessText('Logged out');
    })
    .catch(error => {
      props.setErrorText(error.message);
      console.error('Error logging out:', error);
    });
  };

  return (
    <Navbar bg={props.theme} variant={props.theme} expand="lg">
      <Container>
        <Navbar.Brand>JustQ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            {props.user && (
              <Button
                bg={props.theme}
                variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'}
                size="lg"
                onClick={props.openAskModal}
                className="nav-button"
              >
                Ask a Q
              </Button>
            )}
          </Nav>
          <Nav className="ml-auto">
            
            {props.user ? (<>
              <Button
                bg={props.theme}
                variant={props.theme === "dark" ? "outline-light" : "outline-dark"}
                size="lg"
                className="me-2"
                style={{
                  border: "none",
                  boxShadow: "none",
                  pointerEvents: "none",
                  backgroundColor: "transparent",
                  color: props.theme === "dark" ? "#fff" : "#212529"
                }}
              >
                  <MdAccountCircle />&nbsp;{props.user.username}
                </Button>
              <Button
                bg={props.theme}
                variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'}
                size="lg"
                onClick={handleLogout}
                className="nav-button"
              >
              Logout
            </Button>
            
            </>): (<>
              <Button
                bg={props.theme}
                variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'}
                size="lg"
                onClick={props.openLoginModal}
                className="nav-button"
              >
                Login
              </Button>
              &nbsp;
              <Button
                bg={props.theme}
                variant={props.theme === 'dark' ? 'outline-light' : 'outline-dark'}
                size="lg"
                onClick={props.openRegistrationModal}
                className="nav-button"
              >
              Sign Up
            </Button>
            </>)}
            &nbsp;
            <Button bg={props.theme} variant={props.theme} onClick={props.toggleTheme}>
              {props.theme === 'light' ? <BsMoon /> : <BsSun />}
            </Button>
            <Form.Select
              className={`language-select me-2 ${props.theme === "light" ? "light-theme" : "dark-theme"}`}
              style={{ width: "auto" }}
              size="sm"
              onChange={(e) => props.setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="pl">Polish</option>
              <option value="es">Spanish</option>
              <option value="zh">Chinese</option>
              <option value="hi">Hindi</option>
              <option value="ar">Arabic</option>
              <option value="pt">Portuguese</option>
              <option value="bn">Bengali</option>
              <option value="ru">Russian</option>
              <option value="ja">Japanese</option>
              <option value="pa">Punjabi</option>
          </Form.Select>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
