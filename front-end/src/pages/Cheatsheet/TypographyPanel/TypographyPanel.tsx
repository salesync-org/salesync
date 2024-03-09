import {Panel} from '@/components/ui';
import TypographyStyle from './TypographyStyle';

function TypographyPanel() {
  return (
    <Panel>
      <h1 className='mb-5'>Typography</h1>
      <p>
        Text styles keep the project clean and unified. Following these predefined styles according to their usecases is
        a must.
      </p>
      <div className='grid divide-input-stroke-light *:px-4 dark:divide-input-stroke-dark sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 lg:divide-x-2'>
        <TypographyStyle description='Large title of a page'>
          <h1>Title</h1>
        </TypographyStyle>
        <TypographyStyle description='Title for each separated sections of a page'>
          <h2>Section Title</h2>
        </TypographyStyle>
        <TypographyStyle description='The header for each subsection of a section'>
          <h3>Subsection Title</h3>
        </TypographyStyle>
        <TypographyStyle description='Used to emphasize a content out of Normal Text'>
          <h4>Strong Text</h4>
        </TypographyStyle>
        <TypographyStyle description='Used for less important content near Normal Text'>
          <h5>Caption Text</h5>
        </TypographyStyle>
        <TypographyStyle description='Used for most cases where a piece of content is shown'>
          <p>Normal Text</p>
        </TypographyStyle>
      </div>
    </Panel>
  );
}

export default TypographyPanel;
