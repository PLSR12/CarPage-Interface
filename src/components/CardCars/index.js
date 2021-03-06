import React from 'react'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import MediationIcon from '@mui/icons-material/Mediation'
import PropTypes from 'prop-types'

import { Button } from '../../components'

import {
  ContainerCard,
  CarName,
  CarDescription,
  ContainerImage,
  ContainerText,
  CarPrice,
  Line
} from './styles'

export function CardCars ({ car }) {
  return (
    <ContainerCard>
      <ContainerImage>
        <img src={car.url} alt='foto do carro'></img>
      </ContainerImage>
      <ContainerText>
        <CarName> {car.name} </CarName>
        <CarDescription> {car.description}</CarDescription>
        <div>
          <CalendarTodayIcon /> <p> {car.year}</p>
          <MediationIcon />
          <p> {car.transmission} </p>
          <AvTimerIcon />
          <p> {car.mileage} Km </p>
          <LocalGasStationIcon />
          <p> {car.fuel} </p>
        </div>
      </ContainerText>
      <Line> </Line>

      <div className='container-price'>
        <CarPrice> {car.formatedPrice}</CarPrice>
        <Button style={{marginBottom:20}}> Agendar Test-Drive </Button>
      </div>
    </ContainerCard>
  )
}

CardCars.propTypes = {
  car: PropTypes.object
}
