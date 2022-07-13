import { FC, PureComponent, ReactNode, useEffect, useRef, useState } from "react";
import { ViewProps, Image, ImageSourcePropType } from "react-native";
import { Post } from "../../apis/dummy-api/Posts";
import { PostContainer } from "../../styles/Containers";
import { PostImage } from "../../styles/Images";
import { PostText } from "../../styles/Texts";
import { UserListedButtonComp } from "../buttons/UserListedContainer";
import { width } from "../../styles/Utils";

type PostContainerProps = {
    children?: ReactNode,
    post: Post,
}
interface PostState {
    dimensions: {
        width: number, 
        height: number
    }
}

export class PostContainerComp extends PureComponent<PostContainerProps, PostState> {
    constructor(props: PostContainerProps) {
        super(props);
        this.state = {
            dimensions: {
                width: 0, 
                height: 0
            }
        };
    }

    componentDidMount() {
        Image.getSize(this.props.post.image, (w, h) => {
            this.setState({dimensions: {
                width: (width)-64,
                height: h * ((width)-64) / w
            }});
        });
    }
    
    render(): ReactNode {
        return (
            <PostContainer key={this.props.post.id.toString()}>
                <UserListedButtonComp user={this.props.post.owner} ></UserListedButtonComp>
                <PostText>{this.props.post.text}</PostText>
                <PostImage source={{uri: this.props.post.image}} style={this.state.dimensions}></PostImage>
            </PostContainer>
        );
    }
}