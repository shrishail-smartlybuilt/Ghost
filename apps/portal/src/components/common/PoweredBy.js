import React from 'react';
import AppContext from '../../AppContext';
import {ReactComponent as GhostLogo} from '../../images/ghost-logo-small.svg';

export default class PoweredBy extends React.Component {
    static contextType = AppContext;

    render() {
        // Note: please do not wrap "Powered by Ghost" in the translation function, as we don't
        // want it to be translated
        /* eslint-disable i18next/no-literal-string */
        return (
            <p>
                <GhostLogo />
                Powered by PraiseCMS
            </p>
        );
        /* eslint-enable i18next/no-literal-string */
    }
}
