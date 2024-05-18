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

const LeadStageChart = () => {
  const { types = [], isLoading: isTypesLoading } = useType();
  const { companyName = '' } = useParams();

  const { data: leadStages, isLoading: leadStageLoading } = useStages(
    companyName,
    Array.isArray(types) ? types.find((type) => type.name === 'Lead')?.id || '' : ''
  );

  const { data: leadRecords, isLoading: leadsLoading } = useRecords(
    companyName,
    Array.isArray(types) ? types.find((type) => type.name === 'Lead')?.id || '' : ''
  );

  if (isTypesLoading || leadStageLoading || leadsLoading) {
    return <ChartSkeleton />;
  }

  if (!types || !leadStages || !leadRecords) {
    return null;
  }

  const stageMap: Record<string, string> = {};

  for (const stage of leadStages) {
    stageMap[stage.id] = stage.name;
  }

  const records = leadRecords.records;
  const leadNumber = records.length;

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
        label: '# of Leads',
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
        <h2>Lead</h2>
        <p className='mb-4'>Leads owned by me and created in the last 30 days</p>
        <div className='grid h-max flex-grow place-content-center'>
          {leadNumber === 0 ? <h3>{"You don't have any Leads"}</h3> : <Doughnut data={data} options={options} />}
        </div>
      </section>
    </Panel>
  );
};
export default LeadStageChart;
