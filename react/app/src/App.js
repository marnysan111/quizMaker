import { Helmet } from "react-helmet"
import Header from "./components/Header";
import WebSocketClient from "./components/websocket";
import ApiFetcher from "./components/api";
import CreateRoom from "./components/createRoom";
function App() {
  return (
    <div>
      <Helmet>
        <title>QuizMaker - TopPage</title>
      </Helmet>
      <header className="App-header">
        <WebSocketClient />
      </header>
      <ApiFetcher />
      <CreateRoom />
    </div>
  );
}

export default App;
