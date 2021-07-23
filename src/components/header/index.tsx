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

const Header = ({ onSearch, showSearch }: any) => (
  <>
    <Navbar bg="dark" expand="lg" className="shadow p-3 mb-5">
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

        {showSearch && (
          <FormControl
            type="search"
            onChange={onSearch}
            placeholder="Search movies here .."
            className="mr-2 input-lg search-bar"
            aria-label="Search"
          />
        )}
      </Navbar.Collapse>
    </Navbar>
  </>
);

export default Header;
