import './App.css';
import { useState } from 'react';
import  Header  from './Components/Header/Header';
import AskModal from './Components/Modals/AskModal';
import LoginModal from './Components/Modals/LoginModal';
import PassResetModal from './Components/Modals/PassResetModal';
import RegisterModal from './Components/Modals/RegisterModal';

function App() {

  // darkmode/lightmode controls
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {if (theme === "light") {setTheme("dark");} else {setTheme("light");}}

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
    />}





    </div>
    {/* end of theme container */}
  </>);
  
}

export default App;
