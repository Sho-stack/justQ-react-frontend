import './App.css';
import { useState, useEffect } from 'react';
import  Header  from './Components/Header/Header';
import AskModal from './Components/Modals/AskModal';
import LoginModal from './Components/Modals/LoginModal';
import PassResetModal from './Components/Modals/PassResetModal';
import RegisterModal from './Components/Modals/RegisterModal';
import NewPassModal from './Components/Modals/NewPassModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from './config.js';

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

  // modal control state ( ! important )
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

  // new password modal controls
  const [showNewPassModal, setShowNewPassModal] = useState(false)
  const openNewPassModal = () => { setShowModal('PassChange'); setShowNewPassModal(true); }
  const closeNewPassModal = () => { setShowNewPassModal(false); }


  // registration modal controls
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const openRegistrationModal = () => { setShowModal('Regist'); setShowRegistrationModal(true); }
  const closeRegistrationModal = () => { setShowRegistrationModal(false); }

  // user login state
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`${BASE_URL}/check_login`, {
      method: 'GET',
      credentials: 'include' // Add this line
    })
    .then(response => response.json())
    .then(data => {
        setUser(data.user)
    })
    .catch(error => {
        console.error('Error:', error);
    });

  }, []);

  // password reset controls
  const [resetToken, setResetToken] = useState(null);
  console.log(resetToken)

  useEffect(() => {
    const url = window.location.href;
    const regex = /reset-password\/(.+)$/;
    const match = url.match(regex);

    if (match && match[1]) {
      setResetToken(match[1]);
      openNewPassModal();
      window.history.pushState(null, null, '/');
    }
  }, []);

  // end of password reset controls


  return (<>

    <Header 
      theme={theme} 
      toggleTheme={toggleTheme} 
      openAskModal={openAskModal} 
      openLoginModal={openLoginModal}
      user={user}
      setUser={setUser}
      setSuccessText={setSuccessText}
      setWarningText={setWarningText}
      setErrorText={setErrorText}
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
      setSuccessText={setSuccessText}
      setWarningText={setWarningText}
      setErrorText={setErrorText}
      setUser={setUser}
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

    {showModal === 'Pass' && <PassResetModal 
      show={showPasswordResetModal} 
      theme={theme} 
      openLoginModal={openLoginModal} 
      handleClose={closePasswordResetModal} 
      setSuccessText={setSuccessText}
      setWarningText={setWarningText}
      setErrorText={setErrorText}
    />}







    {showModal === 'PassChange' && (
      <NewPassModal
        show={showNewPassModal}
        theme={theme}
        resetToken={resetToken}
        handleClose={closeNewPassModal}
        setSuccessText={setSuccessText}
        setWarningText={setWarningText}
        setErrorText={setErrorText}
      />
    )}





    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme={theme}
    />


    </div>
    
    {/* end of theme container */}
  </>);
  
}

export default App;
