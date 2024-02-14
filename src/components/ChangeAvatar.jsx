import { CloudUpload, CloudUploadOutlined } from "@mui/icons-material";
import { Avatar, Box, Slider, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactAvatarEditor from "react-avatar-editor";

const ChangeAvatar = ({ props }) => {
  return (
    <Box>
      {!props.avatarImage ? (
        <Box
          width={"100%"}
          boxSizing={"border-box"}
          p={5}
          {...props.getRootProps()}
          sx={{
            cursor: "pointer",
            border: props.isDragAccept
              ? "5px solid #2e7d32"
              : props.isDragReject
              ? "5px solid #d32f2f"
              : props.isFocused
              ? "5px solid #1976d2"
              : "5px solid #C2CED7",
            bgcolor: "#F4F5F7",
            borderStyle: "dashed",
            borderRadius: 3,
          }}
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <input {...props.getInputProps()} />
          <CloudUpload fontSize="large" />
          <Typography fontSize={"16px"} fontWeight={600}>
            Upload Image
          </Typography>
          <Typography color={"#b0b0b0"} variant="caption">
            or Drag & Drop
          </Typography>
          {/* <Avatar
          sx={{
            height: "90px",
            width: "90px",
            border: isDragAccept ? "5px solid #f8f8" : "none",
          }}
        /> */}
        </Box>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={3}
        >
          <ReactAvatarEditor
            ref={props.editorRef}
            scale={props.avatarScale}
            width={250}
            height={250}
            border={[0, 0]}
            borderRadius={250}
            position={props.avatarPosition}
            onPositionChange={props.setAvatarPosition}
            // onLoadFailure={this.logCallback.bind(this, "onLoadFailed")}
            // onLoadSuccess={this.logCallback.bind(this, "onLoadSuccess")}
            // onImageReady={this.logCallback.bind(this, "onImageReady")}
            image={props.avatarImage}
            className="editor-canvas"
          />
          <Slider
            min={1}
            max={2}
            step={0.01}
            defaultValue={1}
            value={props.avatarScale}
            onChange={props.handleScale}
            aria-labelledby="continuous-slider"
          />
        </Box>
      )}
    </Box>
  );
};

export default ChangeAvatar;
