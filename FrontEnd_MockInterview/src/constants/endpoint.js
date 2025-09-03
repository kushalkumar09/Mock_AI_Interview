
// const backendUrl = import.meta.env.VITE_LOCAL_API_URL;
const backendUrl = import.meta.env.VITE_SERVER_API_URL;

const ApiEndPoints = {
    AiResponse:{
        endPoint: `${backendUrl}/airesponse`,
        method:"POST"
    },
    AiFeedback:{
        endPoint: `${backendUrl}/interview/:id/start/feedback`,
        method:"PUT"
    },
    MockInterview:{
        endPoint: `${backendUrl}/interview/:id`,
        method:"GET"
    },
    GetInterviewFeedback:{
        endPoint: `${backendUrl}/interview/:id/feedback`,
        method:"GET"
    },
    GetPreviousInterviews:{
        endPoint: `${backendUrl}/allInterviews`,
        method:"GET"
    },
    UpdateInterviewScore:{
        endPoint: `${backendUrl}/interview/:id/updateScore`,
        method:"PATCH"
    }
}

export const AuthEndPoints = {
    SignUp:{
        endPoint: `${backendUrl}/signup`,
        method:"POST"
    },
    Login:{
        endPoint: `${backendUrl}/login`,
        method:"POST"
    }
}

export default ApiEndPoints;