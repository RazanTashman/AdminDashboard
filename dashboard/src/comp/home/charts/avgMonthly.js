import React from 'react';
import {Bar} from 'react-chartjs-2';
////////////
 class AvgMonthly extends React.Component {
  constructor(props){
    super(props)

}
  render(props) {
    const dashBoardStyle = {
        width:"800px",
        height:"500px"
    };
    return (
        
      <div >
          <div style ={dashBoardStyle}>
        <Bar 
          data={this.props.state}
          options={{
            title:{
              display:true,
              text:'Average orders per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'left'
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

export default AvgMonthly;
