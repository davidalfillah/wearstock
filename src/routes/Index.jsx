import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexRoot from "../pages/_root/Index";
import HomePage from "../pages/_root/homePage/HomePage";
import IndexSearch from "../pages/_search/Index";
import SearchPage from "../pages/_search/searchPage/SearchPage";
import DetalPage from "../pages/_search/detailPage/DetalPage";
import AuthComponent from "../pages/_auth/Layout";
import Login from "../pages/_auth/login/login";
import Register from "../pages/_auth/register/register";
import AuthorPage from "../pages/_search/authorPage/AuthorPage";
import MePage from "../pages/_search/Profile/mePage";
import ProfilePage from "../pages/_search/Profile/profilePage";
import DownloadPage from "../pages/_search/Profile/DownloadPage";
import TransactionsPage from "../pages/_search/Profile/TransactionsPage";
import MyCollectionsPage from "../pages/_search/Profile/MyCollectionsPage";
import FollowingsPage from "../pages/_search/Profile/FollowingsPage";
import FavoritesPage from "../pages/_search/Profile/FavoritesPage";
import PostResourcePage from "../pages/_root/postResourcePage/PostResourcePage";

const IndexRoute = () => {
  return (
    <>
      <Routes>
        <Route Component={AuthComponent}>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
        </Route>
        <Route Component={IndexRoot}>
          <Route path="/" Component={HomePage} />
          <Route path="/create-resource" Component={PostResourcePage} />
        </Route>
        <Route path="/" Component={IndexSearch}>
          <Route path="search" Component={SearchPage} />
          <Route path="profile" Component={ProfilePage}>
            <Route path="me" Component={MePage} />
            <Route path="downloads" Component={DownloadPage} />
            <Route path="favorites/:id" Component={FavoritesPage} />
            <Route path="followings" Component={FollowingsPage} />
            <Route path="my-collections" Component={MyCollectionsPage} />
            <Route path="transactions" Component={TransactionsPage} />
          </Route>
          <Route path="search/:id" Component={DetalPage} />
          <Route path="author/:id" Component={AuthorPage} />
        </Route>
      </Routes>
    </>
  );
};

export default IndexRoute;
