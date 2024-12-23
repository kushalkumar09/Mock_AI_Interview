const backendUrl = "http://localhost:3000/api";

const ApiEndPoints = {
    AiResponse:{
        endPoint: `${backendUrl}/airesponse`,
        method:"POST"
    },
    MockInterview:{
        endPoint: `${backendUrl}/interview/:id`,
        method:"GET"
    },
}

export default ApiEndPoints;