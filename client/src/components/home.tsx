import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home(props: any) {
    const navigate = useNavigate();

    return (
        <>
            {
                props.loggedIn ? (
                    <h1>Logged in as {props.user.name} {props.user.surname}</h1>
                ) : (
                    <h1>Not logged in</h1>
                )
            }
            <Button onClick={() => navigate("/documents")}>Go to Documents</Button>
            <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </>
    );
}

export default Home;
