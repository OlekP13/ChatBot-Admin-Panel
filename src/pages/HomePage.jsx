import { Link } from "react-router";

const HomePage = () => {
    return (
        <div className="homepage">
            <div className="homepage-left"></div>
            <div className="homepage-right">
                <h1 style={{color:"white", fontSize:"50px", textAlign:"center"}}>CHATBOT Admin Panel</h1>
                <Link to={"/list"} className="project-list-btn">Project List</Link>
            </div>
        </div>
    )
}

export default HomePage;