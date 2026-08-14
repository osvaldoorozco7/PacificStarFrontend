import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

    const navigate = useNavigate();

    return (
        <div className="home-main-container">
            <h1>Pacific Star</h1>

            <div className="botones-container">
                <button onClick={() => navigate("/nueva-bitacora")}>
                    Nueva bitácora
                </button>


                <br />

                <button onClick={() => navigate("/bitacora")}>
                    Ver bitácoras
                </button>
            </div>
        </div>
    );
}

export default Home;