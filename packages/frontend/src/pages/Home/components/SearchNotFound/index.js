import PorpTypes from 'prop-types';
import magnifierQuestion from '../../../../assets/images/icons/magnifier-question.svg';

import { Container } from '../../styles';

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="magnifierQuestion" />

      <span>
        Nenhum resultado foi encontrado para
        <strong>{searchTerm}</strong>
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PorpTypes.string.isRequired,
};
