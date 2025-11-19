import type { FC } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PlainFilesList } from '../components/PlainFilesList';
import './LandingPage.css';

export const LandingPage: FC = () => {
  return (
    <>
      <Header />
      <main className="landing-page">
        <section className="landing-page__panel">
          <p className="landing-page__eyebrow">File handoff</p>
          <h1 className="landing-page__title">Plain files list</h1>
          <p className="landing-page__description">
            Reference implementation of the lightweight attachments list pulled directly from the
            OTee assignment Figma file. Hover the row to reveal the overflow menu, just like the
            component states documented in design.
          </p>
          <div className="landing-page__list-wrapper">
            <PlainFilesList />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
