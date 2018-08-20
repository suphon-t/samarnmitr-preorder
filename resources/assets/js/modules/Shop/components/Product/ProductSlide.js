import React from 'react'
import MediaQuery from 'react-responsive'
import { Carousel } from 'react-responsive-carousel'

import { getSlideImage, getSlideImageMobile, getSlideImageRetina } from '../../shopUtils'

const getImage = (id, index, isDesktop, isRetina, hasMobile, hasRetina) => {
    if (!isDesktop && hasMobile) {
        return getSlideImageMobile(id, index)
    } else {
        if (isRetina && hasRetina) {
            return getSlideImageRetina(id, index)
        } else {
            return getSlideImage(id, index)
        }
    }
}

export default ({ product, hasMobile = false, hasRetina = false }) => (
        <MediaQuery minDeviceWidth={768}>
            { isDesktop =>
                <MediaQuery minResolution="2dppx">
                    { isRetina =>
                        <Carousel showArrows={true} showThumbs={false} showStatus={false}
                                  showIndicators={false} infiniteLoop={true} autoPlay>
                            { Array(product.slider_count).fill(0).map((_, i) => (
                                <div key={product.id + '.' + i}>
                                    <img src={getImage(product.id, i, isDesktop, isRetina, hasMobile, hasRetina)} />
                                </div>
                            )) }
                        </Carousel>
                    }
                </MediaQuery>
            }
        </MediaQuery>
    )
