import axios from "axios";

import { baseURL } from "../URI";

export const CreateBankingDetails = async (props) => {
  await axios
    .post(`${baseURL}bank/create/${props.userId}`,
    {
      "bank_name": props.bank_name,
      "acc_num": props.acc_num,
      "acc_type": props.acc_type,
      "branch_num": props.branch_num,
      "acc_holder": props.acc_holder
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.token}`
      }
    }
  )
}
export const UpdateBankingDetails = async (props) => {
  await axios
    .put(`${baseURL}bank/update/${props.bankId}/${props.userId}`,
    {
      "bank_name": props.bank_name,
      "acc_num": props.acc_num,
      "acc_type": props.acc_type,
      "branch_num": props.branch_num,
      "acc_holder": props.acc_holder
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.token}`
      }
    }
  )
}
export const FetchBankingDetails = async (props) => {
  await axios
    .get(`${baseURL}bank/view/${props.bankId}/${props.userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.token}`
      }
    }
  )
}
