import {
  AppsOutlined,
  ArrowBack,
  ArrowForward,
  ImageOutlined,
  InsertDriveFileOutlined,
  InterestsOutlined,
  PaletteOutlined,
  Search,
  ShapeLineOutlined,
  SportsHandballOutlined,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import FilterCategory from "../data/Filter.json";
import { useNavigate } from "react-router-dom";

const KeywordBar = (props) => {
  const myElementRef = React.useRef(null);
  const [scrollWidth, setScrollWidth] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const [clientWidth, setClientWidth] = React.useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const el = myElementRef.current;
    setScrollLeft(el?.scrollLeft);
    setClientWidth(el?.clientWidth);
    setScrollWidth(el?.scrollWidth);
  }, [props.filterPanelLeft]);

  const buttonRightKeyword = () => {
    document.getElementById("keyWordContainer").scrollLeft += 200;
  };
  const buttonLeftKeyword = () => {
    document.getElementById("keyWordContainer").scrollLeft -= 200;
  };

  useEffect(() => {
    const handleScroll = () => {
      const el = myElementRef.current;
      setScrollLeft(el.scrollLeft);
      setClientWidth(el.clientWidth);
      setScrollWidth(el.scrollWidth);
    };

    const element = myElementRef.current;
    element?.addEventListener("scroll", handleScroll);

    return () => {
      element?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      position={"relative"}
      width={"100%"}
      flex={1}
      overflow={"hidden"}
      display={"flex"}
      alignItems={"center"}
      gap={2}
    >
      {!scrollLeft == 0 && (
        <Box
          position={"absolute"}
          left={0}
          minWidth={55}
          minHeight={55}
          pr={2}
          bgcolor={"white"}
          display={"flex"}
          onClick={buttonLeftKeyword}
          justifyContent={"left"}
          sx={{
            transition: "all 0.5s ease",
            background:
              "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 55%, rgba(255,255,255,0) 100%)",
            cursor: "pointer",
          }}
          alignItems={"center"}
        >
          <ArrowBack />
        </Box>
      )}
      {Math.ceil(scrollWidth) != Math.ceil(clientWidth + scrollLeft) && (
        <Box
          position={"absolute"}
          right={0}
          minWidth={55}
          minHeight={55}
          pl={2}
          sx={{
            transition: "all 0.5s ease",
            background:
              "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 55%, rgba(255,255,255,0) 100%)",
            cursor: "pointer",
          }}
          display={"flex"}
          onClick={buttonRightKeyword}
          justifyContent={"right"}
          alignItems={"center"}
        >
          <ArrowForward />
        </Box>
      )}

      <Box
        width={"100%"}
        display={"flex"}
        overflow={"hidden"}
        id={"keyWordContainer"}
        className="keywordContainer"
        ref={myElementRef}
        sx={{ scrollBehavior: "smooth" }}
        mr={4}
        alignItems={"center"}
      >
        {FilterCategory[0].filterList.map((a) => (
          <Box
            p={1}
            key={a.id}
            sx={{ cursor: "pointer" }}
            px={2}
            mr={3}
            className={
              props?.filtered?.filter((val) => val.slug === a.slug)[0]
                ? "toolsFilterSelected"
                : "toolsFilter"
            }
            borderRadius={20}
            display={
              props?.filtered?.filter((val) => val.slug === a.slug)[0]
                ? "none"
                : "flex"
            }
            onClick={() => props.setType(a.slug)}
            gap={1}
            alignItems={"center"}
          >
            {
              {
                Vectors: <ShapeLineOutlined fontSize="small" />,
                Photos: <ImageOutlined fontSize="small" />,
                Icons: <AppsOutlined fontSize="small" />,
                Mockups: <SportsHandballOutlined fontSize="small" />,
              }[a.name]
            }
            <Typography fontSize={13}>{a.name}</Typography>
            {a.new && (
              <Typography fontWeight={600} fontSize={13} color={"green"}>
                New
              </Typography>
            )}
          </Box>
        ))}
        {props.keyword?.map(
          (a) =>
            a.name !== props?.params.title && (
              <Box
                p={1}
                key={a.id}
                sx={{ cursor: "pointer" }}
                border={"1px solid #b1b1b1"}
                px={2}
                mr={3}
                onClick={() => props.setParams(a.name)}
                className={"toolsFilter"}
                borderRadius={20}
                display={"flex"}
                gap={1}
                alignItems={"center"}
              >
                <Search />
                <Typography noWrap fontSize={13}>
                  {a.name}
                </Typography>
                {/* {a.new && (
              <Typography fontWeight={600} fontSize={13} color={"green"}>
                New
              </Typography>
            )} */}
              </Box>
            )
        )}
      </Box>
    </Box>
  );
};

export default KeywordBar;
