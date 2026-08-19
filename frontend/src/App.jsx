
import { Button } from '@heroui/react';
import {WallpaperProvider} from "./context/WallpaperContext";
import {ThemeProvider} from "./context/ThemeContext";
import { Navigate,Routes,Route } from 'react-router';
import ChatPage from './pages/ChatPage';
import AuthPage from './pages/AuthPage';
import {useAuth} from "@clerk/react";
import PageLoader from "./components/PageLoader"
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';


function App() {

  const {isSignedIn,isLoaded}=useAuth();
  // const {checkAuth,isCheckAuth,clearAuth}=useAuthStore();

  //below is recommended cuz it wont re-render everything
  const clearAuth=useAuthStore((state)=>state.clearAuth);//instead of state u can use any variable
  const checkAuth=useAuthStore((state)=>state.checkAuth);
  const ischeckAuth=useAuthStore((state)=>state.ischeckAuth);

  useEffect(()=>{
    if(!isLoaded){return;}

    if(isSignedIn){
      checkAuth();
    }else{
      clearAuth();
    }

  },[checkAuth,clearAuth,isLoaded,isSignedIn ])


  if(!isLoaded|| isSignedIn&&checkAuth){
    return(
      <PageLoader/>
    )
  }

  return (
    
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route path="/" element={isSignedIn ? <ChatPage/>: <Navigate to={"/auth"} replace /> }/>
          <Route path="/auth" element={!isSignedIn ? <AuthPage/>: <Navigate to={"/"} replace/>}/>
        </Routes>
        <Toaster/>
      </WallpaperProvider>
    </ThemeProvider>
    
    
    
    
  )
}

export default App
