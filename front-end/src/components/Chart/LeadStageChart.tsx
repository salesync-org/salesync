import { Button, Panel } from '@/components/ui';
import useRecordsNormal from '@/hooks/record-service/useRecordsNormal';
import useStages from '@/hooks/type-service/useStage';
import useType from '@/hooks/type-service/useType';
import { generateChartColor } from '@/utils/utils';
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import { ChevronRight } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { NavLink, useParams } from 'react-router-dom';
import ChartSkeleton from './ChartSkeleton';

ChartJS.register(ArcElement, Tooltip, Title, Legend);

const LeadStageChart = () => {
  const { types = [], isLoading: isTypesLoading } = useType();
  const { companyName = '' } = useParams();

  const { data: leadStages, isLoading: leadStageLoading } = useStages(
    companyName,
    Array.isArray(types) ? types.find((type) => type.name === 'Lead')?.id || '' : ''
  );

  const { data: leadRecords, isLoading: leadsLoading } = useRecordsNormal(
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
    const stageName = stageMap[stageId] ?? 'None';
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
    offset: 8,
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
    <Panel className='m-0'>
      <section className='flex h-full flex-col'>
        <div className='justify-bewteen flex'>
          <div className='w-full'>
            <h2>Leads</h2>
            <p className='mb-4 text-[0.9rem]'>Leads owned by me and created in the last 30 days</p>
          </div>
          <NavLink to={`/${companyName ?? ''}/section/sales/${types.find((type) => type.name === 'Lead')?.id}`}>
            <Button
              rounded
              className='justify-center rounded-full border-0 border-primary font-[450] text-primary hover:border-2'
            >
              <p className='text-nowrap'>View Leads</p>
              <ChevronRight size={'1.4rem'}></ChevronRight>
            </Button>
          </NavLink>
        </div>
        <div className='grid h-max flex-grow place-content-center'>
          {leadNumber === 0 ? <h3>{"You don't have any Leads"}</h3> : <Doughnut data={data} options={options} />}
        </div>
      </section>
    </Panel>
  );
};
export default LeadStageChart;
