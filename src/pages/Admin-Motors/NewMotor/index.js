import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import api from '../../../services/api'

import { ErrorMessage } from '../../../components'

import { Container, Label, Input, ButtonStyle, LabelUpload } from './styles'

function NewMotors () {
  const [fileName, setFileName] = useState(null)
  const [brands, setBrands] = useState([])
  const { push } = useHistory()

  const onSubmit = async data => {
    const motorDataFormData = new FormData()

    motorDataFormData.append('name', data.name)
    motorDataFormData.append('description', data.description)
    motorDataFormData.append('year', data.year)
    motorDataFormData.append('transmission', data.transmission)
    motorDataFormData.append('mileage', data.mileage)
    motorDataFormData.append('fuel', data.fuel)
    motorDataFormData.append('price', data.price)
    motorDataFormData.append('brand_id', data.brand.id)
    motorDataFormData.append('file', data.file[0])

    await toast.promise(api.post('motors', motorDataFormData), {
      success: 'Moto criada com sucesso',
      error: 'Falha ao criar a moto'
    })

    setTimeout(() => {
      push('/admin-motos')
    }, 2000)
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    description: Yup.string().required('A descrição é obrigatória'),
    year: Yup.string().required('O ano é obrigatório'),
    transmission: Yup.string().required('O câmbio é obrigatório'),
    mileage: Yup.string().required('A quilometragem é obrigatório'),
    fuel: Yup.string().required('O combustível é obrigatório'),
    price: Yup.string().required('O preço é obrigátorio'),
    brand: Yup.object().required('Escolha uma marca'),
    file: Yup.mixed().test('required', 'Carregue uma imagem', value => {
      return value && value.length > 0
    })
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    async function loadBrands () {
      const { data } = await api.get('brands')

      let brandsMotors = data.slice(6, 12)

      const newBrands = [...brandsMotors]

      setBrands(newBrands)

    }
    loadBrands()

  }, [])

  return (
    <Container>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Nome:</Label>
          <Input type='text' {...register('name')} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div>
          <Label>Descrição:</Label>
          <textarea type='text' {...register('description')} />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>
        <div>
          <Label>Câmbio:</Label>
          <Input type='text' {...register('transmission')} />
          <ErrorMessage>{errors.transmission?.message}</ErrorMessage>
        </div>
        <div>
          <Label>Ano:</Label>
          <Input type='text' {...register('year')} />
          <ErrorMessage>{errors.year?.message}</ErrorMessage>
        </div>
        <div>
          <Label>Quilometragem:</Label>
          <Input type='text' {...register('mileage')} />
          <ErrorMessage>{errors.mileage?.message}</ErrorMessage>
        </div>
        <div>
          <Label>Combustível:</Label>
          <Input type='text' {...register('fuel')} />
          <ErrorMessage>{errors.fuel?.message}</ErrorMessage>
        </div>
        <div>
          <Label> Preço </Label>
          <Input type='number' {...register('price')} />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>
        <div>
          <LabelUpload>
            {fileName || (
              <>
                <CloudUploadIcon />
                Caregue a imagem do produto
              </>
            )}
            <input
              type='file'
              {...register('file')}
              onChange={value => {
                setFileName(value.target.files[0]?.name)
              }}
            />
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </div>
        <div>
          <Controller
            name='brand'
            control={control}
            render={({ field }) => {
              return (
                <ReactSelect
                 {...field}
                  options={brands}
                  getOptionLabel={brd => brd.name}
                   getOptionValue={brd => brd.id}
                  placeholder='Escolha uma marca'
                />
              )
            }}
          ></Controller>
          <ErrorMessage>{errors.brand?.message}</ErrorMessage>
        </div>
        <ButtonStyle type='submit'> Adicionar Moto </ButtonStyle>
      </form>
    </Container>
  )
}

export default NewMotors
