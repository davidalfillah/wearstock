import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useCreateFavorite } from "../libs/react-query/Queries";

const Likes = (props) => {
  const likesList = props.post?.Favorite?.map((user) => user.id);
  const [likes, setLikes] = useState(likesList);

  const {
    data: favoriteCreate,
    mutate: createFavorite,
    isPending: creatingFavorite,
    isSuccess: creatingFavoriteSuccess,
  } = useCreateFavorite();

  const handleLikePost = () => {
    let likesArray = [...likes];

    if (likesArray.includes(props.user.id)) {
      likesArray = likesArray.filter((Id) => Id !== props.user.id);
    } else {
      likesArray.push(props.user.id);
    }

    setLikes(likesArray);
    createFavorite({ userId: props.user.id, resourceId: props.post.id });
  };
  return (
    <Tooltip
      title={likes?.includes(props.user.id) ? "Unlike" : "Like"}
      placement="left"
    >
      <Box
        sx={{
          cursor: "pointer",
          boxShadow: "inset 0px 0px 0px 100px #f0f0f0",
          padding: 0.5,
          width: 28,
          height: 28,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
        }}
        onClick={() => handleLikePost()}
      >
        {likes?.includes(props.user.id) ? (
          <Favorite color="error" sx={{ width: 20 }} />
        ) : (
          <FavoriteBorderOutlined sx={{ width: 20 }} />
        )}
      </Box>
    </Tooltip>
  );
};

export default Likes;
