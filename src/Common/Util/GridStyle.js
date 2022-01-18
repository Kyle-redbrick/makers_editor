export const GetGridStyle = ({
  list,
  index,
  columnNumber,
  itemSpace,
  lineSpace,
  containerWidth,
  itemHeight
}) => {
  /* 
    list : Array
    index : map 내부의 index
    columnNumber : 각 row에 정렬되는 item
    itemSpace : 아이템의 사이의 간격
    lineSpace : row 간격
    containerWidth : (optional) 전체 컨테이너 크기 -> item width 자동 계산
    itemHeight : (optional) item 의 높이 -> default: none
    - 부모 컨테이너의 css 에  display: flex, flex-wrap: wrap;
    */
  const listLength = list.length;

  let style = {};
  style =
    index % columnNumber !== columnNumber - 1
      ? { ...style, ...{ marginRight: `${itemSpace}px` } }
      : { ...style };

  style =
    listLength % columnNumber === 0
      ? index < listLength - columnNumber
        ? { ...style, ...{ marginBottom: `${lineSpace}px` } }
        : { ...style }
      : index < listLength - (listLength % columnNumber)
      ? { ...style, ...{ marginBottom: `${lineSpace}px` } }
      : { ...style };

  style = containerWidth
    ? {
        ...style,
        ...{
          width: `${(containerWidth - itemSpace * (columnNumber - 1)) /
            columnNumber}px`
        }
      }
    : { ...style };

  style = itemHeight
    ? {
        ...style,
        ...{
          height: `${itemHeight}px`
        }
      }
    : { ...style };

  return style;
};
