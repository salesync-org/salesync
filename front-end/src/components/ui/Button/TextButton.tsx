function TextButton({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className='text-blue-500 hover:underline hover:text-blue-800'>
      {text}
    </button>
  );
}

export default TextButton;
