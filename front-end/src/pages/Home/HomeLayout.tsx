import TypeCard from '@/components/ObjectCard/TypeCard';
import AsideNav from '@/components/RecordLayout/AsideNav';

const HomeLayout = () => {
  //lead
  let Lead: Type = {
    icon_url: 'https://momentum-enterprise-925.my.salesforce.com/img/icon/t4v35/standard/lead_120.png',
    //tailwind color
    background_color: 'bg-red-500',
    id: '1',
    name: 'Lead',
    description: 'Lead type',
    fields: [
      { id: '1', name: 'Status', label: 'Lead Status', values: ['Open - Not Contacted', 'close'] },
      { id: '2', name: 'FirstName', label: 'First Name', values: ['John', 'a'] },
      { id: '3', name: 'LastName', label: 'Last Name', values: ['Doe', 'b '] }
    ]
  };

  //Opportunity type
  let Opportunity: Type = {
    icon_url: 'https://momentum-enterprise-925.my.salesforce.com/img/icon/t4v35/standard/opportunity_120.png',
    background_color: 'bg-green-500',
    id: '2',
    name: 'Opportunity',
    description: 'Opportunity type',
    fields: [
      { id: '1', name: 'name', label: 'Stage', values: ['Prospecting', 'a'] },
      { id: '2', name: 'OpportunityName', label: 'Opportunity Name', values: ['Edge Installation'] },
      { id: '3', name: 'Amount', label: 'Amount', values: ['100000', 'b'] }
    ]
  };
  //contact
  let Contact: Type = {
    icon_url: 'https://momentum-enterprise-925.my.salesforce.com/img/icon/t4v35/standard/contact_120.png',
    background_color: 'bg-blue-500',
    id: '3',
    name: 'Contact',
    description: 'Contact type',
    fields: [
      { id: '1', name: 'FirstName', label: 'First Name', values: ['John'] },
      { id: '2', name: 'LastName', label: 'Last Name', values: ['Doe'] },
      { id: '3', name: 'Email', label: 'Email', values: ['s@gmail.com'] }
    ]
  };

  //case
  let Case: Type = {
    icon_url: 'https://momentum-enterprise-925.my.salesforce.com/img/icon/t4v35/standard/case_120.png',
    background_color: 'bg-yellow-500',
    id: '4',
    name: 'Case',
    description: 'Case type',
    fields: [
      { id: '1', name: 'Status', label: 'Status', values: ['New', 'a'] },
      { id: '2', name: 'Subject', label: 'Subject', values: ['Edge Installation'] },
      { id: '3', name: 'Priority', label: 'Priority', values: ['High', 'b'] }
    ]
  };
  // console.log(Case.fields?.[0].values[0])

  return (
    <div className='flex min-h-dvh w-full'>
      <AsideNav />
      <main className='flex w-full flex-col'>
        <section className='h-12 w-full bg-primary-color'></section>
        <header className='h-12 w-full bg-white'></header>
        <div className='grid  flex-grow  grid-cols-1 bg-main-background bg-cover bg-no-repeat md:grid-cols-2'>
          <TypeCard type={Lead} />
          <TypeCard type={Opportunity} />
          <TypeCard type={Contact} />
          <TypeCard type={Case} />
        </div>
      </main>
    </div>
  );
};

export default HomeLayout;
