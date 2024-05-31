import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';
import toast from '../../utils/toast';

import ContactsService from '../../services/ContactsService';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function loaadContact() {
      try {
        const contactData = await ContactsService.getContactById(
          id,
        );
        console.log({ contactData });
        setIsLoading(false);
      } catch {
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado!',
        });
      }
    }
    loaadContact();
  }, [id, history]);

  function handleSubmit() {
    //
  }
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title="Editar Lucas Henrique"
      />

      <ContactForm
        buttonLabel="Salvar Alterações "
        onSubmit={handleSubmit}
      />

    </>
  );
}
