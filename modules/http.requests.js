import axios from "axios"

const baseURL = "http://localhost:5050"

const enums = {
    get: "get",
    post: "post",
    patch: "patch",
    put: "put",
    delete: "delete"
}

export const useHttp = () => {
     const request = async (url, method, body = null) => {
        if(!enums[method]) {
            throw new Error('Axios have not provide method ' + method)
        }

        try {
            const res = await axios[method](baseURL + url, body)

            if(res.status === 200 || res.status === 201) {
                return res.data
            }
        } catch(e) {

            return e.response.status
        }
    }

    return {request}
}