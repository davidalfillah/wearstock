import { Close, Search } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import Category from "../data/Category.json";
import reactLogo from "../assets/logo1-white.svg";
import { useNavigate } from "react-router-dom";

const Hero1 = () => {
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate(
      {
        pathname: "/search",
        search: `title=${search}&page=1&order=popular`,
      },
      { replace: false }
    );
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (search !== "") {
        onSubmit();
      }
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#2196f3",
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        py: { sm: 2, md: 6 },
      }}
    >
      <Box
        sx={{
          maxWidth: "87.5rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
        }}
      >
        <Box
          padding={2}
          sx={{
            maxWidth: "87.5rem",
            display: "flex",
            flexDirection: "column",
            rowGap: 2,
          }}
        >
          <Box display={{ xs: "block", sm: "block", md: "none", lg: "none" }}>
            <img
              src={reactLogo}
              className="logo react"
              alt="React logo"
              height={5}
              color="#fff"
            />
          </Box>
          <Typography fontSize={"2rem"} fontWeight={600} color={"white"}>
            Create great designs, faster
          </Typography>
          <Typography color={"white"} fontSize={"1.25rem"}>
            High-quality photos, videos, vectors, PSD, AI images, icons... to go
            from ideas to outstanding designs
          </Typography>
          <Box
            sx={{
              backgroundColor: "#fff",
              width: "100%",
              maxWidth: "68.5rem",
              borderRadius: 5,
              height: 45,
              alignSelf: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              display={"flex"}
              width={"100%"}
              padding={1}
              paddingX={2}
              height={30}
            >
              <input
                onKeyDown={handleKeyDown}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                type="text"
                style={{
                  background: "none",
                  fontSize: 15,
                  border: 0,
                  outline: "none",
                  width: "100%",
                }}
              />
            </Box>
            <IconButton>
              <Close />
            </IconButton>
            <Box
              sx={{
                marginLeft: 1,
                height: "100%",
                borderRight: "1px solid #d8d8d8",
              }}
            />
            <Button
              color="primary"
              onClick={onSubmit}
              sx={{
                height: "100%",
                borderTopRightRadius: 20,
                borderTopLeftRadius: 0,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 0,
                paddingX: 4,
                gap: 1,
                outline: "none",
                color: "#000",
                textTransform: "capitalize",
              }}
              variant="text"
              disableElevation
            >
              <Search fontSize="medium" color="#777" /> Search
            </Button>
          </Box>
          <Box display={"flex"} gap={1} justifyContent={"center"}>
            <Box
              sx={{
                backgroundColor: "rgba(250,250,250,0.5)",
                px: 1,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                py: 0.5,
                borderRadius: 2,
                cursor: "pointer",
              }}
            >
              <Search fontSize="small" color="#777" />
              <Typography fontSize={15} p={0} m={0}>
                Color
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "rgba(250,250,250,0.5)",
                px: 1,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                py: 0.5,
                borderRadius: 2,
                cursor: "pointer",
              }}
            >
              <Search fontSize="small" color="#777" />
              <Typography fontSize={15} p={0} m={0}>
                Mockup
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "rgba(250,250,250,0.5)",
                px: 1,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                py: 0.5,
                borderRadius: 2,
                cursor: "pointer",
              }}
            >
              <Search fontSize="small" color="#777" />
              <Typography fontSize={15} p={0} m={0}>
                Real Madrid
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          className="scrollCategory"
          justifyContent={{ sm: "left", md: "center" }}
          gap={5}
          py={3}
          px={2}
        >
          {Category.slice(0, 5).map((a) => (
            <Box width={"200px"} key={a.id}>
              <Box
                height={110}
                width={200}
                border={"3px solid rgba(250,250,250,0.5)"}
                p={0.7}
                mb={1}
                borderRadius={5}
              >
                <img
                  src={a.image}
                  width={"100%"}
                  height={110}
                  style={{ borderRadius: 14 }}
                />
              </Box>
              <Typography color={"white"}>{a.name}</Typography>
            </Box>
          ))}
          <Box display={{ sm: "block", md: "none" }} width={16} />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero1;
