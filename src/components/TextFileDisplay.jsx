import React, { useEffect, useState } from 'react';  

const TextFileDisplay = ({fileUrl, documentContent, setDocumentContent}) => {  
    const [loading, setLoading] = useState(true); // State for loading status  
    const [error, setError] = useState(null); // State to handle errors  
    
    useEffect(() => {
        const fetchTextFile = async () => {  
            try {
                if(fileUrl != undefined){
                    const response = await fetch(fileUrl.replace("http", "https"));  
                    if (!response.ok) {  
                        throw new Error('Network response was not ok');  
                    }  
                    const text = await response.text(); // Get the text content  
                    setError(null);
                    setDocumentContent(text);
                }
            } catch (error) {  
                setError(error); // Handle error  
            } finally {  
                setLoading(false); // Loading is complete  
            }  
        };  

        fetchTextFile(); // Call the function to fetch the file  
    }, [fileUrl]); // Empty dependency array means this runs once when the component mounts  

    // Render loading, error, or content  
    if (loading) return <div>Loading...</div>;  
    if (error) return <div>Error loading file: {error.message}</div>;  

    return (  
        <div style={{marginBottom: "20px"}}>
            <h2 style={{marginBottom:"20px"}}>Knowledge Base Content:</h2>  
            <textarea className='file-output' value={documentContent} onChange={e => setDocumentContent(e.target.value)}></textarea> {/* Use <pre> to maintain formatting */}  
        </div>  
    );  
};  

export default TextFileDisplay;