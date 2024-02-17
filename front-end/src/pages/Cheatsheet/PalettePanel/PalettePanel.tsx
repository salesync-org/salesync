import Panel from "../../../components/Panel/Panel";
import ColorInfo from "./ColorInfo";

function PalettePanel() {
    return (
        <Panel>
            <div className="mb-5 flex justify-stretch align-middle items-center">
                <h1 className="">Color Palette</h1>
            </div>
            <p>
                Toggle between Light/Dark theme to reflect the palette changes.
            </p>
            
            <div className="flex flex-wrap divide-input-stroke-light dark:divide-input-stroke-dark *:px-4">
                <ColorInfo color="bg-background-light dark:bg-background-dark" description="Background" />
                <ColorInfo color="bg-panel dark:bg-panel-dark" description="Panel" />
                <ColorInfo color="bg-text dark:bg-text-dark" description="Text" />
                <ColorInfo color="bg-button-background dark:bg-button-background-dark" description="Button Background (Float Up)" />
                <ColorInfo color="bg-button-stroke dark:bg-button-stroke-dark" description="Button Stroke (Float Up)" />
                <ColorInfo color="bg-input-background dark:bg-input-background-dark" description="Input Background (Sink Down)" />
                <ColorInfo color="bg-input-stroke dark:bg-input-stroke-dark" description="Input Stroke (Sink Down)" />
                <ColorInfo color="bg-primary" description="Primary" />
                <ColorInfo color="bg-primary-stroke" description="Primary Stroke" />
                <ColorInfo color="bg-on-primary" description="On Primary" />
                <ColorInfo color="bg-secondary dark:bg-secondary-dark" description="Secondary" />
                <ColorInfo color="bg-link-text dark:bg-link-text-dark" description="Link Text" />
            </div>
        </Panel>
    );
}

export default PalettePanel;