import React from "react";
import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ImageModalProps {
  open: boolean;
  imageUrl: string | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ open, imageUrl, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "none", // Loại bỏ hiệu ứng mờ nền
        backgroundColor: "transparent", // Không có nền tối mặc định
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "60%",
          height: "80%",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
            bgcolor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            "&:hover": {
              bgcolor: "black",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        {imageUrl && (
          <Box
            component="img"
            src={imageUrl}
            alt="Selected"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Căn chỉnh hình ảnh toàn màn hình
            }}
          />
        )}
      </Box>
    </Modal>
  );
};

export default ImageModal;
