module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear() + 5
    }`;
  },
  isdefined: (value) => {
    return value !== undefined;
  },
  more_than_one: (record) => {
    return record.length-1; 
  },
};
