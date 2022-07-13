import { Animated, FlatListProps } from "react-native";
import styled from "styled-components/native";
import { User } from "../apis/dummy-api/Users";
import { width } from "./Utils";



export const UsersList = styled.FlatList`
    width: ${width};
    `
    // position: absolute;
    // left: ${width};