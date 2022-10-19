import './styles';
import "./lib/splash";
import surrender from './surrender'


window.addEventListener('kill-splash', (event) => {
    const app = new surrender(event.detail);

    app.install();
    app.start();
})