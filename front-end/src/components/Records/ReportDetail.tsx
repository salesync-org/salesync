/* eslint-disable @typescript-eslint/no-explicit-any */
import reportIcon from '@/assets/type-icon/report_type.fb93b610c51607e576fc.svg';
import useRecord from '@/hooks/record-service/useRecord';
import { useParams } from 'react-router-dom';
import { Button, Panel } from '../ui';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import { useToast } from '../ui/Toast';
import RecordTable from './RecordTable';

const ReportDetail = () => {
  const { reportId = '', companyName = '' } = useParams();
  const { data: record, isLoading: isRecordLoading } = useRecord(companyName, reportId);
  const { toast } = useToast();

  if (isRecordLoading) {
    return <LoadingSpinner />;
  }

  if (!record) {
    return null;
  }

  const reportTypeId = record.source_record?.properties?.find(
    (property: any) => property.property_name === 'ReportTypeId'
  )?.item_value;
  const reportProperties = record.source_record?.properties
    ?.find((property: any) => property.property_name === 'ReportProperties')
    ?.item_value?.split(',');

  if (!reportTypeId && !reportProperties) {
    toast({
      title: 'Error',
      description: 'Error loading report',
      variant: 'destructive'
    });
    return null;
  }

  return (
    <Panel className='m-0 flex h-[calc(100dvh-135px)] flex-col p-0'>
      <header className='flex min-h-[64px] items-center justify-between border-b px-10 py-6'>
        <div className='flex items-center gap-3'>
          <img src={reportIcon} alt='icon for report' className='size-12 rounded-md bg-green-500' />
          <div className='flex flex-col'>
            <h2 className='text-lg font-medium'>REPORT</h2>
            <div className='flex items-center gap-2'>
              <span className='text-xl'>{record.source_record.name}</span>
            </div>
          </div>
        </div>
        <Button intent={'normal'} className='px-5' onClick={() => {}}>
          Edit
        </Button>
      </header>
      <div className='flex min-w-full grow overflow-auto'>
        {reportProperties && reportProperties?.length > 0 ? (
          <RecordTable typeId={reportTypeId} showPropertyIds={reportProperties} />
        ) : null}
      </div>
    </Panel>
  );
};
export default ReportDetail;
