import NavigationButton from '@/components/NavigationButton/NavigationButton';
import TypeCard from '@/components/ObjectCard/TypeCard';
const HomeLayout = () => {
  //lead
  const Lead: Type = {
    icon_url: 'https://momentum-enterprise-925.my.salesforce.com/img/icon/t4v35/standard/lead_120.png',
    //tailwind color
    background_color: 'bg-red-500',
    type_id: '11111111-1111-1111-1111-111111111111',
    name: 'Lead',
    description: 'Lead type',
    fields: [
      { id: '1', name: 'Status', label: 'Lead Status', values: ['Open - Not Contacted', 'close'] },
      { id: '2', name: 'FirstName', label: 'First Name', values: ['John', 'a'] },
      { id: '3', name: 'LastName', label: 'Last Name', values: ['Doe', 'b '] }
    ]
  };

  //Opportunity type
  const Opportunity: Type = {
    icon_url: 'https://momentum-enterprise-925.my.salesforce.com/img/icon/t4v35/standard/opportunity_120.png',
    background_color: 'bg-green-500',
    type_id: '33333333-3333-3333-3333-333333333333',
    name: 'Opportunity',
    description: 'Opportunity type',
    fields: [
      { id: '1', name: 'name', label: 'Stage', values: ['Prospecting', 'a'] },
      { id: '2', name: 'OpportunityName', label: 'Opportunity Name', values: ['Edge Installation'] },
      { id: '3', name: 'Amount', label: 'Amount', values: ['100000', 'b'] }
    ]
  };
  //contact
  const Contact: Type = {
    icon_url: 'https://momentum-enterprise-925.my.salesforce.com/img/icon/t4v35/standard/contact_120.png',
    background_color: 'bg-blue-500',
    type_id: '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88',
    name: 'Contact',
    description: 'Contact type',
    fields: [
      { id: '1', name: 'FirstName', label: 'First Name', values: ['John'] },
      { id: '2', name: 'LastName', label: 'Last Name', values: ['Doe'] },
      { id: '3', name: 'Email', label: 'Email', values: ['s@gmail.com'] }
    ]
  };

  //case
  const Case: Type = {
    icon_url: 'https://momentum-enterprise-925.my.salesforce.com/img/icon/t4v35/standard/case_120.png',
    background_color: 'bg-yellow-500',
    type_id: '27d0c628-94c2-4650-828f-3c26e61bb692',
    name: 'Case',
    description: 'Case type',
    fields: [
      { id: '1', name: 'Status', label: 'Status', values: ['New', 'a'] },
      { id: '2', name: 'Subject', label: 'Subject', values: ['Edge Installation'] },
      { id: '3', name: 'Priority', label: 'Priority', values: ['High', 'b'] }
    ]
  };

  return (
    <div>
      <section className='fixed left-0 right-0 top-[56px] z-50 flex h-[38px] items-center bg-panel px-6 dark:bg-panel-dark'>
        <NavigationButton />
        <h2 className='select-none pl-6 pr-6 leading-6'>Home</h2>
      </section>
      <section className='grid  flex-grow  grid-cols-1 pt-10 md:grid-cols-2'>
        <TypeCard type={Lead} />
        <TypeCard type={Opportunity} />
        <TypeCard type={Contact} />
        <TypeCard type={Case} />
        <TypeCard type={Case} />
      </section>
    </div>
  );
};

export default HomeLayout;
