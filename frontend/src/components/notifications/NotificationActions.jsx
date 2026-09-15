"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  MoreVertical,
  Check,
  Trash2,
} from "lucide-react";

export default function NotificationActions({
  notification,
  loading,
  onDelete,
  onMarkAsRead,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  // =====================================================
  // TOGGLE MENU
  // =====================================================

  const handleToggleMenu = () => {
    if (!isOpen && buttonRef.current) {
      const rect =
        buttonRef.current.getBoundingClientRect();

      const menuWidth = 192;
      const menuHeight = notification?.isRead
        ? 55
        : 105;

      const spacing = 8;

      // -----------------------------------------------
      // HORIZONTAL POSITION
      // -----------------------------------------------

      let left = rect.right - menuWidth;

      if (left < 8) {
        left = 8;
      }

      if (
        left + menuWidth >
        window.innerWidth - 8
      ) {
        left =
          window.innerWidth -
          menuWidth -
          8;
      }

      // -----------------------------------------------
      // VERTICAL POSITION
      // -----------------------------------------------

      let top =
        rect.top -
        menuHeight -
        spacing;

      // If there isn't enough space above
      if (top < 8) {
        top =
          rect.bottom +
          spacing;
      }

      setMenuPosition({
        top,
        left,
      });
    }

    setIsOpen((prev) => !prev);
  };

  // =====================================================
  // CLICK OUTSIDE
  // =====================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(
          event.target
        ) &&
        menuRef.current &&
        !menuRef.current.contains(
          event.target
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =====================================================
  // CLOSE ON SCROLL
  // =====================================================

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      true
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
        true
      );
    };
  }, [isOpen]);

  // =====================================================
  // MARK AS READ
  // =====================================================

  const handleMarkAsRead = () => {
    setIsOpen(false);

    if (!notification) return;

    onMarkAsRead(notification);
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = () => {
    setIsOpen(false);

    if (!notification) return;

    onDelete(notification);
  };

  // =====================================================
  // RENDER
  // =====================================================

  if (!notification) {
    return null;
  }

  return (
    <>
      {/* =================================================
          ACTION BUTTON
      ================================================= */}

      <button
        ref={buttonRef}
        type="button"
        disabled={loading}
        onClick={handleToggleMenu}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          text-[#757682]
          transition
          hover:bg-[#e6e8ea]
          hover:text-[#191c1e]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
        aria-label="Open notification actions"
        aria-expanded={isOpen}
      >
        <MoreVertical size={20} />
      </button>

      {/* =================================================
          DROPDOWN
      ================================================= */}

      {isOpen && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
          }}
          className="
            z-[9999]
            w-48
            overflow-hidden
            rounded-lg
            border
            border-[#e0e3e5]
            bg-white
            py-1
            text-left
            shadow-xl
          "
        >

          {/* =================================================
              MARK AS READ
          ================================================= */}

          {!notification.isRead && (
            <>
              <button
                type="button"
                onClick={handleMarkAsRead}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-[#191c1e]
                  transition
                  hover:bg-[#f2f4f6]
                "
              >
                <Check
                  size={16}
                  className="text-[#1e3a8a]"
                />

                <span>
                  Mark as read
                </span>
              </button>

              <div className="my-1 border-t border-[#e0e3e5]" />
            </>
          )}

          {/* =================================================
              DELETE
          ================================================= */}

          <button
            type="button"
            onClick={handleDelete}
            className="
              flex
              w-full
              items-center
              gap-3
              px-4
              py-2.5
              text-sm
              font-medium
              text-[#ba1a1a]
              transition
              hover:bg-[#ffdad6]/40
            "
          >
            <Trash2 size={16} />

            <span>
              Delete notification
            </span>
          </button>

        </div>
      )}
    </>
  );
}