import {
  Edit,
  Facebook,
  Instagram,
  PostAdd,
  Share,
  X,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../contexts/AuthContext";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useCreateFollows,
  useGetAuthorID,
  useSearchResourcesByAuthor,
} from "../libs/react-query/Queries";

const HeaderProfile = (props) => {
  const {
    user,
    setUser,
    isAuthenticated,
    checkAuthUser,
    isLoading: isUserLoading,
    setIsAuthenticated,
  } = useUserContext();
  const [links, setLinks] = useState([]);
  const [data, setData] = useState();
  const [follows, setFollows] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const {
    mutateAsync: searchAuthor,
    data: dataAuthor,
    isSuccess: isSuccessAuthor,
  } = useGetAuthorID();

  const {
    mutateAsync: createFollows,
    data: dataFollows,
    isSuccess: isSuccessFollows,
  } = useCreateFollows();

  const handleFollows = () => {
    let followsArray = [...follows];

    if (followsArray.includes(user.id)) {
      followsArray = followsArray.filter((Id) => Id !== user.id);
    } else {
      followsArray.push(user.id);
    }

    setFollows(followsArray);
    createFollows({
      userFollowingId: user.id,
      userFollowedgId: id,
    });
  };

  useEffect(() => {
    searchAuthor(id);
  }, [isSuccessFollows, id, location]);

  useEffect(() => {
    setData(dataAuthor);
    setFollows(dataAuthor?.data?.to?.map((user) => user.id));
    setLinks(dataAuthor?.data?.links);
  }, [isSuccessAuthor]);

  if (data) {
    return (
      <Box>
        <Box
          borderBottom={"1px solid #d8d8d8"}
          display={"flex"}
          py={2}
          width={"100%"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          alignItems={"center"}
          rowGap={2}
          minHeight={90}
          columnGap={6}
        >
          <Box display={"flex"} gap={2} flex={1} width={"100%"}>
            <Avatar
              src={
                data?.data?.avatar &&
                `http://localhost:3307/avatars/${data?.data?.avatar}`
              }
              sx={{
                width: 130,
                height: 130,
                ml: { xs: 2, sm: 2, md: 5, lg: 5 },
              }}
            />
            <Box
              flex={1}
              display={"flex"}
              flexDirection={"column"}
              gap={1}
              mr={{ xs: 2, sm: 2, md: 5, lg: 5 }}
              overflow={"hidden"}
            >
              <Box width={"100%"}>
                <Typography
                  maxWidth={"100%"}
                  noWrap
                  sx={{ fontSize: "22px", fontWeight: 600 }}
                >
                  {data?.data?.name}
                </Typography>
                <Typography width={"100%"} noWrap sx={{ color: "#777" }}>
                  {`@${data?.data?.username}`}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                flexWrap={"wrap"}
                gap={1}
              >
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                    {data?.meta.assets}
                  </Typography>
                  <Typography sx={{ color: "#777" }}>assets</Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                    {data?.meta.followers}
                  </Typography>
                  <Typography sx={{ color: "#777" }}>followers</Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                    {data?.meta.downloads}
                  </Typography>
                  <Typography sx={{ color: "#777" }}>downloads</Typography>
                </Box>
              </Box>
              <Box display={"flex"} gap={2} alignItems={"center"}>
                {links?.map((a) => (
                  <a
                    key={a.id}
                    href={
                      {
                        Facebook: `https://www.facebook.com/${a.url}`,
                        Twitter: `https://www.instagram.com/${a.url}`,
                        Instagram: `https://www.instagram.com/${a.url}`,
                      }[a.name]
                    }
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "black" }}
                  >
                    {
                      {
                        Facebook: <Facebook />,
                        Twitter: <X />,
                        Instagram: <Instagram />,
                      }[a.name]
                    }
                  </a>
                ))}
              </Box>
              <Box display={"flex"} gap={2} alignItems={"center"}>
                {user.id !== id && (
                  <Button
                    variant={
                      follows?.includes(user.id) ? "outlined" : "contained"
                    }
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "20px",
                    }}
                    size="medium"
                    onClick={handleFollows}
                  >
                    {follows?.includes(user.id) ? "Unfollow" : "Follow"}
                  </Button>
                )}
                {user.id === id && (
                  <Button
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "20px",
                    }}
                    onClick={() => navigate({ pathname: `/create-resource` })}
                    startIcon={<PostAdd />}
                    variant="outlined"
                    size="medium"
                  >
                    Add Post
                  </Button>
                )}
                {user.id === id && (
                  <Button
                    onClick={() => navigate({ pathname: `/profile/me` })}
                    startIcon={<Edit />}
                    variant="outlined"
                    size="medium"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "20px",
                    }}
                  >
                    Edit profile
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box>
        <Box>
          <Box
            borderBottom={"1px solid #d8d8d8"}
            display={"flex"}
            py={2}
            width={"100%"}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
            alignItems={"center"}
            rowGap={2}
            minHeight={90}
            columnGap={6}
          >
            <Box display={"flex"} gap={2} flex={1} width={"100%"}>
              <Skeleton
                variant="circular"
                sx={{ ml: { xs: 2, sm: 2, md: 5, lg: 5 } }}
                width={130}
                height={130}
              />
              <Box
                flex={1}
                display={"flex"}
                flexDirection={"column"}
                gap={1}
                mr={{ xs: 2, sm: 2, md: 5, lg: 5 }}
                overflow={"hidden"}
              >
                <Box width={"100%"}>
                  <Skeleton variant="rounded">
                    <Typography
                      maxWidth={"100%"}
                      noWrap
                      sx={{ fontSize: "22px", fontWeight: 600 }}
                    >
                      Example Name
                    </Typography>
                  </Skeleton>
                  <Skeleton variant="rounded" sx={{ mt: 1 }}>
                    <Typography width={"100%"}>@coba aja nih</Typography>
                  </Skeleton>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  flexWrap={"wrap"}
                  gap={1}
                >
                  <Skeleton variant="rounded">
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                        50
                      </Typography>
                      <Typography sx={{ color: "#777" }}>assets</Typography>
                    </Box>
                  </Skeleton>

                  <Skeleton variant="rounded">
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                        50
                      </Typography>
                      <Typography sx={{ color: "#777" }}>assets</Typography>
                    </Box>
                  </Skeleton>
                  <Skeleton variant="rounded">
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                        50
                      </Typography>
                      <Typography sx={{ color: "#777" }}>assets</Typography>
                    </Box>
                  </Skeleton>
                </Box>

                <Box display={"flex"} gap={2} alignItems={"center"}>
                  <Skeleton variant="rounded">
                    <Facebook />
                  </Skeleton>
                  <Skeleton variant="rounded">
                    <Facebook />
                  </Skeleton>
                </Box>
                <Box display={"flex"} gap={2} alignItems={"center"}>
                  <Skeleton variant="rounded">
                    <Button
                      variant="outlined"
                      sx={{
                        textTransform: "capitalize",
                      }}
                      size="small"
                      onClick={handleFollows}
                    >
                      Followsaaaaaa
                    </Button>
                  </Skeleton>
                  <Skeleton variant="rounded">
                    <Button
                      variant="outlined"
                      sx={{
                        textTransform: "capitalize",
                      }}
                      size="small"
                      onClick={handleFollows}
                    >
                      Followsaaaaaa
                    </Button>
                  </Skeleton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
};

export default HeaderProfile;
