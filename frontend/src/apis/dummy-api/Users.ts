import { apiData } from "./QueryData";

export interface User {
  "id": String,
    "title": String,
    "firstName": String,
    "lastName": String,
    "picture": String,
    "gender": String,
    "email": String,
    "dateOfBirth": String,
    "phone": String,
    "location": {
        "street": String,
        "city": String,
        "state": String,
        "country": String,
        "timezone": String
    },
    "registerDate": String,
    "updatedDate": String
}

export const EmptyUser: User = {
    "id": "",
      "title": "",
      "firstName": "",
      "lastName": "",
      "picture": "",
      "gender": "",
      "email": "",
      "dateOfBirth": "",
      "phone": "",
      "location": {
          "street": "",
          "city": "",
          "state": "",
          "country": "",
          "timezone": ""
      },
      "registerDate": "",
      "updatedDate": ""
}

/*      GET   ->   /user       */
export const getUsers = async () => {
  const response = await fetch(apiData['baseUrl'] + '/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'app-id': apiData["app-id"]
    },
    // body: JSON.stringify(user)
  });
  return await response.json();
}

export const getUser = async (id: String) => {
  const response = await fetch(apiData['baseUrl'] + '/user/'+id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'app-id': apiData["app-id"]
    },
    // body: JSON.stringify(user)
  });
  return await response.json();
}