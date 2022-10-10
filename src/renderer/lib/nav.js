


export default function Nav() {
    this.el = document.createElement('navi')

    this.install = (host) => {
        host.appendChild(this.el)
    }
}