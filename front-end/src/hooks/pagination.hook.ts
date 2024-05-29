import { useEffect, useState } from "react"

const usePagination = <T>(viewNumber:number) => {
  
  // 객체 리스트 state 
  const [totalList, setTotalList] = useState<T[]>([]);
  const [viewList, setViewList] = useState<T[]>([]);

  // 페이지 번호 state
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPageNumberList, setTotalPageNumberList] = useState<number[]>([1]);

  // 페이지 섹션 state
  const [currentSectionNumber, setCurrentSectionNumber] = useState(1);
  const [lastSectionNumber, setLastSectionNumber] = useState(1);
  const [viewSectionNumberList, setViewSectionNumberList] = useState<number[]>([]);

  const generateViewList = () => {
    const firstIndex = viewNumber * (currentPageNumber - 1);
    const lastIndex = viewNumber * currentPageNumber > totalList.length ? 
    totalList.length : 
    viewNumber * currentPageNumber;

    const viewPageList = totalList.slice(firstIndex, lastIndex);
    setViewList(viewPageList);
  }

  const generateViewSection = () => {
    const countPerSection = 10;
    const firstIndex = countPerSection * (currentSectionNumber - 1);
    const lastIndex = countPerSection * currentSectionNumber > totalPageNumberList.length ? 
    totalPageNumberList.length : 
    countPerSection * currentSectionNumber;

    const viewSectionNumberList = totalPageNumberList.slice(firstIndex, lastIndex);setViewSectionNumberList(viewSectionNumberList);
  }

  useEffect(() => {
    const totalListLength = totalList.length;
    const LastPageNumber = Math.ceil(totalListLength / viewNumber);
    const totalPageNumberList : number[] = [];
    for (let page = 1; page <= LastPageNumber; page++) {
      totalPageNumberList.push(page);
    }
    setTotalPageNumberList(totalPageNumberList);

    const countPerSection = 10;
    const lastSectionNumber = Math.ceil(LastPageNumber / countPerSection);
    setLastSectionNumber(lastSectionNumber);

    setCurrentPageNumber(1);
    setCurrentSectionNumber(1);

    generateViewList();
    generateViewSection();

  },[totalList]);

  useEffect(generateViewList, [currentPageNumber]);

  useEffect(generateViewSection,[currentSectionNumber]);

  return {
    setTotalList,
    viewList,
    currentPageNumber,
    setCurrentPageNumber,
    currentSectionNumber,
    lastSectionNumber,
    setCurrentSectionNumber,
    viewSectionNumberList,
  };

}

export default usePagination;