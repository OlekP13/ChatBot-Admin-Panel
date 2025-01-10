import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import DocumentUpload from "../components/DocumentUpload";


const ChatBotAdminPanel = () => {

    const [projectName, setProjectName] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [borderColor, setBorderColor] = useState("#000000");
    const [backColor, setBackColor] = useState("#000000");
    const [defaultMsg, setDefaultMsg] = useState("");

    const [document, setDocument] = useState(null);
    const [logo, setLogo] = useState(null);
    const inputDocumentFile = useRef(null) ;
    const inputLogoFile = useRef(null) ;

    const [link, setLink] = useState("");


    const GenerateChatBot = async () => {
        console.log({
            projectName,
            apiKey,
            borderColor,
            backColor,
            defaultMsg
        });

        if (!document) {  
            alert('Please select a .txt file to upload'); // Alert if no file selected  
            return;  
        }  

        if (!logo) {  
            alert('Please select a .png file to upload'); // Alert if no file selected  
            return;  
        }

        const formData = new FormData();  
        formData.append('file', document); // Append the file to FormData  
        formData.append('project_name', projectName);
        formData.append('openai_key', apiKey);
        formData.append('published_link', "https://chatbot.aurealone.com/" + projectName.toLowerCase().replaceAll(" ", "-"));
        formData.append('color_theme', borderColor);
        formData.append('default_msg', defaultMsg);
        formData.append('bot_logo', logo);

        try {  
            const response = await fetch('https://chatbot-dashboard.aurealone.com/api/chatbots', { // Replace with your API endpoint  
                method: 'POST',  
                body: formData,  
            });  

            if (response.ok) {  
                const result = await response.json(); // Parse JSON response  
                setLink("https://chatbot.aurealone.com/" + projectName.toLowerCase().replaceAll(" ", "-"));
                console.log('File uploaded successfully:', result); // Handle success  
            } else {  
                console.error('File upload failed:', response.statusText); // Handle failure  
            }  
        } catch (error) {  
            console.error('Error uploading file:', error); // Handle error  
        }  
    }

    const BrowseDocuments = () => {
        inputDocumentFile.current.click();
    }
    const BrowseLogos = () => {
        inputLogoFile.current.click();
    }

    const handleDocumentFileChange = (event) => {  
        setDocument(event.target.files[0]); // Get the first file selected
    }; 

    const handleLogoFileChange = (event) => {  
        setLogo(event.target.files[0]); // Get the first file selected
    }; 

    return (
        <div>
            <div className="background"></div>
            <div className="project-list-page">
                <h1 style={{marginBottom:"20px"}}>Chatbot Admin Panel</h1>
                <div className="create-chatbot-element">
                    <h3>Project Name : </h3>
                    <input style={{flex: 1}} className="input-project-item" value={projectName} onChange={e => setProjectName(e.target.value)}/>
                </div>
                <div className="create-chatbot-element">
                    <h3>OpenAI Key : </h3>
                    <input style={{flex: 1}} className="input-project-item" value={apiKey} onChange={e => setApiKey(e.target.value)} />
                </div>
                <div style={{marginBottom:"20px"}}>
                    <h1 style={{marginBottom: "20px"}}>Knowledge Base : </h1>
                    <div style={{display: "flex", justifyContent: "space-around", alignItems:"center"}}>
                        <div style={{textAlign:"left"}}>
                            <h3 style={{marginBottom:"20px"}}>Upload Knowledge Base</h3>
                            <div className="upload-section">
                            <svg fill="#ffffff" height="100px" width="100px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.955 490.955" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_448_" d="M445.767,308.42l-53.374-76.49v-20.656v-11.366V97.241c0-6.669-2.604-12.94-7.318-17.645L312.787,7.301 C308.073,2.588,301.796,0,295.149,0H77.597C54.161,0,35.103,19.066,35.103,42.494V425.68c0,23.427,19.059,42.494,42.494,42.494 h159.307h39.714c1.902,2.54,3.915,5,6.232,7.205c10.033,9.593,23.547,15.576,38.501,15.576c26.935,0-1.247,0,34.363,0 c14.936,0,28.483-5.982,38.517-15.576c11.693-11.159,17.348-25.825,17.348-40.29v-40.06c16.216-3.418,30.114-13.866,37.91-28.811 C459.151,347.704,457.731,325.554,445.767,308.42z M170.095,414.872H87.422V53.302h175.681v46.752 c0,16.655,13.547,30.209,30.209,30.209h46.76v66.377h-0.255v0.039c-17.685-0.415-35.529,7.285-46.934,23.46l-61.586,88.28 c-11.965,17.134-13.387,39.284-3.722,57.799c7.795,14.945,21.692,25.393,37.91,28.811v19.842h-10.29H170.095z M410.316,345.771 c-2.03,3.866-5.99,6.271-10.337,6.271h-0.016h-32.575v83.048c0,6.437-5.239,11.662-11.659,11.662h-0.017H321.35h-0.017 c-6.423,0-11.662-5.225-11.662-11.662v-83.048h-32.574h-0.016c-4.346,0-8.308-2.405-10.336-6.271 c-2.012-3.866-1.725-8.49,0.783-12.07l61.424-88.064c2.189-3.123,5.769-4.984,9.57-4.984h0.017c3.802,0,7.38,1.861,9.568,4.984 l61.427,88.064C412.04,337.28,412.328,341.905,410.316,345.771z"></path> </g></svg>
                                <div style={{width: "200px"}}>
                                    <h3 style={{marginBottom:"20px"}}>Drag and drop file here</h3>
                                    <h4>Limit 200MB per file. TXT, JSON, YAML</h4>
                                </div>
                                <button className="browse-files" onClick={BrowseDocuments}>Browse files</button>
                                <input type='file' id='file' ref={inputDocumentFile} style={{display: 'none'}} onChange={handleDocumentFileChange}/>
                            </div>
                        </div>
                        <div style={{textAlign:"left"}}>
                            <h3 style={{marginBottom:"20px"}}>Upload Bot Logo</h3>
                            <div className="upload-section">
                            <svg fill="#ffffff" height="100px" width="100px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.955 490.955" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_448_" d="M445.767,308.42l-53.374-76.49v-20.656v-11.366V97.241c0-6.669-2.604-12.94-7.318-17.645L312.787,7.301 C308.073,2.588,301.796,0,295.149,0H77.597C54.161,0,35.103,19.066,35.103,42.494V425.68c0,23.427,19.059,42.494,42.494,42.494 h159.307h39.714c1.902,2.54,3.915,5,6.232,7.205c10.033,9.593,23.547,15.576,38.501,15.576c26.935,0-1.247,0,34.363,0 c14.936,0,28.483-5.982,38.517-15.576c11.693-11.159,17.348-25.825,17.348-40.29v-40.06c16.216-3.418,30.114-13.866,37.91-28.811 C459.151,347.704,457.731,325.554,445.767,308.42z M170.095,414.872H87.422V53.302h175.681v46.752 c0,16.655,13.547,30.209,30.209,30.209h46.76v66.377h-0.255v0.039c-17.685-0.415-35.529,7.285-46.934,23.46l-61.586,88.28 c-11.965,17.134-13.387,39.284-3.722,57.799c7.795,14.945,21.692,25.393,37.91,28.811v19.842h-10.29H170.095z M410.316,345.771 c-2.03,3.866-5.99,6.271-10.337,6.271h-0.016h-32.575v83.048c0,6.437-5.239,11.662-11.659,11.662h-0.017H321.35h-0.017 c-6.423,0-11.662-5.225-11.662-11.662v-83.048h-32.574h-0.016c-4.346,0-8.308-2.405-10.336-6.271 c-2.012-3.866-1.725-8.49,0.783-12.07l61.424-88.064c2.189-3.123,5.769-4.984,9.57-4.984h0.017c3.802,0,7.38,1.861,9.568,4.984 l61.427,88.064C412.04,337.28,412.328,341.905,410.316,345.771z"></path> </g></svg>
                                <div style={{width: "200px"}}>
                                    <h3 style={{marginBottom:"20px"}}>Drag and drop file here</h3>
                                    <h4>Limit 200MB per file. PNG, JPG, JPEG</h4>
                                </div>
                                <button className="browse-files" onClick={BrowseLogos}>Browse files</button>
                                <input type='file' id='file' ref={inputLogoFile} style={{display: 'none'}} onChange={handleLogoFileChange}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems:"center", marginBottom:"20px"}}>
                    <div style={{flex: 1}}>
                        <h3 style={{marginBottom: "20px"}}>Color Theme : </h3>
                        <div style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                            <div>
                                <h4 style={{marginBottom: "20px"}}>Pick Border Color</h4>
                                <input className="color-picker" type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)}></input>
                            </div>
                            <div>
                                <h4 style={{marginBottom: "20px"}}>Pick Background Color</h4>
                                <input className="color-picker" type="color" value={backColor} onChange={e => setBackColor(e.target.value)}></input>
                            </div>
                        </div>
                    </div>

                    <div style={{flex: 1, display:"flex", flexDirection:"column"}}>
                        <h3 style={{marginBottom: "20px"}}>Default Chatbot Message : </h3>
                        <textarea style={{margin:"20px"}} rows={6} placeholder="Hello! How can I assist you today?" className="input-project-item" value={defaultMsg} onChange={e => setDefaultMsg(e.target.value)} />
                    </div>
                </div>
                {link && <div className="edit-project-btn" style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"0px 20px 20px 20px"}}>
                    {link}
                    <div style={{width:"25px", height:"25px", marginLeft:"15px"}}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005M12 11V17M9 14H15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                    </div>
                }
                <div style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                    <div className="edit-project-btn" style={{marginRight: "20px"}} onClick={GenerateChatBot}>Generate Chatbot Code</div>
                    <Link to={"/list"} className="edit-project-btn">Back to Project List</Link>
                </div>
            </div>
        </div>
    )
};

export default ChatBotAdminPanel;