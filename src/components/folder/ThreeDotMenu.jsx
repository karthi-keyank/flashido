import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

function ThreeDotMenu({ onDelete, deleting }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();
    const dropdownRef = useRef();
    const [menuStyle, setMenuStyle] = useState({});
    // Removed hideDelete state

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (open && dropdownRef.current && menuRef.current) {
            const buttonRect = menuRef.current.getBoundingClientRect();
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            let top = buttonRect.bottom;
            let left = buttonRect.left;

            // Adjust horizontally
            if (left + dropdownRect.width > screenWidth) {
                left = screenWidth - dropdownRect.width - 10; // 10px padding
            }
            if (left < 0) {
                left = 10; // left boundary padding
            }

            // Adjust vertically if needed
            if (top + dropdownRect.height > screenHeight) {
                top = buttonRect.top - dropdownRect.height; // show above
            }

            setMenuStyle({
                position: "fixed",
                top: `${top}px`,
                left: `${left}px`,
                zIndex: 1000,
            });
        }
    }, [open]);

    return (
        <div ref={menuRef} style={{ display: "inline-block" }}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "25px",
                    padding: "4px 8px",
                    color: "#e0e0e0", // light color for dark theme
                }}
            >
                &#8942;
            </button>

            {open && (
                <div
                    ref={dropdownRef}
                    style={{
                        ...menuStyle,
                        backgroundColor: "#08062b", // dark background
                        border: "1px solid #444", // darker border
                        boxShadow: "0 2px 8px rgba(0,0,0,0.7)",
                        borderRadius: "5px",
                        padding: "8px",
                        minWidth: "100px",
                        whiteSpace: "nowrap",
                    }}
                >
                    <button
                        onClick={onDelete}
                        disabled={deleting}
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: deleting ? "#888" : "#ff4d4f", // red for delete, gray when deleting
                            cursor: deleting ? "not-allowed" : "pointer",
                            width: "100%",
                            textAlign: "left",
                            padding: "6px 0",
                            fontWeight: "bold",
                        }}
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            )}
        </div>
    );
}

ThreeDotMenu.propTypes = {
    onDelete: PropTypes.func.isRequired,
    deleting: PropTypes.bool,
};

export default ThreeDotMenu;
