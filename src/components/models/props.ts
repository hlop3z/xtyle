type Props = {
  keys: () => string[];
  get: (key: string) => {
    model: string;
    namespace: string;
    instance: any;
    objects: any;
  };
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
  string          
  
  // tuple
  [string, number]
  
  // union
  string | null | undefined 
  */
