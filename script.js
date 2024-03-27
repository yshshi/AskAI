function handleKeyPress(event) {
    if (event.keyCode === 13) { 
        console.log("under if con")
        event.preventDefault(); // Prevent the default behavior (newline in textarea)
        sendMessage();
    }
}

function sendMessage() {
    var userMessage = document.getElementById("user-messageBox").value.trim();
    if (userMessage === "") return; // Don't send empty messages


    //call function 
    sendMessageToAPI(userMessage);
    var chatHistory = document.querySelector(".dataBox");
    var messageElement = document.createElement("div");
    var oImg = document.createElement("img");
    const userText = document.createElement("p");
    userText.innerHTML = userMessage;
    oImg.setAttribute('src', './profile_icon.jpg');
    oImg.classList.add("sender-img");
    messageElement.classList.add("user-message" );
    userText.classList.add("user-text");
    //messageElement.textContent = userMessage;
    messageElement.appendChild(oImg);
    messageElement.appendChild(userText);

    // Append messageElement to chatHistory
    chatHistory.appendChild(messageElement);

    // Clear the input field after sending the message
    document.getElementById("user-messageBox").value = "";

    // Calculate and update the height and width of the message element
    updateMessageSize(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight
}

function updateMessageSize(element) {
    var computedStyle = window.getComputedStyle(element);
    var width = computedStyle.getPropertyValue('width');
    var height = computedStyle.getPropertyValue('height');

    // Set the width and height of the element to 'auto' to allow it to expand dynamically
    element.style.width = 'auto';
    element.style.height = 'auto';

    // Get the computed dimensions after setting to 'auto'
    var newWidth = element.offsetWidth + 20;
    var newHeight = element.offsetHeight - 15;
    console.log(newHeight,newWidth)

    // Apply the new dimensions to the element
    if(newWidth > 850){
        element.style.width = 850 + 'px';
    }
    else{
        element.style.width = newWidth + 'px';
    }
   
    element.style.height = newHeight + 'px';
}

//  async function sendMessageToAPI(message) {
//     try
//     {

//         const url = 'http://localhost:3000/askAI';
//         const data = {
//             prompt: message
//         };

//         // Send a POST request to the API endpoint
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });
//                 // Check if the request was successful (status code 200-299)
//                 if (response.ok) {
//                     // Parse the JSON response
//                     const responseData = await response.json();
//                     console.log('Response from API:', responseData);
//                     // Return the response data

//                     const resData =  document.querySelector('.dataBox');
//                     var messageElement = document.createElement("div");
//                     var oImg = document.createElement("img");
//                     const responseText = document.createElement("p");
//                     oImg.setAttribute('src', './gemini_icon.jpg');
//                     oImg.classList.add("response-img");
//                     responseText.classList.add("res-text")
//                     responseText.innerText = responseData.text;
//                     messageElement.classList.add("response-message");
//                     // messageElement.textContent = responseData.text;
//                     messageElement.appendChild(oImg);
//                     messageElement.appendChild(responseText);
                
                    
//                     animateText("res-text",responseData.text);
//                     resData.appendChild(messageElement);
//                     updateMessageSize(messageElement);
//                     resData.scrollTop = resData.scrollHeight
//                     return responseData;
//                 } 
//                 else {
//                     // If the request was not successful, throw an error
//                     alert('Generative AI is overload', response.status);
//                 }
//     }
//     catch (error) {
//         // Catch any errors that occur during the process
//         console.error('Error sending prompt to API:', error.message);
//         // Return null to indicate failure
//         return null;
//     }
// };
async function sendMessageToAPI(message) {
    try {
        const url = 'http://localhost:3000/askAI';
        const data = {
            prompt: message
        };
        //show gif 
        // Show loading GIF
        const loadingGIF = document.getElementById('loading');
        loadingGIF.style.display = 'block';

        // Send a POST request to the API endpoint
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Hide loading GIF
        loadingGIF.style.display = 'none';
        // Check if the request was successful (status code 200-299)
        if (response.ok) {
            // Parse the JSON response
            const responseData = await response.json();
            console.log('Response from API:', responseData);

            const resData =  document.querySelector('.dataBox');
            var messageElement = document.createElement("div");
            var oImg = document.createElement("img");
            const responseText = document.createElement("p");
            oImg.setAttribute('src', './gemini_icon.jpg');
            oImg.classList.add("response-img");
            oImg.style.marginRight = "10px";
            responseText.classList.add("restext"); // Use restext instead of res-text
            responseText.innerText = " "+responseData.text;
            messageElement.classList.add("response-message");

            // Append the elements to the message container
            messageElement.appendChild(oImg);
            messageElement.appendChild(document.createTextNode(' ')); // Add space between img and p

            messageElement.appendChild(responseText);
            resData.appendChild(messageElement);

            // Start the typewriter animation
            animateText(responseText, responseData.text);

            // Scroll to the bottom of the container
            resData.scrollTop = resData.scrollHeight;

            return responseData;
        } else {
            // If the request was not successful, throw an error
            alert('Generative AI is overload', response.status);
        }
    } catch (error) {
        // Catch any errors that occur during the process
        console.error('Error sending prompt to API:', error.message);
        // Return null to indicate failure
        return null;
    }
}

// Function to animate the text
function animateText(textElement, text) {
    const words = text.split(' ');
    let i = 0;
    const interval = setInterval(function() {
        if (i >= words.length) {
            clearInterval(interval);
            return;
        }
        textElement.textContent += words[i] + ' ';
        i++;
    }, 100); // Adjust the interval as needed
}
document.addEventListener('DOMContentLoaded', function () {
    var wrapper = document.getElementById('wrapper');
    wrapper.style.display = 'none'; // Hide the wrapper div
});
