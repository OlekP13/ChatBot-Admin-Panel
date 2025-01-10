import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import DocumentUpload from "../components/DocumentUpload";
import { useParams } from "react-router";
import axios from "axios";
import TextFileDisplay from "../components/TextFileDisplay";

const ChatBotEdit = () => {
    let params = useParams();
    const id = params.id;
    
    const [document, setDocument] = useState(null);
    const [documentContent, setDocumentContent] = useState("");
    const inputDocumentFile = useRef(null) ;
    const [chatbot, setChatBot] = useState([]);

    const UpdateChatBot = async () => {
        let data = {};
        if (!document) {
            data = {
                "kb_file_content" : documentContent
            }
        }
        else {  
            // If there is a document, read its content  
            data = await new Promise((resolve, reject) => {  
                const reader = new FileReader();  
                reader.onload = function(e) {  
                    const content = e.target.result; // Get file content  
                    resolve({  
                        "kb_file_content": content,  
                    });  
                };  
                reader.onerror = function(e) {  
                    reject(new Error('Error reading file'));  
                };  
                reader.readAsText(document); // Start reading the file  
            });  
        }  
        try {  
            const response = await fetch('https://chatbot-dashboard.aurealone.com/api/chatbots/' + id, { // Replace with your API endpoint  
                method: 'PUT',  
                headers: {  
                    'Content-Type': 'application/json',  
                }, 
                body: JSON.stringify(data)
            });  

            if (response.ok) {  
                const result = await response.json(); // Parse JSON response  
                console.log('KnowledgeBase Updated Successfully:', result); // Handle success  
            } else {  
                console.error('KnowledgeBase Updating failed:', response.statusText); // Handle failure  
            }  
        } catch (error) {  
            console.error('Error updating KnowledgeBase:', error); // Handle error  
        }  
    }

    const BrowseDocuments = () => {
        inputDocumentFile.current.click();
    }

    const handleDocumentFileChange = (event) => {  
        setDocument(event.target.files[0]); // Get the first file selected
    }; 

    useEffect(() => {
        const fetchData = async () => { 
            try {  
                const response = await axios.get('https://chatbot-dashboard.aurealone.com/api/chatbots');
                const currentBot = response.data.find(bot => bot.id === id);
                if(currentBot)  setChatBot(currentBot);
                else    setChatBot(null);
            } catch (error) {
                console.log(error);
            }  
        };  

        fetchData();
    }, []);

    return (
        <div>
            <div className="background"></div>
            <div className="project-list-page">
                <h1 style={{marginBottom:"20px"}}>Editing {chatbot && chatbot.project_name}</h1>
                <div style={{marginBottom:"20px"}}>
                    <h2 style={{marginBottom:"20px"}}>Knowledge Base : </h2>
                    <div style={{display: "flex", justifyContent: "space-around", alignItems:"center"}}>
                        <TextFileDisplay documentContent={documentContent} setDocumentContent={setDocumentContent} fileUrl={chatbot.kb_file} />
                        <div style={{textAlign:"left"}}>
                            <h1 style={{marginBottom:"20px"}}>Upload New Knowledge Base</h1>
                            <div className="upload-section">
                            <svg fill="#ffffff" height="100px" width="100px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.955 490.955" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_448_" d="M445.767,308.42l-53.374-76.49v-20.656v-11.366V97.241c0-6.669-2.604-12.94-7.318-17.645L312.787,7.301 C308.073,2.588,301.796,0,295.149,0H77.597C54.161,0,35.103,19.066,35.103,42.494V425.68c0,23.427,19.059,42.494,42.494,42.494 h159.307h39.714c1.902,2.54,3.915,5,6.232,7.205c10.033,9.593,23.547,15.576,38.501,15.576c26.935,0-1.247,0,34.363,0 c14.936,0,28.483-5.982,38.517-15.576c11.693-11.159,17.348-25.825,17.348-40.29v-40.06c16.216-3.418,30.114-13.866,37.91-28.811 C459.151,347.704,457.731,325.554,445.767,308.42z M170.095,414.872H87.422V53.302h175.681v46.752 c0,16.655,13.547,30.209,30.209,30.209h46.76v66.377h-0.255v0.039c-17.685-0.415-35.529,7.285-46.934,23.46l-61.586,88.28 c-11.965,17.134-13.387,39.284-3.722,57.799c7.795,14.945,21.692,25.393,37.91,28.811v19.842h-10.29H170.095z M410.316,345.771 c-2.03,3.866-5.99,6.271-10.337,6.271h-0.016h-32.575v83.048c0,6.437-5.239,11.662-11.659,11.662h-0.017H321.35h-0.017 c-6.423,0-11.662-5.225-11.662-11.662v-83.048h-32.574h-0.016c-4.346,0-8.308-2.405-10.336-6.271 c-2.012-3.866-1.725-8.49,0.783-12.07l61.424-88.064c2.189-3.123,5.769-4.984,9.57-4.984h0.017c3.802,0,7.38,1.861,9.568,4.984 l61.427,88.064C412.04,337.28,412.328,341.905,410.316,345.771z"></path> </g></svg>
                                <div style={{width: "200px"}}>
                                    <h3>Drag and drop file here</h3>
                                    <h4>Limit 200MB per file. TXT, JSON, YAML</h4>
                                </div>
                                <button className="browse-files" onClick={BrowseDocuments}>Browse files</button>
                                <input type='file' id='file' ref={inputDocumentFile} style={{display: 'none'}} onChange={handleDocumentFileChange}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                    <div className="edit-project-btn" style={{marginRight: "20px"}} onClick={UpdateChatBot}>Update Knowledge Base</div>
                    <Link to={"/list"} className="edit-project-btn">Back to Project List</Link>
                </div>
            </div>
        </div>
    )
};

export default ChatBotEdit;