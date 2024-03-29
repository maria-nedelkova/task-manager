import React, { useEffect } from 'react';
import { ABOUT_ITEM1, ABOUT_ITEM2, ABOUT_ITEM3 } from '../constants';
import { AboutItem } from '../components/AboutItem';

export function AboutPage() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="bkground-about-page">
      <div className="about-info">
        <div className="about-info-header">
          <p>Organize it all</p>
          <p>
            with
            <span className="app-name">Task Manager</span>
          </p>
        </div>
        <ul className="about-info-items">
          <AboutItem text={ABOUT_ITEM1} />
          <AboutItem text={ABOUT_ITEM2} />
          <AboutItem text={ABOUT_ITEM3} />
        </ul>
      </div>
    </div>
  );
}
