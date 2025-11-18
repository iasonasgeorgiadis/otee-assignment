import type { FC } from 'react';
import './App.css';
import { LandingPage } from './pages/LandingPage';

const App: FC = () => {
  return <LandingPage />;
};

export default App;
// The component showcase code is temporarily commented out
// All theu original imports and component definitions are preserved below
/*
import { useId, useState } from 'react';
import { Button } from './components/Button/Button';
import { InputField } from './components/InputField/InputField';
import { MaterialIcon } from './components/MaterialIcon/MaterialIcon';
import { Accordion } from './components/Accordion/Accordion';
import { Checkbox } from './components/Checkbox/Checkbox';
import { Article } from './components/Article/Article';

const STORYBOOK_BASE_URL = import.meta.env.VITE_STORYBOOK_BASE_URL ?? 'http://localhost:6006';

const buildStorybookLink = (storybookPath: string) => {
  const normalizedPath = storybookPath.startsWith('/') ? storybookPath : `/${storybookPath}`;

  try {
    const url = new URL(STORYBOOK_BASE_URL);
    url.searchParams.set('path', normalizedPath);
    return url.toString();
  } catch {
    const trimmedBase = STORYBOOK_BASE_URL.replace(/\/$/, '');
    return `${trimmedBase}/?path=${normalizedPath}`;
  }
};

interface ComponentVariation {
  title: string;
  description?: string;
  Component: FC;
}

interface ComponentDocSection {
  name: string;
  description: string;
  storybookPath: string;
  variations: ComponentVariation[];
}

const ButtonContained: FC = () => (
  <div className="component-card__demo-row">
    <Button label="Primary Action" variant="primary" size="medium" />
    <Button label="Secondary" variant="secondary" size="medium" outlined />
  </div>
);

const ButtonIconography: FC = () => (
  <div className="component-card__demo-row">
    <Button
      label="Create"
      variant="primary"
      size="medium"
      iconLead={<MaterialIcon name="add" />}
    />
    <Button
      label="Share"
      variant="secondary"
      size="medium"
      iconEnd={<MaterialIcon name="ios_share" />}
    />
    <Button
      aria-label="Floating action"
      variant="primary"
      size="small"
      iconLead={<MaterialIcon name="edit" />}
    />
  </div>
);

const ButtonLinkStyles: FC = () => (
  <div className="component-card__demo-row">
    <Button label="Primary link" variant="link" linkColor="primary" />
    <Button label="Secondary link" variant="link" linkColor="secondary" />
  </div>
);

const InputFieldBase: FC = () => {
  const searchId = useId();
  const compactId = useId();
  const [searchValue, setSearchValue] = useState('');
  const [compactValue, setCompactValue] = useState('');

  return (
    <div className="component-card__demo-column">
      <label className="field-label" htmlFor={searchId}>Search the catalogue</label>
      <InputField
        id={searchId}
        placeholder="Search components"
        showLeadIcon
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <label className="field-label" htmlFor={compactId}>Compact search</label>
      <InputField
        id={compactId}
        placeholder="Compact size"
        size="small"
        showLeadIcon
        value={compactValue}
        onChange={(event) => setCompactValue(event.target.value)}
      />
    </div>
  );
};

const InputFieldValidation: FC = () => {
  const successId = useId();
  const errorId = useId();
  const [successEmail, setSuccessEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('team@igds');

  return (
    <div className="component-card__demo-column">
      <label className="field-label" htmlFor={successId}>Email (valid)</label>
      <InputField
        id={successId}
        value={successEmail}
        placeholder="Enter your email"
        status="success"
        statusMessage="Email validated successfully."
        showEndIcon
        onChange={(event) => setSuccessEmail(event.target.value)}
      />
      <p className="field-helper">Success state swaps the trailing icon for a confirmation badge.</p>

      <label className="field-label" htmlFor={errorId}>Email (error)</label>
      <InputField
        id={errorId}
        value={errorEmail}
        placeholder="Enter your email"
        status="error"
        statusMessage="Enter a complete email address."
        showLeadIcon
        onChange={(event) => setErrorEmail(event.target.value)}
      />
      <p className="field-helper">Error state highlights the border and announces the issue.</p>
    </div>
  );
};

const AccordionSizes: FC = () => (
  <div className="component-card__demo-column">
    <Accordion
      size="small"
      title="Small accordion"
      descriptionText="Use the small size inside dense layouts or sidebars."
    />
    <Accordion
      size="medium"
      title="Medium accordion"
      descriptionText="Medium is the recommended choice for most content."
    />
    <Accordion
      size="large"
      title="Large accordion"
      descriptionText="Large headings work well for marketing and hero sections."
    />
  </div>
);

const AccordionStates: FC = () => (
  <div className="component-card__demo-column">
    <Accordion
      size="medium"
      title="Pre-expanded"
      descriptionText="Controlled usage keeps the section open by default."
      expanded
      onToggle={() => {}}
    />
    <Accordion
      size="medium"
      title="Disabled"
      descriptionText="Disabled accordions preserve layout without interactivity."
      disabled
    />
  </div>
);

const CheckboxStates: FC = () => (
  <div className="component-card__demo-column">
    <Checkbox label="Checked" variant="checked" />
    <Checkbox label="Intermediate" variant="intermediate" />
    <Checkbox label="Add more" variant="plus" />
    <Checkbox label="Disabled" variant="checked" disabled />
  </div>
);

const CheckboxSizesAndLayout: FC = () => {
  const [mediumVariant, setMediumVariant] = useState<'checked' | 'unchecked'>('checked');
  const [smallVariant, setSmallVariant] = useState<'checked' | 'unchecked'>('unchecked');

  return (
    <div className="component-card__demo-column">
      <Checkbox
        label="Medium (default)"
        variant={mediumVariant}
        onChange={setMediumVariant}
      />
      <Checkbox
        label="Small"
        size="small"
        variant={smallVariant}
        onChange={setSmallVariant}
      />
      <Checkbox
        label="Label on the right"
        checkboxPosition="right"
        variant="checked"
      />
    </div>
  );
};

const ArticleSizes: FC = () => (
  <div className="component-card__demo-column">
    <Article
      title="Machine Learning in Healthcare"
      size="large"
      authors="Dr. Sarah Chen, Prof. Michael Rodriguez"
      category="Research"
      articleType="Original Article"
      date="March 15, 2024"
      accessType="open"
    />
    <Article
      title="Quantum Computing Advances"
      size="medium"
      authors="Dr. James Wilson, Prof. Lisa Park"
      category="Technology"
      date="February 20, 2024"
      accessType="free"
    />
    <Article
      title="Climate Change Solutions"
      size="small"
      authors="Dr. Maria Garcia"
      category="Environment"
      date="January 10, 2024"
      accessType="full"
    />
  </div>
);

const ArticleDataDriven: FC = () => (
  <div className="component-card__demo-column">
    <Article
      title="Minimal Article Example"
      size="medium"
    />
    <Article
      title="Complete Academic Article"
      size="medium"
      authors="Dr. Alice Johnson, Prof. Mark Thompson, Dr. Sarah Lee"
      category="Computer Science"
      articleType="Research Paper"
      date="April 5, 2024"
      accessType="open"
      journal="Journal of AI Research"
      volume="Volume 15, Issue 2"
      publishedDate="05 April 2024"
      actions={{
        abstract: { onClick: () => console.log('Abstract clicked') },
        fullText: { onClick: () => console.log('Full Text clicked') },
        pdf: { onClick: () => console.log('PDF clicked') },
        references: { onClick: () => console.log('References clicked') }
      }}
    />
  </div>
);

const componentDocs: ComponentDocSection[] = [
  {
    name: 'Button',
    description:
      'Buttons trigger key actions across the interface. They support contained, outlined, and link styles with optional iconography.',
    storybookPath: '/docs/components-button--docs',
    variations: [
      { title: 'Contained Variants', description: 'Primary and secondary buttons for high emphasis actions.', Component: ButtonContained },
      { title: 'Iconography', description: 'Attach leading or trailing icons to reinforce meaning.', Component: ButtonIconography },
      { title: 'Link Style', description: 'Low-emphasis actions that read like textual links.', Component: ButtonLinkStyles },
    ],
  },
  {
    name: 'InputField',
    description:
      'Input fields capture free-form text, adapt to success and error states, and optionally surface leading or trailing icons.',
    storybookPath: '/docs/components-inputfield--docs',
    variations: [
      { title: 'Base Sizes', description: 'Default medium input alongside the compact alternative.', Component: InputFieldBase },
      { title: 'Validation States', description: 'Success and error styling with accessible status messaging.', Component: InputFieldValidation },
    ],
  },
  {
    name: 'Accordion',
    description:
      'Accordions progressively disclose content. They offer three typographic scales, disabled states, and controlled behaviour.',
    storybookPath: '/docs/components-accordion--docs',
    variations: [
      { title: 'Size Scale', description: 'Small, medium, and large typography presets.', Component: AccordionSizes },
      { title: 'State Examples', description: 'Pre-expanded and disabled usage patterns.', Component: AccordionStates },
    ],
  },
  {
    name: 'Checkbox',
    description:
      'Checkboxes collect boolean choices with optional intermediate and plus states, right-aligned labels, and a compact size.',
    storybookPath: '/docs/components-checkbox--docs',
    variations: [
      { title: 'States', description: 'Checked, intermediate, plus, and disabled treatments.', Component: CheckboxStates },
      { title: 'Sizes & Layout', description: 'Default medium sizing, compact small variant, and right aligned labels.', Component: CheckboxSizesAndLayout },
    ],
  },
  {
    name: 'Article',
    description:
      'Article components display academic article metadata with automatic section visibility. Features three size variants and data-driven composition using Button and AccessTag components.',
    storybookPath: '/docs/components-article--docs',
    variations: [
      { title: 'Size Scale', description: 'Large (32px), medium (24px), and small (20px) typography variants.', Component: ArticleSizes },
      { title: 'Data-Driven Visibility', description: 'Sections automatically show/hide based on data presence - no explicit visibility flags needed.', Component: ArticleDataDriven },
    ],
  },
];
const App: FC = () => {
  return <ManuscriptSubmissionFormPage />;
};
*/



// Original component showcase is temporarily commented out
// To restore it, uncomment the code below and comment out the line above
/*
const App: FC = () => {
  return (
    <main className="app">
      <header className="app__header">
        <h1 className="app__title">IGDS Component Overview</h1>
        <p className="app__intro">
          Explore the key UI primitives available in the design system. Each section highlights common configurations and links to the
          Storybook documentation for deeper guidance.
        </p>
      </header>

      <section className="component-grid" aria-label="Component catalogue">
        {componentDocs.map((component) => (
          <article key={component.name} className="component-card">
            <div className="component-card__header">
              <h2 className="component-card__title">{component.name}</h2>
              <a
                className="component-card__link"
                href={buildStorybookLink(component.storybookPath)}
                target="_blank"
                rel="noreferrer"
              >
                View in Storybook →
              </a>
            </div>
            <p className="component-card__description">{component.description}</p>
            <div className="component-card__variations">
              {component.variations.map((variation) => (
                <section key={variation.title} className="component-card__variation">
                  <h3 className="component-card__variation-title">{variation.title}</h3>
                  {variation.description && (
                    <p className="component-card__variation-description">{variation.description}</p>
                  )}
                  <div className="component-card__demo">
                    <variation.Component />
                  </div>
                </section>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};
*/


