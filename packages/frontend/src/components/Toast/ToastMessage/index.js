import PropTypes from 'prop-types';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessaaaage({ text, type }) {
  return (
    <Container type={type}>
      {type === 'danger' && <img src={xCircleIcon} alt="x" />}
      {type === 'success' && <img src={checkCircleIcon} alt="check" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessaaaage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['defalut', 'success', 'denger']),
};

ToastMessaaaage.defaultProps = {
  type: 'defalut',
};
