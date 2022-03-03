import React from 'react';
import SelectedAccount from '../selected-account';
import ConnectedStatusIndicator from '../connected-status-indicator';

export default function MenuBar() {

  const showStatus = true;

  return (
    <div className="menu-bar">
      {showStatus ? (
        <ConnectedStatusIndicator
          onClick={() => {}}
        />
      ) : null}

      <SelectedAccount />
    </div>
  );
}
