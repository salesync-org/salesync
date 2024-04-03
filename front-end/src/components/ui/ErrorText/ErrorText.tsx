import { cn } from '@/utils/utils';

interface ErrorTextProps {
  text: string | undefined;
  className?: string;
}

export const textErrorClassName = 'font-medium text-red-500';

const ErrorText = ({ text = '', className }: ErrorTextProps) => {
  return <span className={cn('text-[13px]', textErrorClassName, className)}>{text}</span>;
};
export default ErrorText;
