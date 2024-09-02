export const checkDateValide = (date: Date): boolean => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return date > today;
  };

export const formatDateForMysql = (date: Date) => {
    return date.toISOString().slice(0, 19).replace("T", " ");
  };  

  export function isDateNew(sqlDateTime: string): boolean {
    const inputDate = new Date(sqlDateTime);
  
    const currentDate = new Date();
  
    if (isNaN(inputDate.getTime())) {
      throw new Error("Invalid date format");
    }
  
    const timeDifference = currentDate.getTime() - inputDate.getTime();
  
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  
    return daysDifference <= 30;
  }
  
export function calculateDateDifference(date1: string): number {
  const today = new Date();
  const d1 = new Date(date1);

  const timeDifference = Math.abs(today.getTime() - d1.getTime());

  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return dayDifference;   
}

  
  