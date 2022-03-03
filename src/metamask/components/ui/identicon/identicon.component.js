import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const getStyles = (diameter) => ({
  height: diameter,
  width: diameter,
  borderRadius: diameter / 2,
});

export default class Identicon extends PureComponent {
  static propTypes = {
    /**
     * Adds blue border around the Identicon used for selected account.
     * Increases the width and height of the Identicon by 8px
     */
    addBorder: PropTypes.bool,
    /**
     * Address used for generating random image
     */
    address: PropTypes.string,
    /**
     * Add custom css class
     */
    className: PropTypes.string,
    /**
     * Sets the width and height of the inner img element
     * If addBorder is true will increase components height and width by 8px
     */
    diameter: PropTypes.number,
    /**
     * Used as the image source of the Identicon
     */
    image: PropTypes.string,
    /**
     * Use the blockie type random image generator
     */
    useBlockie: PropTypes.bool,
    /**
     * The alt text of the image
     */
    alt: PropTypes.string,
    /**
     * Check if show image border
     */
    imageBorder: PropTypes.bool,
    /**
     * Check if use token detection
     */
    useTokenDetection: PropTypes.bool,
    /**
     * Add list of token in object
     */
    tokenList: PropTypes.object,
  };

  static defaultProps = {
    addBorder: false,
    address: undefined,
    className: undefined,
    diameter: 46,
    image: undefined,
    useBlockie: false,
    alt: '',
    tokenList: {},
  };

  renderImage() {
    const { className, diameter, image, alt, imageBorder } = this.props;

    return (
      <img
        className={classnames('identicon', className, {
          'identicon__image-border': imageBorder,
        })}
        src={image}
        style={getStyles(diameter)}
        alt={alt}
      />
    );
  }

  render() {
    const {
      image,
      diameter,
    } = this.props;

    if (image) {
      return this.renderImage();
    }

    return (
      <div
        style={getStyles(diameter)}
        className="identicon__image-border"
      ></div>
    );
  }
}
