import axios from "axios";

import { baseURL } from "../URI";

export const CreateLoanApplication = async (props) => {
  await axios
    .post(`${baseURL}loan/create/${props.userId}`,
    {
      "amount": props.amount,
      "duration": props.duration,
      "repay_date": props.startDate,
      "interest_rate": props.rate,
      "apply_date": props.applyDate
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.token}`
      }
    }
  )
}
