export default class Nav {
  constructor(project) {
    this.el = document.createElement("navi");
    this.el.className = "navi";
    this.project = project
  }

  install = (host) => {
    host.appendChild(this.el);
    this.el.appendChild(this.createTree(this.project.structure))
    

    this.el.addEventListener('contextmenu', e => {
      e.preventDefault()
      if (this.el !== e.target) return
      console.log(e.target)
      window.contextMenu.navCM()
    })
  };
  
  update = () => { };


  createTree(obj) {
    if (!obj) return;
  
    let ul = document.createElement("ul");
  
    for (let dir of obj.directories) {
      let li = document.createElement('li')
      li.innerHTML = dir.directoryName

      li.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (li !== e.target) return
        console.log(dir)
        window.contextMenu.navCM();
      });
  
      let childrenDir = this.createTree(dir)
      let childrenFiles = [...dir.files]
  
      if (childrenDir) {
        li.appendChild(childrenDir)
      }
  
      if (childrenFiles.length) {
        let files_ul = document.createElement('ul')
        childrenFiles.forEach(elem => {
          let files_li = document.createElement('li')
          files_li.innerHTML = elem.substring(0, elem.indexOf('.')) || elem
          files_ul.appendChild(files_li)
        })
        li.append(files_ul)
      }
      ul.appendChild(li)
    }
    return ul;
  }
}
