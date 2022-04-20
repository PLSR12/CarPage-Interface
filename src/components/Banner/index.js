import React from 'react'

import BannerLogo from '../../assets/banner.jpg'

import { ImageBanner } from './styles'

export function Banner() {
    return (
        <ImageBanner src={BannerLogo} alt='banner'/>
    )
}