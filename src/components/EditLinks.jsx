import { Close, Edit, Facebook, Instagram, X } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetAuthorID } from "../libs/react-query/Queries";
import { useUserContext } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { ModalUnstyled } from "./Modal";
import ChangeAvatar from "./ChangeAvatar";
import NewLink from "./NewLink";

const EditLinks = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();
  const [userData, setUserData] = useState();
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitile] = useState("");
  useEffect(() => {
    if (userData === undefined || userData?.length === 0) {
      setUserData(props.user?.links);
    }
  }, [props.user]);
  console.log(userData);
  const handleCancle = () => {
    setNewUrl("");
    setNewTitile("");
    handleClose();
  };

  const handleDeleteLink = (a) => {
    let likesArray = [...userData];
    let deleteArray = [...props.deleteLinks];
    if (likesArray.find((c) => c.id === a.id)) {
      likesArray = likesArray.filter((b) => b.id !== a.id);
      deleteArray.push(a);
    }
    /* likesArray.push(user.id); */
    props.setDeleteLinks(deleteArray);
    setUserData(likesArray);
  };

  const handleCreateLink = () => {
    let Link = {
      createdAt: "",
      id: "",
      name: newTitle,
      slug: newTitle.toLocaleLowerCase().split(" ").join("-"),
      updatedAt: "",
      url: newUrl,
      userId: props.user.id,
    };
    let newArray = [...props.newLinks];
    let likesArray = [...userData];

    newArray.push(Link);
    likesArray.push(Link);
    /* likesArray.push(user.id); */
    props.setNewLinks(newArray);
    setUserData(likesArray);
    setNewUrl("");
    setNewTitile("");
    handleClose();
  };

  return (
    <>
      <ModalUnstyled
        title={"Add new social media"}
        open={open}
        disabled={newUrl && newTitle}
        handleClose={handleCancle}
        hadleSubmit={handleCreateLink}
        content={
          <NewLink
            input={newUrl}
            setInput={setNewUrl}
            title={newTitle}
            setTitle={setNewTitile}
          />
        }
      />
      {userData?.map((a, i) => (
        <Box
          key={i}
          display={"flex"}
          border={"1px solid #d8d8d8"}
          alignItems={"center"}
          p={1}
          gap={1}
          borderRadius={1}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            borderRadius={5}
            px={1}
            py={1}
            gap={1}
            bgcolor={"rgba(0,0,0,0.1)"}
          >
            {
              {
                Twitter: <X fontSize="small" />,
                Facebook: <Facebook fontSize="small" />,
                Instagram: <Instagram fontSize="small" />,
              }[a.name]
            }
            <Typography display={{ xs: "none", sm: "block" }} fontSize={"12px"}>
              {
                {
                  Twitter: "https://www.twitter.com/",
                  Facebook: "https://www.facebook.com/",
                  Instagram: "https://www.instagram.com/",
                }[a.name]
              }
            </Typography>
          </Box>
          <Typography flex={1} alignItems={"center"}>
            {a.url}
          </Typography>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteLink(a)}>
            <Close />
          </IconButton>
        </Box>
      ))}

      <Button onClick={handleOpen}>Add New</Button>
    </>
  );
};

export default EditLinks;
