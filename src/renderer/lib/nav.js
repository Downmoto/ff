
export default function Nav(project) {
    this.el = document.createElement('navi')
    this.ul_el = document.createElement('ul')
    this.el.className = 'navi'

    console.log(project)

    this.scenes = []

    this.install = (host) => {
        host.appendChild(this.el)

        this.el.appendChild(this.ul_el)

        for (const dir in project.dirs) {
            let element = document.createElement("li");
            element.className = "directory";
            element.innerHTML = dir;
            this.ul_el.appendChild(element);
        }
    }

    this.update = (project) => {

    }
}