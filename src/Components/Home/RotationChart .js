import React, { Component } from 'react';
import pic from '../../static/banner02.png';
import './RotationChart.css';

class RotationChart  extends Component {

    render() {
        return (
            <>
                <div className="rotationChartMain">
                <img src={pic} alt=""></img>
                </div>
               
            </>
        )
    }
}

export default RotationChart;