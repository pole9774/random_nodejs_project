import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../API/API";

function Home(props: any) {
    const navigate = useNavigate();

    const doLogOut = async () => {
        await API.logOut();
        props.setDirty(true);
        navigate("/");
    };

    return (
        <>
            {props.loggedIn ?
                <h1>Logged in as {props.user.name} {props.user.surname}</h1> :
                <h1>Not logged in</h1>}

            <Button onClick={() => navigate("/documents")}>Go to Documents</Button>

            {props.loggedIn ?
                <Button onClick={doLogOut}>Log Out</Button> :
                <Button onClick={() => navigate("/login")}>Go to Login</Button>}
        </>
    );
}

export default Home;
