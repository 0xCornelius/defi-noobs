import React, { useState } from 'react';
import copyToClipboard from 'copy-to-clipboard';
import { shortenAddress } from '../../../helpers/utils/util';

import Tooltip from '../../ui/tooltip';
import CopyIcon from '../../ui/icon/copy-icon.component';
import { useSelector } from 'react-redux';
import "react-tippy/dist/tippy.css";

function SelectedAccount() {
    const account = useSelector((state) => state.account);
    const [copied, setCopied] = useState(false);

    return (
      <div className="selected-account">
        <Tooltip
          wrapperClassName="selected-account__tooltip-wrapper"
          position="bottom"
          title={copied ? "Copied!" : "Copy to clipboard"}
        >
          <button
            className="selected-account__clickable"
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1000 * 3);
              copyToClipboard(account.address);
            }}
          >
            <div className="selected-account__name">{account.name}</div>
            <div className="selected-account__address">
              {shortenAddress(account.address)}
              <div className="selected-account__copy">
                <CopyIcon size={11} color="#989a9b" />
              </div>
            </div>
          </button>
        </Tooltip>
      </div>
    );
}

export default SelectedAccount;
