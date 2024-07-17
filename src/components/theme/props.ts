type Props = {
  info: any;
  set: (props: {
    theme: Record<string, string>;
    dark?: Record<string, string>;
    light?: Record<string, string>;
    disable?: string[];
    zebra?: string | boolean;
  }) => string;
  class: (
    type: "background" | "border" | "text" | "table",
    name: string
  ) => string;
};

export default Props;
/* 
  ---------------
  @ Cheat-Sheet
  ---------------
  void
  null
  bigint
  
  any
  boolean
  number
  string
  
  // Array<string>
  string[]          
  
  // tuple
  [string, number]
  
  // union
  string | null | undefined 
  */
