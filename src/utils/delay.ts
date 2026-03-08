

export const getDelay = (date: string, timeAlarm: string) => {

    const [hours, minutes, seconds] = timeAlarm.split(':').map(Number);

    const scheduledDate = new Date(date);
    scheduledDate.setHours(hours, minutes, seconds ?? 0, 0);

    const delay = scheduledDate.getTime() - Date.now();

    console.log('scheduledDate:', scheduledDate);
    console.log('delay (ms):', delay);
    console.log('delay (phút):', Math.round(delay / 1000 / 60));

    return delay
}