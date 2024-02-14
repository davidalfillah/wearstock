import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Header3 from "../../../components/Header3";
import ProfileMenu from "../../../components/profileMenu";
import Gallery from "../../../components/Gallery";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import {
  useGetAuthorID,
  useSearchResourcesByAuthor,
  useSearchResourcesByFavorite,
} from "../../../libs/react-query/Queries";
import {
  ArrowBack,
  ArrowDropDown,
  ArrowForward,
  PermMediaOutlined,
  PhotoLibraryOutlined,
} from "@mui/icons-material";

const FavoritesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [reload, setReload] = React.useState(true);
  const [searchAuth, setSearchAuth] = React.useState("");
  const [data, setData] = React.useState(null);
  const [author, setAuthor] = React.useState(null);

  const [params, setParams] = React.useState({
    page: null,
    size: null,
    title: null,
    titleAuth: null,
    type: null,
    color: null,
    format: null,
    style: null,
    premium: null,
    order: null,
  });

  const pages = params.page ? { page: params.page } : null;
  const size = params.size ? { size: params.size } : null;
  const title = params.title ? { title: params.title } : null;
  const titleAuth = params.titleAuth ? { titleAuth: params.titleAuth } : null;
  const type = params.type ? { type: params.type } : null;
  const color = params.color ? { color: params.color } : null;
  const format = params.format ? { format: params.format } : null;
  const style = params.style ? { style: params.style } : null;
  const premium = params.premium ? { premium: params.premium } : null;
  const order = params.order ? { order: params.order } : null;

  const conditions = Object.assign(
    {},
    pages,
    size,
    title,
    titleAuth,
    type,
    color,
    format,
    style,
    premium,
    order
  );
  const {
    mutateAsync: searchResource,
    data: dataSearch,
    isSuccess,
  } = useSearchResourcesByFavorite();

  const page1 = (a, b) => {
    if (a === "page") {
      if (params.page === b) {
        const data = null;
        return data;
      } else {
        const data = { page: b };
        return data;
      }
    } else {
      if (params.page) {
        const data = { page: params.page };
        return data;
      } else {
        const data = null;
        return data;
      }
    }
  };

  const size1 = (a, b) => {
    if (a === "size") {
      if (params.size === b) {
        const data = null;
        return data;
      } else {
        const data = { size: b };
        return data;
      }
    } else {
      if (params.size) {
        const data = { size: params.size };
        return data;
      } else {
        const data = null;
        return data;
      }
    }
  };

  const getCondit = (a, b) => {
    const page = page1(a, b);
    const size = size1(a, b);

    const condit = Object.assign({}, page, size);
    return condit;
  };

  useEffect(() => {
    const condit = {
      page: 1,
    };
    if (searchParams.get("page") == null && searchParams.get("order") == null) {
      navigate(
        {
          search: `?${createSearchParams(condit)}`,
          pathname: location.pathname,
        },
        { replace: true }
      );
    }
  }, []);

  useEffect(() => {
    setParams({
      ...params,
      page: searchParams.get("page"),
      size: searchParams.get("size"),
      title: searchParams.get("title"),
      titleAuth: searchParams.get("titleAuth"),
      type: searchParams.get("type"),
      color: searchParams.get("color"),
      format: searchParams.get("format"),
      style: searchParams.get("style"),
      premium: searchParams.get("premium"),
      order: searchParams.get("order"),
    });
    window.scrollTo(0, 0);
  }, [location.search]);

  useEffect(() => {
    searchResource({ id, conditions });
  }, [params, id, location.pathname]);

  useEffect(() => {
    setData(dataSearch);
  }, [isSuccess]);

  const handleNext = () => {
    const condit = getCondit("page", data?.meta?.nextPage);
    navigate(
      {
        search: `?${createSearchParams(condit)}`,
        pathname: location.pathname,
      },
      { replace: false }
    );
    window.scrollTo(0, 0);
  };

  const handleBack = (e) => {
    const condit = getCondit("page", data?.meta?.prevPage);
    navigate(
      {
        search: `?${createSearchParams(condit)}`,
        pathname: location.pathname,
      },
      { replace: false }
    );
    window.scrollTo(0, 0);
  };

  const handleOrder = (e) => {
    const condit = getCondit("order", e);
    navigate(
      {
        search: `?${createSearchParams(condit)}`,
        pathname: location.pathname,
      },
      { replace: true }
    );
    setReload(true);
    window.scrollTo(0, 0);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };
  return (
    <Box minHeight={1000}>
      <Header3 />
      <ProfileMenu />
      <Box p={2} px={{ xs: 2, sm: 2, md: 5, lg: 5 }}>
        {data?.meta?.totalPages != 0 && (
          <Box overflow={"auto"}>
            {params.title && (
              <Box
                sx={{ display: "flex", justifyContent: "center" }}
                my={1}
                gap={1}
              >
                <Typography sx={{ fontSize: "24px", fontWeight: 400 }}>
                  Showing results for
                </Typography>
                <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
                  {params.title.split("-").join(" ")}
                </Typography>
              </Box>
            )}
            {/* <Box
              sx={{ justifyContent: "center" }}
              display={{ xs: "flex", sm: "flex", md: "flex", lg: "none" }}
              my={1}
              gap={2}
            >
              <Box
                sx={{ cursor: "pointer" }}
                borderBottom={"2px solid #000"}
                px={1}
                gap={1}
                py={1}
                display={"flex"}
                alignItems={"center"}
              >
                <PhotoLibraryOutlined fontSize="small" />
                <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                  Images
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                  {data?.meta?.totalItems}
                </Typography>
              </Box>
              <Box
                sx={{ cursor: "pointer" }}
                px={1}
                gap={1}
                py={1}
                display={"flex"}
                alignItems={"center"}
              >
                <PermMediaOutlined fontSize="small" />
                <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                  Collections
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                  150
                </Typography>
              </Box>
            </Box> */}

            <Gallery props={data?.data} />
            <Box display={"flex"} alignItems={"center"} my={10}>
              <Box flex={1} display={"flex"} justifyContent={"center"} gap={2}>
                {data?.meta?.currentPage != 1 && (
                  <Button
                    disableElevation
                    variant="outlined"
                    onClick={handleBack}
                    sx={{
                      borderRadius: 3,
                      textTransform: "capitalize",
                      p: 0,
                      minWidth: 44,
                      height: 44,
                      justifyContent: "center",
                      textAlign: "center",
                      gap: 1,
                    }}
                    size="large"
                  >
                    <ArrowBack />
                  </Button>
                )}
                {data?.meta?.totalPages != data?.meta?.currentPage && (
                  <Button
                    disableElevation
                    onClick={handleNext}
                    variant="contained"
                    sx={{
                      borderRadius: 3,
                      textTransform: "capitalize",
                      minWidth: 44,
                      display: "flex",
                      height: 44,
                      gap: 1,
                    }}
                    size="large"
                  >
                    <Typography fontWeight={600} fontSize={14}>
                      Next page
                    </Typography>
                    <ArrowForward />
                  </Button>
                )}
              </Box>
              <Box display={"flex"} alignItems={"center"} gap={1} fontSize={11}>
                <Typography fontSize={14}>Page</Typography>
                <input
                  id="outlined-basic"
                  type="number"
                  defaultValue={data?.meta?.currentPage}
                  style={{
                    width: 50,
                    padding: 10,
                    borderRadius: 10,
                    fontSize: 14,
                    border: "1px solid #b7b7b7",
                    outline: "none",
                  }}
                />
                <Typography fontSize={14}>
                  of {data?.meta?.totalPages}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
        {data?.meta?.totalPages == 0 && (
          <Box>
            {params.title && (
              <Box
                sx={{ display: "flex", justifyContent: "center" }}
                my={1}
                gap={1}
              >
                <Typography sx={{ fontSize: "24px", fontWeight: 400 }}>
                  Opss!! Tidak dapat menemukan untuk pencarian
                </Typography>
                <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
                  {params?.title?.split("-").join(" ")}
                </Typography>
              </Box>
            )}
            {!params.title && (
              <Box
                sx={{ display: "flex", justifyContent: "center" }}
                my={1}
                gap={1}
              >
                <Typography sx={{ fontSize: "24px", fontWeight: 400 }}>
                  Opss!! Tidak dapat menemukan
                </Typography>
              </Box>
            )}
            <Box
              sx={{ display: "flex", justifyContent: "center" }}
              my={1}
              gap={1}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: 400 }}>
                Maaf kami tidak menemukan data sesuai kata kunci dan filter yang
                anda minta
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FavoritesPage;
