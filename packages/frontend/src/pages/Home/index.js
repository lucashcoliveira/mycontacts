import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import {
  Card, Container, Header, ListContainer, InputSerachContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';

export default function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/contacts')
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  console.log(contacts);

  return (
    <Container>
      {/* <Loader /> */}
      {/* <Modal danger /> */}
      <InputSerachContainer>
        <input type="text" placeholder="Pesquisar contato" />
      </InputSerachContainer>

      <Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        {contacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category_name && (
                <small>{contact.category_name}</small>
                )}
              </div>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>
            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={edit} alt="Edit" />
              </Link>
              <button type="button">
                <img src={trash} alt="Delte" />
              </button>
            </div>
          </Card>
        ))}
      </ListContainer>
    </Container>
  );
}
