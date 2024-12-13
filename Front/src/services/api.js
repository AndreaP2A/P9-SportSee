const mockDataUrl = "/src/data/mockData.JSON";

/**
 * Fetches the main data for a specific user by their ID.
 *
 * @param {number} userId - The ID of the user whose data is to be fetched.
 * @returns {Promise<Object>} A promise that resolves to the user's main data object.
 */
async function fetchUserMainData(userId) {
  const response = await fetch(mockDataUrl);
  const data = await response.json();
  return data.userMainData.find((user) => user.id === userId);
}

/**
 * Fetches the activity data for a specific user.
 *
 * @param {number} userId - The ID of the user whose activity data is to be fetched.
 * @returns {Promise<Object>} A promise that resolves to the user's activity data.
 */
async function fetchUserActivity(userId) {
  const response = await fetch(mockDataUrl);
  const data = await response.json();
  const activityData = data.userActivity.find(
    (activity) => activity.userId === userId
  );
  console.log("Fetched Activity Data:", activityData);
  return activityData;
}

/**
 * Fetches the average sessions for a specific user.
 *
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Object>} A promise that resolves to the user's average sessions data.
 */
async function fetchUserAverageSessions(userId) {
  const response = await fetch(mockDataUrl);
  const data = await response.json();
  return data.userAverageSessions.find((session) => session.userId === userId);
}

/**
 * Fetches the performance data for a specific user.
 *
 * @param {number} userId - The ID of the user whose performance data is to be fetched.
 * @returns {Promise<Object>} A promise that resolves to the user's performance data.
 */
async function fetchUserPerformance(userId) {
  const response = await fetch(mockDataUrl);
  const data = await response.json();
  return data.userPerformance.find(
    (performance) => performance.userId === userId
  );
}

export {
  fetchUserMainData,
  fetchUserActivity,
  fetchUserAverageSessions,
  fetchUserPerformance,
};
