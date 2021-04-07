import axios from 'axios'

  const api =   axios.create({
        baseURL: 'https://www.googleapis.com/youtube/v3',
        params: {
            key : "AIzaSyCqxxlbz7BNLE6_0m6q9i68asxVI-vUpzg"
        }   
    })
     
export default api
