import recordApi, { BulkRecordRequestType } from '@/api/record';
import fileImage from '@/assets/system/file_upload.png';
import { Modal, PrimaryButton } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import useProperties, { PropertiesQueryResponse } from '@/hooks/type-service/useProperties';
import useStages from '@/hooks/type-service/useStage';
import { exportTableTemplate, importFromExcel } from '@/utils/utils';
import { Download } from 'lucide-react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

type RecordImportModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RecordImportModal = ({ isOpen, onClose }: RecordImportModalProps) => {
  const { typeId = '', companyName = '' } = useParams();
  const { data: stages = [] } = useStages(companyName, typeId);
  const propertiesQuery: PropertiesQueryResponse = useProperties(companyName, typeId);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  async function importRecords(data: Record<string, string>[] = []) {
    const requestData: BulkRecordRequestType[] = data.map((record) => {
      return {
        properties: Object.keys(record).map((key) => ({
          id: '',
          property_name: key,
          property_label: key,
          item_value: record[key]
        })),
        record_name: record.Name,
        type_id: typeId,
        stage_id: stages?.[0]?.id
      };
    });

    try {
      await recordApi.createBulkRecords(companyName, requestData);
      queryClient.invalidateQueries(['records', typeId]);
      toast({
        title: 'Success',
        description: 'Record(s) imported successfully'
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Import failed. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      onClose();
    }
  }
  const handleSubmitFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = (e.target as HTMLFormElement).filename.files?.[0];
    if (!file) {
      return;
    }
    await importFromExcel(file, importRecords);
  };
  const propertiesQueryData = propertiesQuery.data;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title=''>
      <div className='overflow-y-auto'>
        <section className='grid grid-cols-2 bg-clip-border'>
          <div className='absolute left-0 top-0 h-full w-1/2 origin-top-left overflow-hidden rounded-l-lg bg-gradient-to-b from-primary to-slate-100'>
            <img className='absolute top-1/2 my-auto w-full origin-center -translate-y-1/2' src={fileImage}></img>
          </div>
          <div className='h-full w-full'>
            <div className='absolute bottom-[1.2rem] left-0 right-2 mr-2 flex w-1/2 justify-center p-2'>
              <PrimaryButton
                className=''
                onClick={() => {
                  exportTableTemplate(propertiesQueryData?.properties ?? []);
                }}
              >
                <Download size='1.2rem'></Download>
                <p>Download Template</p>
              </PrimaryButton>
            </div>
          </div>
          <div className='w-full p-4 pl-8'>
            <h1 className='text-center'>Import CSV File</h1>
            <div className='drag-into-zone mx-auto space-y-4 p-4'>
              <p className='text-center'>Choose your CSV file to import.</p>
              <form className='mx-auto flex justify-center' onSubmit={handleSubmitFile}>
                <input className='' type='file' name='filename' />
                <PrimaryButton type='submit'>Import</PrimaryButton>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Modal>
  );
};

export default RecordImportModal;
