import {
  ArrowBackIosNew,
  AutoAwesomeOutlined,
  Check,
  Checklist,
  Close,
  ExpandMore,
  Inbox,
  InfoOutlined,
  InsertDriveFileOutlined,
  Interests,
  InterestsOutlined,
  Mail,
  Palette,
  PaletteOutlined,
  Tune,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import Icon from "@mui/material/Icon";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterCategory from "../data/Filter.json";
import { useGetFilterAll } from "../libs/react-query/Queries";

const Filter = (props) => {
  const {
    data: filter,
    mutate: getFilter,
    isPending: gettingFilter,
    isSuccess: filterSuccess,
  } = useGetFilterAll();

  const [windowSize, setWindowSize] = useState(window.innerHeight);
  const [windowScroll, setWindowScroll] = useState(window.scrollY);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerHeight);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    var element = document.getElementById("myElement");
    const handleWindowScroll = () => {
      setWindowScroll(element?.getBoundingClientRect().top + window.scrollY);
    };
    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);
  console.log(windowSize);

  useEffect(() => {
    getFilter();
  }, []);

  const handle = (a, b, c) => {
    if (a == "type") {
      b?.handleType(c);
    } else if (a == "premium") {
      let premium = c == "Premium" ? "true" : "false";
      b?.handlePremium(premium);
    } else if (a == "color") {
      b?.handleColor(c);
    } else if (a == "format") {
      b?.handleFormat(c);
    } else if (a == "style") {
      b?.handleStyle(c);
    }
  };

  return (
    <Box
      height={windowSize - 130}
      position={"sticky"}
      zIndex={1}
      top={128}
      overflow={"auto"}
      className={"scrollFilter"}
    >
      {props.params[0] && (
        <Box
          sx={{ zIndex: 0, borderBottom: "1px solid #d8d8d8", px: 2, py: 2 }}
        >
          <Box sx={{ margin: 0 }}>
            <Box display={"flex"} gap={1} alignItems={"center"} width={"100%"}>
              <Typography noWrap className="sidebarMenuTitle" width={"100%"}>
                Applied filters
              </Typography>
              <Box
                display={"flex"}
                alignItems={"center"}
                onClick={() => props.handle.closeAllFilter()}
                gap={0.5}
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  noWrap
                  width={"100%"}
                  color={"#b1b1b1"}
                  sx={{ fontSize: "13px", fontWeight: 600 }}
                >
                  Clear Filter
                </Typography>

                <Close sx={{ color: "#b1b1b1" }} />
              </Box>
            </Box>
          </Box>
          <Box pt={2}>
            <Box display={"flex"} gap={1} flexWrap={"wrap"}>
              {props?.params.map((b) => (
                <Box
                  p={0.8}
                  key={b.id}
                  className={"toolsFilterSelected"}
                  px={1}
                  sx={{ cursor: "default" }}
                  borderRadius={5}
                  display={"flex"}
                  gap={1}
                  alignItems={"center"}
                >
                  <Typography
                    fontSize={13}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {b.name}
                  </Typography>
                  {b.new && (
                    <Typography fontWeight={600} fontSize={13} color={"green"}>
                      New
                    </Typography>
                  )}
                  <Close
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      props.handle.closeFilter(b.type, b.slug);
                    }}
                    fontSize="10px"
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
      {filter &&
        filter.map((a, i) => {
          return (
            <Accordion
              id={`myElement${i}`}
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
                            props.params.filter((val) => val.slug === b.slug)[0]
                              ? "toolsFilterSelected"
                              : "toolsFilter"
                          }
                          sx={{ cursor: "pointer" }}
                          px={2}
                          onClick={() => {
                            handle(a.param, props.handle, b.name);
                          }}
                          borderRadius={5}
                          display={"flex"}
                          gap={1}
                          alignItems={"center"}
                        >
                          {b.icon !== "" &&
                            {
                              Tune: <Tune />,
                              Interests: <InterestsOutlined fontSize="small" />,
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
                              handle(a.param, props.handle, b.name);
                            }}
                            borderRadius={10}
                            bgcolor={b.color}
                            color={b.colorText}
                          >
                            <Box
                              width={20}
                              height={20}
                              borderRadius={10}
                              border={
                                props.params.filter(
                                  (val) => val.slug === b.slug
                                )[0] && `2px solid ${b.colorText}`
                              }
                            >
                              {props.params.filter(
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
    </Box>
  );
};

export default Filter;
