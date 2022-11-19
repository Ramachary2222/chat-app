import React from 'react';
import { Badge, Whisper, IconButton, Tooltip, Icon } from 'rsuite';

function ConditionalBadge({ condition, children }) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return condition ? <Badge content={condition}>{children}</Badge> : <>{children}</>;
}
function IconBtnControl({

    isVisible,
    iconName,
    toolTip,
    onClick,
    badgeContent,
    ...props
}) {
    return (
        <div
            className="ml-2"
            style={{ visibility: isVisible ? 'visible' : 'hidden' }}
        >
            <ConditionalBadge condition={badgeContent}>
                <Whisper
                    placement="top"
                    delay={0}
                    delayHide={0}
                    delayShow={0}
                    trigger="hover"
                    speaker={<Tooltip>{toolTip}</Tooltip>}
                >
                    <IconButton
                        {...props}
                        onClick={onClick}
                        circle
                        size="xs"
                        icon={<Icon icon={iconName} />}
                    />
                </Whisper>
            </ConditionalBadge>
        </div>
    );
}

export default IconBtnControl;