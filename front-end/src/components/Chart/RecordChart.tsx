import { Button, Panel } from '@/components/ui';
import useRecords from '@/hooks/record-service/useRecords';
import useType from '@/hooks/type-service/useType';
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartSkeleton from './ChartSkeleton';
import { NavLink, useParams } from 'react-router-dom';
import { BarChartBig } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Title, Legend);

const RecordChart = () => {
  const { types = [], isLoading: isTypesLoading } = useType();
  const { companyName = '' } = useParams();

  const { data: leadRecords, isLoading: leadsLoading } = useRecords(
    companyName,
    Array.isArray(types) ? types.find((type) => type.name === 'Lead')?.id || '' : ''
  );
  const { data: contactRecords, isLoading: contactsLoading } = useRecords(
    companyName,
    Array.isArray(types) ? types.find((type) => type.name === 'Contact')?.id || '' : ''
  );
  const { data: opportunityRecords, isLoading: opportunityLoading } = useRecords(
    companyName,
    Array.isArray(types) ? types.find((type) => type.name === 'Opportunity')?.id || '' : ''
  );
  const { data: accountRecords, isLoading: accountLoading } = useRecords(
    companyName,
    Array.isArray(types) ? types.find((type) => type.name === 'Account')?.id || '' : ''
  );

  if (isTypesLoading || leadsLoading || contactsLoading || opportunityLoading || accountLoading) {
    return <ChartSkeleton />;
  }

  if (!types || !leadRecords || !contactRecords || !opportunityRecords || !accountRecords) {
    return null;
  }

  const leadNumber = leadRecords.records.length;
  const opportunityNumber = opportunityRecords.records.length;
  const contactNumber = contactRecords.records.length;
  const accountNumber = accountRecords.records.length;

  const data = {
    labels: ['Leads', 'Opportunities', 'Contacts', 'Accounts'],
    datasets: [
      {
        label: '# of Records',
        data: [leadNumber, opportunityNumber, contactNumber, accountNumber],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
        hoverOffset: 12
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    offset: 8,
    plugins: { legend: { display: true, position: 'right' as const } }
  };

  return (
    <Panel className='m-0'>
      <section className='flex h-full flex-col'>
        <div className='justify-bewteen flex'>
          <div className='w-full'>
            <h2>Records</h2>
            <p className='mb-4 text-[0.9rem]'>Records owned by me and created in the last 30 days</p>
          </div>
          <NavLink to={`/${companyName ?? ''}/section/sales/${types.find((type) => type.name === 'Report')?.id}`}>
            <Button
              rounded
              className='justify-center rounded-full border-0 border-primary font-[450] text-primary hover:border-2'
            >
              <BarChartBig size={'1.4rem'}></BarChartBig>
              <p className='text-nowrap'>View Full Report</p>
            </Button>
          </NavLink>
        </div>
        <div className='grid h-max flex-grow place-content-center'>
          {leadNumber === 0 && opportunityNumber === 0 && contactNumber === 0 && accountNumber === 0 ? (
            <h3>{"You don't have any Records"}</h3>
          ) : (
            <Doughnut data={data} options={options} />
          )}
        </div>
      </section>
    </Panel>
  );
};
export default RecordChart;
