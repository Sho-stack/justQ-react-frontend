import './App.css';
import { useState, useEffect } from 'react';
import  Header  from './Components/Header/Header';
import AskModal from './Components/Modals/AskModal';
import LoginModal from './Components/Modals/LoginModal';
import PassResetModal from './Components/Modals/PassResetModal';
import RegisterModal from './Components/Modals/RegisterModal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';

function App() {

  // darkmode/lightmode controls
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {if (theme === "light") {setTheme("dark");} else {setTheme("light");}}

  // toast controls
  const [successText, setSuccessText] = useState('');
  const [errorText, setErrorText] = useState('');
  const [warningText, setWarningText] = useState('');

  useEffect(() => {
    if (successText) {
      toast.success(successText);
      setSuccessText('');
    }
    if (errorText) {
      toast.error(errorText);
      setErrorText('');
    }
    if (warningText) {
      toast.warning(warningText);
      setWarningText('');
    }
  }, [successText, errorText, warningText]);

  // modal control state
  const [showModal, setShowModal] = useState('');

  // new question modal controls
  const [showAskModal, setShowAskModal] = useState(false);
  const openAskModal = () => { setShowModal('Ask'); setShowAskModal(true); }
  const closeAskModal = () => { setShowAskModal(false); }

  // login modal controls
  const [showLoginModal, setShowLoginModal] = useState(false);
  const openLoginModal = () => { setShowModal('Login'); setShowLoginModal(true); }
  const closeLoginModal = () => { setShowLoginModal(false); }

  // password reset modal controls
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const openPasswordResetModal = () => { setShowModal('Pass'); setShowPasswordResetModal(true); }
  const closePasswordResetModal = () => { setShowPasswordResetModal(false); }

  // registration modal controls
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const openRegistrationModal = () => { setShowModal('Regist'); setShowRegistrationModal(true); }
  const closeRegistrationModal = () => { setShowRegistrationModal(false); }



  return (<>

    <Header 
      theme={theme} 
      toggleTheme={toggleTheme} 
      openAskModal={openAskModal} 
      openLoginModal={openLoginModal}
    />

    {/* container for app content, used for dark/light theme */}
    <div className={`root ${theme === "light" ? "light-theme" : "dark-theme"}`}>
    
    {showModal === 'Ask' && <AskModal 
      show={showAskModal} 
      theme={theme} 
      handleClose={closeAskModal}
    />}

    {showModal === 'Login' && <LoginModal 
      show={showLoginModal} 
      theme={theme} 
      handleClose={closeLoginModal} 
      openPasswordResetModal={openPasswordResetModal} 
      openRegistrationModal={openRegistrationModal}
    />}

    {showModal === 'Pass' && <PassResetModal 
      show={showPasswordResetModal} 
      theme={theme} 
      openLoginModal={openLoginModal} 
      handleClose={closePasswordResetModal} 
    />}
    
    {showModal === 'Regist' && <RegisterModal 
      show={showRegistrationModal}
      theme={theme} 
      openLoginModal={openLoginModal} 
      handleClose={closeRegistrationModal}
      setSuccessText={setSuccessText}
      setWarningText={setWarningText}
      setErrorText={setErrorText}
    />}


    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme={theme}
    />
      <Button onClick={() => setErrorText('nay!')}>Warning !</Button>
      <Button onClick={() => setWarningText('mhm!')}>Error !</Button>
      <Button onClick={() => setSuccessText('yeay!')}>Success !</Button>

    </div>
    
    {/* end of theme container */}
  </>);
  
}

export default App;
