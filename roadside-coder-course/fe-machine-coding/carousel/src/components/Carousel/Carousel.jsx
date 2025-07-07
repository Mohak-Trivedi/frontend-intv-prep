import { useState, useEffect, useRef } from "react";

const Carousel = ({
  images = [],
  isLoading = false,
  imgPerSlide = 1,
  imageLimit = images.length,
  onImgClick = () => {},
  customPrevButton,
  customNextButton,
}) => {
  const imgRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  console.log(currentIndex);

  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(0);
    }
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageLimit - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageLimit - 1 ? 0 : prevIndex + 1
    );
  };

  console.log(imgRef?.current?.offsetWidth);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="carousel" style={{ width: imgPerSlide * imgWidth }}>
      <div
        className="image-container"
        style={{ transform: `translate(-${currentIndex * imgWidth}px)` }}
      >
        {images
          .slice(0, imageLimit > images.length ? images.length : imageLimit)
          .map((image, index) => {
            return (
              <img
                onLoad={() => setImgWidth(imgRef?.current?.offsetWidth)}
                onClick={() => onImgClick(image, index)}
                ref={imgRef}
                key={image.id}
                src={image.url}
                alt={image.title}
                className="image"
              />
            );
          })}
      </div>

      {customPrevButton instanceof Function ? (
        customPrevButton(goToPrev)
      ) : (
        <button className="btn prev" onClick={goToPrev}>
          Prev
        </button>
      )}

      {customNextButton instanceof Function ? (
        customNextButton(goToNext)
      ) : (
        <button className="btn next" onClick={goToNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default Carousel;
