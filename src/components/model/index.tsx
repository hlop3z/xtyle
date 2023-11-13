const { signal, computed, effect } = preact;

type RecordDB = Record<string, any>;

class Table {
  readonly stateList = signal([]);
  readonly statePage = signal({});
  readonly stateForm = signal({});
  readonly stateMode = signal("list");
  readonly keys: ReadonlyArray<string>;
  readonly resourceName: string;

  /**
   * Creates an instance of Table.
   * @param {Object} props - The properties for Table.
   * @param {string[]} [props.keys] - The keys of the columns in the records.
   * @param {Record[]} [props.items=[]] - The initial list of records.
   * @param {string} [props.resourceName="app.model"] - The resource name for the Table.
   */
  constructor(props: {
    keys?: string[];
    items?: RecordDB[];
    resourceName?: string;
  }) {
    this.keys = props.keys ? Object.freeze(props.keys) : [];
    this.resourceName = props.resourceName || "app.model";
  }

  // Preact
  get recordList(): RecordDB[] {
    return [...this.stateList.value];
  }

  get mode(): string {
    return this.stateMode.value;
  }

  set mode(mode: string) {
    this.stateMode.value = mode;
  }

  get form(): RecordDB[] {
    return { ...this.stateForm.value };
  }

  set form(row: RecordDB[]) {
    this.stateForm.value = row;
  }

  get list(): RecordDB[] {
    return this.recordList;
  }

  set list(rows: RecordDB[]) {
    if (Array.isArray(rows)) {
      this.stateList.value = rows;
    }
  }

  get page(): any {
    return this.statePage.value;
  }

  set page(value: any) {
    this.statePage.value = value;
  }

  computed(method: (records: Table) => any): any {
    return computed(() => method(this));
  }

  effect(method: (records: Table) => void): void {
    return effect(() => method(this));
  }

  updateList(method: (records: any, self: any) => RecordDB[]): void {
    const nextValue = [...(this.stateList.value || [])];
    method(nextValue, this);
    if (Array.isArray(nextValue)) {
      this.stateList.value = nextValue;
    }
  }
  updateForm(method: (record: any, self: any) => RecordDB[]): void {
    const nextValue = { ...(this.stateForm.value || {}) };
    method(nextValue, this);
    this.stateForm.value = nextValue;
  }

  // Not-Preact
  head(length = 10): RecordDB[] {
    return this.list.slice(0, length);
  }

  tail(length = 10): RecordDB[] {
    return this.list.slice(-length);
  }

  by(column = "id"): RecordDB {
    return RecordsBy(column, this.list);
  }

  sort(...columns: SortByColumnsArgs): RecordDB[] {
    return this.list.slice().sort(SortByColumns(...columns));
  }

  groupBy(column = "account_id"): RecordDB {
    return groupBy(this.list, column);
  }

  find(column: string, value: any): RecordDB[] {
    return this.list.filter((record) => record[column] === value);
  }

  findNot(column: string, value: any): RecordDB[] {
    return this.list.filter((record) => record[column] !== value);
  }

  search(
    columns: string | string[],
    value: string,
    ignoreCase = true
  ): RecordDB[] {
    let filteredList: RecordDB[] = [];
    if (Array.isArray(columns)) {
      columns.forEach((column) => {
        filteredList = filteredList.concat(
          searchBy(this.list, column, value, ignoreCase)
        );
      });
    } else {
      filteredList = searchBy(this.list, columns, value, ignoreCase);
    }
    return filteredList;
  }

  searchNot(
    columns: string | string[],
    value: string,
    ignoreCase = true
  ): RecordDB[] {
    let filteredList: RecordDB[] = [];
    if (Array.isArray(columns)) {
      columns.forEach((column) => {
        filteredList = filteredList.concat(
          searchByNot(this.list, column, value, ignoreCase)
        );
      });
    } else {
      filteredList = searchByNot(this.list, columns, value, ignoreCase);
    }
    return filteredList;
  }

  dirtyList(newList: RecordDB[]): RecordDB[] {
    return updatedRecordsOnly(this.list, newList);
  }

  dirtyForm(newForm: RecordDB): RecordDB {
    return updatedRecordValues(this.form, newForm);
  }
}

const updatedRecordsOnly = (
  original: RecordDB[],
  updates: RecordDB[]
): RecordDB[] => {
  if (JSON.stringify(original) === JSON.stringify(updates)) return [];
  return updates.filter(
    (updatedDBRecord, index) =>
      JSON.stringify(updatedDBRecord) !== JSON.stringify(original[index])
  );
};

const updatedRecordValues = (
  original: RecordDB,
  updates: RecordDB
): RecordDB => {
  const updatedDict: RecordDB = {};
  Object.keys(original).forEach((key) => {
    if (original[key] !== updates[key]) {
      updatedDict[key] = updates[key];
    }
  });
  return updatedDict;
};

/**
 * Sorts the records in ascending or descending order based on the provided column.
 * @param {string} key - The column key to sort by. Use a '-' prefix for descending order.
 * @returns {Function} A function that compares two records and returns their sort order.
 */
const sortBase = (key: string) => {
  let direction = 1;
  if (key[0] === "-") {
    direction = -1;
    key = key.substr(1);
  }
  return (recordA: RecordDB, recordB: RecordDB) =>
    (recordA[key] < recordB[key] ? -1 : recordA[key] > recordB[key] ? 1 : 0) *
    direction;
};

type SortByColumnsArgs = string[];

/**
 * Creates a sorting function that sorts records based on multiple columns in priority order.
 * @param {...string} columns - The columns to sort by in priority order.
 * @returns {Function} A function that compares two records and returns their sort order.
 */
const SortByColumns =
  (...columns: SortByColumnsArgs) =>
  (recordA: RecordDB, recordB: RecordDB) => {
    let result = 0;
    let i = 0;
    const numColumns = columns.length;
    while (result === 0 && i < numColumns) {
      result = sortBase(columns[i])(recordA, recordB);
      i++;
    }
    return result;
  };

/**
 * Filters records that match the search value in the specified column.
 * @param {Record[]} list - The list of records to search within.
 * @param {string} column - The column key to search in.
 * @param {string} value - The search value.
 * @param {boolean} [ignoreCase=true] - Whether to perform a case-insensitive search.
 * @returns {Record[]} An array of filtered records that match the search criteria.
 */
const searchBy = (
  list: RecordDB[],
  column: string,
  value: string,
  ignoreCase?: boolean
) => {
  const searchTerm = ignoreCase ? value.toLowerCase() : value;
  return list.filter((record) =>
    String(record[column]).toLowerCase().includes(searchTerm)
  );
};

/**
 * Filters records that do not match the search value in the specified column.
 * @param {Record[]} list - The list of records to search within.
 * @param {string} column - The column key to search in.
 * @param {string} value - The search value.
 * @param {boolean} [ignoreCase=true] - Whether to perform a case-insensitive search.
 * @returns {Record[]} An array of filtered records that do not match the search criteria.
 */
const searchByNot = (
  list: RecordDB[],
  column: string,
  value: string,
  ignoreCase?: boolean
) => {
  const searchTerm = ignoreCase ? value.toLowerCase() : value;
  return list.filter(
    (record) => !String(record[column]).toLowerCase().includes(searchTerm)
  );
};

/**
 * Groups records in the list based on a specified column key.
 * @param {Record[]} list - The list of records to group.
 * @param {string} column - The column key to group by.
 * @returns {Record} An object containing the grouped records.
 */
const groupBy = (list: RecordDB[], column: string) =>
  list.reduce((grouped, record) => {
    const key = record[column];
    grouped[key] = grouped[key] || [];
    grouped[key].push(record);
    return grouped;
  }, {} as RecordDB);

/**
 * Finds records in the list that match the specified column and value.
 * @param {string} column - The column key to search in.
 * @param {any} value - The value to match in the column.
 * @returns {Record[]} An array of records that match the search criteria.
 */
const RecordsBy = (column: string, list: RecordDB[]) =>
  list.reduce((recordsByColumn, record) => {
    recordsByColumn[record[column]] = record;
    return recordsByColumn;
  }, {} as RecordDB);

/**
 * Represents a database table of records with various data operations.
 * @param {string} resourceName - The name of the resource associated with the table.
 * @param {Object} [config={}] - Additional configuration for the table.
 * @param {string[]} [config.keys] - The keys of the columns in the records.
 * @returns {Table} An instance of the Table class representing the database table.
 */
function Database(
  resourceName: string,
  config: {
    keys?: string[];
    items?: any;
  } = {}
): any {
  if (Database.model[resourceName]) {
    return Database.model[resourceName];
  }
  Database.model[resourceName] = new Table({
    ...config,
    resourceName,
  });
  return Database.model[resourceName];
}

Database.model = {};

export default Database;
