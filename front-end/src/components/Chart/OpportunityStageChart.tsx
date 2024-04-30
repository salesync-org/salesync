import { Panel } from '@/components/ui';
import useType from '@/hooks/type-service/useType';
import { Chart as ChartJS, ArcElement, Tooltip, Title, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import ChartSkeleton from './ChartSkeleton';
import useStages from '@/hooks/type-service/useStage';
import useRecords from '@/hooks/record-service/useRecords';
import { generateChartColor } from '@/utils/utils';

ChartJS.register(ArcElement, Tooltip, Title, Legend);

const OpportunityStageChart = () => {
  const { types = [], isLoading: isTypesLoading } = useType();
  const { companyName = '' } = useParams();

  const { data: opportunityStages, isLoading: opportunityStageLoading } = useStages(
    companyName,
    Array.isArray(types) ? types.find((type) => type.name === 'Opportunity')?.id || '' : ''
  );

  const { data: opportunityRecords, isLoading: opportunityLoading } = useRecords(
    companyName,
    Array.isArray(types) ? types.find((type) => type.name === 'Opportunity')?.id || '' : ''
  );

  if (isTypesLoading || opportunityStageLoading || opportunityLoading) {
    return <ChartSkeleton />;
  }

  if (!types || !opportunityStages || !opportunityRecords) {
    return null;
  }

  const stageMap: Record<string, string> = {};

  for (const stage of opportunityStages) {
    stageMap[stage.id] = stage.name;
  }

  const records = opportunityRecords.records;
  const opportunityNumber = records.length;

  const labels: string[] = [];
  const chartData: number[] = [];

  for (const record of records) {
    const stageId = record.current_stage_id;
    const stageName = stageMap[stageId];
    if (!labels.includes(stageName)) {
      labels.push(stageName);
      chartData.push(1);
    } else {
      const index = labels.indexOf(stageName);
      chartData[index] += 1;
    }
  }

  const options = {
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: 'right' as const } }
  };

  const { backgroundColor, borderColor } = generateChartColor(labels.length);

  const data = {
    labels,
    datasets: [
      {
        label: '# of Opportunities',
        data: chartData,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        hoverOffset: 12
      }
    ]
  };
  return (
    <Panel>
      <section>
        <h2>Opportunity</h2>
        <p className='mb-4'>Opportunities owned by me and created in the last 30 days</p>
        <div className='grid h-max flex-grow place-content-center'>
          {opportunityNumber === 0 ? (
            <h3>{"You don't have any Opportunities"}</h3>
          ) : (
            <Doughnut data={data} options={options} />
          )}
        </div>
      </section>
    </Panel>
  );
};
export default OpportunityStageChart;
