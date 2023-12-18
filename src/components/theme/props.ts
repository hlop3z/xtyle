type Props = {
  set: (props: {
    theme: Record<string, string>;
    dark?: Record<string, string>;
    light?: Record<string, string>;
  }) => string;
  class: (props: {
    name: string;
    type?: "background" | "border" | "text" | "table";
  }) => string;
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
