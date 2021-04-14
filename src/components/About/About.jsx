 import React from 'react';
 import './About.scss';
 import WorkSelect from './WorkSelect';

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
      { id: 1, work: 'eat', bgColor: '#ff0000' },
      { id: 2, work: 'splice', bgColor: '#00ff00' },
      { id: 3, work: 'listen', bgColor: '#0000ff' },
      { id: 4, work: 'id=4 eat-splice', bgColor: '#ff00ff' },
      { id: 5, work: 'eat-listen', bgColor: '#ffff00' },
      { id: 6, work: 'eat-eat', bgColor: '#0000ff' },
      { id: 7, work: 'splice-splice', bgColor: '#00ffff' },
      { id: 8, work: '123123-splice', bgColor: '#fffff0' },
      { id: 9, work: '44444listen', bgColor: '#f0000f' },
      { id: 10, work: '55555eat', bgColor: '#f0f00f' }
    ];

    currentWork =  { id: 4, work: 'id=4 eatsplite', bgColor: '#ff00ff' };


    constructor(props) {
      super(props);
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

          <WorkSelect
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

