import { apiData } from "./QueryData";
import { EmptyUser, User } from "./Users";

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

export interface Posts {
    data: Post[],
    total?: number,
    page?: number,
    limit?: number
}

export const EmptyPost: Post = {
    id: '',
    text: '',
    image: '',
    likes: 0,
    link: '',
    tags: [''],
    publishDate: '',
    owner: EmptyUser
}

// export const EmptyPosts: Posts = {

// }

export const getPostById = async (id: string) => {
    const response = await fetch(apiData.baseUrl+'/user/'+id+'/post', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'app-id': apiData["app-id"]
          },
    });
    return await response.json();
}

export const getPosts = async () => {
    const response = await fetch(apiData.baseUrl+'/post', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'app-id': apiData["app-id"]
        },
    });
    return await response.json();
}