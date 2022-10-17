import axios from "axios";

import { baseURL } from "../URI";

export const CreateFinanceInformation = async (props) => {
  await axios
    .post(`${baseURL}finances/create/${props.userId}`,
      {
        "monthly_rates": props.monthly_rates,
        "groceries": props.groceries,
        "commuting_costs": props.commuting_costs,
        "loan_repayments": props.loan_repayments,
        "child_maintenance": props.child_maintenance,
        "desp_income": props.desp_income
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${props.token}`
        }
      }
    )
}
export const UpdateFinanceInformation = async (props) => {
  await axios
    .put(`${baseURL}finances/update/${props.financesInfoId}/${props.userId}`,
      {
        "monthly_rates": props.monthly_rates,
        "groceries": props.groceries,
        "commuting_costs": props.commuting_costs,
        "loan_repayments": props.loan_repayments,
        "child_maintenance": props.child_maintenance,
        "desp_income": props.desp_income
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${props.token}`
        }
      }
    )
}
export const FetchFinanceInformation = async (props) => {
  await axios
    .get(`${baseURL}finances/view/${props.financesInfoId}/${props.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${props.token}`
        }
      }
    )
}
