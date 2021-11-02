/** @format */

export const sortData = (data) => {
  const sortedData = [...data];

  // Descending order
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

  // Ascending order
  //return sortedData.sort((a,b) => a.cases > b.cases ? 1 : -1)
};
