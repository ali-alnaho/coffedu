import { HallSeating } from '@coffedu/contracts';

function toggleIndex(list: number[], index: number) {
  if (list.includes(index)) {
    return list.filter((item) => item !== index);
  }
  return [...list, index].sort((a, b) => a - b);
}

export function toggleVerticalAisle(
  currentSeating: HallSeating[],
  hallId: string,
  columnIndex: number
): HallSeating[] {
  return currentSeating.map((hall) => {
    if (hall.hallId !== hallId) return hall;

    const verticalList = hall.layout.verticalAisles;
    // const updatedVerticalAisles = verticalList.includes(columnIndex)
    //   ? verticalList.filter((item) => item !== columnIndex)
    //   : [...verticalList, columnIndex].sort((a, b) => a - b);

    const updatedVerticalAisles = toggleIndex(verticalList, columnIndex);

    const updatedLayout = {
      ...hall.layout,
      verticalAisles: updatedVerticalAisles,
    };
    return {
      ...hall,
      layout: updatedLayout,
    };
  });

  //console.log(JSON.stringify(x, null, 2));
}

export function toggleHorizontalAisle(
  currentSeating: HallSeating[],
  hallId: string,
  rowIndex: number
): HallSeating[] {
  return currentSeating.map((hall) => {
    if (hall.hallId !== hallId) return hall;

    const horizontalList = hall.layout.horizontalAisles;
    // const updatedHorizontalAisles = horizontalList.includes(rowIndex)
    //   ? horizontalList.filter((item) => item !== rowIndex)
    //   : [...horizontalList, rowIndex].sort((a, b) => a - b);

    const updatedHorizontalAisles = toggleIndex(horizontalList, rowIndex);

    const updatedLayout = {
      ...hall.layout,
      horizontalAisles: updatedHorizontalAisles,
    };
    return {
      ...hall,
      layout: updatedLayout,
    };
  });

  //console.log(JSON.stringify(x, null, 2));
}
