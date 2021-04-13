 import React from 'react';
 import './About.scss';
 // import WorksSelect from './WorksSelect.jsx';
 import WorkSelect2 from './WorkSelect2';

//  const About = () => {
//
//   return (
//     <section className='about'>
//       <p>About</p>
//
//       <WorksSelect />
//       <div>*************************************************************************************</div>
//       <WorkSelect2 />
//
//     </section>
//   )
// }





  class About extends React.Component {

    countryList = [
      { id: 1, name: "Australia", work: 'eat', bgColor: '#ff0000' },
      { id: 2, name: "Brazil", work: 'splite', bgColor: '#00ff00' },
      { id: 3, name: "China", work: 'listen', bgColor: '#0000ff' },
      { id: 4, name: "Denmark", work: 'id=4 eatsplite', bgColor: '#ff00ff' },
      { id: 5, name: "Egypt", work: 'eatlisten', bgColor: '#ffff00' },
      { id: 6, name: "Finland", work: 'eateat', bgColor: '#0000ff' },
      { id: 7, name: "Ghana", work: 'splitesplite', bgColor: '#00ffff' },
      { id: 8, name: "Hungary", work: '123123splite', bgColor: '#fffff0' },
      { id: 9, name: "India", work: '44444listen', bgColor: '#f0000f' },
      { id: 10, name: "Japan", work: '55555eat', bgColor: '#f0f00f' }
    ];

    currentWork =  { id: 4, name: "Denmark", work: 'id=4 eatsplite', bgColor: '#ff00ff' };


    constructor(props) {
    super(props);

    this.state = {
      // showList: false,
      selectText: "Please select an option",
    };
  }

  //************************************************************** TEST TEST TEST
    getCurrentWork = (data) => {
      console.log(`work : ${data.work}`);
      console.log(`bgColor : ${data.bgColor}`);
  }
  //************************************************************** TEST TEST TEST

  render() {
    return (
      <div className="App">
        <h3 className="title">Custom React Select</h3>
        <div className="test">

          <WorkSelect2
            defaultText={this.state.selectText}
            optionsList={this.countryList}
            currentWork={this.currentWork}
            getCurrentWork={this.getCurrentWork}
          />

        </div>
      </div>
    );
  }
}






 export default About;

