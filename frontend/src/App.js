import './assets/style/styles.scss';
import 'antd/dist/antd.css';

import Main from './components/main/Main'
import Logo from "./components/common/Logo";
import {TaskProvider} from "./contextApi/TaskContext";

function App() {
    return (
        <div className="App">
            <TaskProvider>
                <header>
                    <Logo/>
                </header>
                <Main/>
                <footer>
                    <div className="footerWrapper">
                        <div>repository</div>
                        <div className="copyright">©2022 Murat Sarıkaya</div>
                    </div>
                </footer>
            </TaskProvider>
        </div>
    );
}

export default App;
