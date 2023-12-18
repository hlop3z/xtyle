type Props = {
  camel: (value: string) => string;
  slug: (value: string) => string;
  lower: (value: string) => string;
  upper: (value: string) => string;
  title: (value: string) => string;
  pascal: (value: string) => string;
  docs: (value: string) => string;
  snake: (value: string) => string;
  slot: (value: string) => string;
  cut: (value: string, size: number) => string;
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
