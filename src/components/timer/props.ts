type Props = {
  get: (args: {
    years?: number;
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }) => number;
  start: () => any;
};

export default Props;
