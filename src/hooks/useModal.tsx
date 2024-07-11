"use client";

import { CSSProperties } from "react";

type BackgroundOverlayParams = {
  enable: boolean;
  opacity: number;
  color: string;
};

type UseModalProps = Omit<ModalProps, "children">;

type ModalProps = {
  children: React.ReactNode;
  top?: number;
  left?: number;
  translateXY?: { x: number; y: number };
  overlayParams?: BackgroundOverlayParams;
  resetPosition?: boolean;
};

const useModal = (props?: UseModalProps) => {
  const ModalComponent = ({ children }: { children: React.ReactNode }) => {
    const top = defaultIfUndefined(props?.top, 50);
    const left = defaultIfUndefined(props?.left, 50);
    const transX = defaultIfUndefined(props?.translateXY?.x, -50);
    const transY = defaultIfUndefined(props?.translateXY?.y, -50);
    const overlayEnabled = defaultIfUndefined(
      props?.overlayParams?.enable,
      true
    );
    const overlayColor = defaultIfUndefined(
      props?.overlayParams?.color,
      "black"
    );
    const overlayOpacity = defaultIfUndefined(
      props?.overlayParams?.opacity,
      0.5
    );
    const resetPostion = defaultIfUndefined(props?.resetPosition, false);
    if (resetPostion) {

    }

    const modalStyle: CSSProperties = {
      position: "fixed",
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(${transX}%, ${transY}%)`,
      zIndex: 10,
    };

    return overlayEnabled ? (
      <>
        <BackgroundOverlay color={overlayColor} opacity={overlayOpacity} />
        <div style={modalStyle}>{children}</div>
      </>
    ) : (
      <div>
        <div style={modalStyle}>{children}</div>
      </div>
    );
  };

  return { Modal: ModalComponent };
};

export default useModal;

type BackgroundOverlayProps = Omit<BackgroundOverlayParams, "enable">;

const BackgroundOverlay = ({ opacity, color }: BackgroundOverlayProps) => {
  const bgCoverStyle: CSSProperties = {
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: color,
    opacity: opacity,
    zIndex: 1,
  };
  return <div style={bgCoverStyle} />;
};

const defaultIfUndefined = (value: any, defaultValue: any) => {
  return value === undefined ? defaultValue : value;
};
