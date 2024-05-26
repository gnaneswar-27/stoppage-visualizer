import moment from 'moment';

export function calculateStoppages(data, threshold) {
  const stoppages = [];
  let currentStoppage = null;

  data.forEach((item) => {
    const speed = item.speed;
    const eventTime = moment(item.eventGeneratedTime);

    if (speed === 0) {
      if (!currentStoppage) {
        currentStoppage = {
          latitude: item.latitude,
          longitude: item.longitude,
          reachTime: eventTime,
          endTime: eventTime,
          duration: 0
        };
      } else {
        currentStoppage.endTime = eventTime;
        currentStoppage.duration = moment.duration(currentStoppage.endTime.diff(currentStoppage.reachTime)).asMinutes();
      }
    } else {
      if (currentStoppage) {
        stoppages.push(currentStoppage);
        currentStoppage = null;
      }
    }
  });

  if (currentStoppage) {
    stoppages.push(currentStoppage);
  }

  return stoppages;
}
