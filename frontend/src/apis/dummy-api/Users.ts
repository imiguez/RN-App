import { apiData } from "./QueryData";

export interface User {
  "id": string,
    "title": string,
    "firstName": string,
    "lastName": string,
    "picture": string,
    "gender": string,
    "email": string,
    "dateOfBirth": string,
    "phone": string,
    "location": {
        "street": string,
        "city": string,
        "state": string,
        "country": string,
        "timezone": string
    },
    "registerDate": string,
    "updatedDate": string
}

export const EmptyUser: User = {
    "id": "",
      "title": "",
      "firstName": "",
      "lastName": "",
      "picture": "../../assets/default-user-photo.png",
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