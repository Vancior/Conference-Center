function humanize_time(time) {
  let old_format = time;
  time = new Date(time);
  let date3 = new Date() - time;
  let days = Math.floor(date3 / (24 * 3600 * 1000));
  let leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000));
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000);
  if (days >= 0 && hours >= 0 && minutes >= 0 && seconds >= 0) {
    if (days > 1) {
      if (days > 30) {
        return old_format.slice(0, -5);
      } else return days + " 天前";
    } else if (hours > 1) {
      return hours + " 小时前";
    } else if (minutes > 1) {
      return minutes + " 分钟前";
    } else {
      return " 刚刚";
    }
    return old_format;
  } else {
    days = -days;
    hours = -hours;
    minutes = -minutes;
    seconds = -seconds;
    if (days > 1) {
      if (days > 30) {
        return old_format.slice(0, -5);
      } else return days + " 天后";
    } else if (hours > 1) {
      return hours + " 小时后";
    } else if (minutes > 1) {
      return minutes + " 分钟后";
    } else {
      return " 一分钟内";
    }
    return old_format;
  }
}

export {
  humanize_time
};
