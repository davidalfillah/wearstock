import { Box } from "@mui/material";
import React from "react";
import Header2 from "../../../components/Header2";
import CreatePostForm from "../../../components/CreatePostForm";
import BreadcrumbsBar from "../../../components/Breadchumb";

const PostResourcePage = () => {
  return (
    <Box>
      <Header2 background={"#2196f3"} text={"#fff"} isDark={false} />
      <BreadcrumbsBar />
      <CreatePostForm />
    </Box>
  );
};

export default PostResourcePage;
