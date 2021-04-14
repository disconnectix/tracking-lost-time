import React, {useEffect, useState} from 'react';
import './WorkSelect.scss';

const WorkSelect = (props) => {
  let { optionsList, currentWork, getCurrentWork } = props;

  // currentWork = { id: 4, work: 'id=4 eatsplite', bgColor: '#ff00ff' };

  // console.log('currentWork=========================================');
  // console.log(currentWork);


  const [showOptionList, setShowOptionList] = useState(false);
  const [work, setWork] = useState('');
  const [bgColor, setBgColor] = useState('');

  const handleClickOutside = e => {
    if (
      !e.target.classList.contains('select') &&
      !e.target.classList.contains('select__current')
    ) {
      setShowOptionList(false);
    }
  };

  // const handleClickOutside = e => !e.target.classList.contains('select') && !e.target.classList.contains('select__current') && setShowOptionList(false);

  const handleListDisplay = () => {
    setShowOptionList(prevShowOptionList => !prevShowOptionList);
  };

  const handleOptionClick = e => {
    setWork(e.target.getAttribute('data-work'));
    setBgColor(e.target.getAttribute('data-bgcolor'));
    setShowOptionList(false);

    //****************************************************** TEST TEST TEST
    getCurrentWork({
      work: e.target.getAttribute('data-work'),
      bgColor: e.target.getAttribute('data-bgcolor'),
      time: currentWork.time,
    })
    //****************************************************** TEST TEST TEST
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    setWork(currentWork.work);
    setBgColor(currentWork.bgColor);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, []);

    return (
      <div className='select' >
        <div
          className={showOptionList ? 'select__current active' : 'select__current'}
          style={{backgroundColor: bgColor}}
          onClick={handleListDisplay}
        >
          {work}
        </div>
        {showOptionList && (
          <ul className='select__options'>
            {optionsList.map(option => {
              return (
                <li
                  className='select select__item'
                  data-work={option.work}
                  data-bgcolor={option.bgColor}
                  key={option.id}
                  onClick={handleOptionClick}
                  style={{backgroundColor: option.bgColor}}
                >
                  {option.work}
                </li>
                );
              })
            }
          </ul>
        )}
      </div>
    );
}

export default WorkSelect;
