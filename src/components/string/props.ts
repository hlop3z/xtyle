type Props = (props: {
  value?: string;
  filter?: any;
  cut?: number;
  slug?: boolean;
  lower?: boolean;
  upper?: boolean;
  title?: boolean;
  ellipsis?: string | boolean;
}) => string;

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
