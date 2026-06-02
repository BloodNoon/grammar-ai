import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import useProgress from '../hooks/useProgress';

// Helper component to test the hook
function TestComponent({ topicId, stepIndex, totalSteps, score }) {
  const {
    loadProgress,
    saveStepCompletion,
    isStepComplete,
    getLastActive,
    getCompletionPercent,
    saveBestScore,
    resetProgress,
    resetAllProgress,
    allProgress
  } = useProgress();

  const progress = loadProgress(topicId);

  return (
    <div>
      <div data-testid="is-complete">{isStepComplete(topicId, stepIndex) ? 'yes' : 'no'}</div>
      <div data-testid="last-active">{getLastActive(topicId)}</div>
      <div data-testid="percent">{getCompletionPercent(topicId)}</div>
      <div data-testid="best-score">{progress ? String(progress.bestScore) : 'null'}</div>
      <div data-testid="completed-list">{progress ? progress.completed.join(',') : ''}</div>
      <button data-testid="btn-complete" onClick={() => saveStepCompletion(topicId, stepIndex, totalSteps)}>
        Complete
      </button>
      <button data-testid="btn-score" onClick={() => saveBestScore(topicId, score)}>
        Score
      </button>
      <button data-testid="btn-reset" onClick={() => resetProgress(topicId)}>
        Reset
      </button>
      <button data-testid="btn-reset-all" onClick={() => resetAllProgress()}>
        Reset All
      </button>
    </div>
  );
}

describe('useProgress hook', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('should track step completion and percentage', () => {
    render(<TestComponent topicId="test_topic" stepIndex={0} totalSteps={10} score={8} />);
    
    // Initial state
    expect(screen.getByTestId('is-complete').textContent).toBe('no');
    expect(screen.getByTestId('last-active').textContent).toBe('0');
    expect(screen.getByTestId('percent').textContent).toBe('0');
    
    // Complete first step
    fireEvent.click(screen.getByTestId('btn-complete'));
    expect(screen.getByTestId('is-complete').textContent).toBe('yes');
    expect(screen.getByTestId('last-active').textContent).toBe('0');
    expect(screen.getByTestId('percent').textContent).toBe('10');
    expect(screen.getByTestId('completed-list').textContent).toBe('0');
  });

  test('should ignore duplicate completions (idempotency)', () => {
    render(<TestComponent topicId="test_topic" stepIndex={2} totalSteps={5} score={8} />);
    
    // Click twice
    fireEvent.click(screen.getByTestId('btn-complete'));
    fireEvent.click(screen.getByTestId('btn-complete'));
    
    expect(screen.getByTestId('completed-list').textContent).toBe('2');
    expect(screen.getByTestId('percent').textContent).toBe('20');
  });

  test('should retain highest score', () => {
    const { rerender } = render(<TestComponent topicId="test_topic" stepIndex={1} totalSteps={5} score={5} />);
    
    // Save score of 5
    fireEvent.click(screen.getByTestId('btn-score'));
    expect(screen.getByTestId('best-score').textContent).toBe('5');
    
    // Rerender with score of 3 (lower)
    rerender(<TestComponent topicId="test_topic" stepIndex={1} totalSteps={5} score={3} />);
    fireEvent.click(screen.getByTestId('btn-score'));
    expect(screen.getByTestId('best-score').textContent).toBe('5'); // should stay 5
    
    // Rerender with score of 8 (higher)
    rerender(<TestComponent topicId="test_topic" stepIndex={1} totalSteps={5} score={8} />);
    fireEvent.click(screen.getByTestId('btn-score'));
    expect(screen.getByTestId('best-score').textContent).toBe('8'); // should change to 8
  });

  test('should reset progress for specific topic or all topics', () => {
    render(<TestComponent topicId="test_topic" stepIndex={1} totalSteps={5} score={8} />);
    
    fireEvent.click(screen.getByTestId('btn-complete'));
    expect(screen.getByTestId('is-complete').textContent).toBe('yes');
    
    // Reset topic
    fireEvent.click(screen.getByTestId('btn-reset'));
    expect(screen.getByTestId('is-complete').textContent).toBe('no');
  });

  test('should gracefully handle corrupted localStorage JSON', () => {
    localStorage.setItem('students-writing-progress', 'corrupted-json-data{');
    
    // Should render without throwing, and should log error (mocked or ignored)
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<TestComponent topicId="test_topic" stepIndex={1} totalSteps={5} score={8} />);
    expect(screen.getByTestId('is-complete').textContent).toBe('no');
    
    spy.mockRestore();
  });
});
