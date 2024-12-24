interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function getTimeRemaining(): TimeRemaining {
    const now = new Date();
    const tripDate = new Date('2025-01-09');
    const totalSeconds = Math.max(0, Math.floor((tripDate.getTime() - now.getTime()) / 1000));

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
}

