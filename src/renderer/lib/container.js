

export default function Container() {
   this.el = document.createElement('div')

   this.el.className = 'container'

   this.install = () => {
    document.body.appendChild(this.el)

    return this.el
   }
}