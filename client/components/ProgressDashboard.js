import React from 'react';

// ===================================================================================
//  HELPER COMPONENT: StatCard
//  A reusable card to display a single statistic, like "Quiz Average".
// ===================================================================================
/**
 * Displays a single piece of data in a visually appealing card.
 * @param {object} props - The properties passed to the component.
 * @param {string} props.title - The title of the statistic (e.g., "Lessons Completed").
 * @param {string} props.value - The value of the statistic (e.g., "5 / 20").
 * @param {JSX.Element} props.icon - An SVG icon component to display next to the stat.
 */
const StatCard = ({ title, value, icon }) => (
  // The card uses a white background, rounded corners, and a shadow for a "floating" effect.
  // A subtle transition and scaling effect is added on hover for interactivity.
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 transition-transform transform hover:scale-105">
    {/* Icon container with a light blue background */}
    <div className="bg-blue-100 p-3 rounded-full">
      {icon}
    </div>
    {/* Text container for the title and value */}
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

// ===================================================================================
//  HELPER COMPONENT: AchievementBadge
//  A reusable badge to display a locked or unlocked achievement.
// ===================================================================================
/**
 * Displays an achievement badge, visually indicating if it's unlocked.
 * @param {object} props - The properties passed to the component.
 * @param {string} props.title - The name of the achievement (e.g., "Grammar Guru").
 * @param {boolean} props.unlocked - Determines the visual style (green for unlocked, gray for locked).
 * @param {JSX.Element} props.icon - An SVG icon component for the badge.
 */
const AchievementBadge = ({ title, unlocked, icon }) => (
  // The outer container changes its background and text color based on the `unlocked` prop.
  <div className={`text-center p-4 rounded-lg ${unlocked ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-500'}`}>
    {/* The icon has its own circular background */}
    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${unlocked ? 'bg-green-200' : 'bg-gray-300'}`}>
      {icon}
    </div>
    <p className="mt-2 text-sm font-semibold">{title}</p>
    <p className="text-xs">{unlocked ? 'Unlocked!' : 'Locked'}</p>
  </div>
);


// ===================================================================================
//  MAIN COMPONENT: ProgressDashboard
//  This is the main component you will share with your team.
//  It combines all the helper components into a complete dashboard.
// ===================================================================================
export default function ProgressDashboard() {
  // --- MOCK DATA ---
  // This is placeholder data. Your team can replace this with real data from
  // the backend (e.g., MongoDB) once it's available.
  const progressData = {
    lessonsCompleted: 5,
    totalLessons: 20,
    quizAverage: 88,
    achievements: [
      { id: 1, title: 'First Steps', unlocked: true },
      { id: 2, title: 'Quiz Whiz', unlocked: true },
      { id: 3, title: 'Sentence Starter', unlocked: true },
      { id: 4, title: 'Grammar Guru', unlocked: false },
      { id: 5, title: 'Punctuation Pro', unlocked: false },
    ]
  };

  // Calculate the overall completion percentage for the progress bar.
  const completionPercentage = (progressData.lessonsCompleted / progressData.totalLessons) * 100;

  // --- ICONS (as SVG components) ---
  // Using inline SVG components like this is a best practice in React.
  // It avoids needing to manage separate image files.
  const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m0 0a7.5 7.5 0 007.5-7.5H4.5a7.5 7.5 0 007.5 7.5z" /></svg>;
  const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9.5a2.5 2.5 0 015 0V19m-5 0h5" /></svg>;
  const TrophyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>;

  return (
    // Main container for the dashboard with a light gray background, padding, and a subtle fade-in animation.
    <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Progress</h2>

      {/* --- Main Stats Section --- */}
      {/* This grid will stack on small screens and sit side-by-side on medium screens and up. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard title="Lessons Completed" value={`${progressData.lessonsCompleted} / ${progressData.totalLessons}`} icon={<BookIcon />} />
        <StatCard title="Quiz Average" value={`${progressData.quizAverage}%`} icon={<ChartIcon />} />
      </div>

      {/* --- Progress Bar Section --- */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Overall Completion</h3>
        {/* The background of the progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-4">
          {/* The filled portion of the progress bar. The width is set dynamically. */}
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-500 mt-1">{Math.round(completionPercentage)}% Complete</p>
      </div>

      {/* --- Achievements Section --- */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Achievements</h3>
        {/* This grid adjusts the number of columns based on screen size for a responsive layout. */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {/* We map over the mock achievement data to create a badge for each one. */}
          {progressData.achievements.map(ach => (
            <AchievementBadge key={ach.id} title={ach.title} unlocked={ach.unlocked} icon={<TrophyIcon />} />
          ))}
        </div>
      </div>
    </div>
  );
}
