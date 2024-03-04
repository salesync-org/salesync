import { cn } from '@/utils/utils';

interface ErrorTextProps {
  text: string | undefined;
  className?: string;
}

const ErrorText = ({ text = '', className }: ErrorTextProps) => {
  return <span className={cn('text-red-500', className)}>{text}</span>;
};
export default ErrorText;
