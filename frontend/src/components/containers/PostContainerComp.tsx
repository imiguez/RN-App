import { PureComponent, ReactNode} from "react";
import { Image} from "react-native";
import { Post } from "../../apis/dummy-api/Posts";
import { InLineUserContainer, PostContainer } from "../../styles/Containers";
import { PostImage } from "../../styles/Images";
import { PostText } from "../../styles/Texts";
import { width } from "../../styles/Utils";
import { GoToUserProfileButtonComp } from "../buttons/GoToUserProfileButton";

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
                <InLineUserContainer>
                    <GoToUserProfileButtonComp user={this.props.post.owner} />
                </InLineUserContainer>
                <PostText>{this.props.post.text}</PostText>
                <PostImage source={{uri: this.props.post.image}} style={this.state.dimensions}></PostImage>
            </PostContainer>
        );
    }
}