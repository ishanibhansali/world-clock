
import React, {Component} from 'react';
import styled from "styled-components";
import { Spring } from 'react-spring/renderprops';

import './timer.scss';

const Label = styled.form`
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
  padding: 1.2rem 0.8rem;
  box-shadow: 0 0 0 2px #a86989;
  background: #03031b;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 2;
`;

const LabelText = styled.label`
  color: #fff;
  font-size: 0.7rem;
  margin: 0.25rem 0;
`;

const LabelInput = styled.input`
  background: none;
  border: none;
  border-left: 2px solid #a86989;
  border-radius: 1px;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 300;
  padding: 0.25rem 0.75rem;
  color: #fff;
`;

const OutputLabel = ({ label, handleTimerLabelInput }) => {
  return (
    <Label
      onSubmit={handleTimerLabelInput}>
      <LabelText>Timer's Label</LabelText>
      <LabelInput
        type="text"
        placeholder={label}
      />
    </Label>
  )
};

const OutputDisplay = ({ total, timeTotal, label, isLabel, handleTimerLabel, handleTimerLabelInput }) => {
  let s = timeTotal;
  let m = 0;
  let h = 0;
  while (s >= 60) {
    s -= 60;
    m += 1;
  }

  while (m >= 60) {
    m -= 60;
    h += 1;
  }
  const time = {};
  if (total >= 3600) {
    time.h = h;
  }
  if (total >= 60) {
    time.m = m;
  }

  time.s = s;

  const timeValues = Object.entries(time);
  const Text = timeValues.map((entry, index) => {
    const position = 90 / (timeValues.length + 1) * (index + 1);
    return ((
      <text
        x={position}
        y="50"
        fill="#a86989"
        alignmentBaseline="middle"
        textAnchor="middle"
        key={entry[0]}
        fontWeight="bold"
        fontSize="1rem"
      >
        {entry[1]}
        <tspan
          fontSize="0.35rem"
          alignmentBaseline="hanging"
        >
          {entry[0]}
        </tspan>
      </text>
    ));
  })


  const perimeter = 43 * 2 * 3.14;
  const progress = (1 - timeTotal / total);
  const transform = `rotate(-${progress * 360}) translate(0 -43) rotate(${progress * 360})`;


  return (
    <React.Fragment>
      {
        isLabel &&
        <OutputLabel
          label={label}
          handleTimerLabelInput={handleTimerLabelInput} />

      }
      <svg viewBox="0 0 100 100" width="70%">
        <g transform="translate(5 5)">
          <path
            d="M 45 2 a 43 43 0 0 0 0 86 a 43 43 0 0 0 0 -86"
            stroke="#fff"
            strokeWidth="2"
            fill="none"
            shapeRendering="geometricPrecision"
          />

          <path
            d="M 45 2 a 43 43 0 0 0 0 86 a 43 43 0 0 0 0 -86"
            stroke="#a86989"
            strokeWidth="2"
            strokeDasharray={perimeter}
            strokeDashoffset={perimeter - (perimeter * progress)}
            fill="none"
            shapeRendering="geometricPrecision"
          />

          <circle
            r="3.2"
            cx="45"
            cy="45"
            fill="#a86989"
            transform={transform}
          />

          <text
            x="45"
            y="30"
            fill="#fff"
            alignmentBaseline="middle"
            textAnchor="middle"
            fontSize="0.35rem"
            onClick={handleTimerLabel}
          >
            {label}
          </text>
          {
            Text
          }
        </g>

      </svg>
    </React.Fragment>
  )
};


const TimerButton = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  padding: 0.6rem;
  color: #FFC900;
  background: #FFC900;
  box-shadow: 0 1px 5px -2px #FFC900;
  &:hover {
    transition: box-shadow 0.2s ease-out;
    box-shadow: 0 1px 5px 0px #FFC900;
  }
`;

const OutputContainer = styled.div`
  max-width: 380px;
  width: 90vw;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const OutputControls = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-column-gap: 2rem;
  grid-template-columns: repeat(3, 80px);
  align-items: center;
  justify-items: center;
`;

const TimerOutput = ({ total, timeTotal, label, isLabel, isPlaying, handleTimerToggle, handleTimerNew, handleTimerAdd, handleTimerReset, handleTimerLabel, handleTimerLabelInput }) => {
  return (
    <Spring
      from={{ opacity: 0, transform: 'translateY(2.5rem)' }}
      to={{ opacity: 1, transform: 'translateY(0)' }}
    >
      {
        ({ opacity, transform }) => (


          <OutputContainer
            style={{ opacity, transform }}>
            <OutputDisplay
              total={total}
              timeTotal={timeTotal}
              label={label}
              isLabel={isLabel}
              handleTimerLabel={handleTimerLabel}
              handleTimerLabelInput={handleTimerLabelInput}
            />
            <OutputControls>

              <button
                onClick={handleTimerNew}
                className="btn purple-gradient btn-sm my-0 waves-effect waves-light"
                style={{width:120}}
              >
                New Timer
              </button>

              <TimerButton
                onClick={handleTimerToggle}
              >
                {
                  isPlaying ?

                    <svg
                      viewBox="0 0 100 100"
                    >
                      <rect
                        x="30"
                        y="30"
                        width="10"
                        height="40"
                        stroke="#eee"
                        strokeWidth="6px"
                        fill="currentColor"
                      />
                      <rect
                        x="60"
                        y="30"
                        width="10"
                        height="40"
                        stroke="#eee"
                        strokeWidth="6px"
                        fill="currentColor"
                      />
                    </svg>

                    :

                    <svg
                      viewBox="0 0 100 100"
                    >
                      <path
                        d="M 40 30 l 30 20 l -30 20 Z"
                        stroke="#eee"
                        strokeWidth="7px"
                        fill="currentColor"
                      />
                    </svg>
                }
              </TimerButton>

              {
                isPlaying ?
                  <button
                    onClick={handleTimerAdd}
                    className="btn purple-gradient btn-sm my-0 waves-effect waves-light"
                    style={{width:120}}
                  >
                    Add +1:00
            </button>

                  :

                  <button
                    onClick={handleTimerReset}
                    className="btn purple-gradient btn-sm my-0 waves-effect waves-light"
                    style={{width:120}}
                  >
                    Reset Timer
            </button>

              }

            </OutputControls>

          </OutputContainer>
        )
      }

    </Spring>
  );
};


const Input = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #ffffff11;
  transition: color 0.2s ease-out;
//   style the color of the text (and the svg element through the currentColor property) based on the props boolean
  color: ${props => props.isInput ? '#ffffff' : '#ffffff55'};
`;


const InputTime = styled.h2`
  flex-grow: 1;
  display: flex;
  font-size: 2rem;
  font-weight: 500;
`;
const InputSpan = styled.span`
  flex-grow: 1;
  width: 0;
  margin: 0 0.75rem;
  position: relative;

  // add the short label for hours, minutes, seconds by accessing the suffix argument passed through props
  &:after {
    content: '${props => props.suffix}';
    font-size: 0.8rem;
    margin-left: 0.15rem;
  }
`;

const InputButton = styled.button`
  width: 70px;
  height: 50px;
  padding: 0.3rem;
`;


function formatTime(time) {
  return time >= 10 ? time : `0${time}`;
}


const InputDisplay = ({ isInput, time, handleDialBack }) => {
  const InputPair = Object.entries(time);
  const InputSpans = InputPair.map(pair => (
    <InputSpan
      key={pair[0]}
      suffix={pair[0]}
    >
      {formatTime(pair[1])}
    </InputSpan>
  )
  );

  return (
    <Input
      isInput={isInput}
    >
      <InputTime>
        {
          InputSpans
        }
      </InputTime>
      
      <InputButton
        onClick={handleDialBack}
      >
        <svg
          viewBox="0 0 100 100"
        >
          <path
            d="M 50 37.5 l 25 25"
            strokeWidth="5px"
            stroke="currentColor"
            fill="none"
          />

          <path
            d="M 50 62.5 l 25 -25"
            strokeWidth="5px"
            stroke="currentColor"
            fill="none"
          />

          <path
            d="M 40 20 h 50 v 60 h -50 l -20 -30 Z"
            strokeWidth="5px"
            stroke="currentColor"
            fill="none" />
        </svg>
      </InputButton>
    </Input>
  )
};


const Dial = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 85%;
  grid-gap: 1.8rem 1rem;
	margin-bottom: 1.25rem;
`;


const Digit = styled.button`
  font-size: 2rem;
  transition: all 0.2s ease-out;
  font-weight: 600;
  position: relative;
  color: #ffffff55;
	// for the focus and active state substitute the default outline highlighting the button through a fully opaque color and a pseudo element
	outline: none;
  // push the first digit, 0, to the very bottom of the timer
  &:nth-of-type(1) {
    grid-row: 4/5;
    grid-column: 1/-1;
  }
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    transform:  translate(-50%, -50%) scale(0);
    background: #fff;
    border-radius: 50%;
  }
  &:hover, &:focus {
    color: #fff;
  }
  &:hover:before, &:focus:before {
    transition: all 0.2s ease-out;
    // transition occurring only as the mouse hovers in the element
    transition-delay: 0.1s;
    transform:  translate(-50%, -50%) scale(1);
    opacity: 0;
  }
`;

const InputDial = ({ handleDial }) => {
  const Digits = [];
  for (let i = 0; i < 10; i += 1) {
    Digits.push(
      <Digit
        key={i}
        onClick={handleDial}
      >
        {i}
      </Digit>
    );
  }
  return (
    <Dial>
      {
        Digits
      }
    </Dial>
  )
};


const InputContainer = styled.div`
  max-width: 380px;
  width: 90vw;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const TimerInput = ({ input, time, handleDial, handleDialBack, handleTimerStart }) => {
  return (
    <Spring
      from={{ opacity: 0, transform: 'translateY(-2.5rem)' }}
      to={{ opacity: 1, transform: 'translateY(0)' }}
    >
      {
        ({ opacity, transform }) => (

          <InputContainer
            style={{ opacity, transform }}>
            <InputDisplay
              isInput={input.length !== 0}
              time={time}
              handleDialBack={handleDialBack}
            />

            <InputDial
              handleDial={handleDial}
            />

            {
              input &&
              <TimerButton onClick={handleTimerStart}>
                <svg viewBox="0 0 100 100">
                  <path
                    d="M 40 30 l 30 20 l -30 20 Z"
                    stroke="#eee"
                    strokeWidth="7px"
                    fill="currentColor"
                  />
                </svg>
              </TimerButton>

            }
          </InputContainer>
        )
      }
    </Spring >
  )
};


class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      time: {
        h: 0,
        m: 0,
        s: 0
      },
      timeTotal: 0,
      total: 0,
      label: 'Label',
      isTimer: false,
      isPlaying: false,
      isLabel: false
    };

    this.handleDial = this.handleDial.bind(this);
    this.handleDialBack = this.handleDialBack.bind(this);
    this.handleTimerStart = this.handleTimerStart.bind(this);
    this.handleTimerToggle = this.handleTimerToggle.bind(this);
    this.handleTimerAdd = this.handleTimerAdd.bind(this);
    this.handleTimerNew = this.handleTimerNew.bind(this);
    this.handleTimerReset = this.handleTimerReset.bind(this);
    this.handleTimerLabel = this.handleTimerLabel.bind(this);
    this.handleTimerLabelInput = this.handleTimerLabelInput.bind(this);
  }


  updateTime(input) {
    const inputTime = input.padStart(6, 0);
    let h = parseInt(inputTime.substring(0, 2), 10);
    let m = parseInt(inputTime.substring(2, 4), 10);
    let s = parseInt(inputTime.substring(4));
    const timeTotal = h * 60 * 60 + m * 60 + s;

    const time = {
      h,
      m,
      s
    };

    this.setState({
      time,
      timeTotal,
      total: timeTotal
    })
  }

  handleDial(e) {
    const { textContent } = e.target;
    let { input } = this.state;
    const { length } = input;
    if (textContent === '0' && length === 0) {
      return;
    }
    if (length < 6) {
      input += textContent;
      this.setState({
        input
      })
      this.updateTime(input);
    }
  }


  handleDialBack(e) {
    let { input } = this.state;
    const { length } = input;
    if (length > 0) {
      input = input.substring(0, length - 1);
      this.setState({
        input
      })
    }
    this.updateTime(input);
  }


  startTimer() {
    this.intervalID = setInterval(() => {
      let { timeTotal } = this.state;
      timeTotal -= 1;
      this.setState({
        timeTotal: timeTotal
      })
      if (timeTotal === 0) {
        clearInterval(this.intervalID);
      }
    }, 1000);
  }


  handleTimerStart() {
    this.setState({
      isTimer: true,
      isPlaying: true
    })
    this.startTimer();
  }


  handleTimerToggle() {
    const { isPlaying } = this.state;
    if (isPlaying) {
      clearInterval(this.intervalID);
    }
    else {
      this.startTimer();
    }
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }


  handleTimerAdd() {
    const { timeTotal, total } = this.state;
    this.setState({
      timeTotal: timeTotal + 60,
      total: total + 60
    })
  }


  handleTimerNew() {
    clearInterval(this.intervalID);
    const input = '';
    this.setState({
      isTimer: false,
      input
    })
    this.updateTime(input)
  }


  handleTimerReset() {
    clearInterval(this.intervalID);
    const { input } = this.state;
    this.updateTime(input);
    this.handleTimerStart();
  }


  handleTimerLabel() {
    this.setState({
      isLabel: true
    })
  }


  handleTimerLabelInput(e) {
    e.preventDefault();
    const { value: label } = e.target.querySelector('input');
    if (label) {
      this.setState({
        label,
        isLabel: false
      })
    }
  }

  render() {
    const { input, time, isTimer, isPlaying, timeTotal, total, label, isLabel } = this.state;

    return (
      <div id="timer">

        {
          isTimer ?
            < TimerOutput
              total={total}
              timeTotal={timeTotal}
              label={label}
              isPlaying={isPlaying}
              isLabel={isLabel}
              handleTimerToggle={this.handleTimerToggle}
              handleTimerNew={this.handleTimerNew}
              handleTimerAdd={this.handleTimerAdd}
              handleTimerReset={this.handleTimerReset}
              handleTimerLabel={this.handleTimerLabel}
              handleTimerLabelInput={this.handleTimerLabelInput}
            />
            :
            <TimerInput
              input={input}
              time={time}
              handleDial={this.handleDial}
              handleDialBack={this.handleDialBack}
              handleTimerStart={this.handleTimerStart}
            />
        }
      </div>
    );
  }
}

export default Timer;
