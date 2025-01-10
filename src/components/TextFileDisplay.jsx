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

    const downloadKB = async () => {  
        try {  
            // Fetch the file from the server  
            const response = await fetch(fileUrl.replace("http", "https"));  
            if (!response.ok) {  
                throw new Error('Network response was not ok');  
            }  

            // Read the response as a Blob  
            const blob = await response.blob();  
            const url = URL.createObjectURL(blob); // Create a URL for the Blob  

            // Create a temporary anchor element to download the file  
            const a = document.createElement('a');  
            a.href = url; // Set the href to the Blob URL  
            a.download = 'downloaded_file.txt'; // Specify the download file name  
            document.body.appendChild(a); // Append the anchor to the body  
            a.click(); // Programmatically click the anchor  
            document.body.removeChild(a); // Remove the anchor from the document  

            // Clean up  
            URL.revokeObjectURL(url); // Free up memory  
        } catch (error) {  
            console.error('Error downloading the file:', error);  
        }  
    };  

    // Render loading, error, or content  
    if (loading) return <div>Loading...</div>;  
    if (error) return <div>Error loading file: {error.message}</div>;  

    return (  
        <div>
            <div className="edit-project-btn" style={{marginBottom: "20px"}} onClick={downloadKB}>Download Knowledge Base</div>
            <h2 style={{marginBottom:"20px"}}>Knowledge Base Content:</h2>  
            <textarea className='file-output' value={documentContent} onChange={e => setDocumentContent(e.target.value)}></textarea> {/* Use <pre> to maintain formatting */}  
        </div>  
    );  
};  

export default TextFileDisplay;