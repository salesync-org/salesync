import { ReactNode } from 'react';

function TypographyStyle({description, children }: {description: string, children: ReactNode }) {
    return <div className="my-4 max-w-56">
        <div className="mb-0 truncate text-ellipsis h-8 flex items-center">
            {children}
        </div>
        <p className="align-top truncate text-wrap text-left">
            {description}
        </p>
    </div>;
}

export default TypographyStyle;