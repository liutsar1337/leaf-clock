export default function calculateTotalDuration(entries) {
    // Initialize total duration
    let totalDuration = 0;

    // Iterate through each entry and accumulate the duration
    entries.forEach(entry => {
        totalDuration += entry.duration;
    });

    // Return the total duration
    return totalDuration;
}