import React from 'react';
import {
  STATUS_CONNECTED,
  STATUS_CONNECTED_TO_ANOTHER_ACCOUNT,
  STATUS_NOT_CONNECTED,
} from "../../../helpers/constants/connected-sites";
import ColorIndicator from '../../ui/color-indicator';
import { COLORS } from '../../../helpers/constants/design-system';

export default function ConnectedStatusIndicator({ onClick }) {

  let status = STATUS_NOT_CONNECTED;

  let indicatorType = ColorIndicator.TYPES.OUTLINE;
  let indicatorColor = COLORS.UI4;

  if (status === STATUS_CONNECTED) {
    indicatorColor = COLORS.SUCCESS1;
    indicatorType = ColorIndicator.TYPES.PARTIAL;
  } else if (status === STATUS_CONNECTED_TO_ANOTHER_ACCOUNT) {
    indicatorColor = COLORS.ALERT1;
  }

  const text =
    status === STATUS_CONNECTED
      ? "Connected"
      : "Not connected";

  return (
    <button className="connected-status-indicator" onClick={onClick}>
      <ColorIndicator color={indicatorColor} type={indicatorType} />
      <div className="connected-status-indicator__text">{text}</div>
    </button>
  );
}

ConnectedStatusIndicator.defaultProps = {
  onClick: undefined,
};

