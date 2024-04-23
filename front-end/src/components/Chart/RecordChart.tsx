import { Panel } from '@/components/ui';
import useRecords from '@/hooks/record-service/useRecords';
import useType from '@/hooks/type-service/useType';
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartSkeleton from './ChartSkeleton';

ChartJS.register(ArcElement, Tooltip, Title, Legend);

const RecordChart = () => {
  const { types, isLoading: isTypesLoading } = useType();
  const { } = useRecords()

  if (isTypesLoading) {
    return <ChartSkeleton />;
  }

  if (!types) {
    return null;
  }

  const options = {
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: 'right' } }
  };

  const data = {
    labels: ['Leads', 'Opportunities', 'Contacts', 'Cases'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5],
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
  return (
    <Panel>
      <section>
        <h2>Records</h2>
        <p className='mb-4'>Records owned by me and created in the last 30 days</p>
        <div className='grid place-content-center'>
          <Doughnut data={data} options={options} />
        </div>
      </section>
    </Panel>
  );
};
export default RecordChart;
