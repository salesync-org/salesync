import React from "react";
import { cn } from "@/utils/utils";

interface TextButtonProps {
  className?: string;
  text: string;
  onClick: () => void;
}

const TextButton:React.FC<TextButtonProps> = ({text, onClick, className}) => {
  return (
    <button onClick={onClick} className={cn('text-blue-500 hover:underline hover:text-blue-800', className)}>
      {text}
    </button>
  );
}

export default TextButton;
