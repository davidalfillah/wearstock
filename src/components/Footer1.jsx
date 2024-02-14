import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import FooterMenu from "./FooterMenu";
import CopyrightFooter from "./CopyrightFooter";
import {
  ExpandMore,
  Facebook,
  Instagram,
  X,
  YouTube,
} from "@mui/icons-material";
import MenuCategory from "../data/MenuCategory.json";

const Footer1 = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ backgroundColor: "black" }}>
      <Box
        display={"flex"}
        width={"100%"}
        justifyContent={"center"}
        alignSelf={"center"}
      >
        <Box
          sx={{
            display: { xs: "none", sm: "block", md: "block", lg: "flex" },
            alignSelf: "center",
            maxWidth: "87.5rem",
            padding: 2,
            py: 5,
            gap: 2,
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Box display={{ xs: "none", sm: "flex" }} gap={2} flex={1}>
            {MenuCategory.slice(0, 3).map((a) => (
              <Box key={a.id} flex={1} color={"rgba(156,156,156)"}>
                <Typography className="footerMenuTitle" color={"white"}>
                  {a.categoryPage}
                </Typography>
                {a.page.map((b) => (
                  <Typography key={b.id} className="footerMenuTitle">
                    {b.name}
                  </Typography>
                ))}
              </Box>
            ))}
            <Box
              flex={1}
              color={"rgba(156,156,156)"}
              display={{ sm: "none", md: "block" }}
            >
              <Typography className="footerMenuTitle" color={"white"}>
                Social Media
              </Typography>
              <Box display={"flex"} gap={1}>
                <Box
                  display={"flex"}
                  mt={1}
                  pb={0}
                  sx={{
                    backgroundColor: "blue",
                    padding: 1,
                    alignItems: "center",
                    borderRadius: 2,
                    color: "white",
                  }}
                >
                  <Facebook sx={{ margin: 0 }} />
                </Box>
                <Box display={"flex"}>
                  <Box
                    display={"flex"}
                    mt={1}
                    pb={0}
                    sx={{
                      backgroundColor: "magenta",
                      padding: 1,
                      alignItems: "center",
                      borderRadius: 2,
                      color: "white",
                    }}
                  >
                    <Instagram sx={{ margin: 0 }} />
                  </Box>
                </Box>
                <Box display={"flex"}>
                  <Box
                    display={"flex"}
                    mt={1}
                    pb={0}
                    sx={{
                      backgroundColor: "red",
                      padding: 1,
                      alignItems: "center",
                      borderRadius: 2,
                      color: "white",
                    }}
                  >
                    <YouTube sx={{ margin: 0 }} />
                  </Box>
                </Box>
                <Box display={"flex"}>
                  <Box
                    display={"flex"}
                    mt={1}
                    pb={0}
                    sx={{
                      backgroundColor: "white",
                      padding: 1,
                      alignItems: "center",
                      borderRadius: 2,
                      color: "black",
                    }}
                  >
                    <X sx={{ margin: 0 }} />
                  </Box>
                </Box>
              </Box>
              <Box mt={2}>
                <Typography className="footerMenuTitle">
                  Get exclusive assets sent straight to your inbox
                </Typography>
                <Button
                  sx={{ mt: 1, backgroundColor: "#2196f3 !important" }}
                  variant="contained"
                >
                  Signup
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display={{ xs: "block", sm: "none" }} py={5}>
        {MenuCategory.slice(0, 3).map((a) => (
          <Accordion
            key={a.id}
            expanded={expanded === `panel${a.id}`}
            onChange={handleChange(`panel${a.id}`)}
            sx={{
              backgroundColor: "transparent",
              color: "rgba(156,156,156)",
              mb: 0,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore sx={{ color: "white" }} />}
              aria-controls={`panel${a.id}bh-content`}
              id={`panel${a.id}bh-header`}
              key={a.id}
            >
              <Typography color={"white"}>{a.categoryPage}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {a.page.map((b) => (
                <Typography key={b.id} className="footerMenuTitle">
                  {b.name}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box
        flex={1}
        color={"rgba(156,156,156)"}
        textAlign={"center"}
        pb={3}
        display={{ sm: "block", md: "none" }}
      >
        <Typography className="footerMenuTitle" color={"white"}>
          Social Media
        </Typography>
        <Box display={"flex"} gap={1} justifyContent={"center"}>
          <Box
            display={"flex"}
            mt={1}
            pb={0}
            sx={{
              backgroundColor: "blue",
              padding: 1,
              alignItems: "center",
              borderRadius: 2,
              color: "white",
            }}
          >
            <Facebook sx={{ margin: 0 }} />
          </Box>
          <Box display={"flex"}>
            <Box
              display={"flex"}
              mt={1}
              pb={0}
              sx={{
                backgroundColor: "magenta",
                padding: 1,
                alignItems: "center",
                borderRadius: 2,
                color: "white",
              }}
            >
              <Instagram sx={{ margin: 0 }} />
            </Box>
          </Box>
          <Box display={"flex"}>
            <Box
              display={"flex"}
              mt={1}
              pb={0}
              sx={{
                backgroundColor: "red",
                padding: 1,
                alignItems: "center",
                borderRadius: 2,
                color: "white",
              }}
            >
              <YouTube sx={{ margin: 0 }} />
            </Box>
          </Box>
          <Box display={"flex"}>
            <Box
              display={"flex"}
              mt={1}
              pb={0}
              sx={{
                backgroundColor: "white",
                padding: 1,
                alignItems: "center",
                borderRadius: 2,
                color: "black",
              }}
            >
              <X sx={{ margin: 0 }} />
            </Box>
          </Box>
        </Box>
        <Box mt={2}>
          <Typography className="footerMenuTitle">
            Get exclusive assets sent straight to your inbox
          </Typography>
          <Button
            size="large"
            sx={{ mt: 1, backgroundColor: "#2196f3 !important" }}
            variant="contained"
          >
            Signup
          </Button>
        </Box>
      </Box>
      <CopyrightFooter />
      <FooterMenu />
    </Box>
  );
};

export default Footer1;
