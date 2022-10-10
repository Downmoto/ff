

export default function Textarea() {
  this.el = document.createElement("textarea");

  this.install = (host) => {
    this.el.setAttribute("autocomplete", "off");
    this.el.setAttribute("autocorrect", "off");
    this.el.setAttribute("autocapitalize", "off");
    this.el.setAttribute("spellcheck", "false");
    this.el.setAttribute("type", "text");

    host.appendChild(this.el);
  };

  this.start = () => {this.el.focus()}
}
