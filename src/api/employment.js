import axios from "axios";

import { baseURL } from "../URI";

export const CreateEmploymentInformation = async (props) => {
  await axios
    .post(`${baseURL}employment/create/${props.userId}`,
      {
        "emp_status": props.emp_status,
        "gross_income": props.gross_income,
        "net_income": props.net_income,
        "income_frequency": props.income_frequency,
        "salary_day": props.salary_day,
        "work_number": props.work_number,
        "university": props.university,
        "academic_year": props.academic_year,
        "course_duration": props.course_duration,
        "division": props.division,
        "service_time": props.service_time,
        "emp_type": props.emp_type,
        "employer_name": props.employer_name,
        "emp_industry": props.emp_industry,
        "emp_position": props.emp_position,
        "time_with_employer": props.time_with_employer,
        "emp_duration": props.emp_duration
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${props.token}`
        }
      }
    )
}
export const UpdateEmploymentInformation = async (props) => {
  await axios
    .put(`${baseURL}employment/update/${props.employmentId}/${props.userId}`,
      {
        "emp_status": props.emp_status,
        "gross_income": props.gross_income,
        "net_income": props.net_income,
        "income_frequency": props.income_frequency,
        "salary_day": props.salary_day,
        "work_number": props.work_number,
        "university": props.university,
        "academic_year": props.academic_year,
        "course_duration": props.course_duration,
        "division": props.division,
        "service_time": props.service_time,
        "emp_type": props.emp_type,
        "employer_name": props.employer_name,
        "emp_industry": props.emp_industry,
        "emp_position": props.emp_position,
        "time_with_employer": props.time_with_employer,
        "emp_duration": props.emp_duration
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${props.token}`
        }
      }
    )
}
export const FetchEmploymentInformation = async (props) => {
  await axios
    .get(`${baseURL}employment/view/${props.employmentId}/${props.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${props.token}`
        }
      }
    )
}
