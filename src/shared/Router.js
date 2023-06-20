import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "../pages/Start";
import Main from "../pages/Main";
import Login from "../pages/Login/Login";
import Layout from "./Layout";
import Feed from "../pages/Feed";
// import FeedDetail from "../components/FeedDetail";
import Board from "../pages/Board";
import IntegratedSignup from "../pages/IntegratedSignup";
import EmailSignup from "../pages/EmailSignup";
import MyPage from "../pages/MyPage";
import MyPageInformation from "../pages/MyPageInformation";
import KakaoLoginRedirect from "../pages/Login/KakaoLoginRedirect";
import MyPageFeed from "../pages/MyPageFeed";
import MyPageBoard from "../pages/MyPageBoard";
import BoardDetail from "../pages/BoardDetail";
import ChatTest from "../pages/ChatTest";
import ScrollToTop from "../components/ScrollToTop";
import ChatList from "../pages/ChatList";
import ChatRoomList from "../pages/ChatRoomList";

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="main" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="/users/kakao" element={<KakaoLoginRedirect />} />
          <Route path="integratedsignup" element={<IntegratedSignup />} />
          <Route path="emailsignup" element={<EmailSignup />} />
          <Route path="feeds" element={<Feed />} />
          <Route path="board" element={<Board />} />
          <Route path={`page/:hostId`} element={<MyPage />} />
          <Route
            path={`mypageinformation/:hostId`}
            element={<MyPageInformation />}
          />
          <Route path={`mypagefeed/:hostId`} element={<MyPageFeed />} />
          <Route path={`mypageboard/:hostId`} element={<MyPageBoard />} />
          <Route path={`board/:boardId`} element={<BoardDetail />} />
          <Route path={`chattest/:receiverId`} element={<ChatTest />} />
          {/* <Route path={`chatlist/:hostId`} element={<ChatList />} /> */}
          <Route path={`chatroomlist/:hostId`} element={<ChatRoomList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
