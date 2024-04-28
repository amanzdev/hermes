import dayjs from "dayjs";

export function calculateAge(birthDate: Date): number {
    // Get today's date
    const today = new Date();

    // Extract years from both dates
    const birthYear = birthDate.getFullYear();
    const currentYear = today.getFullYear();

    // Calculate age based on years
    let age = currentYear - birthYear;

    // Adjust for birthdays not yet passed in the current year
    const birthMonth = birthDate.getMonth();
    const currentMonth = today.getMonth();
    const birthDay = birthDate.getDate();
    const currentDay = today.getDate();

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--;
    }

    return age;
}

export function getRandomDatesBetween(startDate: string, endDate: string, count: number): dayjs.Dayjs[] {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const diffInMilliseconds = end.diff(start, 'millisecond');

    const randomDates: dayjs.Dayjs[] = [];
    for (let i = 0; i < count; i++) {
        const randomMilliseconds = Math.floor(Math.random() * diffInMilliseconds);
        randomDates.push(start.add(randomMilliseconds, 'millisecond'));
    }

    return randomDates.sort((a, b) => b.valueOf() - a.valueOf());
}