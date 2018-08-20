import React from 'react';
import MediaQuery from 'react-responsive'

import coverDesktop from '../../../../img/cover_desktop.png'
import coverMobile from '../../../../img/cover_mobile.png'

export default () => (
    <MediaQuery minDeviceWidth={768}>
        {matches =>
            matches ? (
                <img className="cover-desktop" src={coverDesktop} />
            ) : (
                <img className="cover-mobile" src={coverMobile} />
            )
        }
    </MediaQuery>
)
