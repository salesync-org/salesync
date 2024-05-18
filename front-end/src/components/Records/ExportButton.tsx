import { utils, writeFile } from 'xlsx';
import { Button } from '../ui';
const ExportButton = () => {
  const handleExport = () => {
    const recordsFromStorage = localStorage.getItem('records');
    const records: Record<string, string>[] = recordsFromStorage ? JSON.parse(recordsFromStorage) : [];

    if (records) {
      const ws = utils.json_to_sheet(records);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Data');

      const name = `report-${new Date().toISOString().split('T')[0]}.xlsx`;
      writeFile(wb, name);
    }
  };
  return (
    <Button className='px-4' onClick={handleExport}>
      Export
    </Button>
  );
};
export default ExportButton;
