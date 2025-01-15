import { Link } from "react-router";

const ProjectItem = ({project, key}) => {

    const copyCode = (code) => {
        navigator.clipboard.writeText(code)
        .then(() => {
            console.log('Embed code copied to clipboard');
            alert('Copied to clipboard!');
        })  
        .catch((err) => {
            console.error('Failed to copy: ', err);
        });
    }

    return (
        <div key={key} className="project-item">
            <h1>Project Name : {project.project_name}</h1>
            <div style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                <h4 style={{marginRight: "15px"}}>Embed Code : </h4>
                <p className="code" onClick={() => copyCode(`<iframe src="` + project.published_link + `" width="400" height="300"></iframe>`)}>
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