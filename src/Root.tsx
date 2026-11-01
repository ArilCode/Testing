import React from 'react';
import {Composition} from 'remotion';
import {Tutorial, calcMetadata, defaultProps} from './Tutorial';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Tutorial"
        component={Tutorial}
        durationInFrames={1000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultProps}
        calculateMetadata={calcMetadata}
      />
      <Composition
        id="TutorialVertical"
        component={Tutorial}
        durationInFrames={1000}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
        calculateMetadata={calcMetadata}
      />
    </>
  );
};
