import React from 'react';

import { RouterProvider } from 'react-router-dom';

import appRouting from './appRouting';

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouting} />
    </div>
  );
};

export default App;
