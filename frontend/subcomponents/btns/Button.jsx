import React from "react";
import SmallLoader from "../loading/SmallLoader";

export default function Button({
  icon,
  text,
  onClick,
  className,
  disabled,
  isLoading = false,
  fullWidth = false,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative mr-3 disabled:bg-green-300 cursor-pointer hover:text-gray-100 rounded-md flex items-center justify-center gap-x-1 text-center border border-green-500 py-2 px-8 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white ${
        fullWidth && "w-full"
      } ${className}`}
    >
      {isLoading == true ? (
        <SmallLoader text={text} />
      ) : (
        <div className="flex gap-x-2">
          {icon && icon} {text}
        </div>
      )}
    </button>
  );
}

