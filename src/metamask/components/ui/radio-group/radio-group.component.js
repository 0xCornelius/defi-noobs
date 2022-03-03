import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  COLORS,
  FONT_WEIGHT,
  TYPOGRAPHY,
} from '../../../helpers/constants/design-system';

function Connector({ isFirst, isLast }) {
  if (isFirst) {
    return <div className="radio-group__column-start-connector" />;
  } else if (isLast) {
    return <div className="radio-group__column-end-connector" />;
  }
  return (
    <>
      <div className="radio-group__column-vertical-line" />
      <div className="radio-group__column-horizontal-line" />
    </>
  );
}

Connector.propTypes = {
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
};

export default function RadioGroup({ options, name, selectedValue, onChange }) {

  const hasRecommendation = Boolean(
    options.find((option) => option.recommended),
  );

  return (
    <div
      className={classNames('radio-group', {
        'radio-group--has-recommendation': hasRecommendation,
      })}
    >
      {options.map((option, index) => {
        const checked = option.value === selectedValue;
        return (
          <div className="radio-group__column" key={`${name}-${option.value}`}>
            <label className="radio-group__column-inner">
              {hasRecommendation && (
                <div
                  color={COLORS.SUCCESS3}
                  className="radio-group__column-recommended"
                  variant={TYPOGRAPHY.H7}
                >
                  {option.recommended ? "recommendedGasLabel" : ""}
                </div>
              )}
              <div className="radio-group__column-radio">
                <input
                  type="radio"
                  name={name}
                  checked={checked}
                  value={option.value}
                  onChange={() => onChange?.(option.value)}
                />
              </div>
              <Connector
                isFirst={index === 0}
                isLast={index === options.length - 1}
              />
              <div
                color={checked ? COLORS.BLACK : COLORS.UI4}
                fontWeight={FONT_WEIGHT.BOLD}
                variant={TYPOGRAPHY.H7}
                className={classNames("radio-group__column-label", {checked: checked})}
              >
                {option.label}
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
}

RadioGroup.propTypes = {
  /**
   * Predefined options for radio group
   */
  options: PropTypes.array,
  /**
   * Show selected value
   */
  selectedValue: PropTypes.string,
  /**
   * Show name as label
   */
  name: PropTypes.string,
  /**
   * Handler for onChange
   */
  onChange: PropTypes.func,
};

RadioGroup.defaultProps = {
  options: [],
};
