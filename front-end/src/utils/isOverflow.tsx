const isEllipsisActive = (element: React.MouseEvent<HTMLElement, MouseEvent>) => {
  return element.currentTarget.offsetWidth < element.currentTarget.scrollWidth;
};

export default isEllipsisActive;
