import PrimaryButton from "../../../components/Button/PrimaryButton";
import Button from "../../../components/Button/Button";
import Panel from "../../../components/Panel/Panel";
import ToggleButton from "../../../components/Button/ToggleButton";
import Icon from "../../../components/Icon/Icon";
import TextInput from "../../../components/TextInput/TextInput";

function ComponentPanel() {
    return (
        <Panel>
            <h1 className="mb-5">UI Component</h1>
            <p>
                These are all of the predefined UI components to be used in the project.
            </p>
            <div className="flex flex-wrap my-6 *:my-6 space-x-10 justify-center">
                <div>
                    <h2 className="mb-4">Primary Button</h2>
                    <PrimaryButton onClick={function (): void {}} header="Normal" showHeader={true}>Primary</PrimaryButton>
                    <PrimaryButton onClick={function (): void {}} header="Disabled" disabled={true} showHeader={true}>Primary</PrimaryButton>
                    <PrimaryButton onClick={function (): void {}} header="Icon" showHeader={true}>
                        <Icon name="search" />
                        <p>Primary</p>
                    </PrimaryButton>
                </div>
                <div>
                    <h2 className="mb-4">Secondary Button</h2>
                    <Button onClick={function (): void {}} header="Normal" showHeader={true}>Secondary</Button>
                    <Button onClick={function (): void {}} header="Disabled" disabled={true} showHeader={true}>Secondary</Button>
                    <Button onClick={function (): void {}} header="Icon" showHeader={true}>
                        <Icon name="edit" />
                        <p>Secondary</p>
                    </Button>
                </div>
                <div>
                    <h2 className="mb-4">Toggle Button</h2>
                    <ToggleButton header="Normal" onClick={function (): void {}} checked={false} />
                    <ToggleButton header="Disabled & Off" disabled onClick={function (): void {}} checked={false} />
                    <ToggleButton header="Disabled & On" disabled onClick={function (): void {}} checked={true} />
                </div>
                <div>
                    <h2 className="mb-4">Input Button</h2>
                    <TextInput header="Normal" value="" placeholder="Something"/>
                    <TextInput header="With Icon" value="" placeholder="Something" prefixIcon="search"/>
                </div>
            </div>
            
        </Panel>
    );
}

export default ComponentPanel;