"use client";

import { useEffect, useRef, useState } from "react";

import {
  MoreVertical,
  Pencil,
  ShieldCheck,
  Trash2,
} from "lucide-react";

export default function TeacherActions({
  user,
  teacher,
  loading,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  // ==========================================
  // CALCULATE MENU POSITION
  // ==========================================

  const updateMenuPosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const menuWidth = 192;
    const menuHeight = 150;
    const gap = 8;

    // Position above the button
    let top = rect.top - menuHeight - gap;

    // Align right side with button
    let left = rect.right - menuWidth;

    // Prevent going outside left side
    if (left < 8) {
      left = 8;
    }

    // Prevent going outside right side
    if (left + menuWidth > window.innerWidth - 8) {
      left = window.innerWidth - menuWidth - 8;
    }

    // If there isn't enough room above,
    // put it below the button
    if (top < 8) {
      top = rect.bottom + gap;
    }

    setMenuPosition({
      top,
      left,
    });
  };

  // ==========================================
  // OPEN MENU
  // ==========================================

  const handleMenuToggle = () => {
    if (!isOpen) {
      updateMenuPosition();
    }

    setIsOpen((prev) => !prev);
  };

  // ==========================================
  // UPDATE POSITION ON SCROLL / RESIZE
  // ==========================================

  useEffect(() => {
    if (!isOpen) return;

    const handlePositionUpdate = () => {
      updateMenuPosition();
    };

    window.addEventListener(
      "scroll",
      handlePositionUpdate,
      true
    );

    window.addEventListener(
      "resize",
      handlePositionUpdate
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handlePositionUpdate,
        true
      );

      window.removeEventListener(
        "resize",
        handlePositionUpdate
      );
    };
  }, [isOpen]);

  // ==========================================
  // CLOSE WHEN CLICKING OUTSIDE
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
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

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = () => {
    setIsOpen(false);

    onEdit(user);
  };

  // ==========================================
  // STATUS
  // ==========================================

  const handleToggleStatus = () => {
    setIsOpen(false);

    onToggleStatus(user);
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = () => {
    setIsOpen(false);

    onDelete(user);
  };

  return (
    <>
      {/* ========================================
          ACTION BUTTON
      ======================================== */}

      <button
        ref={buttonRef}
        type="button"
        disabled={loading}
        onClick={handleMenuToggle}
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
        aria-label="Open teacher actions"
        aria-expanded={isOpen}
      >
        <MoreVertical size={20} />
      </button>

      {/* ========================================
          ACTION MENU
      ======================================== */}

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
          {/* EDIT */}

          <button
            type="button"
            onClick={handleEdit}
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
            <Pencil
              size={16}
              className="text-[#4e45d5]"
            />

            <span>Edit teacher</span>
          </button>

          {/* STATUS */}

          <button
            type="button"
            onClick={handleToggleStatus}
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
            <ShieldCheck
              size={16}
              className="text-[#4e45d5]"
            />

            <span>
              {user.isActive
                ? "Deactivate"
                : "Activate"}
            </span>
          </button>

          <div className="my-1 border-t border-[#e0e3e5]" />

          {/* DELETE */}

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

            <span>Delete teacher</span>
          </button>
        </div>
      )}
    </>
  );
}