import React, { useState } from 'react';
import style from './shared-survey.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import SharedSurvey from './components/SharedSurveyComponent';
import { MoonLoader } from 'react-spinners';
import { useAppSelector } from '../../../../redux/store';
import { getSharedSurveysOfCurrentUser } from '../../../../API/axios';
import { MyButton } from '../../../../components';
import { useTranslation } from 'react-i18next';
import { useGetSharedSurveyOfCurrentUserQuery } from '../../../../hooks/api-hooks/infiniteQueries';

const cx = classNames.bind(style);
const SharedSurveyPage = () => {
    const { t } = useTranslation('surveyManagement');

    const navigate = useNavigate();
    const searchString = useAppSelector((state) => state.surveyManagement.searchString);
    const [value, setValue] = useState('0');
    const handleChangeFilter = (e: SelectChangeEvent) => {
        const value = e.target.value;
        setValue(value);
    };
    const { data, isLoading, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
        useGetSharedSurveyOfCurrentUserQuery(searchString, value);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('filter-wrapper')}>
                <div className={cx('filter')}>
                    <span style={{ fontSize: '18px' }}>{t('status')}: </span>
                    <FormControl
                        sx={{
                            m: 1,
                            minWidth: 65,
                            '& fieldset': {
                                border: 'none',
                            },
                        }}
                        size="small">
                        <Select
                            onChange={handleChangeFilter}
                            size="medium"
                            MenuProps={{ disablePortal: true }}
                            defaultValue="0">
                            <MenuItem value={0}>
                                <div style={{ padding: '4px 0px' }}>{t('all')}</div>
                            </MenuItem>
                            <MenuItem value={1}>
                                <div style={{ padding: '4px 0px' }}>{t('accepting_response')}</div>
                            </MenuItem>
                            <MenuItem value={2}>
                                <div style={{ padding: '4px 0px' }}>{t('stop_response')}</div>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <MoonLoader color="#fcc934" size={30} />
                </div>
            ) : (
                <div className={cx('list-surveys')}>
                    {data?.pages.map((page, index) => {
                        return (
                            <div key={index} className={cx('sectionData')}>
                                {page.sharedSurveys.map((survey) => {
                                    return <SharedSurvey key={survey.id} sharedSurvey={survey} />;
                                })}
                            </div>
                        );
                    })}
                    {data?.pages[0].sharedSurveys.length === 0 && <p style={{ textAlign: 'center' }}>{t('no_data')}</p>}
                </div>
            )}

            {hasNextPage && (
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    {isFetchingNextPage && <MoonLoader color="#fcc934" size={30} />}
                    <MyButton textButton={t('load_more')} onClick={() => fetchNextPage()} />
                </div>
            )}
        </div>
    );
};

export default SharedSurveyPage;
