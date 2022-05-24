import { apiData } from "./QueryData";
import { User } from "./Users";

export interface Post {
    id: string,
    text: string,
    image: string,
    likes: number,
    link: string,
    tags: string[],
    publishDate: string,
    owner: User
}


export const getPostById = async (id: string) => {
    const response = await fetch(apiData.baseUrl+'/user/'+id+'/post', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'app-id': apiData["app-id"]
          },
    });
    return await response.json();
}