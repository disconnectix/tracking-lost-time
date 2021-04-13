import React from 'react';
import './WorkSelect2.scss';

class WorkSelect2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // selectText: '',
      showOptionList: false,
      // optionsList: []
      work: '',
      bgColor: '',
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.setState({
      work: this.props.currentWork.work,
      bgColor: this.props.currentWork.bgColor,
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = e => {
    if (
      !e.target.classList.contains('select') &&
      !e.target.classList.contains('select__current')
    ) {
      this.setState({
        showOptionList: false
      });
    }
  };

  handleListDisplay = () => {
    this.setState(prevState => {
      return {
        showOptionList: !prevState.showOptionList
      };
    });
  };

  handleOptionClick = e => {
    this.setState({
      work: e.target.getAttribute('data-work'),
      bgColor: e.target.getAttribute('data-bgcolor'),
      showOptionList: false
    });
    //****************************************************** TEST TEST TEST
    this.props.getCurrentWork({
      work: e.target.getAttribute('data-work'),
      bgColor: e.target.getAttribute('data-bgcolor'),
    })
  };

  render() {
    const { optionsList } = this.props;
    const { showOptionList, work, bgColor } = this.state;

    return (
      <div className='select'>
        <div
          className={showOptionList ? 'select__current active' : 'select__current'}
          style={{backgroundColor: bgColor}}
          onClick={this.handleListDisplay}
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
                    onClick={this.handleOptionClick}
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
}

export default WorkSelect2;


/**
 *
 * class WorkSelect2 extends React.Component {
  constructor(props) {
    super(props);

    // @defaultSelectText => Show default text in select
    // @showOptionList => Show / Hide List options
    // @optionsList => List of options
    this.state = {
      // selectText: '',
      showOptionList: false,
      // optionsList: []
      work: '',
      bgColor: '',
    };
  }

  componentDidMount() {
    // Add Event Listner to handle the click that happens outside
    // the Custom Select Container
    document.addEventListener('mousedown', this.handleClickOutside);
    this.setState({
      // selectText: this.props.defaultText,

      work: this.props.currentWork.work,
      bgColor: this.props.currentWork.bgColor,
    });
  }

  componentWillUnmount() {
    // Remove the event listner on component unmounting
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  // +++ This method handles the click that happens outside the
  // select text and list area
  handleClickOutside = e => {
    if (
      !e.target.classList.contains('select') &&
      !e.target.classList.contains('select__current')
    ) {
      this.setState({
        showOptionList: false
      });
    }
  };

  // +++ This method handles the display of option list
  handleListDisplay = () => {
    this.setState(prevState => {
      return {
        showOptionList: !prevState.showOptionList
      };
    });
  };

  // This method handles the setting of name in select text area
  // and list display on selection
  handleOptionClick = e => {
    this.setState({
      work: e.target.getAttribute('data-work'),
      bgColor: e.target.getAttribute('data-bgcolor'),
      showOptionList: false
    });
    //****************************************************** TEST TEST TEST
    this.props.getCurrentWork({
      work: e.target.getAttribute('data-work'),
      bgColor: e.target.getAttribute('data-bgcolor'),
    })
  };

  render() {
    const { optionsList } = this.props;
    const { showOptionList, work, bgColor } = this.state;

    return (
      <div className='select'>
        <div
          className={showOptionList ? 'select__current active' : 'select__current'}
          style={{backgroundColor: bgColor}}
          onClick={this.handleListDisplay}
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
                    onClick={this.handleOptionClick}
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
}

 *
 * */
