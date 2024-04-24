import { Link } from 'react-router-dom';
import PorpTypes from 'prop-types';

import arrow from '../../assets/images/icons/arrow.svg';

import { Container } from './styles';

export default function PageHeader({ title }) {
  return (
    <Container>
      <Link to="/">
        <img src={arrow} alt="back" />
        <span>Voltar</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  );
}

PageHeader.propTypes = {
  title: PorpTypes.string.isRequired,
};
