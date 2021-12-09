import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

import ImgDialog from "./ImgDialog";
import { getCroppedImg } from "./canvasUtils";
import { Modal, Button, Slider } from "antd";

const CropImage = ({
  classes,
  handleChangeFile,
  croppedImage,
  setCroppedImage,
}: any) => {
  const [imageSrc, setImageSrc] = React.useState<any>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<any>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [modalVisibleCrop, setModalVisibleCrop] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
      handleChangeFile(croppedImage);
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc, croppedAreaPixels, handleChangeFile]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, [setCroppedImage]);

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setModalVisibleCrop(true);
      setImageSrc(imageDataUrl);
    } else {
      setImageSrc(null);
      setModalVisibleCrop(false);
    }
  };

  const showModal = () => {
    setModalVisibleCrop(true);
  };

  const confirmCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      handleChangeFile(croppedImage);
    } catch (e) {
      console.error(e);
    }
    setModalVisibleCrop(false);
  };

  const handleCancel = () => {
    setModalVisibleCrop(false);
  };

  return (
    <div>
      <Modal
        title="Select your image"
        visible={modalVisibleCrop}
        onOk={confirmCrop}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={confirmCrop}>
            Confirm
          </Button>,
        ]}
      >
        <div className="relative w-full bg-black h-96">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="">
          <div className="flex items-center w-full space-between">
            <span className="mr-2">Zoom</span>
            <Slider
              className="w-full"
              value={zoom}
              min={1}
              max={3}
              step={0.01}
              onChange={(zoom) => setZoom(zoom)}
            />
          </div>
          <Button onClick={showCroppedImage}>Show Result</Button>
        </div>
      </Modal>
      <ImgDialog img={croppedImage} onClose={onClose} />
      <input type="file" onChange={onFileChange} accept="image/*" />
      {imageSrc && (
        <div
          className="ml-2 my-2 text-gray-600 hover:text-yellow-600 cursor-pointer"
          onClick={showModal}
        >
          Crop image selected
        </div>
      )}
    </div>
  );
};

function readFile(file: Blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default CropImage;
