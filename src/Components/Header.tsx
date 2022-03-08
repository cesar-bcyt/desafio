import React from 'react';
import { Icon } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

export default function Header(props: { title: string, icon?: SemanticICONS, onClick?: () => void, icon2?: SemanticICONS, onClick2?: () => void }) {
    return (
        <div id='header'>
            <div>
                {
                    props.icon &&
                    <Icon name={props.icon} size='large' onClick={props.onClick} style={{ cursor: props.onClick ? 'pointer' : '' }} />
                }
                {props.title}
            </div>
            <div>
            {
                props.icon2 &&
                <Icon name={props.icon2} size='large' onClick={props.onClick2} style={{ cursor: props.onClick2 ? 'pointer' : '' }} />
            }
            </div>
        </div>
    )
}