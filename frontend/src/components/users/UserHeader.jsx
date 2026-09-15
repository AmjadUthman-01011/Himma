export default function UserHeader({ onCreateUser }) {
  return (
    <div className="
        flex
        flex-col
        gap-4
        border-b
        border-[#e0e3e5]
        bg-white
        px-5
        py-5
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:px-6
      ">
      <div>
        <h1 className="
            font-[var(--font-jakarta)]
            text-xl
            font-bold
            text-[#191c1e]
          ">
          User Management
        </h1>

      </div>
      <div className="
          flex
          w-full
          flex-col
          gap-3
          sm:w-auto
          sm:flex-row
        ">
      <button className="
            inline-flex
            h-10
            w-full
            items-center
            justify-center
            gap-2
            rounded-sm
            bg-[#1e3a8a]
            px-4
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#00236f]
            sm:w-auto
            sm:shrink-0
          "
           onClick={onCreateUser}>
        Create User
      </button>
      </div>
    </div>
  );
}