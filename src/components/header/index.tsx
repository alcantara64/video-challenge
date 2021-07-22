import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import App from '../../App';
import './index.css';

const Header = ({ onSearch }: any) => (
  <>
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand className="nav-tex" href="#">
        Movie App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: '100px', margin: '1px 26rem 0px 6rem' }}
          navbarScroll
        >
          <Nav.Link href="#action1">Home</Nav.Link>
          <NavDropdown title="Change Theme" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#action3">Dark</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Light</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <FormControl
          type="search"
          onChange={onSearch}
          placeholder="Search"
          className="mr-2 input-lg"
          aria-label="Search"
        />
      </Navbar.Collapse>
    </Navbar>
  </>
);

export default Header;
