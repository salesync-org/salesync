function TextButton({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className='text-blue-400 hover:underline focus:text-blue-800'>
      {text}
    </button>
  );
}

export default TextButton;
