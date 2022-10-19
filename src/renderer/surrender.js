import Nav from "./lib/nav";
import Textarea from "./lib/textarea";
import Container from "./lib/container";

export default class surrender {
  constructor(project) {
    this.container = new Container();
    this.textarea = new Textarea();
    this.nav = new Nav(project);

    this.words_count = null;
    this.lines_count = null;
    this.chars_count = null;
  }

  install = () => {
    let host = this.container.install();

    this.nav.install(host);
    this.textarea.install(host);
  };

  start = () => {
    this.textarea.start();
  };
}

// {temp: 'C:\\Users\\arad\\AppData\\Local\\Temp\\ff-1665847025861--', location: 'C:\\Users\\arad\\source\\F\\.webpack\\main\\l.ff', metaFile: 'C:\\Users\\arad\\AppData\\Local\\Temp\\ff-1665847025861--/meta.json', structure: {…}, name: 'l'}
// location
// : 
// "C:\\Users\\arad\\source\\F\\.webpack\\main\\l.ff"
// metaFile
// : 
// "C:\\Users\\arad\\AppData\\Local\\Temp\\ff-1665847025861--/meta.json"
// name
// : 
// "l"
// structure
// : 
// directories
// : 
// (3) [{…}, {…}, {…}]
// directoryName
// : 
// "projectRoot"
// files
// : 
// ['meta.json']
// [[Prototype]]
// : 
// Object
// temp
// : 
// "C:\\Users\\arad\\AppData\\Local\\Temp\\ff-1665847025861--"
// [[Prototype]]
// : 
// Object