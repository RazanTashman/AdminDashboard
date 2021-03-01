import React from 'react';
import { Bar } from 'react-chartjs-2';

class AvgWeekly extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const dashBoardStyle = {
      width: "800px",
      height: "500px"
    };
    return (

      <div >
        <div style={dashBoardStyle}>
          <Bar
            data={this.props.week}
            options={{
              title: {
                display: true,
                text: 'Average orders per week',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'left'
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }}
          />
        </div>
      </div>
    );
  }
}


export default AvgWeekly;
