import {
  AutoAwesomeOutlined,
  Check,
  Close,
  ExpandMore,
  InfoOutlined,
  InsertDriveFileOutlined,
  InterestsOutlined,
  PaletteOutlined,
  Tune,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterCategory from "../data/Filter.json";
import { useGetFilterAll } from "../libs/react-query/Queries";

const Filter2 = ({ props }) => {
  const [params, setParams] = useState({
    page: null,
    size: null,
    title: null,
    type: null,
    color: null,
    format: null,
    style: null,
    premium: null,
    order: null,
  });

  const {
    data: filter,
    mutate: getFilter,
    isPending: gettingFilter,
    isSuccess: filterSuccess,
  } = useGetFilterAll();

  useEffect(() => {
    setParams(props.params);
    getFilter();
  }, [props.params]);

  const handle = (a, c) => {
    if (a == "type") {
      handleType(c);
    } else if (a == "premium") {
      let premium = c == "Premium" ? "true" : "false";
      handlePremium(premium);
    } else if (a == "color") {
      handleColor(c);
    } else if (a == "format") {
      handleFormat(c);
    } else if (a == "style") {
      handleStyle(c);
    }
  };

  const handleType = (e) => {
    let type = e.toLowerCase().split(" ").join("-");
    if (params.type === null) {
      setParams({ ...params, page: 1, type: type });
    } else {
      if (params.type === type) {
        setParams({ ...params, page: 1, type: null });
      } else {
        setParams({ ...params, page: 1, type: type });
      }
    }
  };
  const handlePremium = (e) => {
    let premium = e.toLowerCase();
    if (params.premium === null) {
      setParams({ ...params, page: 1, premium: premium });
    } else {
      if (params.premium === premium) {
        setParams({ ...params, page: 1, premium: null });
      } else {
        setParams({ ...params, page: 1, premium: premium });
      }
    }
  };
  const handleColor = (e) => {
    let color = e.toLowerCase().split(" ").join("-");
    if (params.color === null) {
      setParams({ ...params, page: 1, color: color });
    } else {
      if (params.color === color) {
        setParams({ ...params, page: 1, color: null });
      } else {
        setParams({ ...params, page: 1, color: color });
      }
    }
  };
  const handleFormat = (e) => {
    let format = e.toLowerCase().split(" ").join("-");
    if (params.format === null) {
      setParams({ ...params, page: 1, format: format });
    } else {
      if (params.format === format) {
        setParams({ ...params, page: 1, format: null });
      } else {
        setParams({ ...params, page: 1, format: format });
      }
    }
  };
  const handleStyle = (e) => {
    let style = e.toLowerCase().split(" ").join("-");
    if (params.style === null) {
      setParams({ ...params, page: 1, style: style });
    } else {
      if (params.style === style) {
        setParams({ ...params, page: 1, style: null });
      } else {
        setParams({ ...params, page: 1, style: style });
      }
    }
  };

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

  const filtered = filterList.filter(function (el) {
    return el.name != null;
  });

  const handleSubmit = () => {
    props.setParams(params);
    props.setReload(true);
    props.handleFilterPanelRight();
    window.scrollTo(0, 0);
  };
  return (
    <Drawer
      anchor={"right"}
      open={props.filterPanelRight}
      onClose={props.handleFilterPanelRight}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 5,
        }}
        width={{ xs: "100%", sm: 350, md: 350, lg: 350 }}
      >
        <Box
          borderBottom={"1px solid #d8d8d8"}
          minHeight={55}
          display={"flex"}
          alignItems={"center"}
          bgcolor={"white"}
          gap={1}
          width={{ xs: "100%", sm: 350, md: 350, lg: 350 }}
        >
          <IconButton onClick={props.handleFilterPanelRight}>
            <Close />
          </IconButton>
          <Typography className="sidebarMenuTitle">Filters</Typography>
          <Box width={"100%"} />
          <IconButton onClick={props.handleFilterPanelRight}>
            <Close />
          </IconButton>
        </Box>
      </Box>
      <Box
        role="presentation"
        width={{ xs: "100%", sm: 350, md: 350, lg: 350 }}
        overflow={"auto"}
        mt={7}
        mb={8}
      >
        {filter &&
          filter.map((a) => {
            return (
              <Accordion
                key={a.id}
                elevation={0}
                sx={{ zIndex: 0, border: 0 }}
                defaultExpanded={a.defaultExpanded}
              >
                <AccordionSummary
                  sx={{ margin: 0 }}
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Box display={"flex"} gap={1} alignItems={"center"}>
                    {
                      {
                        Tune: <Tune />,
                        Interests: <InterestsOutlined />,
                        Palette: <PaletteOutlined />,
                        Premium: <WorkspacePremiumOutlined />,
                        Document: <InsertDriveFileOutlined />,
                        Awesome: <AutoAwesomeOutlined />,
                      }[a.icon]
                    }
                    <Typography className="sidebarMenuTitle">
                      {a.title}
                    </Typography>
                    {a.info !== "" && (
                      <Tooltip title={a.info}>
                        <InfoOutlined
                          fontSize="small"
                          sx={{ color: "#b8b8b8" }}
                        />
                      </Tooltip>
                    )}
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box display={"flex"} gap={1} flexWrap={"wrap"}>
                    {a.type === "text"
                      ? a.categoriesValues.map((b) => (
                          <Box
                            p={0.8}
                            key={b.id}
                            className={
                              filtered.filter((val) => val.slug === b.slug)[0]
                                ? "toolsFilterSelected"
                                : "toolsFilter"
                            }
                            sx={{ cursor: "pointer" }}
                            px={2}
                            onClick={() => {
                              handle(a.param, b.name);
                            }}
                            borderRadius={20}
                            display={"flex"}
                            gap={1}
                            alignItems={"center"}
                          >
                            {b.icon !== "" &&
                              {
                                Tune: <Tune />,
                                Interests: (
                                  <InterestsOutlined fontSize="small" />
                                ),
                                Palette: <PaletteOutlined fontSize="small" />,
                                Premium: (
                                  <WorkspacePremiumOutlined fontSize="small" />
                                ),
                                Document: (
                                  <InsertDriveFileOutlined fontSize="small" />
                                ),
                              }[b.icon]}
                            <Typography fontSize={13}>{b.name}</Typography>
                            {b.new && (
                              <Typography
                                fontWeight={600}
                                fontSize={13}
                                color={"green"}
                              >
                                New
                              </Typography>
                            )}
                          </Box>
                        ))
                      : a.categoriesValues.map((b) => (
                          <Tooltip title={b.name} key={b.id}>
                            <Box
                              sx={{
                                cursor: "pointer",
                                aspectRatio: 1 / 1,
                                display: "flex",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                              p={0.1}
                              width={30}
                              height={30}
                              onClick={() => {
                                handle(a.param, b.name);
                              }}
                              borderRadius={20}
                              bgcolor={b.color}
                              color={b.colorText}
                            >
                              <Box
                                width={20}
                                height={20}
                                borderRadius={20}
                                border={
                                  filtered.filter(
                                    (val) => val.slug === b.slug
                                  )[0] && `2px solid ${b.colorText}`
                                }
                              >
                                {filtered.filter(
                                  (val) => val.slug === b.slug
                                )[0] && <Check fontSize="8px" />}
                              </Box>
                            </Box>
                          </Tooltip>
                        ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 5,
          }}
          width={{ xs: "100%", sm: 350, md: 350, lg: 350 }}
        >
          <Box
            borderTop={"1px solid #d8d8d8"}
            display={"flex"}
            alignItems={"center"}
            bgcolor={"white"}
            pt={2}
            pb={2}
            gap={1}
            width={{ xs: "100%", sm: 350, md: 350, lg: 350 }}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{ mx: 2 }}
              size="large"
              onClick={handleSubmit}
            >
              Terapkan
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Filter2;
