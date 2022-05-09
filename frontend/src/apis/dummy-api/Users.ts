import { apiData } from "./QueryData";

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