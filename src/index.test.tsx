import React from 'react';
import { createRoot } from 'react-dom/client';
import { createGrid } from './index';

/* prettier-ignore */
const MyGrid = createGrid([
  ['.', 'Header',  'Header',  '.',       '.',       '.'],
  ['.', 'Content', 'Content', 'Content', 'Content', '.'],
  ['.', 'Footer',  'Footer',  'Footer',  'Footer',  '.'],
]);

window.onload = () => {
  const root = createRoot(document.getElementById('root')!);
  root.render(
    <MyGrid style={{ gridAutoFlow: 'column', placeItems: 'center' }}>
      <MyGrid.Header>
        <h1>Header</h1>
      </MyGrid.Header>
      <MyGrid.Content>
        <p>Content</p>
      </MyGrid.Content>
      <MyGrid.Footer>
        <p>Footer</p>
      </MyGrid.Footer>
    </MyGrid>
  );
};
