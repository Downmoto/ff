
import { project } from "./lib/splash";

import Nav from "./lib/nav";
import Textarea from "./lib/textarea";
import Container from "./lib/container";


export default function f() {
    this.container = new Container()
    this.textarea = new Textarea()
    this.nav = new Nav(project)

    this.words_count = null;
    this.lines_count = null;
    this.chars_count = null;

    this.install = () => {
        let host = this.container.install()

        this.nav.install(host)
        this.textarea.install(host)
    }

    this.start = () => {
        this.textarea.start()
    }
}