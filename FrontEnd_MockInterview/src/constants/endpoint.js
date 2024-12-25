const backendUrl = "http://localhost:3000/api";

const ApiEndPoints = {
    AiResponse:{
        endPoint: `${backendUrl}/airesponse`,
        method:"POST"
    },
    AiFeedback:{
        endPoint: `${backendUrl}/interview/:id/start/feedback`,
        method:"POST"
    },
    MockInterview:{
        endPoint: `${backendUrl}/interview/:id`,
        method:"GET"
    },
}

export default ApiEndPoints;