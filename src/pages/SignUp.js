import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Patterns from '../utils/PatternsHtml';
import Helpers from '../utils/Helpers';

import { 
  Codify, 
  Headline, 
  Input, 
  Button,
  LayoutLandingPage,
  Anchor,
  Form
} from '../components';

export default function SignUp() {
  let [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRef, setPasswordRef] = useState('');
  const [disabled, setDisabled] = useState(false);

  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    if(disabled) return;

    if(password !== passwordRef) {
      alert('Os campos senha e confirmar senha devem ser iguais');

      return;
    }

    name = Helpers.capitalizeAllAndTrim(name);
    const body = {name, email, password, passwordRef};

    axios
      .post(`${process.env.API_BASE_URL}/users/sign-up`, body)
      .then(() => {
        alert('Cadastro feito com sucesso! Redirecionando para tela de login ...');

        history.push('/entrar');
      })
      .catch(({ response }) => {
        setDisabled(!disabled);

        switch(response.status) {
          case 409:
            alert('Email selecionado já existe na plataforma');
            break
          case 422:
            alert('Não foi possível processar os dados enviados');
            break
          default:
            alert('Erro interno no servidor');
            break
        }
      });
  }

  return (
    <LayoutLandingPage>
      <Codify 
        color={'white'} 
        fontSize={'9rem'} 
        lineHeight={'12rem'}
      > 
        codify 
      </Codify>
      <Headline> learn. practice. code. </Headline>

      <Form onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='nome completo'
          value={name}
          onChange={event => setName(event.target.value)}
          autoFocus
          pattern={Patterns.name.regex}
          autocomplete='on'
          title={Patterns.name.helper}
          required
        />
        <Input
          type='email'
          placeholder='e-mail'
          value={email}
          onChange={event => setEmail(event.target.value)}
          pattern={Patterns.email.regex}
          title={Patterns.email.helper}
          required
          autocomplete='on'
        />
        <Input
          type='password'
          placeholder='senha'
          value={password}
          onChange={event => setPassword(event.target.value)}
          pattern={Patterns.password.regex}
          title={Patterns.password.helper}
          required
        />
        <Input
          type='password'
          placeholder='repetir senha'
          value={passwordRef}
          onChange={event => setPasswordRef(event.target.value)}
          required
        />
        <Button 
          type='submit' 
          disabled={disabled}
        > 
          {disabled ? 'carregando...': 'cadastrar'} 
        </Button>

        <Anchor to='/entrar'> já tem conta ? Faça login </Anchor>
        <Anchor to='/esqueci-senha'> esqueceu sua senha ? </Anchor>
      </Form>
    </LayoutLandingPage>
  );
}