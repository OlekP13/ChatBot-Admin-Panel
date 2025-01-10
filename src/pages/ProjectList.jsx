import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import ProjectItem from "../components/ProjectItem";

const ProjectList = () => {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchData = async () => { 
            try {  
                const response = await axios.get('https://chatbot-dashboard.aurealone.com/api/lists');  
                // setData(response.data); // Update state with fetched data  
                console.log(response.data);
                setProjects(response.data);
            } catch (error) {  
                // setError(error); // Update state with error  
                console.log(error);
            }  
        };  
        fetchData();
    }, []);

    return (
        <div>
            <div className="background"></div>
            <div className="project-list-page">
                <h1 style={{marginBottom: "20px"}}>Project List Page</h1>
                <h2>View and manage all chatbot projects</h2>
                {projects.map((project, key) => <ProjectItem project={project} key={key} />)}
                <Link to={"/create"} className="edit-project-btn">Add Project</Link>
            </div>
        </div>
    )
};

export default ProjectList;