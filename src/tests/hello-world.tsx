// @ts-nocheck

import { Base } from "../components";

/* 
@ (Register) Directive
*/
Base.directive("demo", (self: any, props: any) => {
  console.log("Custom Directive");
  console.log(self.directives.custom["demo"]);
  console.log(props);
});

/* 
@ (Register) Theme Component
*/
Base.element("demo")((props) => (
  <div>
    <h2>Custom | {props.title}</h2>
    {props.children}
  </div>
));

export default function Component(props: any) {
  const text = preact.useSignal("one");
  const status = preact.useSignal(false);
  let ref: any = null;
  /*
  preact.useEffect(() => {
    const el: any = {
      child: ref.get(".demo-class"),
    };
    setInterval(() => {
      console.log(el.child.current);
    }, 2000);
  }, []);
  */
  return (
    <div
      class={props.class}
      x-html
      x-demo
      x-ref={(e: any) => (ref = e)}
      x-swipe={({ value }) => console.log(value)}
      x-click-outside={() => {
        // self.ref.toggle(["my-class"]);
        status.value = !status.value;
        console.log("Clicked Outside");
      }}
    >
      {/* 
        @ Used For Portal
        */}
      <div id="modal"></div>

      {/* 
        @ (Use) Theme Component 
        */}
      <x-demo title="Hello World">
        <h4>{status.value ? "yes" : "no"}</h4>
      </x-demo>

      {/* 
        @ HTML to Xtyle
      */}
      <div
        class="demo-class"
        x-html
        css:is={status.value}
        css:off="inactive"
        css:on="active"
        hook:created={() => console.log("Component <Created>")}
        hook:updated={() => console.log("Component <Updated>")}
        hook:removed={() => console.log("Component <Removed>")}
        x-resize={({ self }) => {
          console.log(self);
        }}
      >
        {/* 
        @ input value
        */}
        <input
          x-html
          x-value={text}
          x-value:clean={(value: string) => value.toLowerCase()}
        />
        <p style="min-height: 18px;">{text.value}</p>
      </div>

      {/* 
        @ x-slot (Portal)
      */}
      <x-slot x-portal="#modal" x-fragment>
        <h1
          x-html
          on:click={() => {
            status.value = !status.value;
          }}
        >
          Portal Demo
        </h1>
      </x-slot>
      <h3 x-html x-show={status.value}>
        Hide and Seek
      </h3>

      {/* 
        @ x-slot Fallback
      */}
      <x-slot x-fallback={<h1>Loading . . .</h1>} x-fallback:is={true}>
        Should Not Appear
      </x-slot>

      {/* 
        @ x-slot (For-Loop)
      */}
      <x-slot
        x-for={(item: any) => (
          <x-slot>
            <li
              onClick={() => {
                text.value = item;
              }}
            >
              {item}
            </li>
          </x-slot>
        )}
        x-in={["one", "two", "three"]}
      />
      <br />

      {/* 
        @ x-slot (Switch + Case)
      */}
      <x-slot x-switch x-case={text.value}>
        <x-slot
          x-for={(item: any) => <x-slot case={item}>Page {item}</x-slot>}
          x-in={["one", "two", "three"]}
        />
      </x-slot>

      {/* 
        @ x-slot (Live Component)
      */}
      <div>
        <h1>Live</h1>
        <x-slot
          x-live={(p: { title: any }) => <h2>{p.title}</h2>}
          title="My Component"
        />
      </div>

      {/* 
        @ x-slot (Scroll)
      */}
      <div>
        <h1>Scroll</h1>
        <div
          style="border: solid 1px black; height: 200px; overflow-y: auto; overflow-x: hidden;"
          x-html
          x-scroll={({ value, self }) => {
            console.log(value);
            console.log(self.ref.current);
            self.ref.toggle(["they-see-me-scrolling"]);
          }}
        >
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. An unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages. It has survived not only five
          centuries, but also the leap into electronic typesetting, remaining
          essentially unchanged. Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. It has survived not only five
          centuries, but also the leap into electronic typesetting, remaining
          essentially unchanged. Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum is simply dummy
          text of the printing and typesetting industry. Lorem Ipsum is simply
          dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s. It has
          survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. An unknown printer took
          a galley of type and scrambled it to make a type specimen book. Lorem
          Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages. Lorem Ipsum is simply dummy
          text of the printing and typesetting industry. Lorem Ipsum has been
          the industry's standard dummy text ever since the 1500s. Lorem Ipsum
          is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s. An unknown printer took a galley of type and
          scrambled it to make a type specimen book. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. Lorem Ipsum is simply
          dummy text of the printing and typesetting industry. An unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s. An unknown printer took a galley of type and
          scrambled it to make a type specimen book. An unknown printer took a
          galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages. It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially unchanged. It has
          survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s. Lorem Ipsum is
          simply dummy text of the printing and typesetting industry. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages. Lorem
          Ipsum is simply dummy text of the printing and typesetting industry.
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages. Lorem
          Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially unchanged. Lorem
          Ipsum is simply dummy text of the printing and typesetting industry.
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s. Lorem Ipsum is
          simply dummy text of the printing and typesetting industry. Lorem
          Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. An unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It has
          survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s. Lorem Ipsum is
          simply dummy text of the printing and typesetting industry. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. Lorem Ipsum
          has been the industry's standard dummy text ever since the 1500s. It
          was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s. An unknown printer took a
          galley of type and scrambled it to make a type specimen book. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s. An unknown printer took a galley of type and scrambled it to
          make a type specimen book. An unknown printer took a galley of type
          and scrambled it to make a type specimen book. Lorem Ipsum is simply
          dummy text of the printing and typesetting industry. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s. An unknown printer took a
          galley of type and scrambled it to make a type specimen book. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum is simply dummy
          text of the printing and typesetting industry. Lorem Ipsum has been
          the industry's standard dummy text ever since the 1500s. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages. An unknown printer took a galley of
          type and scrambled it to make a type specimen book. Lorem Ipsum is
          simply dummy text of the printing and typesetting industry. Lorem
          Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It has
          survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. Lorem Ipsum is simply
          dummy text of the printing and typesetting industry. Lorem Ipsum is
          simply dummy text of the printing and typesetting industry. Lorem
          Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. It was popularised in the 1960s with the release
          of Letraset sheets containing Lorem Ipsum passages. Lorem Ipsum is
          simply dummy text of the printing and typesetting industry.
        </div>
      </div>
    </div>
  );
}
