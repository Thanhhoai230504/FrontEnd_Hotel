import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header/components/Header";
import { fetchImages } from "../../store/slice/allImages";
import { AppDispatch, RootState } from "../../store/store";
import ImageModal from "./ImageModal";

const GridContainer = styled(Box)({
  display: "grid",
  gap: "16px",
  gridTemplateColumns: "1fr 1fr 1fr",
  "& .featured": {
    gridColumn: "1 / 2",
    gridRow: "1 / 3",
    height: "600px",
  },
  "& .regular": {
    height: "290px",
  },
});

const ImageWrapper = styled(Box)({
  position: "relative",
  overflow: "hidden",
  borderRadius: "8px",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease-in-out",
  },
  "&:hover img": {
    transform: "scale(1.05)",
  },
});

const PhotoLibrary: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { images, loading } = useSelector(
    (state: RootState) => state.imagesState
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image); // Mở modal và hiển thị hình ảnh được chọn
  };

  const handleCloseModal = () => {
    setSelectedImage(null); // Đóng modal
  };

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ py: 4, mt: 12 }}>
        <Typography variant="h5" align="center" mb={4} color="#8B7355">
          THƯ VIỆN HÌNH ẢNH
        </Typography>
        <GridContainer>
          {images.map((image, index) => (
            <ImageWrapper
              key={index}
              className={index === 0 ? "featured" : "regular"}
              onClick={() => handleImageClick(image)} // Xử lý khi click vào ảnh
            >
              <img src={image} alt={`Image ${index}`} />
            </ImageWrapper>
          ))}
        </GridContainer>
      </Container>

      {/* Sử dụng ImageModal */}
      <ImageModal
        open={!!selectedImage}
        imageUrl={selectedImage}
        onClose={handleCloseModal}
      />

      <Footer />
    </>
  );
};

export default PhotoLibrary;
