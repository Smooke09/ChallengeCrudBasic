function hasUniqueDayOfWeek(arr: any) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i].day_of_week === arr[j].day_of_week && i !== j) {
        return false;
      }
    }
  }
  return true;
}

export default hasUniqueDayOfWeek;
