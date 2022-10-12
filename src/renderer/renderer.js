import './styles';
import f from './f'

const app = new f()

window.addEventListener('kill-splash', (event) => {
    console.log(event)
    app.install();
    app.start();
})

app.install();
app.start();