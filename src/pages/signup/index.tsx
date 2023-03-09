import { useState, FormEvent, useContext, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/home.module.scss';
import { toast } from 'react-toastify'
import logoImg from '../../../public/logo.svg'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { AuthContext } from '../../contexts/AuthContext';
import Link from 'next/link';
import { AdminAuthContext } from '../../contexts/AdminAuthContext';
import { useRouter } from 'next/router';

export default function SignUp() {
  const { signUp, user } = useContext(AuthContext)
  const {isAdmin} = useContext(AdminAuthContext)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true);
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else if (!isAdmin) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [user, isAdmin, router]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name === '' || email === '' || password === ''){
      toast.warning('Preencha todos os campos')
      return
    }

    setLoading(true)

    let data = {
      name, 
      email,
      password
    }

    await signUp(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Projeto Pizzaria" />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input 
              placeholder='Digite seu nome'
              type='text'
              value={name}
              onChange={ (e) => setName(e.target.value)}
            />
            <Input 
              placeholder='Digite seu email'
              type='text'              
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder='Digite sua senha'
              type='password'
              value={password}
              onChange={ (e) => setPassword(e.target.value)}
            />
            <Button 
              type='submit'
              loading={loading}
            >
              Cadastrar
            </Button>
          </form>
          <Link href='/'>
            <a className={styles.text}>Já possui uma conta? Faça o login</a>
          </Link>
        </div>
      </div>
    </>
  )
}
