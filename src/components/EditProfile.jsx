import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  InputBase,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  Close,
  Edit,
  ExpandMoreOutlined,
  Facebook,
  Instagram,
  More,
  MoreHoriz,
  PostAdd,
  Share,
  X,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../contexts/AuthContext";
import {
  useCreateMoreLinks,
  useDeleteMoreLinks,
  useUpdateMoreLinks,
  useUpdateUserAccount,
  useUploadAvatar,
} from "../libs/react-query/Queries";
import { useDropzone } from "react-dropzone";
import { ModalUnstyled } from "./Modal";
import ChangeAvatar from "./ChangeAvatar";
import { Buffer } from "buffer";
import EditLinks from "./EditLinks";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [open, setOpen] = React.useState(false);
  const [newLinks, setNewLinks] = React.useState([]);
  const [deleteLinks, setDeleteLinks] = React.useState([]);
  const [updateLinks, setUpdateLinks] = React.useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [avatarPreview, setAvatarPreview] = React.useState(null);
  const [avatarScale, setAvatarScale] = React.useState(1);
  const [avatarPosition, setAvatarPosition] = React.useState({
    x: 0.5,
    y: 0.5,
  });
  const [avatarImage, setAvatarImage] = React.useState("");
  const editorRef = React.useRef(null);
  const navigate = useNavigate();

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setAvatarImage(acceptedFiles[0]);
      },
    });

  const handleScale = (_, newValue) => {
    setAvatarScale(newValue);
  };

  const handleSave = () => {
    const editor = editorRef.current;
    const img = editor.getImageScaledToCanvas().toDataURL();
    const rect = editor.getCroppingRect();

    setAvatarPreview({
      img,
      rect,
      scale: avatarScale,
      width: 350,
      height: 250,
      borderRadius: 0,
    });
    handleClose();
    const name = `${Math.random().toString(36).slice(-5)}.png`;
    var arr = img?.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const file = new File([u8arr], name, { type: mime });
    setUser({
      ...user,
      file: file,
    });
  };

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    avatar: "",
    isAdmin: "",
    links: [],
    file: null,
  });
  const {
    mutate: updateUser,
    isSuccess: updattingUserSuccess,
    isPending: updatting,
  } = useUpdateUserAccount();

  const {
    mutate: createLink,
    isSuccess: creatingLinkSuccess,
    isPending: creatingLink,
  } = useCreateMoreLinks();

  const {
    mutate: updateLink,
    isSuccess: updatingLinkSuccess,
    isPending: updatingLink,
  } = useUpdateMoreLinks();

  const {
    mutate: deleteLink,
    isSuccess: deletingLinkSuccess,
    isPending: deletingLink,
  } = useDeleteMoreLinks();

  const {
    mutate: uploadAvatar,
    isSuccess: uploadingAvatarSuccess,
    isPending: uploadingAvatar,
  } = useUploadAvatar();

  const {
    user: userData,
    isLoading: isUserLoading,
    checkAuthUser,
  } = useUserContext();

  const handleCancle = (a) => {
    setAvatarImage("");
    handleClose();
  };

  const handleUpdateUser = () => {
    const avatarId = {
      file: user.file,
      id: user.id,
      name: user.name.toLowerCase().split(" ").join("-"),
    };
    if (avatarPreview) {
      uploadAvatar(avatarId);
    }
    if (deleteLinks.length > 0) {
      deleteLink(deleteLinks);
    }
    if (newLinks.length > 0) {
      createLink(newLinks);
    }
    setNewLinks([]);
    setDeleteLinks([]);
    updateUser(user);
    setAvatarImage("");
  };

  useEffect(() => {
    setUser(userData);
  }, [
    userData,
    deletingLink,
    isUserLoading,
    creatingLinkSuccess,
    deletingLinkSuccess,
  ]);

  useEffect(() => {
    checkAuthUser();
  }, [
    updattingUserSuccess,
    uploadingAvatarSuccess,
    updatingLinkSuccess,
    updatingLinkSuccess,
    deletingLinkSuccess,
    creatingLinkSuccess,
  ]);
  return (
    <Box
      display={"flex"}
      mt={2}
      boxSizing={"border-box"}
      flexDirection={{ xs: "column", sm: "column", md: "row" }}
      gap={2}
      mb={5}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"flex-start"}
    >
      <Box
        p={2}
        px={10}
        border={{ sm: "none", md: "1px solid #d8d8d8" }}
        boxSizing={"border-box"}
        width={{ xs: "100%", sm: "100", md: "auto", lg: "auto" }}
        borderRadius={2}
        display={"flex"}
        textAlign={"center"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        gap={2}
      >
        <Avatar
          src={
            avatarPreview
              ? avatarPreview.img
              : user.avatar && `http://localhost:3307/avatars/${user.avatar}`
          }
          onClick={handleOpen}
          sx={{
            height: "90px",
            width: "90px",
          }}
        />
        <ModalUnstyled
          open={open}
          disabled={avatarImage}
          title={"Change Avatar"}
          handleClose={handleCancle}
          hadleSubmit={handleSave}
          content={
            <ChangeAvatar
              props={{
                getRootProps,
                getInputProps,
                isFocused,
                isDragAccept,
                isDragReject,
                avatarPosition,
                setAvatarPosition,
                avatarImage,
                avatarScale,
                editorRef,
                handleScale,
              }}
            />
          }
        />
        <Typography fontSize={"16px"} fontWeight={600}>
          {userData.name}
        </Typography>
      </Box>
      <Box
        display={"flex"}
        alignItems={"flex-end"}
        flexDirection={"column"}
        width={{ xs: "100%", sm: "100", md: 500, lg: 700 }}
        gap={2}
      >
        <Box
          border={{ sm: "none", md: "1px solid #d8d8d8" }}
          boxSizing={"border-box"}
          px={2}
          py={2}
          borderRadius={2}
          width={{ xs: "100%", sm: "100", md: 500, lg: 700 }}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          gap={2}
        >
          <Typography>Account data</Typography>
          <TextField
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            type="text"
            id="name"
            label="Name"
            variant="outlined"
          />
          <TextField
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            id="email"
            label="Email"
            variant="outlined"
          />
          <Button variant="text">Reset Password</Button>
        </Box>

        <Box
          border={{ sm: "none", md: "1px solid #d8d8d8" }}
          boxSizing={"border-box"}
          px={2}
          py={2}
          borderRadius={2}
          width={{ xs: "100%", sm: "100", md: 500, lg: 700 }}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          gap={2}
        >
          <Typography mt={2}>Social Media</Typography>
          <EditLinks
            user={user}
            newLinks={newLinks}
            setNewLinks={setNewLinks}
            deleteLinks={deleteLinks}
            setDeleteLinks={setDeleteLinks}
            updateLinks={updateLinks}
            setUpdateLinks={setUpdateLinks}
          />
        </Box>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent={"flex-end"}
          gap={1}
          alignItems={"center"}
          mb={2}
          width={"100%"}
          px={2}
          boxSizing={"border-box"}
        >
          {(user !== userData ||
            newLinks.length > 0 ||
            deleteLinks.length > 0) && (
            <Typography>Changes have not been saved</Typography>
          )}
          <Button
            sx={{
              width: { xs: "100%", sm: "100%", md: "auto" },
              borderRadius: "20px",
            }}
            variant="outlined"
            disableElevation
            onClick={() => navigate(-1)}
          >
            Cancle
          </Button>
          <Button
            sx={{
              width: { xs: "100%", sm: "100%", md: "auto" },
              borderRadius: "20px",
            }}
            disableElevation
            disabled={
              user == userData &&
              newLinks.length == 0 &&
              deleteLinks.length == 0
            }
            variant="contained"
            onClick={handleUpdateUser}
          >
            Save changed
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;
