import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import toast from '../../utils/toast';

import ContactsService from '../../services/ContactsService';
import useIsMounted from '../../hooks/useIsMounted';

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);

  const history = useHistory();
  const { id } = useParams();
  const isMounted = useIsMounted();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        if (isMounted()) {
          contactFormRef.current.setFiledValues(contact);
          setIsLoading(false);
          setContactName(contact.name);
        }
      } catch {
        if (isMounted()) {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        }
      }
    }
    loadContact();
  }, [id, history, isMounted]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsService.updateContact(id, contact);

      setContactName(contactData.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      });
    }
  }
  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
