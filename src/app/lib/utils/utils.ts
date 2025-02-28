// Functions to be used in the app 

export const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('default', { month: 'long' });
}

export const getYear = () => {
    const date = new Date();
    return date.getFullYear();
}

export const getDate = () => {
    return new Date;
}

//export const dayAndMonth = getDate().toLocaleDateString('defauylt', { day: '2-digit', month: 'long' })
export const getDayAndMonth = (date: Date) => {
    //const date = new Date();
    const dayAndMonth =  new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
    }).format(date);
    return dayAndMonth;
}
export const formatCurrency = (amount: number): string => {
    const formattedAmount = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(amount);
    return formattedAmount;
  };

  export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'en-GB',
  ) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  };
