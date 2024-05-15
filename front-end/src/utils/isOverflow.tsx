const isEllipsisActive = (element: React.MouseEvent<HTMLElement, MouseEvent>) => {
  console.log('checking');
  console.log(element.currentTarget.offsetWidth);
  console.log(element.currentTarget.scrollWidth);
  return element.currentTarget.offsetWidth < element.currentTarget.scrollWidth;
};

export default isEllipsisActive;
