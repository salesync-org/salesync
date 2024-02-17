import { useEffect, useRef, useState } from "react";

type ColorInfoProps = {
    description: string;
    color: string;
};

function ColorInfo(props: ColorInfoProps) {
    const { description, color } = props;
    const [colorName, setColorName] = useState("#000000");
    
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (divRef.current) {
            const computedStyle = getComputedStyle(divRef.current);
            const backgroundColor = computedStyle.backgroundColor;
            // Update the description with the background color
            setColorName(rgbToHex(backgroundColor));

            function rgbToHex(color: string) {
                // Remove the "rgb(" and ")" parts from the string
                const rgb = color.slice(4, -1).split(",");
                const r = parseInt(rgb[0].trim(), 10).toString(16).padStart(2, "0");
                const g = parseInt(rgb[1].trim(), 10).toString(16).padStart(2, "0");
                const b = parseInt(rgb[2].trim(), 10).toString(16).padStart(2, "0");
                return `#${r}${g}${b}`;
            }
        }
    }, []);
    return (
        <div className="p-2 w-32">
            <div ref={divRef} className={`${color} w-12 h-12 my-3 rounded border-2 border-button-stroke-light dark:border-button-stroke-dark`}></div>
            <h4>{colorName}</h4>
            <p>{description}</p>
        </div>
    );
}

export default ColorInfo;