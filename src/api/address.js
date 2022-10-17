import axios from "axios"

import { baseURL } from "../URI";

export const CreateAddress = async (props) => {
  await axios
    .post(`${baseURL}address/create/${props.userId}`,
      {
        "street": props.street_name,
        "suburb": props.suburb,
        "city": props.city,
        "province": props.province,
        "postal_code": props.postal_code
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${props.token}`
        }
      }
    )
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      if (error.response) {
        const str = error.response.data.error;
        const errMes = str.split(':').pop();
        return errMes;
    }
    })
}
export const FetchAddress = async (props) => {
  await axios
    .get(`${baseURL}address/view/${props.addressId}/${props.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${props.token}`
        }
      }
    )
}
export const UpdateAddress = async (props) => {
  await axios
    .put(`${baseURL}address/update/${props.addressId}/${props.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${props.token}`
        }
      }
    )
};
