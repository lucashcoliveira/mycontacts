/* eslint-disable react/jsx-one-expression-per-line */

import { Link } from 'react-router-dom';

import {
  Card,
  Container,
  ListHeader,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/icons/sad.svg';
import emptyBox from '../../assets/images/icons/empty-box.svg';
import magnifierQuestion from '../../assets/images/icons/magnifier-question.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import useHome from './useHome';
import InputSearch from './components/InputSearch';
import Header from './components/Header';

export default function Home() {
  const {
    isLoading,
    contacts,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />

          <div className="details">

            <strong> Ocorreu um erro ao obter os seus contatos</strong>

            <Button type="button" onClick={handleTryAgain}>
              Tentar Novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="emptyBox" />
              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>”Novo contato”</strong>
                à cima para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
          <SearchNotFoundContainer>
            <img src={magnifierQuestion} alt="magnifierQuestion" />

            <span>Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>
            </span>
          </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
          <ListHeader orderby={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Nome</span>
              <img src={arrow} alt="Arrow" />
            </button>
          </ListHeader>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category.name && (
                  <small>{contact.category.name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>
              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact)}
                >
                  <img src={trash} alt="Delte" />
                </button>
              </div>
            </Card>
          ))}

          <Modal
            danger
            isLoading={isLoadingDelete}
            visible={isDeleteModalVisible}
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
          >
            <p>esta ação não podera ser desfeita!</p>
          </Modal>
        </>
      )}
    </Container>
  );
}
