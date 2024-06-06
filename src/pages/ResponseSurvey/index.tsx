import React, { useState } from 'react';
import style from './responsesurvey.module.scss';
import classNames from 'classnames/bind';
import { FormControlLabel, IconButton, Menu, MenuItem, Switch } from '@mui/material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Question, Response } from '../../components';
import QuestionType from '../../utils/interfaces/questionType';
import ResponseSurveyInner from './ResponseSurveyInner';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import API from '../../utils/api';
import { useParams } from 'react-router-dom';
import ResponseInterface from '../../utils/interfaces/response';
import { useAppDispatch } from '../../redux';
import survey, { setSurvey } from '../../redux/slice/survey';
const cx = classNames.bind(style);

const ResponseSurveyPage = () => {
    const { id } = useParams();
    const dispatchApp = useAppDispatch();
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: [`getResponseSurvey_${id}`],
        queryFn: async () => {
            const response = await axios.get(`${API.GetResponseSurvey.endPoint}/${id}`);
            const t: ResponseInterface = response.data.data;
            return t;
        },
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <div>Đang tải survey ......................</div>;
    }
    if (isError) return <div>Lỗi ......................</div>;
    if (data) {
        dispatchApp(
            setSurvey({
                survey: data.survey,
            }),
        );
    }
    return (
        <div className={cx('wrapper')}>
            <ResponseSurveyInner data={data} />
        </div>
    );
};

export default ResponseSurveyPage;
