import makeApiCall from "./baseApi"

export const logInApi = async (data) => {
  const url = 'user/login/'
  return makeApiCall('post', url, data)
}

export const adminSignupApi = async (data) => {
  const url = '/user/admin_signup/'
  return makeApiCall('post', url, data)
}

export const cabDriverSignupApi = async (data) => {
  const url = 'cabbie/signup/'
  return makeApiCall('post', url, data)
}

export const getAllEmployeesApi = async (data) => {
  const url = '/employee/get'
  return makeApiCall('get', url, data)
}

export const addEmployeeApi = async (data) => {
  const url = '/user/employees_onboard/'
  return makeApiCall('post', url, data)
}


export const createOrganizationApi = async (data) => {
  const url = '/user/company_registration/'
  return makeApiCall('post', url, data)
}