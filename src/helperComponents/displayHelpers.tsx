import "../App.css";

import React, {
  useState,
  ReactNode,
  KeyboardEvent,
  CSSProperties,
} from "react";
import { createPortal } from "react-dom";

interface ZoomableCardProps {
  title?: string;
  className?: string;
  children: ReactNode;
  renderZoomContent?: () => ReactNode;
}

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.6)",
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const contentStyle: CSSProperties = {
  background: "#ffffff",
  maxWidth: "90vw",
  maxHeight: "90vh",
  width: "1100px",
  borderRadius: 12,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
};

const bodyStyle: CSSProperties = {
  flex: 1,
  overflow: "auto",
};

export const ZoomableCard: React.FC<ZoomableCardProps> = ({
  title,
  className = "",
  children,
  renderZoomContent,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const openZoom = () => {
    console.log("ZoomableCard openZoom", { title }); // keep for now
    setIsZoomed(true);
  };

  const closeZoom = () => setIsZoomed(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openZoom();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      closeZoom();
    }
  };

  const zoomContent = renderZoomContent ? renderZoomContent() : children;

  return (
    <>
      {/* Clickable wrapper around the widget */}
      <div
        className={`clickable-card ${className}`}
        role="button"
        tabIndex={0}
        onClickCapture={openZoom}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>

      {/* Zoom overlay as a plain DIV with loud inline styles */}
      {isZoomed &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            style={overlayStyle}
            role="dialog"
            aria-modal="true"
            onClick={closeZoom}
          >
            <div
              style={contentStyle}
              onClick={(e) => e.stopPropagation()} // don't close when clicking inside
            >
              <div style={headerStyle}>
                {title && <h3>{title}</h3>}
                <button
                  type="button"
                  onClick={closeZoom}
                  aria-label="Close"
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={bodyStyle}>{zoomContent}</div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
