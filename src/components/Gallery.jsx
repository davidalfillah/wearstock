import {
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Masonry from "@mui/lab/Masonry";

import {
  AutoAwesomeOutlined,
  CreateNewFolderOutlined,
  Edit,
  ExpandMore,
  Favorite,
  FavoriteBorder,
  FavoriteBorderOutlined,
  InfoOutlined,
  InsertDriveFileOutlined,
  Interests,
  InterestsOutlined,
  Palette,
  PaletteOutlined,
  Tune,
  WorkspacePremium,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";
import { useCreateFavorite } from "../libs/react-query/Queries";
import { styled } from "@mui/material/styles";
import Likes from "./Likes";
import { convertLength } from "@mui/material/styles/cssUtils";

const heights = [
  300, 400, 700, 500, 300, 700, 300, 800, 900, 700, 300, 500, 200, 500, 700,
];

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
}));

const Gallery = (props) => {
  const datas = props.props;
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
      const test1 = element.style?.length != 0;
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
    if (datas) {
      datas?.map((a, i) =>
        blurryImageLoad.load(document.querySelector(`.img-${i + 1}`))
      );
    }
  }, [datas]);

  const location = useLocation();
  const [imageHeight, setImageHeight] = React.useState(
    Math.floor(Math.random() * 60) + 200
  );
  const gcd = (a, b) => {
    if (b > a) {
      let temp = a;
      a = b;
      b = temp;
    }
    while (b != 0) {
      let m = a % b;
      a = b;
      b = m;
    }
    return a;
  };

  const ratio1 = (x, y) => {
    let c = gcd(x, y);
    return x / c;
  };

  const ratio2 = (x, y) => {
    let c = gcd(x, y);
    return y / c;
  };

  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const imageOnLoad = (event) => {
    document.getElementById(`skeleton${event.target.id}`).style.display =
      "none";
    document.getElementById(`imageGallery${event.target.id}`).style.display =
      "block";
  };

  return (
    <Masonry
      children={
        <>
          {props.props &&
            props.props?.map((a, i) => (
              <Box
                className={"pics"}
                key={i}
                position={"relative"}
                sx={{
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  display: "block",
                  width: "100%",
                }}
              >
                <NavLink to={`/author/${a.authorId}?page=1&order=popular`}>
                  <Box
                    className={"author"}
                    sx={{
                      visibility: "hidden",
                      cursor: "pointer",
                      opacity: "0",
                      transition: "visibility 0s, opacity 0.3s linear",
                      position: "absolute",
                      zIndex: 2,
                      bottom: 10,
                      left: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Avatar
                      src={
                        a.author.avatar &&
                        `http://localhost:3307/avatars/${a.author.avatar}`
                      }
                      sx={{
                        width: 24,
                        height: 24,
                      }}
                    />
                    <Typography fontSize={12} color={"white"}>
                      {a.author.name}
                    </Typography>
                  </Box>
                </NavLink>
                <Box
                  className={"author"}
                  sx={{
                    visibility: "hidden",
                    opacity: "0",
                    transition: "visibility 0s, opacity 0.3s linear",
                    position: "absolute",
                    zIndex: 2,
                    flexDirection: "column",
                    top: 10,
                    right: 10,
                    display: "flex",
                    alignItems: "end",
                    gap: 1,
                  }}
                >
                  {a.author.id == user.id && (
                    <Tooltip title="Edit Resource" placement="left">
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
                          borderRadius: 20,
                        }}
                      >
                        <Edit sx={{ width: 20 }} />
                      </Box>
                    </Tooltip>
                  )}
                  <Tooltip title="Add to collection" placement="left">
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
                        borderRadius: 20,
                      }}
                    >
                      <CreateNewFolderOutlined sx={{ width: 20 }} />
                    </Box>
                  </Tooltip>

                  <Likes post={a} user={user} />
                </Box>

                {a.premium && (
                  <Tooltip title="Premium content" placement="right">
                    <Box
                      sx={{
                        position: "absolute",
                        zIndex: 2,
                        left: 10,
                        top: 10,
                        width: 28,
                        padding: 0.5,
                        height: 28,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(10,21,47,0.65)",
                        aspectRatio: "1/1",
                        borderRadius: "20px",
                      }}
                    >
                      <WorkspacePremium
                        fontSize="small"
                        sx={{ color: "#feb602" }}
                      />
                    </Box>
                  </Tooltip>
                )}
                {a.formats && (
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      right: 10,
                      bottom: 10,
                      padding: 0.5,
                      height: "max-content",
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "end",
                      borderRadius: "20px",
                    }}
                  >
                    {a.formats.slice(0, 3).map((b) => (
                      <Box
                        key={b.id}
                        sx={{
                          paddingX: 0.5,
                          backgroundColor: {
                            PDF: "red",
                            AI: "#330000",
                            CDR: "#3DC728",
                            EPS: "#330000",
                          }[b.name],
                          color: {
                            PDF: "#fff",
                            AI: "#FF9A00",
                            CDR: "#FFF",
                            EPS: "#FF9A00",
                          }[b.name],
                        }}
                      >
                        <Typography fontSize={12} fontWeight={600}>
                          {b.name}
                        </Typography>
                      </Box>
                    ))}
                    {a?.formats?.length > 3 && (
                      <Tooltip
                        title={a.formats.slice(3, 10).map((b) => {
                          const last = a.formats.length;
                          if (a.formats.indexOf(b) + 1 !== last) {
                            return b.name + ", ";
                          } else {
                            return b.name;
                          }
                        })}
                      >
                        <Box
                          sx={{
                            cursor: "pointer",
                            paddingX: 0.5,
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography fontSize={12} fontWeight={600}>
                            {`+${a.formats?.length - 3}`}
                          </Typography>
                        </Box>
                      </Tooltip>
                    )}
                  </Box>
                )}
                {/*     <Skeleton
                    variant="rounded"
                    id={`skeleton${i}`}
                    style={{ display: "block" }}
                    className={`skeleton${i}`}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: a.previews[0]?.height,
                        borderRadius: "8px",
                        verticalAlign: "middle",
                        objectFit: "contain",
                        filter: "blur(10x)",
                      }}
                      effect="blur"
                      src={
                        a.previews[0]?.url &&
                        `http://localhost:3307/thumb/${a.previews[0].url}`
                      }
                      alt={a.alt_description}
                    />
                  </Skeleton> */}
                <Link
                  sx={{
                    overflow: "hidden",
                    borderRadius: "20px",
                  }}
                  href={`../../search/${a.id}`}
                >
                  <Box
                    className={"author"}
                    sx={{
                      position: "absolute",
                      cursor: "pointer",
                      zIndex: 1,
                      visibility: "hidden",
                      borderRadius: "8px",
                      background:
                        "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))",
                    }}
                    height={"100%"}
                    width={"100%"}
                  />
                </Link>
                <Box id={`imageGallery${i}`}>
                  <img
                    id={i}
                    style={{
                      width: "100%",
                      height: a.previews[0]?.height,
                      borderRadius: "8px",
                      verticalAlign: "middle",
                      objectFit: "contain",
                    }}
                    className={`blurry-load imageGallery img-${i + 1}`}
                    effect="blur"
                    data-large={`http://localhost:3307/thumb/${a.previews[0].url}`}
                    src={`http://localhost:3307/thumb/${a.previews[0].url}`}
                    alt={a.alt_description}
                  />
                </Box>
              </Box>
            ))}
          {!props.props &&
            heights.map((height, index) => (
              <Item key={index} sx={{ height }}>
                <Skeleton variant="rounded" height={"100%"} />
              </Item>
            ))}
        </>
      }
      columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      sx={{ width: "100%" }}
    />
  );
};

export default Gallery;
