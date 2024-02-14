import React, { useEffect } from "react";
import Header3 from "../../../components/Header3";
import { Avatar, Box, Button, Skeleton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import imageExample from "../../../../public/thumbnail/13.jpg";
import {
  Download,
  Favorite,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  FileCopyOutlined,
  InsertDriveFileOutlined,
  InterestsOutlined,
  PaletteOutlined,
  Search,
  ShieldMoonOutlined,
  Tune,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import FilterCategory from "../../../data/Filter.json";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetResourcesID } from "../../../libs/react-query/Queries";
import { useUserContext } from "../../../contexts/AuthContext";

const DetalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    mutateAsync: getResourceID,
    data: dataID,
    isSuccess,
  } = useGetResourcesID();

  class BlurryImageLoad {
    supportsCSSFilters(enableWebkit) {
      // Copied from https://stackoverflow.com/a/11047247
      if (enableWebkit === undefined) {
        enableWebkit = false;
      }
      //creating an element dynamically
      const element = document.createElement("test");
      //adding filter-blur property to it
      element.style.cssText =
        (enableWebkit ? "-webkit-" : "") + "filter: blur(2px)";
      //checking whether the style is computed or ignored
      const test1 = element.style.length != 0;
      //checking for false positives of IE
      //I prefer Modernizr's smart method of browser detection
      const test2 =
        document.documentMode === undefined || document.documentMode > 9;
      //non-IE browsers, including ancient IEs
      //IE compatibility mode
      //combining test results
      return test1 && test2;
    }

    load(...images) {
      console.log(images);
      // Make all DOM elements with the class blurry-load the default value of the images parameter
      if (images.length === 0) {
        images = document.querySelectorAll(".blurry-load");
      }

      /* Fallback for browsers that don't support support CSS filters (mainly IE)
      If the browser doesn't support CSS filters,
      display a gray background with a shimmer gradient (see the CSS class no-blur for details) */
      if (!this.supportsCSSFilters(true) && !this.supportsCSSFilters(false)) {
        /* If the browser does not support CSS filters
        Checks with and without the -webkit- prefix */
        for (let image of images) {
          image.src = "";
          image.classList.add("no-blur");
          image.classList.remove("blurry-load");
        }
      }

      for (let image of images) {
        const currentImage = new Image();
        currentImage.src = image.getAttribute("data-large");

        // The main function that loads each image once the page has loaded
        currentImage.onload = () => {
          image.src = currentImage.src;
          image.classList.add("blur-out");
          image.classList.remove("blurry-load");
        };
      }
    }
  }

  const {
    user,
    setUser,
    isAuthenticated,
    checkAuthUser,
    isLoading: isUserLoading,
    setIsAuthenticated,
  } = useUserContext();

  const blurryImageLoad = new BlurryImageLoad();

  useEffect(() => {
    if (dataID) {
      dataID.previews?.map((a, i) =>
        blurryImageLoad.load(document.querySelector(`.img-${i + 1}`))
      );
    }
  }, [dataID]);

  /*   const fetchData = () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.unsplash.com/photos/${params.id}`,
      headers: {
        "Accept-Language": "en-US",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Client-ID PrUhvMq-ofkpIoPDH9Ov_RKBfjZ0xqvzQ6EtvMim23A",
      },
    };

    axios(config)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }; */

  useEffect(() => {
    getResourceID(id);
  }, [id]);
  return (
    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
      <Header3 />
      <Box
        py={2}
        sx={{
          alignSelf: "center",
          justifyContent: "center",
          maxWidth: "1400px",
          width: "100%",
        }}
      >
        <Grid2 container width={"100%"}>
          <Grid2 xs={12} sm={12} md={12} lg={9} px={2}>
            {!dataID && (
              <Skeleton variant="rounded" width={"100%"} height={"700px"} />
            )}
            {dataID && (
              <Box
                sx={{
                  minHeight: "320px",
                  display: "flex",
                  height: "auto",
                  justifyContent: "center",
                }}
              >
                <img
                  className={`blurry-load img-${1}`}
                  data-large={
                    dataID?.previews[0].url &&
                    `http://localhost:3307/thumb/${dataID?.previews[0].url}`
                  }
                  src={
                    dataID?.previews[0].url &&
                    `http://localhost:3307/thumb/${dataID?.previews[0].url}`
                  }
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    verticalAlign: "middle",
                    objectFit: "contain",
                    maxHeight: "700px",
                  }}
                />
              </Box>
            )}
            <Box
              display={{ xs: "none", sm: "flex" }}
              gap={1}
              alignItems={"center"}
              my={3}
            >
              <Avatar
                src={
                  dataID?.author.avatar &&
                  `http://localhost:3307/avatars/${dataID?.author.avatar}`
                }
              />
              <Box>
                <Typography>{dataID?.author.name}</Typography>
                <Typography noWrap>{dataID?.previews.name}</Typography>
              </Box>
              <Button variant="contained" disableElevation>
                Follow
              </Button>
              <Box width={"100%"} />
              <Button variant="contained" disableElevation>
                Follow
              </Button>
              <Button variant="contained" disableElevation>
                Follow
              </Button>
            </Box>
            <Box
              display={{ xs: "flex", sm: "none" }}
              gap={1}
              mt={1}
              justifyContent={"space-around"}
              alignItems={"center"}
              py={1}
            >
              <Box textAlign={"center"}>
                <FavoriteBorderOutlined />
                <Typography fontSize={14} mt={0} noWrap>
                  Like
                </Typography>
              </Box>
              <Box textAlign={"center"}>
                <FavoriteBorderOutlined />
                <Typography fontSize={14} mt={0} noWrap>
                  Like
                </Typography>
              </Box>
              <Box textAlign={"center"}>
                <FavoriteBorderOutlined />
                <Typography fontSize={14} mt={0} noWrap>
                  Like
                </Typography>
              </Box>
              <Box textAlign={"center"}>
                <FavoriteBorderOutlined />
                <Typography fontSize={14} mt={0} noWrap>
                  Like
                </Typography>
              </Box>
            </Box>
          </Grid2>
          <Grid2 xs={12} sm={12} md={12} lg={3} mb={3}>
            <Box display={"flex"} justifyContent={"center"}>
              <Box
                height={"auto"}
                width={{ xs: "100%", sm: "auto", md: "100%", lg: "100%" }}
                mx={2}
                display={"flex"}
                justifyContent={"center"}
                flexDirection={{ sm: "column", md: "row", lg: "column" }}
                gap={3}
              >
                <Box
                  display={{ xs: "none", sm: "block" }}
                  minWidth={{ sm: 320, md: 320, lg: 0 }}
                  minHeight={300}
                  bgcolor={"red"}
                >
                  Contoh
                </Box>
                <Box
                  minWidth={{ sm: 320, md: 320, lg: 0 }}
                  width={{ xs: "100%", sm: "auto" }}
                  height={"auto"}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    disableElevation
                    sx={{
                      minHeight: 55,
                      gap: 1,
                      display: { xs: "none", sm: "flex" },
                      textTransform: "capitalize",
                    }}
                  >
                    <Download />
                    <Typography>Download</Typography>
                  </Button>
                  <Box
                    my={3}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={2}
                    fontSize={13}
                  >
                    <Box display={"flex"} gap={1} alignItems={"center"}>
                      <ShieldMoonOutlined />
                      <Typography fontSize={13} fontWeight={600}>
                        Free license
                      </Typography>
                      <Typography
                        sx={{ color: "#b1b1b1" }}
                        fontSize={13}
                        fontWeight={600}
                      >
                        More info
                      </Typography>
                    </Box>
                    <Box display={"flex"} gap={1}>
                      <InterestsOutlined />
                      <Typography fontSize={13} fontWeight={600}>
                        Attribution is required
                      </Typography>
                      <Typography
                        fontSize={13}
                        fontWeight={600}
                        sx={{ color: "#b1b1b1" }}
                      >
                        How to attribute
                      </Typography>
                    </Box>
                    <Box display={"flex"} gap={1}>
                      <InsertDriveFileOutlined />
                      <Typography fontSize={13} fontWeight={600}>
                        File type:{" "}
                      </Typography>
                      <Typography fontSize={13} fontWeight={600}>
                        EPS, AI
                      </Typography>
                      <Typography
                        fontSize={13}
                        fontWeight={600}
                        sx={{ color: "#b1b1b1" }}
                      >
                        How to edit
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              display={{ xs: "flex", sm: "none" }}
              gap={1}
              alignItems={"center"}
              mt={2}
              px={2}
            >
              <Avatar src={dataID?.author.name} />
              <Box>
                <Typography>Contoh</Typography>
                <Typography noWrap>1.202.00 assets</Typography>
              </Box>
              <Box width={"100%"} />
              <Button variant="contained" disableElevation>
                Follow
              </Button>
            </Box>
          </Grid2>
        </Grid2>
        <Grid2 container width={"100%"} px={2}>
          <Grid2 xs={12} sm={12} md={12} lg={9}>
            <Typography sx={{ fontWeight: 600, fontSize: 17, my: 2 }}>
              {dataID?.description}
            </Typography>
            <Typography sx={{ my: 2 }}>Related tags</Typography>
            <Box
              width={"100%"}
              display={"flex"}
              flexWrap={"wrap"}
              rowGap={1}
              sx={{ scrollBehavior: "smooth" }}
              alignItems={"center"}
            >
              {dataID?.tags.map((a, i) => (
                <Box
                  p={1}
                  key={i}
                  sx={{ cursor: "pointer" }}
                  border={"1px solid #b1b1b1"}
                  px={2}
                  mr={1}
                  className={"toolsFilter"}
                  borderRadius={2}
                  display={"flex"}
                  gap={1}
                  alignItems={"center"}
                >
                  <Search />
                  <Typography fontSize={13}>{a.name}</Typography>
                </Box>
              ))}
            </Box>
          </Grid2>
        </Grid2>
        <Box
          px={2}
          mt={2}
          position={"sticky"}
          bottom={0}
          py={1}
          bgcolor={"#fff"}
          borderTop={"1px solid #f8f8f8"}
        >
          <Button
            variant="contained"
            fullWidth
            disableElevation
            sx={{
              minHeight: 55,
              gap: 1,
              display: { xs: "flex", sm: "none" },
              textTransform: "capitalize",
            }}
          >
            <Download />
            <Typography>Download</Typography>
          </Button>
        </Box>
        <Box px={2}>
          <h3>More in this series</h3>
        </Box>
      </Box>
    </Box>
  );
};

export default DetalPage;
