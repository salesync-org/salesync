import { Tooltip } from 'react-tooltip';

const ToolTip = ({ ...props }) => {
  const isDark = document.documentElement.classList.contains('dark');
  return (
    <Tooltip
      opacity={props.show == false ? 0 : 0.8}
      style={{
        color: isDark ? '#092645' : 'white',
        backgroundColor: isDark ? 'white' : '#092645',
        borderRadius: '0.5rem',
        position: 'fixed',
        zIndex: 9999
      }}
      {...props}
    />
  );
};

export default ToolTip;
