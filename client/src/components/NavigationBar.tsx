import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavigationBar(props: any) {
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                    <img
                        src="/polonium.png"
                        alt="Polonio Logo"
                        height="32"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate("/documents")}>
                            Documents
                        </Nav.Link>
                    </Nav>

                    <Nav>
                        {props.loggedIn && (
                            <Navbar.Text className="me-3">
                                Signed in as: {props.user.name} {props.user.surname}
                            </Navbar.Text>
                        )}

                        {props.loggedIn ? (
                            <Button
                                variant="outline-light"
                                onClick={props.doLogOut}
                                size="sm"
                            >
                                Log Out
                            </Button>
                        ) : (
                            <Button
                                variant="outline-light"
                                onClick={() => navigate("/login")}
                                size="sm"
                            >
                                Log In
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
