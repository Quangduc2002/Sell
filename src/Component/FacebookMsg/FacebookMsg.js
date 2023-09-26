import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

function FacebookMsg(props) {
    return (
        <FacebookProvider appId="129099423623092" chatSupport>
            <CustomChat pageId="100013188166058" minimized={true} />
        </FacebookProvider>
    );
}

export default FacebookMsg;
