import './App.css';
import Routes from './Routes'
import {useEffect, useState} from 'react';
import useIdle from "./pages/hooks/useIdleTimer.js";


function App() {

  const [showModal, setShowModal] = useState(true);
  const [remainingTime, setRemainingTime] = useState(60);
  const [timedOut, setTimedOut] = useState(false);

  // not being called on time ...
  const handleIdle = () => {
    if (!timedOut) {
      setShowModal(true); //show modal
      setRemainingTime(60); //set 15 seconds as time remaining
      console.log('modal set to true and set remaining time')
    }
  };
  const { isIdle } = useIdle({ onIdle: handleIdle, idleTime: 2});
  console.log("is user idle?", isIdle);

  // session time-out
  // Render the modal based on the idle state
  useEffect(() => {
    if (isIdle && !timedOut) {
      console.log('setting modal to true')
      setShowModal(true);
      console.log(showModal); // was still false, had to init showModal as true
      console.log(isIdle);
    }
  }, [isIdle, timedOut]);

  useEffect(() => {
    let interval;

    if (isIdle && showModal && !timedOut) {
      console.log('beginning countdown...')
      interval = setInterval(() => {
        setRemainingTime(
          (prevRemainingTime) =>
            prevRemainingTime > 0 ? prevRemainingTime - 1 : 0 //reduces the second by 1
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isIdle, showModal, timedOut]);

  useEffect(() => {
    if (remainingTime === 0 && showModal && !timedOut) {
      console.log(window.location.pathname)
      alert("Time out! You cannot complete the study. Clic the OK button.");
      setShowModal(false);
      setTimedOut(true);
      console.log('redirecting to terminate')
      let path = "/#/terminate"
      window.location.assign(path)
    }
  }, [remainingTime, showModal, timedOut]); // this is responsible for logging user out after timer is down to zero and they have not clicked anything

  const handleStayLoggedIn = () => {
    // setClickTimeOut(true);
    setShowModal(false);
  };

  useEffect(() => {
    if (localStorage['finished']) {
      setTimedOut(true);
    }
  }, [localStorage['finished']]);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  useEffect(() => {
      const handleTabClose = event => {
        event.preventDefault();

        console.log('beforeunload event triggered');

        return (event.returnValue =
          'Are you sure you want to exit?');
      };

      window.addEventListener('beforeunload', handleTabClose);

      return () => {
        window.removeEventListener('beforeunload', handleTabClose);
      };
    }, []);

    return (
      <>
        { isIdle  && showModal && !timedOut && (
          <div className="modal">
            <div className="modal-content">
            <h2>Idle Timeout Warning</h2>
            <p className="t">You are about to be timed out due to inactivity. You will not be able to continue the study when the countdown ends.
            Click the <b>Continue</b> button to go back to the study.</p>
            <br />
            <p className="t"> 
            Time remaining: {millisToMinutesAndSeconds(remainingTime * 1000)}
            </p>
            <br />
            <button className="btn btn-primary " onClick={handleStayLoggedIn}>
              Continue
            </button>
            </div>
          </div>
        )}
      <div className="App">
        <Routes />
      </div>
      </>
    );
  }


export default App;
