import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AddAPhotoOutlined,
  AutoAwesomeOutlined,
  Cancel,
  Close,
  CreateNewFolderOutlined,
  Edit,
  ExpandMore,
  Favorite,
  FavoriteBorder,
  FavoriteBorderOutlined,
  FileOpenOutlined,
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
import {
  useCreateResources,
  useCreateThumb,
  useGetFilterAll,
  useUploadThumb,
} from "../libs/react-query/Queries";
import { useUserContext } from "../contexts/AuthContext";
import { useDropzone } from "react-dropzone";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useNavigate } from "react-router-dom";

const CreatePostForm = () => {
  const theme = useTheme();
  const { user } = useUserContext();
  const [resource, setResource] = useState({
    name: "",
    slug: "",
    description: "",
    type: "vectors",
    premium: false,
    new: false,
    authorId: user.id,
  });
  const navigate = useNavigate();
  const [thumbsImage, setThumbsImage] = React.useState([]);
  const [fileResource, setFileResource] = React.useState(null);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setThumbsImage((a) => [
          ...thumbsImage,
          {
            url: URL.createObjectURL(acceptedFiles[0]),
            file: acceptedFiles[0],
          },
        ]);
      },
    });

  const {
    getRootProps: getRootPropsFile,
    getInputProps: getInputPropsFile,
    isFocused: isFocusedFile,
    isDragAccept: isDragAcceptFile,
    isDragReject: isDragRejectFile,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFileResource((a) => acceptedFiles[0]);
    },
  });

  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState([]);
  const [styles, setStyles] = useState([]);
  const [colors, setColors] = useState([]);
  const [formats, setFormats] = useState([]);

  const {
    data: filter,
    mutate: getFilter,
    isPending: gettingFilter,
    isSuccess: filterSuccess,
  } = useGetFilterAll();

  const {
    data: resources,
    mutate: createResource,
    isPending: creatingResource,
    isSuccess: creatingResourceSuccess,
  } = useCreateResources();

  const {
    data: thumbUpload,
    mutate: uploadThumb,
    isPending: uploadingThumb,
    isSuccess: uploadingThumbSuccess,
  } = useUploadThumb();

  const {
    data: thumbCreate,
    mutate: createThumb,
    isPending: creatingThumb,
    isSuccess: creatingThumbSuccess,
  } = useCreateThumb();

  useEffect(() => {
    getFilter();
  }, []);

  const handleKeyDown = (event) => {
    if (event.keyCode === 188 || event.key === "Enter") {
      if (tagsInput !== "") {
        setTags([
          ...tags,
          { name: tagsInput, slug: tagsInput.split(" ").join("-") },
        ]);
        event.preventDefault();
        setTagsInput("");
      } else {
        event.preventDefault();
        setTagsInput("");
      }
    } else if (tagsInput === "" && event.keyCode === 8) {
      let Index = tags.length - 1;
      setTags(tags.filter((tagsInput, i) => i !== Index));
    }
  };

  const handleDeleteFile = () => {
    if (fileResource) {
      setFileResource(null);
    }
  };

  const handleSelectColors = (event) => {
    let coll = colors.filter((colors) => colors.id === event.id)[0]
      ? true
      : false;
    if (!coll) {
      setColors([
        ...colors,
        {
          id: event.id,
          name: event.name,
          slug: event.name.toLowerCase().split(" ").join("-"),
          code: event.code,
        },
      ]);
    } else {
      setColors(colors.filter((colors) => colors.name !== event.name));
    }
  };

  const handleSelectFormat = (event) => {
    let coll = formats.filter((format) => format.id === event.id)[0]
      ? true
      : false;
    if (!coll) {
      setFormats([
        ...formats,
        {
          id: event.id,
          name: event.name,
          slug: event.name.toLowerCase().split(" ").join("-"),
        },
      ]);
    } else {
      setFormats(formats.filter((format) => format.name !== event.name));
    }
  };

  const handleDeleteTags = (e) => {
    setTags(tags.filter((tagsInput, i) => i !== e));
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStyles(typeof value === "string" ? value.split(",") : value);
  };

  const handleDeleteThumb = (e) => {
    setThumbsImage(thumbsImage.filter((tagsInput, i) => i !== e));
  };

  useEffect(() => {
    if (creatingResourceSuccess) {
      navigate("/author/" + user.id, {
        replace: true,
      });
    }
  }, [creatingResourceSuccess]);

  const handleSave = () => {
    let dataaa = thumbsImage.map((tagsInput, i) => tagsInput.file);
    let tagsNew = tags;
    const uniqueBy =
      (k, s = new Set()) =>
      (o) =>
        !s.has(o[k]) && s.add(o[k]);
    resource.name.split(" ").map((a, i) => {
      tagsNew.push({
        name: a,
        slug: a.split(" ").join("-"),
      });
    });
    createResource({
      resource: {
        name: resource.name,
        slug: resource.name.toLowerCase().split(" ").join("-"),
        description: resource.description,
        type: resource.type,
        premium: resource.premium,
        new: resource.new,
        authorId: user.id,
      },
      upload: dataaa,
      uploadFile: fileResource,
      fileType: formats,
      tags: tagsNew.filter(uniqueBy("name")),
      styles: styles,
      colors: colors,
    });
  };

  if (filter) {
    return (
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        py={3}
      >
        <Box
          border={{ md: "none", lg: "1px solid #d8d8d8" }}
          boxSizing={"border-box"}
          py={2}
          width={"100%"}
          borderRadius={2}
          maxWidth={{ xs: "100%", sm: "100", md: "70.5rem", lg: "70.5rem" }}
          gap={2}
        >
          <Typography p={2} fontSize={"25px"} fontWeight={600}>
            Create resource
          </Typography>
          <Grid2 container borderRadius={2}>
            <Grid2
              display={"flex"}
              flexDirection={"column"}
              xs={12}
              sm={12}
              md={8}
              lg={8}
              gap={2}
              p={2}
            >
              <TextField
                type="text"
                id="name-resource"
                defaultValue={resource.name}
                onChange={(e) =>
                  setResource({ ...resource, name: e.target.value })
                }
                label="Name Resource"
                variant="outlined"
              />
              <TextField
                type="text"
                multiline
                defaultValue={resource.description}
                onChange={(e) =>
                  setResource({ ...resource, description: e.target.value })
                }
                rows={8}
                id="description-resource"
                label="Description"
                variant="outlined"
              />
              <Typography fontSize={"15px"} fontWeight={600}>
                Image Preview
              </Typography>
              <Typography fontSize={"13px"} fontWeight={400}>
                Pilih atau upload gambar yang menunjukkan isi video Anda.
                Thumbnail yang bagus akan terlihat unik dan menarik perhatian
                penonton.
              </Typography>
              <Box width={"100%"} overflow={"auto"}>
                <Box display={"flex"} gap={2}>
                  {thumbsImage &&
                    thumbsImage.map((a, i) => (
                      <Box
                        key={i}
                        justifyContent={"center"}
                        display={"flex"}
                        alignItems={"center"}
                        textAlign={"center"}
                        borderRadius={3}
                      >
                        <Box position={"relative"}>
                          <IconButton
                            onClick={() => handleDeleteThumb(i)}
                            sx={{ position: "absolute", top: 0, right: 0 }}
                          >
                            <Close />
                          </IconButton>

                          <img
                            style={{ borderRadius: 10 }}
                            width={140}
                            src={a.url}
                          />
                        </Box>
                      </Box>
                    ))}
                  <Box
                    width={100}
                    height={100}
                    p={2}
                    {...getRootProps()}
                    sx={{
                      cursor: "pointer",
                      border: isDragAccept
                        ? "5px solid #2e7d32"
                        : isDragReject
                        ? "5px solid #d32f2f"
                        : isFocused
                        ? "5px solid #1976d2"
                        : "5px solid #C2CED7",
                      bgcolor: "#F4F5F7",
                      borderStyle: "dashed",
                      borderRadius: 3,
                    }}
                    border={"3px solid #d8d8d8"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={1}
                    textAlign={"center"}
                    borderRadius={3}
                  >
                    <input {...getInputProps()} />
                    <AddAPhotoOutlined fontSize="large" />
                    <Typography width={140}>Add image</Typography>
                  </Box>
                </Box>
              </Box>
              <Typography fontSize={"15px"} fontWeight={600}>
                Type file
              </Typography>
              <Box display={"flex"} gap={1} flexWrap={"wrap"}>
                {filter &&
                  filter
                    .filter((val) => val.title === "File Type")[0]
                    ?.categoriesValues.map((b, i) => (
                      <Box
                        key={b.id}
                        p={0.5}
                        px={2}
                        sx={{
                          cursor: "pointer",
                        }}
                        border={"1px solid #d8d8d8"}
                        bgcolor={
                          formats.filter((a) => a.slug === b.slug)[0]
                            ? "#e7e7e7"
                            : null
                        }
                        display={"flex"}
                        borderRadius={10}
                        alignItems={"center"}
                        onClick={() =>
                          handleSelectFormat({ id: i, name: b.name })
                        }
                        gap={1}
                      >
                        <Typography>{b.name}</Typography>
                      </Box>
                    ))}
              </Box>
              <Typography fontSize={"15px"} fontWeight={600}>
                File
              </Typography>
              <Typography fontSize={"13px"} fontWeight={400}>
                Pilih atau upload gambar yang menunjukkan isi video Anda.
                Thumbnail yang bagus akan terlihat unik dan menarik perhatian
                penonton.
              </Typography>
              {!fileResource && (
                <Box display={"flex"} gap={2} mb={2}>
                  <Box
                    width={"100%"}
                    p={2}
                    {...getRootPropsFile()}
                    sx={{
                      cursor: "pointer",
                      border: isDragAcceptFile
                        ? "5px solid #2e7d32"
                        : isDragRejectFile
                        ? "5px solid #d32f2f"
                        : isFocusedFile
                        ? "5px solid #1976d2"
                        : "5px solid #C2CED7",
                      bgcolor: "#F4F5F7",
                      borderStyle: "dashed",
                      borderRadius: 3,
                    }}
                    border={"3px solid #d8d8d8"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={1}
                    textAlign={"center"}
                    borderRadius={3}
                  >
                    <input {...getInputPropsFile()} />
                    <FileOpenOutlined fontSize="large" />
                    <Typography>Add file</Typography>
                  </Box>
                </Box>
              )}
              {fileResource && (
                <Box flex={1}>
                  <Box
                    border={"1px solid #d8d8d8"}
                    borderRadius={2}
                    p={2}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography>{fileResource.name}</Typography>
                    <IconButton onClick={handleDeleteFile}>
                      <Cancel />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </Grid2>
            <Grid2
              display={"flex"}
              flexDirection={"column"}
              xs={12}
              sm={12}
              md={4}
              lg={4}
              gap={2}
              p={2}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="type-resource"
                  value={resource.type}
                  onChange={(e) =>
                    setResource({ ...resource, type: e.target.value })
                  }
                  label="Type"
                >
                  {filter &&
                    filter
                      .filter((val) => val.title === "Assets")[0]
                      ?.categoriesValues.map((b) => (
                        <MenuItem key={b.id} value={b.slug}>
                          {b.name}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>

              <Typography fontSize={"15px"} fontWeight={600}>
                Tags
              </Typography>
              <Typography fontSize={"13px"} fontWeight={400}>
                Pilih atau upload.
              </Typography>
              <Box
                display={"flex"}
                border={"1px solid #d8d8d8"}
                px={2}
                borderRadius={1.5}
                flexWrap={"wrap"}
                py={1.5}
                gap={1}
              >
                {tags[0] &&
                  tags.map((tag, i) => (
                    <Chip
                      key={i}
                      onDelete={() => handleDeleteTags(i)}
                      label={tag.name}
                      size="medium"
                    />
                  ))}
                <InputBase
                  type="text"
                  onKeyDown={handleKeyDown}
                  value={tagsInput}
                  sx={{ width: "100%" }}
                  onChange={(e) => {
                    if (e.target.value !== "," || e.target.key !== "Enter")
                      setTagsInput(e.target.value);
                  }}
                  multiline
                  placeholder="Add more tags"
                  rows={4}
                  id="tags-resource"
                  label="Tags"
                />
              </Box>
              <Typography fontSize={"15px"} fontWeight={600}>
                Style
              </Typography>
              <Typography fontSize={"13px"} fontWeight={400}>
                Pilih atau upload.
              </Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="type-resource"
                  multiple
                  value={styles}
                  onChange={handleChange}
                >
                  {filter &&
                    filter
                      .filter((val) => val.title === "Style")[0]
                      ?.categoriesValues.map((b) => (
                        <MenuItem key={b.id} value={b.slug}>
                          {b.name}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
              <Typography fontSize={"15px"} fontWeight={600}>
                Select colors
              </Typography>
              <Typography fontSize={"13px"} fontWeight={400}>
                Pilih atau upload.
              </Typography>
              <Box display={"flex"} gap={1} flexWrap={"wrap"}>
                {filter &&
                  filter
                    .filter((val) => val.title === "Colors")[0]
                    ?.categoriesValues.map((b, i) => (
                      <Box
                        key={b.id}
                        p={0.5}
                        px={1}
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleSelectColors({
                            name: b.name,
                            code: b.color,
                            id: i,
                          })
                        }
                        bgcolor={
                          colors.filter((a) => a.slug === b.slug)[0]
                            ? "#e7e7e7"
                            : null
                        }
                        border={"1px solid #d8d8d8"}
                        display={"flex"}
                        borderRadius={10}
                        alignItems={"center"}
                        gap={1}
                      >
                        <Box
                          sx={{
                            aspectRatio: 1 / 1,
                            display: "flex",
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                          p={0.1}
                          width={20}
                          height={20}
                          borderRadius={10}
                          bgcolor={b.color}
                          color={b.colorText}
                        />
                        <Typography>{b.name}</Typography>
                      </Box>
                    ))}
              </Box>
              <Typography fontSize={"15px"} fontWeight={600}>
                Is premium?
              </Typography>
              <Typography fontSize={"13px"} fontWeight={400}>
                Pilih atau upload gambar yang menunjukkan isi video Anda.
                Thumbnail yang bagus akan terlihat unik dan menarik perhatian
                penonton.
              </Typography>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={resource.premium}
                onChange={(e) =>
                  setResource({
                    ...resource,
                    premium: e.target.value === "true",
                  })
                }
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes, this is premium content"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No, this is free"
                />
              </RadioGroup>
              {resource.premium && (
                <>
                  <Typography fontSize={"15px"} fontWeight={600}>
                    Sell amount
                  </Typography>

                  <TextField
                    type="text"
                    id="name-resource"
                    variant="outlined"
                  />
                </>
              )}
            </Grid2>
          </Grid2>
        </Box>
        <Box
          mt={2}
          mb={3}
          width={"100%"}
          maxWidth={{ xs: "100%", sm: "100", md: "70.5rem", lg: "70.5rem" }}
          display={"flex"}
          flexDirection={{
            xs: "column-reverse",
            sm: "column-reverse",
            md: "row",
            lg: "row",
          }}
          gap={2}
          justifyContent={"end"}
        >
          <Button
            sx={{ width: { xs: "100%", sm: "100%", md: "auto" } }}
            variant="text"
            size="large"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button
            sx={{ width: { xs: "100%", sm: "100%", md: "auto" } }}
            variant="contained"
            size="large"
            onClick={handleSave}
          >
            Create
          </Button>
        </Box>
      </Box>
    );
  }
};

export default CreatePostForm;
