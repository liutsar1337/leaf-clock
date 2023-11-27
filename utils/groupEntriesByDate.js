export  function groupEntriesByDate(inputData) {
    const groupedData = {};

    inputData.forEach((item) => {
        let date = item.begin.split('T')[0];

        if (!groupedData[date]) {
            groupedData[date] = [];
        }

        const itemWithDate = { ...item, date };
        groupedData[date].push(itemWithDate);
    });

    const result = Object.values(groupedData);

    return result;
}

export function blockDisplayableDate(inputDate) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const date = new Date(inputDate);

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}