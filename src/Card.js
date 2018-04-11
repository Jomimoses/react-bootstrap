import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';
import createWithBsPrefix from './utils/createWithBsPrefix';
import CardContext from './CardContext';

import CardImg from './CardImg';

class Card extends React.Component {
  static propTypes = {
    /**
     * @default 'card'
     */
    bsPrefix: PropTypes.string.isRequired,

    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'div'
  };

  static getDerivedStateFromProps({ bsPrefix }) {
    return {
      cardContext: {
        cardHeaderBsPrefix: `${bsPrefix}-header`
      }
    };
  }

  state = {};

  render() {
    const {
      bsPrefix,
      className,
      componentClass: Component,
      ...props
    } = this.props;

    return (
      <CardContext.Provider value={this.state.cardContext}>
        <Component className={classNames(bsPrefix, className)} {...props} />
      </CardContext.Provider>
    );
  }
}

const divWithHeadingClass = headingClass =>
  React.forwardRef((p, ref) => (
    <div {...p} ref={ref} className={classNames(p.className, headingClass)} />
  ));

const DecoratedCard = createBootstrapComponent(Card, 'card');
DecoratedCard.Img = CardImg;
DecoratedCard.Title = createWithBsPrefix('card-title', {
  Component: divWithHeadingClass('h5')
});
DecoratedCard.Subtitle = createWithBsPrefix('card-subtitle', {
  Component: divWithHeadingClass('h6')
});

DecoratedCard.Body = createWithBsPrefix('card-body');
DecoratedCard.Link = createWithBsPrefix('card-link', {
  Component: 'a'
});
DecoratedCard.Text = createWithBsPrefix('card-text', {
  Component: 'p'
});
DecoratedCard.Header = createWithBsPrefix('card-header');
DecoratedCard.Footer = createWithBsPrefix('card-footer');
DecoratedCard.ImgOverlay = createWithBsPrefix('card-img-overlay');

export default DecoratedCard;
