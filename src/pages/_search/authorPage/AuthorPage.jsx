import {
  Box,
  Button,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Gallery from "../../../components/Gallery";
import {
  ArrowBack,
  ArrowBackIosNew,
  ArrowDropDown,
  ArrowForward,
  ArrowForwardIos,
  ArrowForwardIosOutlined,
  ArrowRight,
  PermMediaOutlined,
  PhotoLibraryOutlined,
  Search,
  Tune,
} from "@mui/icons-material";
import HeaderAds1 from "../../../components/HeaderAds1";
import Filter from "../../../components/Filter";
import Header1 from "../../../components/Header1";
import Filter2 from "../../../components/Filter2";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import KeywordBar from "../../../components/KeywordBar";
import {
  useNavigate,
  useParams,
  useSearchParams,
  createSearchParams,
  useLocation,
} from "react-router-dom";
import {
  useCreateFollows,
  useGetAuthorID,
  useSearchKeyword,
  useSearchResources,
  useSearchResourcesByAuthor,
} from "../../../libs/react-query/Queries";
import HeaderProfile from "../../../components/HeaderProfile";

const AuthorPage = () => {
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
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
  } = useSearchResourcesByAuthor();

  const {
    mutateAsync: searchAuthor,
    data: dataAuthor,
    isSuccess: isSuccessAuthor,
  } = useGetAuthorID();

  const filterList = [
    {
      id: 1,
      type: "type",
      name: params.type?.split("-").join(" "),
      slug: params.type,
    },
    {
      id: 2,
      type: "color",
      name: params.color?.split("-").join(" "),
      slug: params.color,
    },
    {
      id: 3,
      type: "format",
      name: params.format?.split("-").join(" "),
      slug: params.format,
    },
    {
      id: 4,
      type: "style",
      name: params.style?.split("-").join(" "),
      slug: params.style,
    },
    {
      id: 5,
      type: "premium",
      name:
        params.premium === "true"
          ? "premium"
          : params.premium === "false"
          ? "free"
          : null,
      slug:
        params.premium === "true"
          ? "premium"
          : params.premium === "false"
          ? "free"
          : null,
    },
  ];

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

  const title1 = (a, b) => {
    if (a === "title") {
      if (params.title === b) {
        const data = { title: b };
        return data;
      }
    } else {
      if (params.title) {
        const data = { title: params.title };
        return data;
      }
    }
  };

  const titleAuth1 = (a, b) => {
    if (a === "titleAuth") {
      if (params.titleAuth !== b) {
        const data = { titleAuth: b };
        return data;
      } else {
        const data = { titleAuth: b };
        return data;
      }
    } else {
      if (params.titleAuth) {
        const data = { titleAuth: params.titleAuth };
        return data;
      } else {
        const data = null;
        return data;
      }
    }
  };

  const type1 = (a, b) => {
    if (a === "type") {
      if (params.type === b) {
        const data = null;
        return data;
      } else {
        const data = { type: b };
        return data;
      }
    } else {
      if (params.type) {
        const data = { type: params.type };
        return data;
      } else {
        const data = null;
        return data;
      }
    }
  };

  const color1 = (a, b) => {
    if (a === "color") {
      if (params.color === b) {
        const data = null;
        return data;
      } else {
        const data = { color: b };
        return data;
      }
    } else {
      if (params.color) {
        const data = { color: params.color };
        return data;
      } else {
        const data = null;
        return data;
      }
    }
  };

  const format1 = (a, b) => {
    if (a === "format") {
      if (params.format === b) {
        const data = null;
        return data;
      } else {
        const data = { format: b };
        return data;
      }
    } else {
      if (params.format) {
        const data = { format: params.format };
        return data;
      } else {
        const data = null;
        return data;
      }
    }
  };

  const style1 = (a, b) => {
    if (a === "style") {
      if (params.style === b) {
        const data = null;
        return data;
      } else {
        const data = { style: b };
        return data;
      }
    } else {
      if (params.style) {
        const data = { style: params.style };
        return data;
      } else {
        const data = null;
        return data;
      }
    }
  };

  const premium1 = (a, b) => {
    if (a === "premium") {
      if (params.premium === b) {
        const data = null;
        return data;
      } else {
        const data = { premium: b };
        return data;
      }
    } else {
      if (params.premium) {
        const data = { premium: params.premium };
        return data;
      } else {
        const data = null;
        return data;
      }
    }
  };

  const order1 = (a, b) => {
    if (a === "order") {
      if (params.order === b) {
        const data = null;
        return data;
      } else {
        const data = { order: b };
        return data;
      }
    } else {
      if (params.order) {
        const data = { order: params.order };
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
    const title = title1(a, b);
    const titleAuth = titleAuth1(a, b);
    const type = type1(a, b);
    const color = color1(a, b);
    const format = format1(a, b);
    const style = style1(a, b);
    const premium = premium1(a, b);
    const order = order1(a, b);

    const condit = Object.assign(
      {},
      page,
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
    return condit;
  };

  const filtered = filterList.filter(function (el) {
    return el.name != null;
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filterPanel, setFilterPanel] = React.useState(
    windowSize < 1200 ? false : true
  );
  const [filterPanelLeft, setFilterPanelLeft] = React.useState(
    windowSize < 1200 ? false : true
  );
  const [filterPanelRight, setFilterPanelRight] = React.useState(false);
  const handleFilterPanelRight = () => {
    if (filterPanel) {
      setFilterPanel(false);
      setFilterPanelRight(false);
    } else {
      setFilterPanel(true);
      setFilterPanelRight(true);
    }
  };
  const handleFilterPanelLeft = () => {
    if (filterPanel) {
      setFilterPanel(false);
      setFilterPanelLeft(false);
    } else {
      setFilterPanel(true);
      setFilterPanelLeft(true);
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const condit = {
      page: 1,
      order: "popular",
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
    searchAuthor(id);
  }, [params, id, location.pathname]);

  useEffect(() => {
    setData(dataSearch);
    setAuthor(dataAuthor);
  }, [isSuccess, isSuccessAuthor]);
  /* 
  useEffect(() => {
    if (reload) {
      window.location.reload();
    }
  }, [reload]); */

  useEffect(() => {
    if (windowSize < 1200) {
      if (filterPanel) {
        setFilterPanelRight(true);
        setFilterPanelLeft(false);
      }
    } else {
      if (filterPanel) {
        setFilterPanelRight(false);
        setFilterPanelLeft(true);
      }
    }

    var header = document.getElementById("header3");
    if (header) {
      window.onscroll = function () {
        if (window.scrollY > 80) {
          header.classList.add("updated-class");
        } else {
          header.classList.remove("updated-class");
        }
      };
    }
  });

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchAuthor(searchAuth);
    }
  };

  const closeFilter = (a, e) => {
    let data = e === "premium" ? "true" : e === "free" ? "false" : e;
    const condit = getCondit(a, data);
    navigate(
      {
        search: `?${createSearchParams(condit)}`,
        pathname: location.pathname,
      },
      { replace: true }
    );
    window.scrollTo(0, 0);
  };

  const closeAllFilter = () => {
    const condit = {
      page: params.page,
      order: params.order,
    };
    navigate(
      {
        search: `?${createSearchParams(condit)}`,
        pathname: location.pathname,
      },
      { replace: true }
    );
    window.scrollTo(0, 0);
  };

  const handleType = (e) => {
    let type = e.toLowerCase().split(" ").join("-");
    const condit = getCondit("type", type);
    navigate(
      {
        search: `?${createSearchParams(condit)}`,
        pathname: location.pathname,
      },
      { replace: true }
    );
    window.scrollTo(0, 0);
  };
  const handlePremium = (e) => {
    let premium = e.toLowerCase();
    const condit = getCondit("premium", premium);
    navigate(
      {
        search: `?${createSearchParams(condit)}`,
        pathname: location.pathname,
      },
      { replace: true }
    );
    window.scrollTo(0, 0);
  };
  const handleColor = (e) => {
    let color = e.toLowerCase().split(" ").join("-");
    const condit = getCondit("color", color);
    navigate(
      {
        search: `?${createSearchParams(condit)}`,
        pathname: location.pathname,
      },
      { replace: true }
    );
    window.scrollTo(0, 0);
  };
  const handleFormat = (e) => {
    let format = e.toLowerCase().split(" ").join("-");
    const condit = getCondit("format", format);
    navigate(
      {
        search: `?${createSearchParams(condit)}`,
        pathname: location.pathname,
      },
      { replace: true }
    );
    window.scrollTo(0, 0);
  };
  const handleStyle = (e) => {
    let style = e.toLowerCase().split(" ").join("-");
    const condit = getCondit("style", style);
    navigate(
      {
        search: `?${createSearchParams(condit)}`,
        pathname: location.pathname,
      },
      { replace: true }
    );
    window.scrollTo(0, 0);
  };

  const handleSearch = (e) => {
    let search = e.toLowerCase().split(" ").join("-");
    const condit = getCondit("title", search);
    navigate(
      {
        search: `?${createSearchParams(condit)}`,
        pathname: "/search",
      },
      { replace: false }
    );
    window.scrollTo(0, 0);
  };

  const handleSearchAuthor = (e) => {
    let search = e.toLowerCase().split(" ").join("-");
    const condit = getCondit("titleAuth", search);
    navigate(
      {
        search: `?${createSearchParams(condit)}`,
        pathname: location.pathname,
      },
      { replace: true }
    );
    window.scrollTo(0, 0);
  };

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
  return (
    <React.Fragment>
      <Header1
        props={{
          filterPanelRight,
          handleFilterPanelRight,
          params,
          setParams,
          handleSearch,
          filtered,
        }}
      />
      <Box width={"100%"} height={{ xs: 100, sm: 100, md: 200, lg: 200 }}>
        {author?.data?.avatar && (
          <img
            src={
              author?.data?.avatar &&
              `http://localhost:3307/avatars/${author?.data?.avatar}`
            }
            style={{
              maxWidth: "inherit",
              maxHeight: "inherit",
              height: "inherit",
              width: "inherit",
              objectFit: "cover",
            }}
          />
        )}
        {!author?.data?.avatar && (
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        )}
      </Box>
      <Filter2
        props={{
          filterPanelRight,
          handleFilterPanelRight,
          params,
          setParams,
          setReload,
          filtered,
        }}
      />

      <Grid2 container>
        {filterPanelLeft && (
          <Grid2
            xs={2}
            borderRight={"1px solid #d8d8d8"}
            top={72}
            zIndex={1}
            mb={0}
          >
            <Box
              px={2}
              borderBottom={"1px solid #d8d8d8"}
              minHeight={65}
              display={"flex"}
              alignItems={"center"}
              pb={0}
              overflow={"hidden"}
              zIndex={3}
              position={"sticky"}
              top={72}
              bgcolor={"white"}
              gap={1}
            >
              <Tune />
              <Typography className="sidebarMenuTitle">Filters</Typography>
              <Box width={"100%"} />
              <IconButton onClick={handleFilterPanelLeft}>
                <ArrowBackIosNew />
              </IconButton>
            </Box>
            <Filter
              handleFilterPanel={handleFilterPanelLeft}
              filterPanel={filterPanelLeft}
              params={filtered}
              handle={{
                handleType,
                handlePremium,
                handleColor,
                handleFormat,
                handleStyle,
                closeFilter,
                closeAllFilter,
              }}
            />
          </Grid2>
        )}

        <Grid2 xs={filterPanelLeft ? 10 : 12}>
          <HeaderProfile />
          <Box
            px={{ xs: 2, sm: 2, md: 5, lg: 5 }}
            id={"header3"}
            minHeight={65}
            display={"flex"}
            alignItems={"center"}
            justifyContent={filterPanelLeft ? "space-between" : "space-between"}
            pb={0}
            position={"sticky"}
            top={72}
            gap={2}
            zIndex={5}
          >
            {!filterPanelLeft && (
              <Box
                p={1}
                px={3}
                bgcolor={"#f0f0f0"}
                borderRadius={2}
                display={{ xs: "none", sm: "none", md: "none", lg: "flex" }}
                sx={{ cursor: "pointer" }}
                gap={1}
                alignItems={"center"}
                onClick={handleFilterPanelLeft}
              >
                <Tune />
                <Typography fontSize={16} fontWeight={600}>
                  Filters
                </Typography>
              </Box>
            )}
            <Box
              sx={{ justifyContent: "center" }}
              display={{ xs: "none", sm: "none", md: "none", lg: "flex" }}
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
            </Box>

            <Box
              display={"flex"}
              borderRadius={10}
              width={{ xs: "100%", sm: "100%", md: "100%", lg: 300 }}
              p={1}
              border={"1px solid #d8d8d8"}
            >
              <Search />
              <input
                placeholder="Search author"
                onKeyDown={handleKeyDown}
                defaultValue={params.titleAuth}
                onChange={(e) => setSearchAuth(e.target.value)}
                style={{ outline: "none", border: "none", width: "100%" }}
              ></input>
            </Box>
            {!filterPanelLeft && (
              <Box
                p={1}
                px={2}
                bgcolor={"#f0f0f0"}
                borderRadius={10}
                display={{ xs: "flex", sm: "flex", md: "flex", lg: "none" }}
                sx={{ cursor: "pointer" }}
                gap={1}
                alignItems={"center"}
                onClick={handleFilterPanelRight}
              >
                <Tune />
              </Box>
            )}
          </Box>

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
                <Box
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
                </Box>
                {data?.meta?.totalPages != 0 && (
                  <Box sx={{ display: "flex" }} my={1}>
                    <Box flex={1} />
                    <Box display={"flex"} alignItems={"center"} gap={2}>
                      <Typography color={"#b2b2b2"} sx={{ fontSize: "15px" }}>
                        Sort by:
                      </Typography>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        gap={0.5}
                        sx={{ cursor: "pointer" }}
                        onClick={handleClick}
                      >
                        <Typography
                          color={"#000"}
                          sx={{ fontSize: "15px", fontWeight: 600 }}
                        >
                          {params.order}
                        </Typography>

                        <ArrowDropDown />
                      </Box>
                    </Box>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        selected={params.order === "popular"}
                        onClick={() => {
                          handleClose();
                          handleOrder("popular");
                        }}
                      >
                        <Typography>Popular</Typography>
                      </MenuItem>
                      <MenuItem
                        selected={params.order === "latest"}
                        onClick={() => {
                          handleClose();
                          handleOrder("latest");
                        }}
                      >
                        <Typography>Latest</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                )}
                <Gallery props={data?.data} />
                <Box display={"flex"} alignItems={"center"} my={10}>
                  <Box
                    flex={1}
                    display={"flex"}
                    justifyContent={"center"}
                    gap={2}
                  >
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
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={1}
                    fontSize={11}
                  >
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
                    Maaf kami tidak menemukan data sesuai kata kunci dan filter
                    yang anda minta
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Grid2>
      </Grid2>
    </React.Fragment>
  );
};

export default AuthorPage;
