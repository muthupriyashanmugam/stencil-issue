import { Component, Prop, h , Element} from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @Element() el!: HTMLElement
  isCta: boolean = false;
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }
  componentWillLoad() {
    const slot = this.el['children'];
    let slotHasContent = slot && slot.length > 0;

    if(slotHasContent) {
        for(var i=0;i<slot.length;i++) {
          if(slot[i].tagName.toLowerCase() === 'cta' || slot[i].getAttribute('slot') === 'cta') {
            this.isCta = true;
          }
        }
      }
  }

  defaultTemplate() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }

  render() {
    return (
      <div>
        {!this.isCta && this.defaultTemplate()} 
        {this.isCta && <slot name="cta"/>}
    </div>)
  }
}
