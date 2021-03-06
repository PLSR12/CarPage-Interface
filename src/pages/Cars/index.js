import { React, useState, useEffect } from 'react'

import PropTypes from 'prop-types'

import { Container, BrandsMenu, BrandButton, CarsContainer } from './styles'

import { Header, Banner, CardCars, Footer } from '../../components'

import formatCurrency from '../../utils/formatCurrency'

import api from '../../services/api'

export function Cars ({ location: { state } }) {
  let brandId = 0
  if (state?.brandId) {
    brandId = state.brandId
  }

  const [brands, setBrands] = useState([])
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [activeBrands, setActiveBrands] = useState(brandId)

  useEffect(() => {
    async function loadBrands () {
      const { data } = await api.get('brands')

      let brandsCars = data.slice(0, 6)

      const newBrands = [{ id: 0, name: 'Todas' }, ...brandsCars]

      setBrands(newBrands)
    }
    async function loadCars () {
      const { data: allCars } = await api.get('cars')

      const newCars = allCars.map(car => {
        return {
          ...car,
          formatedPrice: formatCurrency(car.price)
        }
      })

      setCars(newCars)
    }

    loadCars()
    loadBrands()
  }, [])

  useEffect(() => {
    if (activeBrands === 0) {
      setFilteredCars(cars)
    } else {
      const newFilteredCars = cars.filter(car => car.brand_id === activeBrands)

      setFilteredCars(newFilteredCars)
    }
  }, [activeBrands, cars])
  return (
    <Container>
      <Header />
      <Banner />
      <BrandsMenu>
        {brands &&
          brands.map(brand => (
            <BrandButton
              type='button'
              key={brand.id}
              isActiveBrand={activeBrands === brand.id}
              onClick={() => {
                setActiveBrands(brand.id)
              }}
            >
              {brand.name}
            </BrandButton>
          ))}
      </BrandsMenu>
      <CarsContainer>
        {filteredCars &&
          filteredCars.map(car => <CardCars key={car.id} car={car} />)}
      </CarsContainer>
      <Footer />
    </Container>
  )
}

Cars.propTypes = {
  location: PropTypes.object
}
