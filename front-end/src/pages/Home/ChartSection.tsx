import { Panel } from '@/components/ui';
import { Chart as ChartJS, ArcElement, Tooltip, Title, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Title, Legend);

const ChartSection = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: true, position: 'bottom' } }
  };

  const plugin = {
    beforeInit(chart) {
      console.log('be');
      // reference of original fit function
      const originalFit = chart.legend.fit;

      // override the fit function
      chart.legend.fit = function fit() {
        // call original function and bind scope in order to use `this` correctly inside it
        originalFit.bind(chart.legend)();
        // increase the width to add more space
        this.width += 20;
      };
    }
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
        hoverOffset: 40
      }
    ]
  };
  return (
    <Panel>
      <section>
        <h2>Lead</h2>
        <p className='mb-6'>Leads owned by me and created in the last 30 days</p>
        <div className='grid  place-content-center'>
          <Doughnut data={data} options={options} plugins={[plugin]} />
        </div>
      </section>
    </Panel>
  );
};
export default ChartSection;
