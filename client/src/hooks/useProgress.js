import useLocalStorage from './useLocalStorage';

/**
 * Custom hook to manage and persist student progress through lesson steps.
 * Persists data to LocalStorage using a pluggable, query-based schema.
 */
export default function useProgress() {
  const [value, setValue] = useLocalStorage('progress', {});

  /**
   * Load progress for a specific topic.
   * @param {string} topicId
   * @returns {object|null} Topic progress state or null if not initialized
   */
  const loadProgress = (topicId) => {
    if (!topicId) return null;
    return value[topicId] || null;
  };

  /**
   * Mark a step index as completed for a topic.
   * Idempotent: duplicates are ignored.
   * @param {string} topicId
   * @param {number} stepIndex
   * @param {number} totalSteps
   */
  const saveStepCompletion = (topicId, stepIndex, totalSteps) => {
    if (!topicId || stepIndex === undefined) return;
    
    setValue((prev) => {
      const existing = prev[topicId] || {
        completed: [],
        lastActive: 0,
        bestScore: null,
        totalSteps: totalSteps || 0,
        lastUpdated: ''
      };

      // Add step to completed array if not already present
      const completedSet = new Set(existing.completed);
      completedSet.add(stepIndex);

      return {
        ...prev,
        [topicId]: {
          ...existing,
          completed: Array.from(completedSet),
          lastActive: stepIndex,
          totalSteps: totalSteps !== undefined ? totalSteps : existing.totalSteps,
          lastUpdated: new Date().toISOString()
        }
      };
    });
  };

  /**
   * Checks if a specific step is completed for a topic.
   * @param {string} topicId
   * @param {number} stepIndex
   * @returns {boolean}
   */
  const isStepComplete = (topicId, stepIndex) => {
    if (!topicId || stepIndex === undefined) return false;
    const topic = value[topicId];
    return topic ? topic.completed.includes(stepIndex) : false;
  };

  /**
   * Get the last active step index for a topic.
   * @param {string} topicId
   * @returns {number} The step index, or 0 if none
   */
  const getLastActive = (topicId) => {
    if (!topicId) return 0;
    const topic = value[topicId];
    return topic ? topic.lastActive : 0;
  };

  /**
   * Get the percentage of steps completed for a topic (0-100).
   * @param {string} topicId
   * @returns {number}
   */
  const getCompletionPercent = (topicId) => {
    if (!topicId) return 0;
    const topic = value[topicId];
    if (!topic || !topic.totalSteps) return 0;
    return Math.round((topic.completed.length / topic.totalSteps) * 100);
  };

  /**
   * Persist a quiz/practice score, retaining the higher score.
   * @param {string} topicId
   * @param {number} score
   */
  const saveBestScore = (topicId, score) => {
    if (!topicId || score === undefined) return;

    setValue((prev) => {
      const existing = prev[topicId] || {
        completed: [],
        lastActive: 0,
        bestScore: null,
        totalSteps: 0,
        lastUpdated: ''
      };

      const currentBest = existing.bestScore;
      const newBest = currentBest === null ? score : Math.max(currentBest, score);

      return {
        ...prev,
        [topicId]: {
          ...existing,
          bestScore: newBest,
          lastUpdated: new Date().toISOString()
        }
      };
    });
  };

  /**
   * Reset progress for a single topic.
   * @param {string} topicId
   */
  const resetProgress = (topicId) => {
    if (!topicId) return;

    setValue((prev) => {
      const copy = { ...prev };
      delete copy[topicId];
      return copy;
    });
  };

  /**
   * Clear all lesson progress across all topics.
   */
  const resetAllProgress = () => {
    setValue({});
  };

  return {
    loadProgress,
    saveStepCompletion,
    isStepComplete,
    getLastActive,
    getCompletionPercent,
    saveBestScore,
    resetProgress,
    resetAllProgress,
    allProgress: value
  };
}
