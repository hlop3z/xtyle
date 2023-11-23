export default function arrayPage(
  originalArray: any[],
  fixedNumberOfItems: number
) {
  return new ArrayPage(originalArray, fixedNumberOfItems);
}

function arrayPagination(
  originalArray: any[],
  fixedNumberOfItems: number,
  startItem: any = null
) {
  const startIndex = startItem ? originalArray.indexOf(startItem) + 1 : 0;

  const actualStartIndex = startIndex !== -1 ? startIndex : 0;

  const selectedItems = originalArray.slice(
    actualStartIndex,
    actualStartIndex + fixedNumberOfItems
  );

  if (selectedItems.length < fixedNumberOfItems) {
    const extra = originalArray.slice(
      0,
      fixedNumberOfItems - selectedItems.length
    );
    selectedItems.push(...extra);
  }

  return selectedItems;
}

function arrayPaginationReverse(
  originalArray: any[],
  fixedNumberOfItems: number,
  startItem: any = null
) {
  const reversedArray = [...originalArray].reverse(); // Create a reversed copy of the original array
  const startIndex = startItem ? reversedArray.indexOf(startItem) + 1 : 0;

  const actualStartIndex = startIndex !== -1 ? startIndex : 0;

  const selectedItems = reversedArray.slice(
    actualStartIndex,
    actualStartIndex + fixedNumberOfItems
  );

  if (selectedItems.length < fixedNumberOfItems) {
    const extra = reversedArray.slice(
      0,
      fixedNumberOfItems - selectedItems.length
    );
    selectedItems.push(...extra);
  }

  return selectedItems.reverse(); // Reverse the selected items to get the correct order;
}

class ArrayPage {
  private items: any[];
  private limit: number;

  constructor(originalArray: any[], fixedNumberOfItems: number) {
    this.items = originalArray;
    this.limit = fixedNumberOfItems;
  }

  next(current: any[] | null = null) {
    const startItem = current ? current.slice(-1)[0] : null;
    return arrayPagination(this.items, this.limit, startItem);
  }

  prev(current: any[] | null = null) {
    const startItem = current ? current.slice(0, 1)[0] : null;
    return arrayPaginationReverse(this.items, this.limit, startItem);
  }
}
