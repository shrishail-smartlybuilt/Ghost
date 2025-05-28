import React from 'react';
import TopLevelGroup from '../../TopLevelGroup';
import useSettingGroup from '../../../hooks/useSettingGroup';
import {IconLabel, Link, SettingGroupContent, TextField, withErrorBoundary} from '@tryghost/admin-x-design-system';
import {getSettingValues} from '@tryghost/admin-x-framework/api/settings';

const JacktradeIntegration: React.FC<{ keywords: string[] }> = ({keywords}) => {
    const {
        localSettings,
        isEditing,
        saveState,
        handleSave,
        handleCancel,
        updateSetting,
        handleEditingChange
    } = useSettingGroup();

    const [jacktradeApiKey] = getSettingValues(localSettings, [
        'jacktrade_api_key'
    ]) as string[];

    const isJacktradeSetup = jacktradeApiKey;

    const data = isJacktradeSetup ? [
        {
            key: 'status',
            value: (
                <IconLabel icon='check-circle' iconColorClass='text-green'>
                    Jacktrade is set up
                </IconLabel>
            )
        }
    ] : [
        {
            heading: 'Status',
            key: 'status',
            value: 'Jacktrade is not set up'
        }
    ];

    const values = (
        <SettingGroupContent
            columns={1}
            values={data}
        />
    );

    const apiKeysHint = (
        <>Find your Jacktrade API key in your Jacktrade dashboard</>
    );

    const inputs = (
        <SettingGroupContent>
            <div className='grid grid-cols-[120px_auto] gap-x-3 gap-y-6'>
                <div className='col-span-2'>
                    <TextField
                        hint={apiKeysHint}
                        title='Jacktrade private API key'
                        type='password'
                        value={jacktradeApiKey}
                        onChange={(e) => {
                            updateSetting('jacktrade_api_key', e.target.value);
                        }}
                    />
                </div>
            </div>
        </SettingGroupContent>
    );

    const groupDescription = (
        <>Configure your Jacktrade API key to enable Jacktrade integration.</>
    );

    return (
        <TopLevelGroup
            description={groupDescription}
            isEditing={isEditing}
            keywords={keywords}
            navid='jacktrade'
            saveState={saveState}
            testId='jacktrade'
            title="Jacktrade Integration"
            onCancel={handleCancel}
            onEditingChange={handleEditingChange}
            onSave={handleSave}
        >
            {isEditing ? inputs : values}
        </TopLevelGroup>
    );
};

export default withErrorBoundary(JacktradeIntegration, 'Jacktrade Integration');
