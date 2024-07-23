/* eslint-disable @typescript-eslint/no-explicit-any */
import recordApi, { RecordsFilter } from '@/api/record';
import useRecord from '@/hooks/record-service/useRecord';
import useRecords from '@/hooks/record-service/useRecords';
import useProperties from '@/hooks/type-service/useProperties';
import useType from '@/hooks/type-service/useType';
import ErrorToaster from '@/pages/Error/ErrorToaster';
import { cn } from '@/utils/utils';
import { Pencil } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Panel, TextInput } from '../ui';
import { useToast } from '../ui/Toast';
import RecordTable, { RecordTableSkeleton } from './RecordTable';

const UpdateReport = () => {
  const [reportName, setReportName] = useState('');
  const [isUpdateName, setIsUpdateName] = useState(false);
  const [showPropertyIds, setShowPropertyIds] = useState<string[]>([]);
  const [typeReportId, setTypeReportId] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [recordFilter, setRecordFilter] = useState<RecordsFilter>({
    searchTerm: '',
    isAsc: false,
    propertyName: null,
    currentPage: 1,
    pageSize: 30
  });
  const { companyName = '', domainName = '' } = useParams();
  const { data: recordData, isLoading: isRecordLoading } = useRecords(companyName, typeReportId);
  const { data: propertyData, isLoading: isPropertyLoading } = useProperties(companyName, typeReportId);
  const { types, isLoading: isTypeLoading } = useType();
  const { data: reportProperties, isLoading: isReportTypeLoading } = useProperties(
    companyName,
    types?.find((type: any) => type.name === 'Report')?.id
  );
  const { reportId = '' } = useParams();
  const { data: report, isLoading: isReportLoading, status } = useRecord(companyName, reportId);

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (report) {
      setReportName(report.source_record.name);
      setShowPropertyIds(
        report.source_record.properties
          ?.find((property: any) => property.property_name === 'ReportProperties')
          ?.item_value?.split(',') || []
      );
      setTypeReportId(
        report.source_record.properties?.find((property: any) => property.property_name === 'ReportTypeId')?.item_value
      );
    }
  }, [report, status]);

  if (isRecordLoading || isPropertyLoading || isTypeLoading || isReportTypeLoading || isReportLoading) {
    return <RecordTableSkeleton />;
  }

  if (!recordData && !propertyData && !types && !reportProperties && !report) {
    return <ErrorToaster errorMessage='Error loading table ' />;
  }

  const handleUpdateReport = async () => {
    const properties: any = reportProperties?.properties;

    if (!properties) {
      return;
    }

    const newReport = JSON.parse(JSON.stringify(report));
    const req = newReport.source_record;

    const reportPropertiesIndex = req.properties.findIndex(
      (property: any) => property.property_name === 'ReportProperties'
    );

    req.properties[0].item_value = reportName;
    req.properties[reportPropertiesIndex].item_value = showPropertyIds.join(',');

    try {
      setUpdateLoading(true);
      const res = await recordApi.updateRecord(companyName, reportId, req);

      if (res) {
        toast({
          title: 'Report Updated',
          description: 'Report has been updated successfully'
        });
        queryClient.invalidateQueries(['records']);
        navigate(`/${companyName}/section/${domainName}/report/${res.id}`);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to update report',
        variant: 'destructive'
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <Panel className='m-0 flex h-[calc(100dvh-135px)] flex-col p-0'>
      <header className='flex min-h-[64px] items-center justify-between border-b px-10 py-6'>
        <div className='flex flex-col'>
          <h2 className='text-lg font-medium'>REPORT</h2>
          <div className='w-[400px]'>
            {isUpdateName ? (
              <UpdateName
                setIsUpdating={setIsUpdateName}
                setReportName={setReportName}
                reportName={reportName}
              ></UpdateName>
            ) : (
              <div className='flex items-center gap-2'>
                <span className='text-xl'>{reportName}</span>
                <Pencil className='cursor-pointer ' size={12} onClick={() => setIsUpdateName(true)}></Pencil>
              </div>
            )}
          </div>
        </div>
        <Button disabled={updateLoading} intent='primary' onClick={handleUpdateReport}>
          {updateLoading ? 'Processing...' : 'Save'}
        </Button>
      </header>
      <div className='flex grow overflow-hidden'>
        <section
          className={cn('h-full w-[232px] border-r px-8 py-4', updateLoading && 'pointer-events-none opacity-50')}
        >
          {propertyData && (
            <SelectColumns
              typeProperties={propertyData}
              showProperties={showPropertyIds}
              setShowProperties={setShowPropertyIds}
            />
          )}
        </section>
        <section>
          {showPropertyIds.length > 0 ? (
            <RecordTable
              recordFilter={recordFilter}
              setRecordFilter={setRecordFilter}
              typeId={typeReportId}
              showPropertyIds={showPropertyIds}
            />
          ) : null}
        </section>
      </div>
    </Panel>
  );
};

const SelectColumns = ({ typeProperties, setShowProperties, showProperties }: any) => {
  const [selects, setSelects] = useState(() => {
    return typeProperties.properties.map((property: any) => {
      return {
        id: property.id,
        name: property.name,
        selected: showProperties.includes(property.id)
      };
    });
  });

  useEffect(() => {
    setShowProperties(selects.filter((select: any) => select.selected).map((select: any) => select.id));
  }, [selects, setShowProperties]);

  return (
    <div className='flex h-full flex-col gap-4'>
      <h2 className='text-xl'>Columns</h2>
      <ul className='flex grow flex-col gap-2 overflow-auto'>
        {selects.map((select: any) => {
          return (
            <>
              <li
                key={select.id}
                className='flex items-center justify-between rounded-md bg-slate-200/60 px-2 py-3 shadow-sm'
              >
                <label className='text-base'>{select.name}</label>{' '}
                <input
                  type='checkbox'
                  checked={select.selected}
                  onChange={() => {
                    setSelects((prev: any) => {
                      return prev.map((prevSelect: any) => {
                        if (prevSelect.id === select.id) {
                          return {
                            ...prevSelect,
                            selected: !prevSelect.selected
                          };
                        }
                        return prevSelect;
                      });
                    });
                  }}
                />
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

const UpdateName = ({
  reportName,
  setIsUpdating,
  setReportName
}: {
  reportName: string;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
  setReportName: Dispatch<SetStateAction<string>>;
}) => {
  const [value, setValue] = useState(reportName);
  return (
    <form className='relative'>
      <div className='absolute right-0 z-10 flex h-full'>
        <Button
          className='select-none'
          onClick={() => {
            setIsUpdating(false);
          }}
          intent='normal'
        >
          Cancel
        </Button>
        <Button
          className='select-none'
          type='submit'
          intent='primary'
          onClick={() => {
            setReportName(value);
            setIsUpdating(false);
          }}
        >
          Save
        </Button>
      </div>
      <TextInput
        className='w-full select-none'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputClassName='pr-[156px]'
      ></TextInput>
    </form>
  );
};
export default UpdateReport;
