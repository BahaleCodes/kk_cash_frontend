import axios from "axios";
import { baseURL } from "../../URI";

const URL = baseURL;

export const signup = ({payload}) => {
    axios
        .post(`${URL}signup`,
            payload,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
}