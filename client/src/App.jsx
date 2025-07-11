import AuthProvider from './contexts/auth/AuthProvider';
import ChatProvider from './contexts/chat/ChatProvider';

import Routes from './routes/Routes';

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <Routes />
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
