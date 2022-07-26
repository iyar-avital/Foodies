export const dateCreated = (_date) => {
    let d = new Date(_date);
    const [month, day, year] = [d.getMonth() + 1, d.getDate(), d.getFullYear()];
    let fullDate = year + "/" + month + "/" + day;
    return fullDate;
  };