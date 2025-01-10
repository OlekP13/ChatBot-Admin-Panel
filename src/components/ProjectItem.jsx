import { Link } from "react-router";

const ProjectItem = ({project, key}) => {
    return (
        <div key={key} className="project-item">
            <h1 style={{marginBottom: "20px"}}>Project Name : {project.project_name}</h1>
            <div style={{display: "flex", justifyContent:"center", alignItems:"center", marginBottom:"20px"}}>
                <h4 style={{marginRight: "15px"}}>Embed Code : </h4>
                <p className="code">
                    {`<iframe src="` + project.published_link + `" width="400" height="300"></iframe>`}
                </p>
            </div>
            {/* <div className="view-chatbot-code">
            View Chatbot Code for {project.project_name}
            </div> */}
            <Link to={"/edit/" + project.id} className="edit-project-btn">Edit {project.project_name}</Link>
        </div>
    )
}

export default ProjectItem;