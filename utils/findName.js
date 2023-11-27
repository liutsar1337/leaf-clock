export default function findNameInObjectArray(array, targetId, isActivities = false) {
    for (let object of array) {
        if (object.id === targetId) {
            return object.name;
        }
    }
    return isActivities ? 'No Activity' : 'No Project';
}