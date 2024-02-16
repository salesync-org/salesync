import React from 'react';

const Panel = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-panel-light px-10 py-12 m-4 rounded-lg dark:bg-panel-dark">
            {children}
        </div>
    );
};

export default Panel;