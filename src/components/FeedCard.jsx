import React from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import heartAxios from "../apis/feed/heartAxios";
import { useQueryClient } from "react-query";
import HeartButton from "./HeartButton";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

function FeedCard({ data, onClick, openFeedDetail }) {
  // 좋아요 버튼
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const queryClient = useQueryClient();
  const likeButtonMutation = useMutation(heartAxios, {
    onSuccess: () => {
      queryClient.invalidateQueries("getFeedAxios");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const likeButtonHandler = (photoId) => {
    if (isLoggedIn) {
      likeButtonMutation.mutate(photoId);
    } else {
      Swal.fire({
        icon: "warning",
        title: "회원 전용 서비스!",
        text: `로그인이 필요한 서비스입니다🙏`,
        confirmButtonText: "확인",
      });
    }
  };

  const handleCardClick = () => {
    onClick();
  };
  const handleHeartButtonClick = (photoId) => {
    likeButtonHandler(photoId);
  };

  const [cardProfileImgSrc, cardProfileImgRef] = useIntersectionObserver(
    "/img/white.png",
    data.photoUrl
  );
  const [profileImgSrc, profileImgRef] = useIntersectionObserver(
    "/img/white.png",
    data.profileImgUrl
  );

  return (
    <CardDesign>
      <SliderWrapper>
        <CardProfileImg
          // src={data.photoUrl}
          src={cardProfileImgSrc}
          ref={cardProfileImgRef}
          onClick={handleCardClick}
          alt="photoImg"
        />
      </SliderWrapper>
      <CardHeader>
        <StyledLink to={`/page/${data.hostId}`}>
          <ProfileImg
            // src={data.profileImgUrl}
            src={profileImgSrc}
            ref={profileImgRef}
            alt="ProfileImg"
          />
          <UserNickName>{data.nickName}</UserNickName>
        </StyledLink>
        <FlexWrap>
          <UserPosition>
            <HeartButton
              like={data.loveCheck}
              onClick={() => handleHeartButtonClick(data.photoId)}
            />
            <HeartCount>{data.loveCnt}</HeartCount>
          </UserPosition>
        </FlexWrap>
      </CardHeader>
      <ContentBox onClick={handleCardClick}>
        {data.content && data.content.length > 50
          ? data.content.slice(0, 50) + "..."
          : data.content}
      </ContentBox>
      <HashTagContainer>
        {data.tag_photoList.map((item) => {
          return <HashTag key={item.tagId}>{item.tag}</HashTag>;
        })}
      </HashTagContainer>
    </CardDesign>
  );
}

export default FeedCard;

const ContentBox = styled.div`
  padding: 10px 20px;
  white-space: pre-wrap;
  word-wrap: break-word;
  cursor: pointer;
`;

const HashTagContainer = styled.div`
  padding: 10px 17px 20px;
  display: flex;

  flex-wrap: wrap;
  gap: 5px;
`;

const HashTag = styled.div`
  background-color: #514073;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 7px;
  font-size: 14px;
  @media (max-width: 1200px) {
    font-size: 11px;
  }
  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

const CardDesign = styled.div`
  border-radius: 12.69px;
  margin-top: 15px;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
  /* box-shadow: rgb(135, 135, 135) 0px 4px 7px; */

  &:hover {
    transform: translateY(-10px);
    transition: transform 1s ease;
    box-shadow: rgb(135, 135, 135) 2px 3px 4px;
  }

  &:not(:hover) {
    transform: translateY(0);
    transition: transform 1s ease;
    box-shadow: rgb(135, 135, 135) 1px 2px 3px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  /* padding: 0 20px; */
  padding: 5px 20px 5px 20px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  cursor: pointer;
  margin-right: 3%;
  @media (max-width: 1200px) {
    width: 30px;
    height: 30px;
  }
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const UserNickName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: black;
  margin-left: 8px;
  flex-shrink: 0;
`;

const UserPosition = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const HeartCount = styled.div`
  margin-left: 8px;
`;

const SliderWrapper = styled.div`
  position: relative;
  background-color: #fff;
`;

const CardProfileImg = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  object-fit: cover;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  /* background-color: #bbbbbb; */
  cursor: pointer;
`;
