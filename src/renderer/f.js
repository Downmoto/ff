
import Nav from "./lib/nav";
import Textarea from "./lib/textarea";

import { pathToProject } from "./lib/splash";


export default function f() {
    this.textarea = new Textarea()
    this.nav = new Nav(pathToProject)

    this.words_count = null;
    this.lines_count = null;
    this.chars_count = null;

    this.install = (host = document.body) => {
        this.nav.install(host)
        this.textarea.install(host)
    }

    this.start = () => {
        this.textarea.start()
    }
}