import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <Button onClick={() => navigate("/documents")}>Go to Documents</Button>
        </>
    );
}

export default Home;
