import xtyle from "@tool/index";

xtyle.createApp();

export default function View() {
  return (
    <xtyle.element
      x-tag="div"
      x-init={(self) => console.log(self)}
      x-click={(e) => console.log(e)}
      x-click-outside={(e) => console.log(e)}
      x-hover={(e) => console.log(e)}
      x-resize={(e) => console.log(e)}
      x-ripple={(e) => console.log(e)}
      x-swipe={(e) => console.log(e)}
      x-scroll={(info) => console.log(info)}
    >
      Hello World
    </xtyle.element>
  );
}
