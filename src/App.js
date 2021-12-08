import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from './components/input'
import Button from './components/button'
import Section from './components/section'
import Balance from './components/balance'
import Container from './components/container'

const compoundInterest = (deposit = 0, contribution = 0, years = 0, rate = 0) => {
  let total = deposit;
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1)
  }
  return Math.round(total);
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const App = () => {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const balance = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate));
    setBalance(formatter.format(balance));
  }

  const formSchema = Yup.object({
    deposit: Yup.number()
      .required('Obligatorio')
      .typeError('Debe ser un numero'),
    contribution: Yup.number()
      .required('Obligatorio')
      .typeError('Debe ser un numero'),
    years: Yup.number()
      .required('Obligatorio')
      .typeError('Debe ser un numero'),
    rate: Yup.number()
      .required('Obligatorio')
      .typeError('Debe ser un numero')
      .min(0, 'El valor minimo debe ser 0')
      .max(1, 'El valor maximo debe ser 1')
  })

  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={formSchema}
        >
          <Form>
            <Input name="deposit" label="Deposito Inicial" />
            <Input name="contribution" label="Contribucion Anual" />
            <Input name="years" label="Años" />
            <Input name="rate" label="Interes Estimado" />
            <Button type="submit">Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Balance final: {balance}</Balance> : ''}
      </Section>
    </Container>
  );
}

export default App;
