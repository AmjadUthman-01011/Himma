"use client";

import {
  Play,
} from "lucide-react";

export default function ChapterVideo({
  video,
}) {

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-xl
        bg-[#20252d]
        shadow-sm
      "
    >

      {/* Video */}

      <div
        className="
          relative
          aspect-video
          w-full
        "
      >

        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />
        ) : (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-[#d8d9d7]
            "
          >
            <span className="text-[#555963]">
              Video Preview
            </span>
          </div>
        )}


        {/* Overlay */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/10
          "
        >

          <button
            type="button"
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-white/80
              text-[#00236f]
              shadow-lg
              backdrop-blur-sm
              transition
              hover:scale-105
              hover:bg-white
            "
            aria-label="Play video"
          >

            <Play
              size={28}
              fill="currentColor"
              className="ml-1"
            />

          </button>

        </div>

      </div>


      {/* Video title */}

      <div
        className="
          bg-[#d9dad7]
          px-5
          py-3
        "
      >

        <p
          className="
            text-sm
            font-medium
            uppercase
            tracking-wide
            text-[#191c1e]
          "
        >
          {video.title}
        </p>

      </div>

    </div>
  );
}