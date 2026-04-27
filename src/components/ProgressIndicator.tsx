import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
}) => {
  return (
    <nav aria-label="Progress through application" style={{ marginBottom: '30px' }}>
      <p
        style={{
          fontSize: '14px',
          color: '#505a5f',
          margin: '0 0 10px 0',
          fontFamily: '"GDS Transport", arial, sans-serif',
        }}
      >
        Step {currentStep} of {totalSteps}
      </p>

      <ol
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          gap: 0,
          flexWrap: 'nowrap',
          overflow: 'hidden',
        }}
        aria-label="Application steps"
      >
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <li
              key={index}
              aria-current={isCurrent ? 'step' : undefined}
              style={{
                flex: 1,
                borderTop: `4px solid ${
                  isCompleted ? '#00703c' : isCurrent ? '#1d70b8' : '#b1b4b6'
                }`,
                paddingTop: '8px',
                marginRight: index < totalSteps - 1 ? '4px' : 0,
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontFamily: '"GDS Transport", arial, sans-serif',
                  color: isCurrent ? '#1d70b8' : isCompleted ? '#00703c' : '#505a5f',
                  fontWeight: isCurrent ? 700 : 400,
                }}
              >
                {isCompleted && (
                  <span style={{ display: 'none' }}>Completed – </span>
                )}
                {title}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default ProgressIndicator;
