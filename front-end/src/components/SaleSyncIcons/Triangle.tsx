const Triangle = ({ ...props }) => {
  return (
    <svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='currentColor' {...props}>
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <rect x='0' fill='none' stroke='none' width='20' height='20'></rect>{' '}
        <g>
          {' '}
          <path d='M7 13l4.03-6L15 13H7z'></path>{' '}
        </g>{' '}
      </g>
    </svg>
  );
};

export default Triangle;
