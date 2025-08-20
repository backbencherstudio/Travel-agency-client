import React from 'react';
import Slider from 'react-slick';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import ImageModal from './ImageModal';

const ImageSection = ({ details, selectedImage, setSelectedImage, setShowImageModal, showImageModal, setModalImageIndex }) => {
  const handleShowImage = (image) => {
    setSelectedImage(image);
  };

  const NextArrow = ({ onClick }) => (
    <div className="absolute top-0 right-[10px] z-[1] bg-[#00000061] rounded-2xl cursor-pointer" onClick={onClick}>
      <div className="sm:px-[10px] px-[5px] sm:py-[12px] py-[7px] border-2 rounded-full">
        <FaChevronRight />
      </div>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="absolute top-0 left-[10px] z-[1] bg-[#00000061] rounded-2xl cursor-pointer" onClick={onClick}>
      <div className="sm:px-[10px] px-[5px] sm:py-[12px] py-[7px] border-2 rounded-full">
        <FaChevronLeft />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <img
        src={selectedImage}
        alt={selectedImage}
        className="w-full h-[300px] sm:h-[390px] sm:w-[700px] object-cover rounded-xl cursor-pointer"
        onClick={() => {
          setShowImageModal(true);
          setModalImageIndex(0);
        }}
      />
      <Slider dots={false} infinite={true} speed={500} slidesToShow={4} slidesToScroll={1} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
        {details?.package_files?.map((planimg, index) => (
          <div key={planimg.id} className="sm:w-[163px] w-[63px] sm:h-[163px] h-[60px] rounded-2xl overflow-hidden" onClick={() => { setShowImageModal(true); setModalImageIndex(index); }}>
            <img src={planimg?.file_url} alt="Image" className="w-full h-full object-cover" />
          </div>
        ))}
      </Slider>
      {showImageModal && <ImageModal showImageModal={showImageModal} setShowImageModal={setShowImageModal} images={details?.package_files} modalImageIndex={modalImageIndex} setModalImageIndex={setModalImageIndex} />}
    </div>
  );
};

export default ImageSection;
